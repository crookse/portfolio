module.exports = {
  paths: ['/'],
  class: Home,
  static_build: {
    build_as: [
      '/index.html'
    ],
  }
};

/**
 * Homepage
 */
function Home() {
  var CrookseNode = require('crookse-node');

  this.front_end_vars = {
    body_classes: 'c-page--index',
    work: CrookseNode.Applications.PortfolioUtils.getWork(),
    page_scripts: [
      '/public/assets/js/resource-script.home.js',
    ],
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////
  // FILE MARKER: HTTP METHODS /////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////

  this.HTTP_GET_HTML = () => {
    return this.sendHtml();
  };
};
