/* পুশ নোটিফিকেশন সার্ভিস ওয়ার্কার — index.html এর পাশে একই ফোল্ডারে রাখুন */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('push',e=>{
  let p={};try{p=e.data?e.data.json():{}}catch(x){}
  const d=p.data||{},n=p.notification||{};
  const title=d.title||n.title||'মাই ওয়ালেট',body=d.body||n.body||'';
  e.waitUntil(self.registration.showNotification(title,{body,tag:d.tag||undefined,icon:'icon-192.png',badge:'icon-192.png',data:{url:d.url||'./'}}));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  const url=(e.notification.data&&e.notification.data.url)||'./';
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{
    for(const c of l){if('focus' in c)return c.focus()}
    return self.clients.openWindow(url);
  }));
});
