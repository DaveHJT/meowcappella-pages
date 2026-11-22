// 只显示一种语言：先看 ?lang=zh|en，再看上次点的，最后看浏览器语言。没有脚本时两种都显示。
(function () {
  var d = document.documentElement, q = new URLSearchParams(location.search).get('lang'), saved = null;
  try { saved = localStorage.getItem('mc-site-lang'); } catch (e) {}
  var lang = q === 'zh' || q === 'en' ? q : saved === 'zh' || saved === 'en' ? saved : /^zh/i.test(navigator.language || '') ? 'zh' : 'en';
  function show(l) {
    d.classList.add('js'); d.classList.toggle('show-en', l === 'en'); d.classList.toggle('show-zh', l === 'zh');
    d.lang = l === 'en' ? 'en' : 'zh-CN';
    var t = d.getAttribute('data-title-' + l); if (t) document.title = t;
    document.querySelectorAll('.langs button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === l)); });
  }
  show(lang);
  document.addEventListener('DOMContentLoaded', function () {
    show(lang);
    document.querySelectorAll('.langs button').forEach(function (b) {
      b.addEventListener('click', function () { lang = b.dataset.lang; try { localStorage.setItem('mc-site-lang', lang); } catch (e) {} show(lang); });
    });
  });
})();
