module.exports = {
  paths: [
    '/work/payoneer-escrow-noderig',
    '/work/payoneer-escrow-noderig/',
  ],
  class: PayoneerEscrowNoderig,
  static_build: {
    build_as: [
      '/work/payoneer-escrow-noderig.html'
    ]
  }
};

/**
 * Payoneer Escrow Noderig
 */
function PayoneerEscrowNoderig() {
  var CrookseNode = require('crookse-node');

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
      ace_editor: CrookseNode.Applications.PortfolioUtils.defineSample(
        'Ace Editor',
        '/public/assets/img/work/payoneer-escrow-noderig/devices-ace-editor.png',
        'The Ace Editor page is where most of the testing starts. It allows the user to create orders, update orders, create accounts, create users, and send other allowed GET and POST requests.'
      ),
      open_lightboxes: CrookseNode.Applications.PortfolioUtils.defineSample(
        'Open Lightboxes',
        '/public/assets/img/work/payoneer-escrow-noderig/devices-open-lightboxes.png',
        'The Open Lightboxes page is where the user opens authenticated lightboxes via desktops, laptops, and/or mobile devices–testing the UI and UX for any authenticated lightbox.'
      ),
      webhooks: CrookseNode.Applications.PortfolioUtils.defineSample(
        'Webhooks',
        '/public/assets/img/work/payoneer-escrow-noderig/devices-webhooks.png',
        "The Webhooks page is where the user can recieve webhooks and review webhook data for accuracy."
      )
    };
  }
};

