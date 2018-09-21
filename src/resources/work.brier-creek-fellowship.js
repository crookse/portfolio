module.exports = {
  paths: [
    '/work/brier-creek-fellowship',
    '/work/brier-creek-fellowship/',
  ],
  class: BrierCreekFellowship,
  static_build: {
    build_as: [
      '/work/brier-creek-fellowship.html'
    ]
  }
};

/**
 * Brier Creek Fellowship
 */
function BrierCreekFellowship() {
  var CrookseNode = require('crookse-node');

  this.html_document_title = 'Work / Brier Creek Fellowship';

  this.front_end_vars = {
    samples: getSamples()
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////
  // FILE MARKER: HTTP METHODS /////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////

    this.HTTP_GET_HTML = () => {
      this.sendHtml();
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////
  // FILE MARKER: FUNCTIONS ////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Get the sample items.
   */
  function getSamples() {
    return {
      desktop: CrookseNode.Applications.PortfolioUtils.defineSample(
        'Home',
        '/public/assets/img/work/brier-creek-fellowship/devices-home.png',
      )
    };
  }
};

