if ($('.-lucee-dump').length) {
  $('head').remove();
  var goToDump = setInterval(function() {
    window.scrollTo(0, $('.-lucee-dump').first().offset().top);
  }, 20);
  setTimeout(() => {
    clearInterval(gotodump)
  }, 1500);
}