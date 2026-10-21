(function () {
  var SHEET_URL = 'https://script.google.com/macros/s/AKfycbzUM2o_cwNwk6u0Wf5gQFN0mpCUwhjSYs6CIU6kVwpunllR_E9QzYJGPm26RUaFX_uS/exec';

  function classify(el) {
    var key = ((el.name || '') + ' ' + (el.id || '') + ' ' + (el.placeholder || '')).toLowerCase();
    if (el.type === 'email' || /e-?mail/.test(key)) return 'email';
    if (el.type === 'tel' || /mobile|phone|contact no/.test(key)) return 'mobile';
    if (el.tagName === 'SELECT' || /program|course/.test(key)) return 'program';
    if (el.tagName === 'TEXTAREA' || /message|query/.test(key)) return 'message';
    if (/name/.test(key)) return 'name';
    return 'other';
  }

  document.addEventListener('submit', function (ev) {
    var form = ev.target;
    if (!form || form.tagName !== 'FORM') return;

    var data = { page: location.href, name: '', mobile: '', email: '', program: '', message: '' };
    var other = [];

    form.querySelectorAll('input, select, textarea').forEach(function (el) {
      if (['submit', 'button', 'hidden', 'checkbox', 'radio'].indexOf(el.type) > -1) return;
      var v = (el.value || '').trim();
      if (!v) return;
      var k = classify(el);
      if (k === 'other') other.push((el.name || el.id || 'field') + ': ' + v);
      else data[k] = data[k] ? data[k] + ' | ' + v : v;
    });

    if (!data.name && !data.mobile) return;
    data.other = other.join('; ');

    fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true,
      body: new URLSearchParams(data)
    }).catch(function () {});
  }, true);
})();
