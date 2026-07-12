const fs = require('fs');
const path = require('path');

console.log('Starting page generation...');

const categories = [
  { slug: 'car-accident', title: 'Car Accident Lawyer', icon: 'fa-car-burst', keywords: 'car accident lawyer, auto accident attorney' },
  { slug: 'truck-accident', title: 'Truck Accident Lawyer', icon: 'fa-truck', keywords: 'truck accident lawyer, 18 wheeler attorney' },
  { slug: 'motorcycle-accident', title: 'Motorcycle Accident Lawyer', icon: 'fa-motorcycle', keywords: 'motorcycle accident lawyer, bike crash attorney' },
  { slug: 'dog-bite', title: 'Dog Bite Lawyer', icon: 'fa-paw', keywords: 'dog bite lawyer, animal attack attorney' },
  { slug: 'slip-and-fall', title: 'Slip and Fall Lawyer', icon: 'fa-person-falling', keywords: 'slip and fall lawyer, trip and fall attorney' },
  { slug: 'wrongful-death', title: 'Wrongful Death Lawyer', icon: 'fa-heart-crack', keywords: 'wrongful death lawyer, fatal accident attorney' },
  { slug: 'medical-malpractice', title: 'Medical Malpractice Lawyer', icon: 'fa-stethoscope', keywords: 'medical malpractice lawyer, doctor negligence attorney' },
  { slug: 'uber-lyft-accident', title: 'Uber Lyft Accident Lawyer', icon: 'fa-taxi', keywords: 'uber accident lawyer, lyft accident attorney' },
  { slug: 'birth-injury', title: 'Birth Injury Lawyer', icon: 'fa-baby', keywords: 'birth injury lawyer, cerebral palsy attorney' },
  { slug: 'brain-injury', title: 'Brain Injury Lawyer', icon: 'fa-brain', keywords: 'brain injury lawyer, TBI attorney' },
  { slug: 'bicycle-accident', title: 'Bicycle Accident Lawyer', icon: 'fa-bicycle', keywords: 'bicycle accident lawyer, cyclist injury attorney' },
  { slug: 'bus-accident', title: 'Bus Accident Lawyer', icon: 'fa-bus', keywords: 'bus accident lawyer, public bus attorney' },
  { slug: 'pedestrian-accident', title: 'Pedestrian Accident Lawyer', icon: 'fa-person-walking', keywords: 'pedestrian accident lawyer, hit by car attorney' },
  { slug: 'workplace-accident', title: 'Workplace Accident Lawyer', icon: 'fa-hard-hat', keywords: 'workplace accident lawyer, work injury attorney' },
  { slug: 'construction-accident', title: 'Construction Accident Lawyer', icon: 'fa-helmet-safety', keywords: 'construction accident lawyer, job site injury attorney' },
];

