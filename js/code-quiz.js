// Shared in-browser Python grading engine for code-execution quizzes
// (puc_si/quiz/aula01.html, aula03.html, aula04.html, aula06.html, aula07.html).
//
// Reuses the exact Pyodide bootstrap pattern already proven in puc_si/slides/aula06.html
// (loadPyodide + pyodide.loadPackage), so there's no new runtime dependency - just a
// second use of the same CDN engine for grading instead of live demo code cells.
//
// Grading never reveals expected values to the student: the harness returns only a
// pass/fail boolean per hidden test case, matching the "no answers shown" rule used by
// the multiple-choice quizzes (js quest pages under puc_ia/quiz, puc_si/quiz).
(function () {
    const PYODIDE_CDN = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
    let pyodide = null;
    let readyPromise = null;

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = src;
            s.onload = resolve;
            s.onerror = reject;
            document.head.appendChild(s);
        });
    }

    async function ensureReady(packages, onStatus) {
        if (!readyPromise) {
            readyPromise = (async () => {
                onStatus && onStatus('Carregando Python (Pyodide)...');
                await loadScript(PYODIDE_CDN);
                pyodide = await loadPyodide();
                if (packages && packages.length) {
                    onStatus && onStatus(`Instalando pacotes (${packages.join(', ')})...`);
                    await pyodide.loadPackage(packages);
                }
                onStatus && onStatus(null);
            })();
        }
        return readyPromise;
    }

    // Runs the student's code as-is and returns captured stdout/errors - a scratch
    // "try it" run, not graded, so the student can debug before submitting.
    async function runScratch(code) {
        try {
            await pyodide.runPythonAsync('import sys, io\nsys.stdout = io.StringIO()');
            await pyodide.runPythonAsync(code);
            const out = await pyodide.runPythonAsync('sys.stdout.getvalue()');
            return { ok: true, output: out || '[Nenhuma saída no console]' };
        } catch (err) {
            return { ok: false, output: err.toString() };
        }
    }

    // Runs the student's code, then calls `entryFunction` with each test case's args and
    // compares against `expected` (list/float-tolerant equality). Returns an array of
    // booleans, one per test case, in the same order - never the expected values.
    async function gradeSubmission(code, entryFunction, testCases) {
        const harness = `
import json as __json

def __check(result, expected):
    if isinstance(expected, list) and isinstance(result, list):
        if len(result) != len(expected):
            return False
        return all(__check(r, e) for r, e in zip(result, expected))
    if isinstance(expected, float):
        try:
            return abs(float(result) - expected) < 1e-3
        except Exception:
            return False
    return result == expected

__test_cases = __json.loads(${JSON.stringify(JSON.stringify(testCases))})
__results = []
for __tc in __test_cases:
    try:
        __result = ${entryFunction}(*__tc['args'])
        __results.append(__check(__result, __tc['expected']))
    except Exception:
        __results.append(False)
__json.dumps(__results)
`;
        await pyodide.runPythonAsync('import sys, io\nsys.stdout = io.StringIO()');
        await pyodide.runPythonAsync(code);
        const resultsJson = await pyodide.runPythonAsync(harness);
        return JSON.parse(resultsJson);
    }

    // Runs the student's full script (which must define an async top-level function called
    // `entryFunction`, e.g. `async def executar_teste(): ...`), then awaits a call to that
    // function and returns whatever dict it returned. Used to validate a student-written
    // agentic loop (their own pyfetch calls to Ollama, their own tool_call parsing, their own
    // round-trip) without dictating how they got there - it just calls their entry point once
    // and inspects the result they chose to return.
    async function runEntryAsync(code, entryFunction) {
        await pyodide.runPythonAsync('import sys, io\nsys.stdout = io.StringIO()');
        await pyodide.runPythonAsync(code);
        const harness = `
import json as __json
__r = await ${entryFunction}()
__json.dumps(__r)
`;
        const resultJson = await pyodide.runPythonAsync(harness);
        const stdout = await pyodide.runPythonAsync('sys.stdout.getvalue()');
        return { result: JSON.parse(resultJson), stdout };
    }

    window.CodeQuiz = { ensureReady, runScratch, gradeSubmission, runEntryAsync };
})();
