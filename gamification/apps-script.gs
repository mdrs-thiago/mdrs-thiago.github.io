// Google Apps Script backend for the PI-IA / PI-SI gamification layer.
// The Google Sheet remains the source of truth: the professor can always validate (or
// correct) a quest by hand, adding/editing/deleting a row in the `progress` tab directly.
// Most reads/writes go through this script, but it stays intentionally narrow: the only
// write path is doPost, and it's meant to be called exclusively by the auto-graded quiz
// pages and self-report challenge pages (puc_ia/quiz, puc_ia/desafios, puc_si/quiz,
// puc_si/desafios) — it is not a general self-declaration endpoint for arbitrary quests.
//
// Deploy: open the Google Sheet described in docs/gamification-setup.md,
// Extensions > Apps Script, paste this whole file, then Deploy > New deployment
// > Web app (Execute as: Me, Who has access: Anyone). Paste the resulting URL
// into js/config.js as APPS_SCRIPT_URL.
//
// Sheet tabs expected:
//   progress       : aluno_id | disciplina | quest_id | data_validacao | detalhe
//   roster_pi_ia   : aluno_id | nome
//   roster_pi_si   : aluno_id | nome
//
// `detalhe` is a free-text 5th column (quiz score like "8/10", or a challenge's pasted
// proof). It's optional — older sheets without it still work fine, since every reader here
// looks up columns by header name, not position, and treats a missing column as blank.

const ROSTER_SHEET_BY_DISCIPLINE = {
  'puc-pi-ia': 'roster_pi_ia',
  'puc-pi-si': 'roster_pi_si'
};

function getSheet_(name) {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function findAluno_(disciplina, alunoId) {
  const sheetName = ROSTER_SHEET_BY_DISCIPLINE[disciplina];
  const sheet = sheetName && getSheet_(sheetName);
  if (!sheet || !alunoId) return null;
  const [header, ...data] = sheet.getDataRange().getValues();
  const idx = { aluno_id: header.indexOf('aluno_id'), nome: header.indexOf('nome') };
  const row = data.find(r => String(r[idx.aluno_id]) === String(alunoId));
  return row ? { aluno_id: String(row[idx.aluno_id]), nome: String(row[idx.nome]) } : null;
}

function progressRows_(disciplina, alunoId) {
  const sheet = getSheet_('progress');
  if (!sheet || !alunoId) return [];
  const [header, ...data] = sheet.getDataRange().getValues();
  const idx = {
    aluno_id: header.indexOf('aluno_id'),
    disciplina: header.indexOf('disciplina'),
    quest_id: header.indexOf('quest_id'),
    detalhe: header.indexOf('detalhe')
  };
  return data
    .filter(r => String(r[idx.aluno_id]) === String(alunoId) && String(r[idx.disciplina]) === disciplina)
    .map(r => ({ quest_id: String(r[idx.quest_id]), detalhe: idx.detalhe >= 0 ? String(r[idx.detalhe] || '') : '' }));
}

function findExistingSubmission_(disciplina, alunoId, questId) {
  return progressRows_(disciplina, alunoId).find(r => r.quest_id === questId) || null;
}

function doGet(e) {
  const action = e.parameter.action;
  const disciplina = e.parameter.disciplina;
  const alunoId = e.parameter.aluno_id;

  if (action === 'aluno') {
    const aluno = findAluno_(disciplina, alunoId);
    return jsonResponse_(aluno || { error: 'not_found' });
  }

  if (action === 'progress') {
    const questIds = progressRows_(disciplina, alunoId).map(r => r.quest_id);
    return jsonResponse_(questIds);
  }

  if (action === 'progress_detail') {
    return jsonResponse_(progressRows_(disciplina, alunoId));
  }

  return jsonResponse_({ error: 'unknown_action' });
}

// Narrow, guarded write path — called only by the quiz/challenge pages in puc_ia/quiz,
// puc_ia/desafios, puc_si/quiz and puc_si/desafios (see js/quest-submit.js). Expects a
// JSON body:
//   { disciplina, aluno_id, quest_id, detalhe }
// Sent as Content-Type: text/plain so the browser treats it as a CORS "simple request" and
// skips an OPTIONS preflight, which Apps Script Web Apps don't handle.
function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonResponse_({ error: 'invalid_body' });
  }

  const disciplina = body.disciplina;
  const alunoId = body.aluno_id;
  const questId = body.quest_id;
  const detalhe = body.detalhe || '';

  if (!disciplina || !alunoId || !questId) {
    return jsonResponse_({ error: 'missing_fields' });
  }

  const existing = findExistingSubmission_(disciplina, alunoId, questId);
  if (existing) {
    return jsonResponse_({ status: 'duplicate', detalhe: existing.detalhe });
  }

  const sheet = getSheet_('progress');
  if (!sheet) return jsonResponse_({ error: 'sheet_not_found' });
  sheet.appendRow([alunoId, disciplina, questId, new Date(), detalhe]);
  return jsonResponse_({ status: 'ok' });
}