const states = [
  { slug: 'alabama', name: 'Alabama', fault: 'Contributory Negligence — even 1% fault may bar all recovery.', deadline: '2 years', insurance: '$25,000/$50,000', crashes: '150,000+', roads: 'I-65, Highway 280, Highway 431', cities: [['Birmingham','birmingham'],['Montgomery','montgomery'],['Huntsville','huntsville'],['Mobile','mobile'],['Dothan','dothan'],['Auburn','auburn'],['Tuscaloosa','tuscaloosa'],['Hoover','hoover'],['Madison','madison'],['Decatur','decatur'],['Gadsden','gadsden'],['Vestavia Hills','vestavia-hills'],['Prattville','prattville'],['Phenix City','phenix-city'],['Alabaster','alabaster'],['Bessemer','bessemer'],['Florence','florence'],['Homewood','homewood'],['Anniston','anniston'],['Northport','northport']] },
  { slug: 'arizona', name: 'Arizona', fault: 'Pure Comparative Fault — recover even if mostly at fault, reduced by percentage.', deadline: '2 years', insurance: '$25,000/$50,000', crashes: '120,000+', roads: 'I-10, I-17, US 60, SR 101', cities: [['Phoenix','phoenix'],['Tucson','tucson'],['Mesa','mesa'],['Chandler','chandler'],['Scottsdale','scottsdale'],['Glendale','glendale'],['Gilbert','gilbert'],['Tempe','tempe'],['Peoria','peoria'],['Surprise','surprise'],['Yuma','yuma'],['Avondale','avondale'],['Flagstaff','flagstaff'],['Goodyear','goodyear'],['Lake Havasu City','lake-havasu-city'],['Buckeye','buckeye'],['Casa Grande','casa-grande'],['Sierra Vista','sierra-vista'],['Maricopa','maricopa'],['Oro Valley','oro-valley']] },
  { slug: 'arkansas', name: 'Arkansas', fault: 'Modified Comparative Fault — recover if less than 50% at fault.', deadline: '3 years', insurance: '$25,000/$50,000', crashes: '65,000+', roads: 'I-40, I-30, US 67, Highway 412', cities: [['Little Rock','little-rock'],['Fort Smith','fort-smith'],['Fayetteville','fayetteville'],['Springdale','springdale'],['Jonesboro','jonesboro'],['North Little Rock','north-little-rock'],['Conway','conway'],['Rogers','rogers'],['Pine Bluff','pine-bluff'],['Bentonville','bentonville'],['Hot Springs','hot-springs'],['Benton','benton'],['Texarkana','texarkana'],['Sherwood','sherwood'],['Jacksonville','jacksonville'],['Russellville','russellville'],['Bella Vista','bella-vista'],['West Memphis','west-memphis'],['Paragould','paragould'],['Cabot','cabot']] },
  { slug: 'california', name: 'California', fault: 'Pure Comparative Fault — recover even if mostly at fault, reduced by percentage.', deadline: '2 years', insurance: '$15,000/$30,000', crashes: '500,000+', roads: 'I-5, I-405, Highway 101, Highway 99', cities: [['Los Angeles','los-angeles'],['San Diego','san-diego'],['San Jose','san-jose'],['San Francisco','san-francisco'],['Fresno','fresno'],['Sacramento','sacramento'],['Long Beach','long-beach'],['Oakland','oakland'],['Bakersfield','bakersfield'],['Anaheim','anaheim'],['Santa Ana','santa-ana'],['Riverside','riverside'],['Stockton','stockton'],['Irvine','irvine'],['Chula Vista','chula-vista'],['Fremont','fremont'],['San Bernardino','san-bernardino'],['Modesto','modesto'],['Fontana','fontana'],['Oxnard','oxnard']] },
  { slug: 'colorado', name: 'Colorado', fault: 'Modified Comparative Fault — recover if less than 50% at fault.', deadline: '3 years', insurance: '$25,000/$50,000', crashes: '120,000+', roads: 'I-25, I-70, US 36, Highway 285', cities: [['Denver','denver'],['Colorado Springs','colorado-springs'],['Aurora','aurora'],['Fort Collins','fort-collins'],['Lakewood','lakewood'],['Thornton','thornton'],['Arvada','arvada'],['Westminster','westminster'],['Pueblo','pueblo'],['Boulder','boulder'],['Highlands Ranch','highlands-ranch'],['Centennial','centennial'],['Greeley','greeley'],['Longmont','longmont'],['Loveland','loveland'],['Broomfield','broomfield'],['Castle Rock','castle-rock'],['Parker','parker'],['Commerce City','commerce-city'],['Northglenn','northglenn']] },
  { slug: 'florida', name: 'Florida', fault: 'Modified Comparative Fault — recover if less than 51% at fault. Florida is also a no-fault insurance state.', deadline: '2 years', insurance: '$10,000 PIP required', crashes: '400,000+', roads: 'I-95, I-4, Florida Turnpike, US 1', cities: [['Jacksonville','jacksonville'],['Miami','miami'],['Tampa','tampa'],['Orlando','orlando'],['St. Petersburg','st-petersburg'],['Hialeah','hialeah'],['Tallahassee','tallahassee'],['Fort Lauderdale','fort-lauderdale'],['Port St. Lucie','port-st-lucie'],['Cape Coral','cape-coral'],['Pembroke Pines','pembroke-pines'],['Hollywood','hollywood'],['Gainesville','gainesville'],['Miramar','miramar'],['Coral Springs','coral-springs'],['Miami Gardens','miami-gardens'],['Clearwater','clearwater'],['Palm Bay','palm-bay'],['Pompano Beach','pompano-beach'],['West Palm Beach','west-palm-beach']] },
  { slug: 'georgia', name: 'Georgia', fault: 'Modified Comparative Fault — recover if less than 50% at fault.', deadline: '2 years', insurance: '$25,000/$50,000', crashes: '380,000+', roads: 'I-285, I-75, I-85, US 78', cities: [['Atlanta','atlanta'],['Augusta','augusta'],['Columbus','columbus'],['Macon','macon'],['Savannah','savannah'],['Athens','athens'],['Sandy Springs','sandy-springs'],['South Fulton','south-fulton'],['Roswell','roswell'],['Johns Creek','johns-creek'],['Albany','albany'],['Warner Robins','warner-robins'],['Alpharetta','alpharetta'],['Marietta','marietta'],['Smyrna','smyrna'],['Valdosta','valdosta'],['Brookhaven','brookhaven'],['Dunwoody','dunwoody'],['Peachtree City','peachtree-city'],['Gainesville','gainesville']] },
  { slug: 'illinois', name: 'Illinois', fault: 'Modified Comparative Fault — recover if less than 51% at fault.', deadline: '2 years', insurance: '$25,000/$50,000', crashes: '300,000+', roads: 'I-90, I-94, I-55, I-290', cities: [['Chicago','chicago'],['Aurora','aurora'],['Joliet','joliet'],['Naperville','naperville'],['Rockford','rockford'],['Springfield','springfield'],['Elgin','elgin'],['Peoria','peoria'],['Champaign','champaign'],['Waukegan','waukegan'],['Cicero','cicero'],['Bloomington','bloomington'],['Arlington Heights','arlington-heights'],['Evanston','evanston'],['Decatur','decatur'],['Schaumburg','schaumburg'],['Bolingbrook','bolingbrook'],['Palatine','palatine'],['Skokie','skokie'],['Des Plaines','des-plaines']] },
  { slug: 'louisiana', name: 'Louisiana', fault: 'Pure Comparative Fault — recover even if mostly at fault, reduced by percentage.', deadline: '1 year', insurance: '$15,000/$30,000', crashes: '140,000+', roads: 'I-10, I-20, US 190, Highway 61', cities: [['New Orleans','new-orleans'],['Baton Rouge','baton-rouge'],['Shreveport','shreveport'],['Lafayette','lafayette'],['Lake Charles','lake-charles'],['Kenner','kenner'],['Bossier City','bossier-city'],['Monroe','monroe'],['Alexandria','alexandria'],['Prairieville','prairieville'],['Central','central'],['New Iberia','new-iberia'],['Houma','houma'],['Laplace','laplace'],['Slidell','slidell'],['Ruston','ruston'],['Sulphur','sulphur'],['Natchitoches','natchitoches'],['Mandeville','mandeville'],['Hammond','hammond']] },
  { slug: 'mississippi', name: 'Mississippi', fault: 'Pure Comparative Fault — recover even if mostly at fault, reduced by percentage.', deadline: '3 years', insurance: '$25,000/$50,000', crashes: '65,000+', roads: 'I-20, I-55, US 49, Highway 61', cities: [['Jackson','jackson'],['Gulfport','gulfport'],['Southaven','southaven'],['Hattiesburg','hattiesburg'],['Biloxi','biloxi'],['Olive Branch','olive-branch'],['Tupelo','tupelo'],['Meridian','meridian'],['Pearl','pearl'],['Madison','madison'],['Clinton','clinton'],['Brandon','brandon'],['Starkville','starkville'],['Ridgeland','ridgeland'],['Columbus','columbus'],['Vicksburg','vicksburg'],['Pascagoula','pascagoula'],['Greenville','greenville'],['Oxford','oxford'],['Gautier','gautier']] },
  { slug: 'missouri', name: 'Missouri', fault: 'Pure Comparative Fault — recover even if mostly at fault, reduced by percentage.', deadline: '5 years', insurance: '$25,000/$50,000', crashes: '140,000+', roads: 'I-70, I-44, I-55, US 40', cities: [['Kansas City','kansas-city'],['St. Louis','st-louis'],['Springfield','springfield'],['Columbia','columbia'],["Lee's Summit",'lees-summit'],["O'Fallon",'ofallon'],['St. Joseph','st-joseph'],['St. Charles','st-charles'],['Blue Springs','blue-springs'],['Joplin','joplin'],['Chesterfield','chesterfield'],['Jefferson City','jefferson-city'],['Cape Girardeau','cape-girardeau'],['Florissant','florissant'],['Independence','independence'],['Wentzville','wentzville'],['Liberty','liberty'],['St. Peters','st-peters'],['Ballwin','ballwin'],['Kirkwood','kirkwood']] },
  { slug: 'new-york', name: 'New York', fault: 'Pure Comparative Fault — recover even if mostly at fault. New York is also a no-fault insurance state.', deadline: '3 years', insurance: '$25,000/$50,000 plus $50,000 PIP', crashes: '300,000+', roads: 'I-495, I-87, Belt Parkway, Cross Bronx Expressway', cities: [['New York City','new-york-city'],['Buffalo','buffalo'],['Rochester','rochester'],['Yonkers','yonkers'],['Syracuse','syracuse'],['Albany','albany'],['New Rochelle','new-rochelle'],['Mount Vernon','mount-vernon'],['Schenectady','schenectady'],['Utica','utica'],['White Plains','white-plains'],['Troy','troy'],['Niagara Falls','niagara-falls'],['Binghamton','binghamton'],['Freeport','freeport'],['Valley Stream','valley-stream'],['Long Beach','long-beach'],['Spring Valley','spring-valley'],['Hempstead','hempstead'],['Levittown','levittown']] },
  { slug: 'north-carolina', name: 'North Carolina', fault: 'Contributory Negligence — even 1% fault may bar all recovery.', deadline: '3 years', insurance: '$30,000/$60,000', crashes: '280,000+', roads: 'I-85, I-40, I-77, US 74', cities: [['Charlotte','charlotte'],['Raleigh','raleigh'],['Greensboro','greensboro'],['Durham','durham'],['Winston-Salem','winston-salem'],['Fayetteville','fayetteville'],['Cary','cary'],['Wilmington','wilmington'],['High Point','high-point'],['Concord','concord'],['Greenville','greenville'],['Asheville','asheville'],['Gastonia','gastonia'],['Jacksonville','jacksonville'],['Chapel Hill','chapel-hill'],['Rocky Mount','rocky-mount'],['Burlington','burlington'],['Huntersville','huntersville'],['Wilson','wilson'],['Kannapolis','kannapolis']] },
  { slug: 'ohio', name: 'Ohio', fault: 'Modified Comparative Fault — recover if less than 51% at fault.', deadline: '2 years', insurance: '$25,000/$50,000', crashes: '300,000+', roads: 'I-71, I-75, I-70, Ohio Turnpike', cities: [['Columbus','columbus'],['Cleveland','cleveland'],['Cincinnati','cincinnati'],['Toledo','toledo'],['Akron','akron'],['Dayton','dayton'],['Parma','parma'],['Canton','canton'],['Youngstown','youngstown'],['Lorain','lorain'],['Hamilton','hamilton'],['Springfield','springfield'],['Kettering','kettering'],['Elyria','elyria'],['Newark','newark'],['Middletown','middletown'],['Cuyahoga Falls','cuyahoga-falls'],['Euclid','euclid'],['Mansfield','mansfield'],['Lakewood','lakewood']] },
  { slug: 'pennsylvania', name: 'Pennsylvania', fault: 'Modified Comparative Fault — recover if less than 51% at fault.', deadline: '2 years', insurance: '$15,000/$30,000', crashes: '120,000+', roads: 'Pennsylvania Turnpike, I-76, I-95, I-80', cities: [['Philadelphia','philadelphia'],['Pittsburgh','pittsburgh'],['Allentown','allentown'],['Erie','erie'],['Reading','reading'],['Scranton','scranton'],['Bethlehem','bethlehem'],['Lancaster','lancaster'],['Harrisburg','harrisburg'],['Altoona','altoona'],['York','york'],['Wilkes-Barre','wilkes-barre'],['Chester','chester'],['Norristown','norristown'],['State College','state-college'],['Williamsport','williamsport'],['Easton','easton'],['Lebanon','lebanon'],['Hazleton','hazleton'],['New Castle','new-castle']] },
  { slug: 'tennessee', name: 'Tennessee', fault: 'Modified Comparative Fault — recover if less than 50% at fault.', deadline: '1 year', insurance: '$25,000/$50,000', crashes: '180,000+', roads: 'I-40, I-24, I-65, US 70', cities: [['Memphis','memphis'],['Nashville','nashville'],['Knoxville','knoxville'],['Chattanooga','chattanooga'],['Clarksville','clarksville'],['Murfreesboro','murfreesboro'],['Franklin','franklin'],['Jackson','jackson'],['Johnson City','johnson-city'],['Bartlett','bartlett'],['Hendersonville','hendersonville'],['Kingsport','kingsport'],['Collierville','collierville'],['Smyrna','smyrna'],['Cleveland','cleveland'],['Brentwood','brentwood'],['Germantown','germantown'],['Columbia','columbia'],['Spring Hill','spring-hill'],['La Vergne','la-vergne']] },
  { slug: 'texas', name: 'Texas', fault: 'Modified Comparative Fault — recover if less than 51% at fault.', deadline: '2 years', insurance: '$30,000/$60,000', crashes: '500,000+', roads: 'I-35, I-10, I-45, Highway 290', cities: [['Houston','houston'],['San Antonio','san-antonio'],['Dallas','dallas'],['Austin','austin'],['Fort Worth','fort-worth'],['El Paso','el-paso'],['Arlington','arlington'],['Corpus Christi','corpus-christi'],['Plano','plano'],['Lubbock','lubbock'],['Irving','irving'],['Laredo','laredo'],['Garland','garland'],['Frisco','frisco'],['McKinney','mckinney'],['Amarillo','amarillo'],['Grand Prairie','grand-prairie'],['Brownsville','brownsville'],['Pasadena','pasadena'],['Mesquite','mesquite']] },
  { slug: 'virginia', name: 'Virginia', fault: 'Contributory Negligence — even 1% fault may bar all recovery.', deadline: '2 years', insurance: '$30,000/$60,000', crashes: '130,000+', roads: 'I-95, I-81, I-66, US 29', cities: [['Virginia Beach','virginia-beach'],['Norfolk','norfolk'],['Chesapeake','chesapeake'],['Richmond','richmond'],['Newport News','newport-news'],['Alexandria','alexandria'],['Hampton','hampton'],['Roanoke','roanoke'],['Portsmouth','portsmouth'],['Suffolk','suffolk'],['Lynchburg','lynchburg'],['Harrisonburg','harrisonburg'],['Charlottesville','charlottesville'],['Danville','danville'],['Manassas','manassas'],['Petersburg','petersburg'],['Fredericksburg','fredericksburg'],['Winchester','winchester'],['Salem','salem'],['Staunton','staunton']] },
  { slug: 'washington', name: 'Washington', fault: 'Pure Comparative Fault — recover even if mostly at fault, reduced by percentage.', deadline: '3 years', insurance: '$25,000/$50,000', crashes: '110,000+', roads: 'I-5, I-90, I-405, US 2', cities: [['Seattle','seattle'],['Spokane','spokane'],['Tacoma','tacoma'],['Vancouver','vancouver'],['Bellevue','bellevue'],['Kent','kent'],['Everett','everett'],['Renton','renton'],['Spokane Valley','spokane-valley'],['Kirkland','kirkland'],['Bellingham','bellingham'],['Kennewick','kennewick'],['Federal Way','federal-way'],['Yakima','yakima'],['Redmond','redmond'],['Marysville','marysville'],['Pasco','pasco'],['South Hill','south-hill'],['Shoreline','shoreline'],['Richland','richland']] },
  { slug: 'west-virginia', name: 'West Virginia', fault: 'Modified Comparative Fault — recover if less than 51% at fault.', deadline: '2 years', insurance: '$25,000/$50,000', crashes: '35,000+', roads: 'I-64, I-77, I-79, US 60', cities: [['Charleston','charleston'],['Huntington','huntington'],['Parkersburg','parkersburg'],['Morgantown','morgantown'],['Wheeling','wheeling'],['Weirton','weirton'],['Fairmont','fairmont'],['Martinsburg','martinsburg'],['Beckley','beckley'],['Clarksburg','clarksburg'],['South Charleston','south-charleston'],['St. Albans','st-albans'],['Vienna','vienna'],['Bluefield','bluefield'],['Moundsville','moundsville'],['Bridgeport','bridgeport'],['Oak Hill','oak-hill'],['Dunbar','dunbar'],['Elkins','elkins'],['Nitro','nitro']] },
];

