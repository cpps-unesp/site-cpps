const fs = require('fs');
const path = require('path');

const localesDir = path.join('src', 'i18n', 'locales');
const tinaPagesDir = path.join('src', 'content', 'tina-pages');

['pt', 'en', 'es'].forEach(lang => {
  const jsonPath = path.join(localesDir, `${lang}.json`);
  if (!fs.existsSync(jsonPath)) return;
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  
  // Extract sections
  const home = {
    titulo: data.titulo,
    descricao: data.descricao,
    identidade: data.identidade,
    hero: data.hero,
    atividadesPesquisa: data.atividadesPesquisa,
    produtos: data.produtos,
    faqs: data.faqs
  };
  const sobre = data.sobre || {};
  const equipe = data.equipe || {};
  const documentos = data.documentos || {};

  const writeJson = (folder, filename, content) => {
    const dir = path.join(tinaPagesDir, folder);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    // Remove undefined keys
    const cleanContent = JSON.parse(JSON.stringify(content));
    fs.writeFileSync(path.join(dir, filename), JSON.stringify(cleanContent, null, 2));
  };

  writeJson('home', `${lang}.json`, home);
  writeJson('sobre', `${lang}.json`, sobre);
  writeJson('equipe', `${lang}.json`, equipe);
  writeJson('documentos', `${lang}.json`, documentos);
  
  // Now remove from original data
  delete data.titulo;
  delete data.descricao;
  delete data.identidade;
  delete data.hero;
  delete data.atividadesPesquisa;
  delete data.produtos;
  delete data.faqs;
  delete data.sobre;
  delete data.equipe;
  delete data.documentos;
  
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
});

console.log("Migration complete!");
