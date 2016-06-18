(function () {
  "use strict";

  var lib = {
    param: function (nameParam) {
      var url = window.location.href,
        name = nameParam.replace(/[\[\]]/g, "\\$&"),
        regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
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
    }
  };

  var redirector = {
    maxWidth: 600,
    shouldRedirect: function (screenWidth, referrer) {
      if (screenWidth > this.maxWidth) { return false; }
      // dont redirect internal links
      if (referrer.length === 0 || (referrer.indexOf('lexingtonky.gov') > -1)) { return false; }
      return true;
    },
    targetPath: function (pageId) {
      return redirectTable[pageId];
    },
    redirectTo: function (targetPath) {
      window.location = "https://next.lexingtonky.gov" + targetPath;
    },
    redirect: function (pageId, pageWidth, referrer) {
      var targetPath = this.targetPath(pageId);
      if (targetPath && this.shouldRedirect(pageWidth, referrer)) { this.redirectTo(targetPath); }
    }
  };

  var redirectTable = {
    200: "/neighborhood-pools",
    201: "/neighborhood-pools",
    198: "/departments/parks-recreation",
    276: "/raven-run-nature-sanctuary"
  };

  redirector.redirect(lib.param("page"), lib.width(), document.referrer);
})();
