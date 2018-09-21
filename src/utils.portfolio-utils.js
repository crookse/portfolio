module.exports = {
  /**
   * Get work
   *
   * return {Object}
   */
  getWork: function getWork() {
    return {
      scrypto_main: this.defineWork(
        'Scrypto',
        '2018',
        '/public/assets/img/work/scrypto-main/desktop-home.jpg',
        false,
        'http://www.scryptoft.com',
        false,
        'Secured Finance & Trust for your crypto assets.'
      ),
      payoneer: this.defineWork(
        'Payoneer Escrow',
        '2016-2018',
        '/public/assets/img/work/payoneer-escrow/desktop-login.png',
        '/work/payoneer-escrow',
        'https://pay.payoneer.com',
        false,
        'Payoneer Escrow is a B2B payments service that offers secure, risk-free transactions for buyers and sellers around the world.'
      ),
      payoneer_escrow_noderig: this.defineWork(
        'Payoneer Escrow Noderig',
        '2017-2018',
        '/public/assets/img/work/payoneer-escrow-noderig/desktop-ace-editor.png',
        '/work/payoneer-escrow-noderig',
        false,
        false,
        "Payoneer Escrow's internal testing application used to test Payoneer Escrow's API, webhooks feature, and authenticated lightboxes."
      ),
      tps_staffing: this.defineWork(
        'TPS Staffing',
        '2017',
        '/public/assets/img/work/tps-staffing/desktop-home.png',
        '/work/tps-staffing',
        false,
        false,
        "DeVry University Senior Project.",
      ),
      brier_creek_fellowship: this.defineWork(
        'Brier Creek Fellowship',
        '2015-2016',
        '/public/assets/img/work/brier-creek-fellowship/desktop-home.png',
        '/work/brier-creek-fellowship',
        false,
        'http://brier-creek-fellowship-static.crookse.com',
        "Redesign of the Brier Creek Fellowship's website.",
      )
    };
  },

  /**
   * Define a sample
   *
   * @return {Object}
   */
  defineSample: function defineSample(title, screenshot, description) {
    return {
      title: title,
      screenshot_url: screenshot,
      description: description
    }
  },

  /**
   * Define a piece of work
   *
   * @return {Object}
   */
  defineWork: function defineWork(title, dates, screenshot, aboutUrl, liveUrl, staticUrl, description) {
    return {
      title: title,
      dates: dates,
      screenshot_url: screenshot,
      about_url: aboutUrl,
      live_url: liveUrl,
      static_url: staticUrl,
      description: description
    }
  }
};
