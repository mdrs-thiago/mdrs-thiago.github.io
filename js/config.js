// Infrastructure config, kept separate from content data (disciplinas-data.js).
// See docs/gamification-setup.md for how to obtain this URL.
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxylMJZhP9OaG_9g_6qTPRB7vFAxH8XCizTtG3PPMHkiRdtSh0oa1xq8nb3D07LQg6BfA/exec'; 

// Public Google Sheet with the "Orientação" and "Eventos" tabs. The home page reads it
// live, so editing the sheet updates the site; site-data.js keeps a fallback snapshot.
const CONTENT_SHEET_ID = '1Z9vLXpfm03xR6kg_vjZN7rCq-PLwQVJM5Lcc90vTSic';
