module.exports = {
  paths: [
    '/work/payoneer-escrow',
    '/work/payoneer-escrow/',
  ],
  class: PayoneerEscrow,
  static_build: {
    build_as: [
      '/work/payoneer-escrow.html'
    ]
  }
};

/**
 * Payoneer Escrow
 */
function PayoneerEscrow() {
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
      login: CrookseNode.Applications.PortfolioUtils.defineSample(
        'Login',
        '/public/assets/img/work/payoneer-escrow/devices-login.png',
        'A simple login form.'
      ),
      account_settings_web_app: CrookseNode.Applications.PortfolioUtils.defineSample(
        'Account Settings (direct users view)',
        '/public/assets/img/work/payoneer-escrow/devices-account-settings-web-app.png',
        'Account Settings view for direct users.'
      ),
      account_settings_lightbox: CrookseNode.Applications.PortfolioUtils.defineSample(
        'Account Settings (lightbox view)',
        '/public/assets/img/work/payoneer-escrow/devices-account-settings-lightbox.png',
        "Marketplaces and other applications that have integrated Payoneer Escrow's API in to their systems can present the Account Settings page to their users through a token-authenticated lightbox."
      ),
      emails: CrookseNode.Applications.PortfolioUtils.defineSample(
        'Email',
        '/public/assets/img/work/payoneer-escrow/devices-email-payment-received.png',
        "The Payment Received email is sent when the buyer funds the secure, Payoneer Escrow account."
      )
    };
  }
};

