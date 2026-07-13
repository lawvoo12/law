const fs = require('fs');
const path = require('path');

console.log('Generating Alabama city pages (top 5 cities x 15 categories = 75 pages)...');

const categories = [
  { slug: 'car-accident', title: 'Car Accident Lawyer', icon: 'fa-car-burst' },
  { slug: 'truck-accident', title: 'Truck Accident Lawyer', icon: 'fa-truck' },
  { slug: 'motorcycle-accident', title: 'Motorcycle Accident Lawyer', icon: 'fa-motorcycle' },
  { slug: 'dog-bite', title: 'Dog Bite Lawyer', icon: 'fa-paw' },
  { slug: 'slip-and-fall', title: 'Slip and Fall Lawyer', icon: 'fa-person-falling' },
  { slug: 'wrongful-death', title: 'Wrongful Death Lawyer', icon: 'fa-heart-crack' },
  { slug: 'medical-malpractice', title: 'Medical Malpractice Lawyer', icon: 'fa-stethoscope' },
  { slug: 'uber-lyft-accident', title: 'Uber Lyft Accident Lawyer', icon: 'fa-taxi' },
  { slug: 'birth-injury', title: 'Birth Injury Lawyer', icon: 'fa-baby' },
  { slug: 'brain-injury', title: 'Brain Injury Lawyer', icon: 'fa-brain' },
  { slug: 'bicycle-accident', title: 'Bicycle Accident Lawyer', icon: 'fa-bicycle' },
  { slug: 'bus-accident', title: 'Bus Accident Lawyer', icon: 'fa-bus' },
  { slug: 'pedestrian-accident', title: 'Pedestrian Accident Lawyer', icon: 'fa-person-walking' },
  { slug: 'workplace-accident', title: 'Workplace Accident Lawyer', icon: 'fa-hard-hat' },
  { slug: 'construction-accident', title: 'Construction Accident Lawyer', icon: 'fa-helmet-safety' },
];

const cities = [
  {
    name: 'Birmingham', slug: 'birmingham', county: 'Jefferson County',
    highways: 'Interstate 65, Interstate 20/59, and US Highway 280',
    hospital: 'UAB Hospital, a Level I trauma center',
    court: 'Jefferson County Circuit Court',
    nearby: [['Montgomery','montgomery'],['Huntsville','huntsville'],['Mobile','mobile'],['Tuscaloosa','tuscaloosa']]
  },
  {
    name: 'Montgomery', slug: 'montgomery', county: 'Montgomery County',
    highways: 'Interstate 65 and US Highway 231',
    hospital: 'Baptist Medical Center South',
    court: 'Montgomery County Circuit Court',
    nearby: [['Birmingham','birmingham'],['Huntsville','huntsville'],['Mobile','mobile'],['Auburn','auburn']]
  },
  {
    name: 'Huntsville', slug: 'huntsville', county: 'Madison County',
    highways: 'Interstate 565 and US Highway 72',
    hospital: 'Huntsville Hospital, a Level I trauma center',
    court: 'Madison County Circuit Court',
    nearby: [['Birmingham','birmingham'],['Montgomery','montgomery'],['Decatur','decatur'],['Madison','madison']]
  },
  {
    name: 'Mobile', slug: 'mobile', county: 'Mobile County',
    highways: 'Interstate 10 and Interstate 65',
    hospital: 'USA Health University Hospital, a Level I trauma center',
    court: 'Mobile County Circuit Court',
    nearby: [['Birmingham','birmingham'],['Montgomery','montgomery'],['Dothan','dothan'],['Bessemer','bessemer']]
  },
  {
    name: 'Dothan', slug: 'dothan', county: 'Houston County',
    highways: 'US Highway 84 and US Highway 231',
    hospital: 'Southeast Health Medical Center',
    court: 'Houston County Circuit Court',
    nearby: [['Montgomery','montgomery'],['Mobile','mobile'],['Auburn','auburn'],['Phenix City','phenix-city']]
  },
];

