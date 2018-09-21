module.exports = {
  paths: [
    '/work',
    '/work/'
  ],
  class: Work,
  static_build: {
    build_as: [
      '/work/index.html'
    ]
  }
};

/**
 * Work
 */
function Work() {
  var CrookseNode = require('crookse-node');

  this.front_end_vars = {
    body_classes: 'c-page--work',
    work: CrookseNode.Applications.PortfolioUtils.getWork()
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////
  // FILE MARKER: HTTP METHODS /////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////

  this.HTTP_GET_HTML = () => {
    this.sendHtml();
  };
};
