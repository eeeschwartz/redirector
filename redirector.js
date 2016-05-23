(function() {
  var lib = {
    param: function(name) {
      var url = window.location.href;
      var name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
      var results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    },
    width: function() {
      // vanilla JS window width and height
      var w=window,
      d=document,
      e=d.documentElement,
      g=d.getElementsByTagName('body')[0],
      x=w.innerWidth||e.clientWidth||g.clientWidth;
      return x;
    },
  }

  var redirector = {
    maxWidth: 600,
    shouldRedirect: function(screenWidth, referrer) {
      if (screenWidth > this.maxWidth) { return false; }
      // dont redirect internal links
      if (referrer.indexOf('lexingtonky.gov') > -1) { return false; }
      return true;
    },
    targetPath: function(pageId) {
      return redirectTable[pageId];
    },
    redirectTo: function(targetPath) {
      window.location = "https://next.lexingtonky.gov" + targetPath;
    },
    redirect: function(pageId, pageWidth, referrer) {
      var targetPath = this.targetPath(pageId);
      if (this.shouldRedirect(pageWidth, referrer)) { this.redirectTo(targetPath); }
    },
  };

  var redirectTable = {
    200: "/browse/recreation/aquatics",
  };

  redirector.redirect(lib.param("page"), lib.width(), document.referrer);
})();