function esc(s) { return s.replace(/"/g, '&quot;'); }

let count = 0;

categories.forEach(function(cat) {
  cities.forEach(function(city) {
    const dir = path.join('en', 'personal-injury', cat.slug, 'alabama', city.slug);
    fs.mkdirSync(dir, { recursive: true });

    const nearbyLinks = city.nearby.map(function(n) {
      return '<a href="/en/personal-injury/' + cat.slug + '/alabama/' + n[1] + '/"><i class="fa-solid fa-chevron-right"></i> ' + n[0] + '</a>';
    }).join('\n      ');

    const parts = [];
    parts.push('<!DOCTYPE html>');
    parts.push('<html lang="en">');
    parts.push('<head>');
    parts.push('<meta charset="UTF-8"/>');
    parts.push('<meta name="viewport" content="width=device-width, initial-scale=1.0"/>');
    parts.push('<title>' + cat.title + ' in ' + city.name + ', Alabama — Free Consultation | Lawvoo</title>');
    parts.push('<meta name="description" content="Find the best ' + cat.title.toLowerCase() + ' in ' + city.name + ', Alabama. Local attorneys familiar with ' + city.county + '. Free consultation 24/7. No win no fee."/>');
    parts.push('<meta name="keywords" content="' + cat.title.toLowerCase() + ' ' + city.name.toLowerCase() + ', ' + cat.title.toLowerCase() + ' ' + city.name.toLowerCase() + ' alabama, ' + cat.slug.replace(/-/g,' ') + ' attorney ' + city.name.toLowerCase() + '"/>');
    parts.push('<meta name="robots" content="index, follow"/>');
    parts.push('<link rel="canonical" href="https://www.lawvoo.com/en/personal-injury/' + cat.slug + '/alabama/' + city.slug + '/"/>');
    parts.push('<meta property="og:title" content="' + cat.title + ' in ' + city.name + ', Alabama | Lawvoo"/>');
    parts.push('<meta property="og:description" content="Find the best ' + cat.title.toLowerCase() + ' in ' + city.name + ', Alabama. Free consultation 24/7."/>');
    parts.push('<meta property="og:url" content="https://www.lawvoo.com/en/personal-injury/' + cat.slug + '/alabama/' + city.slug + '/"/>');
    parts.push('<link rel="alternate" hreflang="en" href="https://www.lawvoo.com/en/personal-injury/' + cat.slug + '/alabama/' + city.slug + '/"/>');
    parts.push('<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap" rel="stylesheet"/>');
    parts.push('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>');
    parts.push('<style>:root{--navy:#0b1d35;--navy2:#122844;--gold:#c8922e;--gold2:#dba84a;--gold3:rgba(200,146,46,0.12);--white:#fff;--off:#f7f8fa;--border:#e4e8ef;--text:#1a2535;--muted:#5a6a7e;}*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}body{font-family:"DM Sans",sans-serif;background:var(--white);color:var(--text);line-height:1.6;}.nav{position:sticky;top:0;z-index:200;background:var(--navy);border-bottom:2px solid var(--gold);height:66px;display:flex;align-items:center;padding:0 2.5rem;gap:2rem;}.nav-logo{font-family:"Playfair Display",serif;font-size:1.75rem;font-weight:900;color:#fff;text-decoration:none;}.nav-logo em{color:var(--gold);font-style:normal;}.nav-right{margin-left:auto;}.nav-call{background:var(--gold);color:var(--navy);font-weight:700;font-size:0.9rem;padding:0.55rem 1.25rem;border-radius:7px;text-decoration:none;display:flex;align-items:center;gap:0.45rem;}.breadcrumb{background:var(--navy2);padding:0.7rem 2rem;}.breadcrumb p{max-width:1100px;margin:0 auto;font-size:0.8rem;color:rgba(255,255,255,0.4);}.breadcrumb a{color:var(--gold);text-decoration:none;}.hero{background:var(--navy);padding:4.5rem 2rem 3.5rem;text-align:center;}.hero-badge{display:inline-flex;align-items:center;gap:0.5rem;background:rgba(200,146,46,0.14);border:1px solid rgba(200,146,46,0.28);color:var(--gold2);font-size:0.8rem;font-weight:600;padding:0.35rem 1rem;border-radius:100px;margin-bottom:1.4rem;}.hero h1{font-family:"Playfair Display",serif;font-size:clamp(1.8rem,4.5vw,3rem);font-weight:900;color:#fff;line-height:1.15;margin-bottom:1rem;}.hero h1 em{color:var(--gold);font-style:normal;}.hero-sub{font-size:0.98rem;color:rgba(255,255,255,0.52);max-width:600px;margin:0 auto 1.8rem;}.hero-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}.btn-gold{background:var(--gold);color:var(--navy);font-weight:700;padding:0.95rem 1.9rem;border-radius:9px;text-decoration:none;font-size:0.98rem;display:inline-flex;align-items:center;gap:0.5rem;}.stats-bar{background:var(--navy2);padding:1.3rem 2rem;}.stats-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;text-align:center;}.stat-num{font-family:"Playfair Display",serif;font-size:1.4rem;font-weight:700;color:var(--gold);display:block;}.stat-lbl{font-size:0.74rem;color:rgba(255,255,255,0.38);margin-top:0.2rem;}.section{max-width:1100px;margin:0 auto;padding:3.5rem 2rem;}.sec-tag{font-size:0.72rem;font-weight:700;color:var(--gold);text-transform:uppercase;letter-spacing:2px;margin-bottom:0.5rem;}.sec-title{font-family:"Playfair Display",serif;font-size:clamp(1.4rem,3vw,1.9rem);font-weight:700;color:var(--text);margin-bottom:0.6rem;}.sec-sub{font-size:0.93rem;color:var(--muted);margin-bottom:1.8rem;}.content-section{background:var(--off);padding:3.5rem 2rem;}.content-inner{max-width:1100px;margin:0 auto;}.content-text h2{font-family:"Playfair Display",serif;font-size:1.55rem;font-weight:700;color:var(--text);margin-bottom:0.9rem;}.content-text h3{font-family:"Playfair Display",serif;font-size:1.05rem;font-weight:700;color:var(--text);margin:1.1rem 0 0.5rem;}.content-text p{color:var(--muted);line-height:1.85;margin-bottom:0.85rem;font-size:0.94rem;}.content-text strong{color:var(--text);font-weight:600;}.faq-section{padding:3.5rem 2rem;}.faq-inner{max-width:900px;margin:0 auto;}.faq-list{display:flex;flex-direction:column;gap:0.75rem;}.faq-item{background:#fff;border:1.5px solid var(--border);border-radius:12px;overflow:hidden;}.faq-q{padding:1.05rem 1.35rem;font-weight:600;color:var(--text);font-size:0.92rem;cursor:pointer;display:flex;justify-content:space-between;align-items:center;}.faq-q i{color:var(--gold);transition:transform .2s;}.faq-a{padding:0 1.35rem 1.05rem;color:var(--muted);font-size:0.88rem;line-height:1.7;display:none;}.faq-item.open .faq-a{display:block;}.faq-item.open .faq-q i{transform:rotate(45deg);}.nearby{display:flex;flex-wrap:wrap;gap:0.7rem;}.nearby a{background:#fff;border:1.5px solid var(--border);border-radius:9px;padding:0.6rem 1rem;text-decoration:none;color:var(--text);font-size:0.86rem;font-weight:600;display:flex;align-items:center;gap:0.4rem;}.nearby a:hover{border-color:var(--gold);background:var(--gold3);}.nearby i{color:var(--gold);font-size:0.75rem;}.lawyers-section{padding:3.5rem 2rem;background:var(--off);}.lawyers-inner{max-width:1100px;margin:0 auto;}.lawyers-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.1rem;}.cta-bg{background:var(--navy);padding:3.5rem 2rem;text-align:center;}.cta-bg h2{font-family:"Playfair Display",serif;font-size:clamp(1.5rem,3.5vw,2.2rem);font-weight:700;color:#fff;margin-bottom:0.6rem;}.cta-bg p{color:rgba(255,255,255,0.45);margin-bottom:1.6rem;font-size:0.93rem;}.cta-btn{display:inline-flex;align-items:center;gap:0.6rem;background:var(--gold);color:var(--navy);font-size:0.98rem;font-weight:700;padding:0.95rem 1.9rem;border-radius:10px;text-decoration:none;}.cta-note{color:rgba(255,255,255,0.2);font-size:0.73rem;margin-top:0.9rem;}footer{background:#060f1e;color:rgba(255,255,255,0.3);padding:2.8rem 2rem 1.8rem;}.footer-inner{max-width:1100px;margin:0 auto;}.footer-logo{font-family:"Playfair Display",serif;font-size:1.25rem;font-weight:900;color:#fff;margin-bottom:0.5rem;}.footer-logo em{color:var(--gold);font-style:normal;}.footer-bottom{border-top:1px solid rgba(255,255,255,0.05);padding-top:1.1rem;font-size:0.75rem;text-align:center;margin-top:1.3rem;}.float-call{position:fixed;bottom:1.5rem;right:1.5rem;z-index:999;}.float-btn{width:54px;height:54px;background:var(--gold);border-radius:50%;display:flex;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 8px 24px rgba(200,146,46,0.42);}.float-btn i{font-size:1.15rem;color:var(--navy);}@media(max-width:768px){.stats-inner{grid-template-columns:repeat(3,1fr);}}</style>');
    parts.push('</head>');
    parts.push('<body>');
    parts.push('<nav class="nav"><a href="/en/" class="nav-logo">Law<em>voo</em></a><div class="nav-right"><a href="tel:18005295866" class="nav-call"><i class="fa-solid fa-phone"></i> Free Call</a></div></nav>');
    parts.push('<div class="breadcrumb"><p><a href="/en/">Home</a> &rarr; <a href="/en/personal-injury/">Personal Injury</a> &rarr; <a href="/en/personal-injury/' + cat.slug + '/">' + cat.title + '</a> &rarr; <a href="/en/personal-injury/' + cat.slug + '/alabama/">Alabama</a> &rarr; ' + city.name + '</p></div>');
    parts.push('<section class="hero"><div class="hero-badge"><i class="fa-solid ' + cat.icon + '"></i> ' + cat.title + ' — ' + city.name + ', Alabama</div><h1>' + cat.title + '<br/>in <em>' + city.name + ', Alabama</em></h1><p class="hero-sub">Injured in ' + city.name + '? Our network of local attorneys, familiar with ' + city.county + ' courts, is ready to help. Free consultation 24/7. No win, no fee.</p><div class="hero-btns"><a href="tel:18005295866" class="btn-gold"><i class="fa-solid fa-phone"></i> Call Now — Free Consultation</a></div></section>');
    parts.push('<div class="stats-bar"><div class="stats-inner"><div><span class="stat-num">2 Years</span><span class="stat-lbl">AL Filing Deadline</span></div><div><span class="stat-num">Free</span><span class="stat-lbl">Consultation</span></div><div><span class="stat-num">24/7</span><span class="stat-lbl">Available Now</span></div></div></div>');

    parts.push('<section class="content-section"><div class="content-inner"><div class="content-text">');
    parts.push('<h2>' + cat.title + ' Serving ' + city.name + ', Alabama</h2>');
    parts.push('<h3>Local Knowledge Matters in ' + city.name + '</h3>');
    parts.push('<p>' + city.name + ' is located in <strong>' + city.county + '</strong> and is served primarily by <strong>' + city.highways + '</strong>, corridors that see a significant share of the regions serious traffic incidents. A ' + cat.title.toLowerCase() + ' who regularly handles cases in ' + city.name + ' will be familiar with local traffic patterns, common accident locations, and how claims are typically handled in this part of Alabama.</p>');
    parts.push('<h3>Medical Care and Documentation in ' + city.name + '</h3>');
    parts.push('<p>Serious injuries from ' + city.name + ' are often treated at <strong>' + city.hospital + '</strong>. Prompt, well documented medical treatment is one of the most important factors in building a strong injury claim, and your attorney can help ensure your medical records properly reflect the full extent of your injuries.</p>');
    parts.push('<h3>Where Your Case Will Be Handled</h3>');
    parts.push('<p>Claims arising in ' + city.name + ' typically fall under the jurisdiction of the <strong>' + city.court + '</strong>. An attorney familiar with this court and local procedures can help your case move efficiently while protecting your right to full compensation.</p>');
    parts.push('<h3>Alabamas Contributory Negligence Rule</h3>');
    parts.push('<p>Remember that Alabama follows a strict contributory negligence rule. If you are found even 1% at fault, you may be barred from recovering compensation. This makes it especially important to have an experienced attorney representing you in ' + city.name + '.</p>');
    parts.push('</div></div></section>');

    parts.push('<section class="lawyers-section"><div class="lawyers-inner"><p class="sec-tag"><i class="fa-solid fa-user-tie"></i> Verified Attorneys</p><h2 class="sec-title">' + cat.title + 's Serving ' + city.name + '</h2><p class="sec-sub">Free consultation. Connect with an attorney familiar with ' + city.name + ' and ' + city.county + '.</p><div class="lawyers-grid" id="lawyerGrid"></div></div></section>');

    parts.push('<section class="faq-section"><div class="faq-inner"><p class="sec-tag">FAQ</p><h2 class="sec-title">' + cat.title + ' ' + city.name + ', Alabama FAQ</h2><div class="faq-list">');
    parts.push('<div class="faq-item"><div class="faq-q" onclick="this.parentElement.classList.toggle(&quot;open&quot;)">Which court handles injury cases from ' + city.name + '? <i class="fa-solid fa-plus"></i></div><div class="faq-a">Cases arising in ' + city.name + ' are generally handled by the ' + city.court + '. Your attorney will be familiar with local filing procedures.</div></div>');
    parts.push('<div class="faq-item"><div class="faq-q" onclick="this.parentElement.classList.toggle(&quot;open&quot;)">What is the filing deadline in ' + city.name + '? <i class="fa-solid fa-plus"></i></div><div class="faq-a">Alabama has a 2 year statute of limitations for personal injury claims. Under Alabamas contributory negligence rule, delays can also make it harder to establish fault, so contact an attorney promptly.</div></div>');
    parts.push('<div class="faq-item"><div class="faq-q" onclick="this.parentElement.classList.toggle(&quot;open&quot;)">How much does a ' + cat.title.toLowerCase() + ' cost in ' + city.name + '? <i class="fa-solid fa-plus"></i></div><div class="faq-a">Attorneys serving ' + city.name + ' typically work on contingency. No upfront cost, and fees are only owed if you recover compensation.</div></div>');
    parts.push('</div></div></section>');

    parts.push('<section class="section"><p class="sec-tag">Nearby Alabama Cities</p><h2 class="sec-title">' + cat.title + ' in Other Alabama Cities</h2><div class="nearby">');
    parts.push(nearbyLinks);
    parts.push('<a href="/en/personal-injury/' + cat.slug + '/alabama/"><i class="fa-solid fa-chevron-right"></i> All Alabama Cities</a>');
    parts.push('</div></section>');

    parts.push('<section class="cta-bg"><h2>Injured in ' + city.name + '? Call Now, Free</h2><p>Available 24/7. Attorneys familiar with ' + city.name + ' and ' + city.county + '. No win, no fee, ever.</p><a href="tel:18005295866" class="cta-btn"><i class="fa-solid fa-phone"></i> Call 1-800-LAWVOOS, Free</a><p class="cta-note">* This is not legal advice. Lawvoo connects users with licensed attorneys.</p></section>');

    parts.push('<footer><div class="footer-inner"><div class="footer-logo">Law<em>voo</em></div><p style="font-size:0.8rem;margin-bottom:0.9rem;">Find verified personal injury lawyers across all 50 US states.</p><div class="footer-bottom"><p>© 2025 Lawvoo.com. All Rights Reserved. Lawvoo is not a law firm.</p></div></div></footer>');
    parts.push('<div class="float-call"><a href="tel:18005295866" class="float-btn"><i class="fa-solid fa-phone"></i></a></div>');

    parts.push('<script>');
    parts.push('var CITY_NAME = ' + JSON.stringify(city.name) + ';');
    parts.push('fetch("../../../../../data/lawyer.json").then(function(r){return r.json();}).then(function(data){');
    parts.push('  var l = data.filter(function(x){return x.category === "Personal Injury";});');
    parts.push('  document.getElementById("lawyerGrid").innerHTML = l.length ? "" : "<p style=\\"grid-column:1/-1;color:#5a6a7e;font-size:0.9rem;\\">Verified attorneys serving " + CITY_NAME + " are being added. Call now and we will connect you with a licensed attorney.</p>";');
    parts.push('}).catch(function(){');
    parts.push('  document.getElementById("lawyerGrid").innerHTML = "<p style=\\"grid-column:1/-1;color:#5a6a7e;font-size:0.9rem;\\">Call now and we will connect you with a licensed attorney serving " + CITY_NAME + ".</p>";');
    parts.push('});');
    parts.push('</script>');
    parts.push('</body>');
    parts.push('</html>');

    const html = parts.join('\n');
    fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
    count++;
  });
});

console.log('Done! Generated ' + count + ' Alabama city pages (5 cities x 15 categories).');