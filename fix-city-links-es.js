const fs = require('fs');
const path = require('path');

console.log('Starting ES city link fix...');

const baseDir = path.join('es', 'personal-injury');

if (!fs.existsSync(baseDir)) {
  console.log('ERROR: es/personal-injury folder not found. Run this from your LAWVOO root folder.');
  process.exit(1);
}

let filesFixed = 0;
let filesSkipped = 0;

const categoryDirs = fs.readdirSync(baseDir).filter(f =>
  fs.statSync(path.join(baseDir, f)).isDirectory()
);

categoryDirs.forEach(function(catSlug) {
  const catPath = path.join(baseDir, catSlug);
  const stateDirs = fs.readdirSync(catPath).filter(f =>
    fs.statSync(path.join(catPath, f)).isDirectory()
  );

  stateDirs.forEach(function(stateSlug) {
    const filePath = path.join(catPath, stateSlug, 'index.html');
    if (!fs.existsSync(filePath)) return;

    let html = fs.readFileSync(filePath, 'utf8');

    const gridStart = html.indexOf('<div class="cities-grid">');
    if (gridStart === -1) { filesSkipped++; return; }

    const gridEnd = html.indexOf('</div>', gridStart) + '</div>'.length;
    const gridBlock = html.substring(gridStart, gridEnd);

    const linkRegex = /<a href="([^"]+)" class="ccard"><span class="ccard-name">([^<]+)<\/span><i class="fa-solid fa-chevron-right"><\/i><\/a>/g;
    let match;
    const cities = [];
    while ((match = linkRegex.exec(gridBlock)) !== null) {
      cities.push({ href: match[1], name: match[2] });
    }

    if (cities.length === 0) { filesSkipped++; return; }

    let newGrid = '<div class="cities-grid">\n';
    cities.forEach(function(city, i) {
      if (i < 5) {
        newGrid += '    <a href="' + city.href + '" class="ccard"><span class="ccard-name">' + city.name + '</span><i class="fa-solid fa-chevron-right"></i></a>\n';
      } else {
        newGrid += '    <div class="ccard ccard-soon"><span class="ccard-name">' + city.name + '</span><span class="ccard-badge">Pronto</span></div>\n';
      }
    });
    newGrid += '  </div>';

    html = html.substring(0, gridStart) + newGrid + html.substring(gridEnd);

    if (html.indexOf('.ccard-soon') === -1) {
      html = html.replace(
        '.ccard i{font-size:0.82rem;color:var(--gold);}',
        '.ccard i{font-size:0.82rem;color:var(--gold);}.ccard-soon{opacity:0.55;cursor:default;}.ccard-badge{font-size:0.65rem;background:var(--off);color:var(--muted);padding:0.15rem 0.5rem;border-radius:100px;font-weight:600;}'
      );
    }

    fs.writeFileSync(filePath, html, 'utf8');
    filesFixed++;
  });
});

console.log('Done! Fixed ' + filesFixed + ' ES state pages. Skipped ' + filesSkipped + '.');