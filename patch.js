const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public', 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// Fix GET caching by appending timestamp
content = content.replace(
  "async getDefects(){const r=await fetch('/api/defects');return(await r.json()).data||[];}",
  "async getDefects(){const r=await fetch('/api/defects?t='+Date.now());return(await r.json()).data||[];}"
);

content = content.replace(
  "async getStats(){const r=await fetch('/api/stats');return(await r.json()).data;}",
  "async getStats(){const r=await fetch('/api/stats?t='+Date.now());return(await r.json()).data;}"
);

// Remove confirm() from del() function
content = content.replace(
  "async function del(){if(!confirm('Delete this defect?'))return;",
  "async function del(){"
);

// Form submit animation bug fix:
// when switching to dashboard, we shouldn't animate 'body' opacity to 0.9 and back to 1. 
// Just switch directly to avoid GSAP sticking inline styles
content = content.replace(
  "function switchv(v){s.v=v;s.load=1;gsap.to('body',{duration:0.3,opacity:0.9,onComplete:()=>{load();}});}",
  "function switchv(v){s.v=v;s.load=1;load();}"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully patched index.html');
