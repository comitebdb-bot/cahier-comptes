// Cache hors connexion du « Cahier des comptes ».
// Fichiers de l'application : réseau d'abord, cache si hors connexion (les mises à jour arrivent donc tout de suite).
// Bibliothèques (Firebase, lecture Excel, polices) : cache d'abord, ce sont des versions figées.
// Les échanges avec la base Firebase ne passent pas par ce cache : Firebase gère lui-même le hors connexion.
const CACHE="cahier-comptes-v10b";
const SHELL=["./","./index.html","./config.js","./manifest.webmanifest","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];
const LIBS=[
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js",
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js",
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js",
  "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"
];
const CDN=/^https:\/\/(www\.gstatic\.com\/firebasejs\/|cdnjs\.cloudflare\.com\/|fonts\.googleapis\.com\/|fonts\.gstatic\.com\/)/;
self.addEventListener("install",e=>{
  e.waitUntil(caches.open(CACHE).then(c=>Promise.allSettled(SHELL.concat(LIBS).map(u=>c.add(u)))).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",e=>{
  const r=e.request; if(r.method!=="GET")return;
  const u=new URL(r.url);
  if(u.origin===self.location.origin){
    e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp));}return res;})
      .catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||(r.mode==="navigate"?caches.match("./index.html"):null)).then(m=>m||Response.error())));
    return;
  }
  if(CDN.test(r.url)){
    e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok||res.type==="opaque"){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp));}return res;})));
  }
});
