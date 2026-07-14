const fs = require('fs');
const path = require('path');

console.log('Fixing "Nearby Alabama Cities" links to only reference the 5 real city pages...');

const categories = ['car-accident','truck-accident','motorcycle-accident','dog-bite','slip-and-fall','wrongful-death','medical-malpractice','uber-lyft-accident','birth-injury','brain-injury','bicycle-accident','bus-accident','pedestrian-accident','workplace-accident','construction-accident'];

// The only 5 cities that actually have generated pages
const realCities = [['Birmingham','birmingham'],['Montgomery','montgomery'],['Huntsville','huntsville'],['Mobile','mobile'],['Dothan','dothan']];

let fixed = 0;

categories.forEach(function(cat) {
  realCities.forEach(function(cityPair) {
    const citySlug = cityPair[1];
    const filePath = path.join('en', 'personal-injury', cat, 'alabama', citySlug, 'index.html');
    if (!fs.existsSync(filePath)) { return; }

    let html = fs.readFileSync(filePath, 'utf8');

    const start = html.indexOf('<div class="nearby">');
    if (start === -1) return;
    const end = html.indexOf('</div>', start) + '</div>'.length;

    // Build correct nearby links: the other 4 real cities (excluding current one)
    const others = realCities.filter(function(c) { return c[1] !== citySlug; });
    let newBlock = '<div class="nearby">\n      ';
    newBlock += others.map(function(c) {
      return '<a href="/en/personal-injury/' + cat + '/alabama/' + c[1] + '/"><i class="fa-solid fa-chevron-right"></i> ' + c[0] + '</a>';
    }).join('\n      ');
    newBlock += '\n      <a href="/en/personal-injury/' + cat + '/alabama/"><i class="fa-solid fa-chevron-right"></i> All Alabama Cities</a>\n    </div>';

    html = html.substring(0, start) + newBlock + html.substring(end);
    fs.writeFileSync(filePath, html, 'utf8');
    fixed++;
  });
});

console.log('Done! Fixed nearby-city links in ' + fixed + ' Alabama city pages.');