let count = 0;

for (const state of states) {
  for (const cat of categories) {
    const dir = path.join('en', 'personal-injury', cat.slug, state.slug);
    fs.mkdirSync(dir, { recursive: true });

    const cityLinks = state.cities.map(([name, slug]) =>
      `    <a href="/en/personal-injury/${cat.slug}/${state.slug}/${slug}/" class="ccard"><span class="ccard-name">${name}</span><i class="fa-solid fa-chevron-right"></i></a>`
    ).join('\n');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${cat.title} in ${state.name} — Free Consultation | Lawvoo</title>
  <meta name="description" content="Find the best ${cat.title.toLowerCase()} in ${state.name}. ${state.name} attorneys fight for maximum compensation. Free consultation 24/7. No win no fee."/>
  <meta name="keywords" content="${cat.keywords}, ${cat.slug.replace(/-/g,' ')} lawyer ${state.name.toLowerCase()}, ${cat.slug.replace(/-/g,' ')} attorney ${state.name.toLowerCase()}"/>
  <meta name="robots" content="index, follow"/>
  <link rel="canonical" href="https://www.lawvoo.com/en/personal-injury/${cat.slug}/${state.slug}/"/>
  <meta property="og:title" content="${cat.title} in ${state.name} | Lawvoo"/>
  <meta property="og:description" content="Find the best ${cat.title.toLowerCase()} in ${state.name}. Free consultation 24/7."/>
  <meta property="og:url" content="https://www.lawvoo.com/en/personal-injury/${cat.slug}/${state.slug}/"/>
  <link rel="alternate" hreflang="en" href="https://www.lawvoo.com/en/personal-injury/${cat.slug}/${state.slug}/"/>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
  <style>
    :root{--navy:#0b1d35;--navy2:#122844;--gold:#c8922e;--gold2:#dba84a;--gold3:rgba(200,146,46,0.12);--white:#fff;--off:#f7f8fa;--border:#e4e8ef;--text:#1a2535;--muted:#5a6a7e;--light:#8796a8;--green:#15803d;--green-bg:rgba(21,128,61,0.1);}
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}html{font-size:16px;}body{font-family:"DM Sans",sans-serif;background:var(--white);color:var(--text);line-height:1.6;-webkit-font-smoothing:antialiased;}
    .nav{position:sticky;top:0;z-index:200;background:var(--navy);border-bottom:2px solid var(--gold);height:66px;display:flex;align-items:center;padding:0 2.5rem;gap:2rem;}.nav-logo{font-family:"Playfair Display",serif;font-size:1.75rem;font-weight:900;color:#fff;text-decoration:none;}.nav-logo em{color:var(--gold);font-style:normal;}.nav-links{display:flex;gap:1.8rem;margin-left:1rem;}.nav-links a{color:rgba(255,255,255,0.62);font-size:0.92rem;font-weight:500;text-decoration:none;transition:color .2s;white-space:nowrap;}.nav-links a:hover{color:var(--gold);}.nav-right{margin-left:auto;display:flex;align-items:center;gap:1rem;}.nav-call{background:var(--gold);color:var(--navy);font-weight:700;font-size:0.9rem;padding:0.55rem 1.25rem;border-radius:7px;text-decoration:none;display:flex;align-items:center;gap:0.45rem;}.nav-call:hover{background:var(--gold2);}
    .breadcrumb{background:var(--navy2);padding:0.7rem 2rem;}.breadcrumb p{max-width:1100px;margin:0 auto;font-size:0.82rem;color:rgba(255,255,255,0.4);}.breadcrumb a{color:var(--gold);text-decoration:none;}
    .hero{background:var(--navy);padding:5rem 2rem 4rem;position:relative;overflow:hidden;text-align:center;}.hero::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse 60% 70% at 15% 60%,rgba(200,146,46,0.07) 0%,transparent 60%);pointer-events:none;}.hero-wrap{max-width:900px;margin:0 auto;position:relative;z-index:1;}.hero-badge{display:inline-flex;align-items:center;gap:0.5rem;background:rgba(200,146,46,0.14);border:1px solid rgba(200,146,46,0.28);color:var(--gold2);font-size:0.82rem;font-weight:600;padding:0.38rem 1rem;border-radius:100px;margin-bottom:1.6rem;}.hero h1{font-family:"Playfair Display",serif;font-size:clamp(2rem,5vw,3.5rem);font-weight:900;color:#fff;line-height:1.1;margin-bottom:1rem;}.hero h1 em{color:var(--gold);font-style:normal;}.hero-sub{font-size:1.05rem;color:rgba(255,255,255,0.52);font-weight:300;max-width:580px;margin:0 auto 2.2rem;line-height:1.7;}.hero-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}.btn-gold{background:var(--gold);color:var(--navy);font-weight:700;padding:1rem 2rem;border-radius:9px;text-decoration:none;font-size:1rem;display:inline-flex;align-items:center;gap:0.5rem;transition:all .2s;}.btn-gold:hover{background:var(--gold2);}.btn-outline{background:rgba(255,255,255,0.08);color:#fff;font-weight:600;padding:1rem 2rem;border-radius:9px;text-decoration:none;font-size:1rem;border:1px solid rgba(255,255,255,0.2);}
    .stats-bar{background:var(--navy2);padding:1.5rem 2rem;}.stats-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;text-align:center;}.stat-num{font-family:"Playfair Display",serif;font-size:1.7rem;font-weight:700;color:var(--gold);display:block;}.stat-lbl{font-size:0.78rem;color:rgba(255,255,255,0.38);margin-top:0.2rem;}
    .section{max-width:1100px;margin:0 auto;padding:4.5rem 2rem;}.sec-tag{font-size:0.74rem;font-weight:700;color:var(--gold);text-transform:uppercase;letter-spacing:2px;margin-bottom:0.5rem;display:flex;align-items:center;gap:0.4rem;}.sec-title{font-family:"Playfair Display",serif;font-size:clamp(1.5rem,3vw,2.1rem);font-weight:700;color:var(--text);margin-bottom:0.7rem;line-height:1.2;}.sec-sub{font-size:0.98rem;color:var(--muted);font-weight:300;max-width:560px;margin-bottom:2.5rem;line-height:1.7;}
    .cities-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:0.65rem;}.ccard{background:#fff;border:1.5px solid var(--border);border-radius:10px;padding:0.8rem 1rem;text-decoration:none;display:flex;align-items:center;justify-content:space-between;transition:all .2s;}.ccard:hover{border-color:var(--gold);background:var(--gold3);}.ccard-name{font-size:0.9rem;font-weight:600;color:var(--text);}.ccard i{font-size:0.82rem;color:var(--gold);}
    .content-section{background:var(--off);padding:4.5rem 2rem;}.content-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start;}.content-text h2{font-family:"Playfair Display",serif;font-size:1.8rem;font-weight:700;color:var(--text);margin-bottom:1rem;line-height:1.3;}.content-text h3{font-family:"Playfair Display",serif;font-size:1.2rem;font-weight:700;color:var(--text);margin:1.5rem 0 0.6rem;}.content-text p{color:var(--muted);line-height:1.8;margin-bottom:1rem;font-size:0.97rem;font-weight:300;}.content-text strong{color:var(--text);font-weight:600;}.stat-cards{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}.stat-card{background:#fff;border:1.5px solid var(--border);border-radius:12px;padding:1.4rem;border-left:4px solid var(--gold);}.stat-card-num{font-family:"Playfair Display",serif;font-size:1.7rem;font-weight:700;color:var(--navy);}.stat-card-lbl{color:var(--muted);font-size:0.8rem;margin-top:0.3rem;font-weight:300;}
    .faq-section{background:var(--off);padding:4.5rem 2rem;}.faq-inner{max-width:900px;margin:0 auto;}.faq-list{display:flex;flex-direction:column;gap:0.9rem;}.faq-item{background:#fff;border:1.5px solid var(--border);border-radius:12px;overflow:hidden;}.faq-q{padding:1.2rem 1.5rem;font-weight:600;color:var(--text);font-size:0.97rem;cursor:pointer;display:flex;justify-content:space-between;align-items:center;transition:background .2s;}.faq-q:hover{background:var(--gold3);}.faq-q i{color:var(--gold);font-size:0.9rem;transition:transform .2s;flex-shrink:0;}.faq-a{padding:0 1.5rem 1.2rem;color:var(--muted);font-size:0.92rem;line-height:1.75;display:none;font-weight:300;}.faq-item.open .faq-a{display:block;}.faq-item.open .faq-q i{transform:rotate(45deg);}
    .cta-bg{background:var(--navy);padding:5rem 2rem;text-align:center;position:relative;}.cta-bg h2{font-family:"Playfair Display",serif;font-size:clamp(1.8rem,4vw,2.8rem);font-weight:700;color:#fff;margin-bottom:0.8rem;}.cta-bg p{color:rgba(255,255,255,0.45);font-size:0.98rem;margin-bottom:2rem;font-weight:300;}.cta-btn{display:inline-flex;align-items:center;gap:0.7rem;background:var(--gold);color:var(--navy);font-size:1.1rem;font-weight:700;padding:1.05rem 2.4rem;border-radius:10px;text-decoration:none;transition:all .2s;}.cta-btn:hover{background:var(--gold2);}.cta-note{color:rgba(255,255,255,0.2);font-size:0.75rem;margin-top:1rem;}
    footer{background:#060f1e;color:rgba(255,255,255,0.3);padding:3.5rem 2rem 2rem;}.footer-grid{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;margin-bottom:2.5rem;}.footer-logo{font-family:"Playfair Display",serif;font-size:1.4rem;font-weight:900;color:#fff;margin-bottom:0.7rem;}.footer-logo em{color:var(--gold);font-style:normal;}.footer-desc{font-size:0.82rem;line-height:1.7;font-weight:300;}.fcol h4{color:rgba(255,255,255,0.65);font-size:0.77rem;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:1rem;}.fcol ul{list-style:none;display:flex;flex-direction:column;gap:0.55rem;}.fcol ul li a{color:rgba(255,255,255,0.3);font-size:0.83rem;text-decoration:none;transition:color .2s;display:flex;align-items:center;gap:0.4rem;}.fcol ul li a:hover{color:var(--gold);}.footer-bottom{max-width:1100px;margin:0 auto;border-top:1px solid rgba(255,255,255,0.05);padding-top:1.4rem;font-size:0.77rem;text-align:center;}
    .float-call{position:fixed;bottom:1.5rem;right:1.5rem;z-index:999;}.float-btn{width:58px;height:58px;background:var(--gold);border-radius:50%;display:flex;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 8px 24px rgba(200,146,46,0.42);transition:all .2s;position:relative;}.float-btn i{font-size:1.25rem;color:var(--navy);}.float-btn:hover{transform:scale(1.1);}.float-dot{position:absolute;top:1px;right:1px;width:14px;height:14px;background:#22c55e;border-radius:50%;border:2px solid #060f1e;}
    @media(max-width:900px){.nav-links{display:none;}}@media(max-width:768px){.content-inner{grid-template-columns:1fr;}.footer-grid{grid-template-columns:1fr 1fr;}.stats-inner{grid-template-columns:repeat(2,1fr);}.hero{padding:3.5rem 1.5rem 3rem;}}@media(max-width:480px){.footer-grid{grid-template-columns:1fr;}.section{padding:3rem 1.5rem;}}
  </style>
</head>
<body>
<nav class="nav">
  <a href="/en/" class="nav-logo">Law<em>voo</em></a>
  <div class="nav-links">
    <a href="/en/personal-injury/">Personal Injury</a>
    <a href="/en/personal-injury/car-accident/">Car Accident</a>
    <a href="/en/personal-injury/truck-accident/">Truck Accident</a>
    <a href="/en/personal-injury/slip-and-fall/">Slip &amp; Fall</a>
    <a href="/en/personal-injury/wrongful-death/">Wrongful Death</a>
  </div>
  <div class="nav-right">
    <a href="tel:18005295866" class="nav-call"><i class="fa-solid fa-phone"></i> Free Call</a>
  </div>
</nav>
<div class="breadcrumb"><p><a href="/en/">Home</a> &rarr; <a href="/en/personal-injury/">Personal Injury</a> &rarr; <a href="/en/personal-injury/${cat.slug}/">${cat.title}</a> &rarr; ${state.name}</p></div>
<section class="hero">
  <div class="hero-wrap">
    <div class="hero-badge"><i class="fa-solid ${cat.icon}"></i> ${cat.title} — ${state.name}</div>
    <h1>${cat.title}<br/>in <em>${state.name}</em><br/>Free Consultation — No Win No Fee</h1>
    <p class="hero-sub">Looking for a ${cat.title.toLowerCase()} in ${state.name}? Our verified attorneys fight for maximum compensation. Free consultation 24/7.</p>
    <div class="hero-btns">
      <a href="tel:18005295866" class="btn-gold"><i class="fa-solid fa-phone"></i> Call Now — Free Consultation</a>
      <a href="#cities" class="btn-outline">Find by City <i class="fa-solid fa-arrow-down"></i></a>
    </div>
  </div>
</section>
<div class="stats-bar">
  <div class="stats-inner">
    <div><span class="stat-num">${state.crashes}</span><span class="stat-lbl">${state.name} Cases/Year</span></div>
    <div><span class="stat-num">${state.deadline}</span><span class="stat-lbl">Filing Deadline</span></div>
    <div><span class="stat-num">Free</span><span class="stat-lbl">Consultation</span></div>
    <div><span class="stat-num">24/7</span><span class="stat-lbl">Available Now</span></div>
  </div>
</div>
<div class="section" id="cities">
  <p class="sec-tag"><i class="fa-solid fa-location-dot"></i> Browse by City</p>
  <h2 class="sec-title">${cat.title} by City in ${state.name}</h2>
  <p class="sec-sub">Select your city to find experienced attorneys near you in ${state.name}.</p>
  <div class="cities-grid">
${cityLinks}
  </div>
</div>
<section class="content-section">
  <div class="content-inner">
    <div class="content-text">
      <p class="sec-tag"><i class="fa-solid fa-gavel"></i> ${state.name} Law</p>
      <h2>${cat.title} Laws in ${state.name}</h2>
      <h3>${state.name} Fault Law</h3>
      <p>${state.fault}</p>
      <h3>Filing Deadline in ${state.name}</h3>
      <p>You have <strong>${state.deadline}</strong> from the date of the incident to file a claim in ${state.name}. Missing this deadline means permanently losing your right to compensation.</p>
      <h3>${state.name} Insurance Requirements</h3>
      <p>${state.name} requires minimum liability insurance of <strong>${state.insurance}</strong>. Many drivers are uninsured — your attorney can identify all available compensation sources.</p>
      <h3>Most Dangerous Roads in ${state.name}</h3>
      <p>The most dangerous roads in ${state.name} include <strong>${state.roads}</strong>. These corridors account for a significant percentage of serious injury accidents in the state.</p>
    </div>
    <div class="stat-cards">
      <div class="stat-card"><div class="stat-card-num">${state.crashes}</div><div class="stat-card-lbl">Cases per year in ${state.name}</div></div>
      <div class="stat-card"><div class="stat-card-num">${state.deadline}</div><div class="stat-card-lbl">${state.name} filing deadline</div></div>
      <div class="stat-card"><div class="stat-card-num">$0</div><div class="stat-card-lbl">Upfront cost — contingency fee</div></div>
      <div class="stat-card"><div class="stat-card-num">33%</div><div class="stat-card-lbl">Fee only if you win</div></div>
    </div>
  </div>
</section>
<section class="faq-section">
  <div class="faq-inner">
    <p class="sec-tag"><i class="fa-solid fa-circle-question"></i> FAQ</p>
    <h2 class="sec-title">${cat.title} ${state.name} — FAQ</h2>
    <div class="faq-list">
      <div class="faq-item"><div class="faq-q" onclick="this.parentElement.classList.toggle('open')">What is ${state.name}'s fault law? <i class="fa-solid fa-plus"></i></div><div class="faq-a">${state.fault}</div></div>
      <div class="faq-item"><div class="faq-q" onclick="this.parentElement.classList.toggle('open')">How long do I have to file a claim in ${state.name}? <i class="fa-solid fa-plus"></i></div><div class="faq-a">You have ${state.deadline} from the date of the incident. Missing this deadline means permanently losing your right to compensation.</div></div>
      <div class="faq-item"><div class="faq-q" onclick="this.parentElement.classList.toggle('open')">How much does a ${cat.title.toLowerCase()} cost in ${state.name}? <i class="fa-solid fa-plus"></i></div><div class="faq-a">${state.name} attorneys work on contingency — only paid if you win. Typical fee is 33% of settlement. No upfront cost.</div></div>
      <div class="faq-item"><div class="faq-q" onclick="this.parentElement.classList.toggle('open')">Should I accept the insurance offer in ${state.name}? <i class="fa-solid fa-plus"></i></div><div class="faq-a">No — never accept without consulting an attorney. Insurance companies minimize payouts. Attorneys routinely negotiate 3-10x higher settlements.</div></div>
    </div>
  </div>
</section>
<section class="cta-bg">
  <h2>Need a ${cat.title} in ${state.name}?</h2>
  <p>Available 24/7 — speak to a ${state.name} expert instantly. No win, no fee — ever.</p>
  <a href="tel:18005295866" class="cta-btn"><i class="fa-solid fa-phone"></i> Call 1-800-LAWVOOS — Free</a>
  <p class="cta-note">* This is not legal advice. Lawvoo connects users with licensed attorneys.</p>
</section>
<footer>
  <div class="footer-grid">
    <div><div class="footer-logo">Law<em>voo</em></div><p class="footer-desc">Find verified personal injury lawyers across all 50 US states. Free consultation 24/7.</p></div>
    <div class="fcol"><h4>${state.name} Cities</h4><ul>${state.cities.slice(0,5).map(([c,s])=>`<li><a href="/en/personal-injury/${cat.slug}/${state.slug}/${s}/"><i class="fa-solid fa-chevron-right"></i> ${c}</a></li>`).join('')}</ul></div>
    <div class="fcol"><h4>Other States</h4><ul>
      <li><a href="/en/personal-injury/${cat.slug}/florida/"><i class="fa-solid fa-chevron-right"></i> Florida</a></li>
      <li><a href="/en/personal-injury/${cat.slug}/texas/"><i class="fa-solid fa-chevron-right"></i> Texas</a></li>
      <li><a href="/en/personal-injury/${cat.slug}/georgia/"><i class="fa-solid fa-chevron-right"></i> Georgia</a></li>
      <li><a href="/en/personal-injury/${cat.slug}/california/"><i class="fa-solid fa-chevron-right"></i> California</a></li>
    </ul></div>
    <div class="fcol"><h4>Company</h4><ul>
      <li><a href="/en/about.html"><i class="fa-solid fa-chevron-right"></i> About</a></li>
      <li><a href="/en/privacy-policy.html"><i class="fa-solid fa-chevron-right"></i> Privacy Policy</a></li>
      <li><a href="/en/disclaimer.html"><i class="fa-solid fa-chevron-right"></i> Disclaimer</a></li>
    </ul></div>
  </div>
  <div class="footer-bottom"><p>© 2025 Lawvoo.com — All Rights Reserved. Lawvoo is not a law firm.</p></div>
</footer>
<div class="float-call"><a href="tel:18005295866" class="float-btn"><i class="fa-solid fa-phone"></i><div class="float-dot"></div></a></div>
</body>
</html>`;

    fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
    count++;
  }
}

console.log('Done! Generated ' + count + ' state pages');