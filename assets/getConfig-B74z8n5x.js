const o=()=>fetch("/config.json").then(t=>{if(!t.ok)throw new Error(`Failed to load config: ${t.statusText}`);return t.json()}).then(t=>t);export{o as g};
