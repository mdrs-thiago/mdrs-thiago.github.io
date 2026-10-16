// Reads tabs of the public content sheet (see CONTENT_SHEET_ID in js/config.js) as CSV.
function parseCSV(text) {
    const rows = [];
    let row = [], field = '', quoted = false;
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (quoted) {
            if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
            else if (c === '"') quoted = false;
            else field += c;
        } else if (c === '"') quoted = true;
        else if (c === ',') { row.push(field); field = ''; }
        else if (c === '\n' || c === '\r') {
            if (c === '\r' && text[i + 1] === '\n') i++;
            row.push(field); rows.push(row); row = []; field = '';
        } else field += c;
    }
    if (field || row.length) { row.push(field); rows.push(row); }
    return rows;
}

// Returns the tab as objects keyed by header name, so adding or moving columns
// in the sheet doesn't break the site. The unnamed first column is keyed ''.
async function fetchSheetRows(tab) {
    const url = `https://docs.google.com/spreadsheets/d/${CONTENT_SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tab)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Sheet ${tab}: HTTP ${res.status}`);
    const [header = [], ...rows] = parseCSV(await res.text());
    const keys = header.map(h => (h || '').trim());
    return rows.map(r => Object.fromEntries(keys.map((k, i) => [k, (r[i] || '').trim()])));
}

// Orientação: name in the unnamed first column, then Instituição, Level, Título, Situação.
async function fetchStudents() {
    const rows = await fetchSheetRows('Orientação');
    return rows.filter(r => r['']).map(r => ({
        name: r[''], institution: r['Instituição'], level: r['Level'], title: r['Título'] || '', situacao: r['Situação']
    }));
}

// Eventos: Nome, Descrição, Link.
async function fetchEvents() {
    const rows = await fetchSheetRows('Eventos');
    return rows.filter(r => r['Nome']).map(r => ({ name: r['Nome'], description: r['Descrição'], link: r['Link'] }));
}
