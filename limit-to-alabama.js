const fs = require('fs');
const path = require('path');

console.log('Limiting live city links to Alabama only (EN) and none (ES) for test phase...');

function processDir(baseDir, keepState) {
  if (!fs.existsSync(baseDir)) {
    console.log('Skip: ' + baseDir + ' not found.');
    return 0;
  }
  let fixed = 0;
  const categoryDirs = fs.readdirSync(baseDir).filter(f =>
    fs.statSync(path.join(baseDir, f)).isDirectory()
  );

  categoryDirs.forEach(function(catSlug) {
    const catPath = path.join(baseDir, catSlug);
    const stateDirs = fs.readdirSync(catPath).filter(f =>
      fs.statSync(path.join(catPath, f)).isDirectory()
    );

    stateDirs.forEach(function(stateSlug) {
      // If this state should KEEP its live links, skip it
      if (keepState && stateSlug === keepState) return;

      const filePath = path.join(catPath, stateSlug, 'index.html');
      if (!fs.existsSync(filePath)) return;

      let html = fs.readFileSync(filePath, 'utf8');
      const gridStart = html.indexOf('<div class="cities-grid">');
      if (gridStart === -1) return;
      const gridEnd = html.indexOf('</div>', gridStart) + '</div>'.length;
      const gridBlock = html.substring(gridStart, gridEnd);

      // Find any remaining live <a class="ccard"> links (the top 5)
      const linkRegex = /<a href="([^"]+)" class="ccard"><span class="ccard-name">([^<]+)<\/span><i class="fa-solid fa-chevron-right"><\/i><\/a>/g;
      let match;
      let changed = false;
      let newGrid = gridBlock;
      const soonLabel = baseDir.startsWith('es') ? 'Pronto' : 'Soon';

      while ((match = linkRegex.exec(gridBlock)) !== null) {
        changed = true;
        const replacement = '<div class="ccard ccard-soon"><span class="ccard-name">' + match[2] + '</span><span class="ccard-badge">' + soonLabel + '</span></div>';
        newGrid = newGrid.replace(match[0], replacement);
      }

      if (changed) {
        html = html.substring(0, gridStart) + newGrid + html.substring(gridEnd);
        fs.writeFileSync(filePath, html, 'utf8');
        fixed++;
      }
    });
  });
  return fixed;
}

const enFixed = processDir(path.join('en', 'personal-injury'), 'alabama');
const esFixed = processDir(path.join('es', 'personal-injury'), null);

console.log('EN: converted remaining live links to Soon in ' + enFixed + ' non-Alabama pages.');
console.log('ES: converted remaining live links to Soon in ' + esFixed + ' pages (no state kept live).');
console.log('Alabama EN pages kept with live top-5 city links.');