module.exports = {
  paths: [
    '/projects',
    '/projects/'
  ],
  class: Projects,
  static_build: {
    build_as: [
      '/projects/index.html'
    ]
  }
};

/**
 * Projects
 */
function Projects() {
  var CrookseNode = require('crookse-node');

  this.html_document_title = 'Projects';

  this.front_end_vars = {
    body_classes: 'c-page--work',
    work: CrookseNode.Applications.PortfolioUtils.getWork()
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////
  // FILE MARKER: HTTP METHODS /////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////

    this.HTTP_GET_HTML = () => {
      return this.sendHtml();
  };
};
