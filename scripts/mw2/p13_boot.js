/* ============ BOOT ============ */
(function boot(){
  Store.load();
  Sfx.on = Store.data.settings.sound !== false;
  document.getElementById('splash-art').innerHTML = splashArt(120);
  const go = () => {
    Sfx.boot(); Sfx.click();
    const sp = document.getElementById('splash');
    sp.classList.add('off');
    setTimeout(() => sp.remove(), 700);
    Router.go('home');
    document.removeEventListener('pointerdown', go);
  };
  document.addEventListener('pointerdown', go);
  setTimeout(() => { if (document.getElementById('splash')) document.addEventListener('keydown', go, { once:true }); }, 600);
  /* safety: if user never clicks, still render after 30s? keep splash (audio unlock needs gesture) */
  window.addEventListener('error', e => { /* keep console clean-ish but don't hide bugs */ });
})();
