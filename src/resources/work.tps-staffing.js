module.exports = {
  paths: [
    '/work/tps-staffing',
    '/work/tps-staffing/',
  ],
  class: TpsStaffing,
  static_build: {
    build_as: [
      '/work/tps-staffing.html'
    ]
  }
};

/**
 * TPS Staffing
 */
function TpsStaffing() {
  var CrookseNode = require('crookse-node');

  this.html_document_title = 'Work / TPS Staffing';

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
        '/public/assets/img/work/tps-staffing/devices-home.png',
        'A simple and straightforward page with emphasis on getting users started with the service.'
      ),
      login: CrookseNode.Applications.PortfolioUtils.defineSample(
        'Login',
        '/public/assets/img/work/tps-staffing/devices-login.png',
        'Log in or sign up for an account.'
      ),
      all_requests_as_the_client: CrookseNode.Applications.PortfolioUtils.defineSample(
        'All Requests (as the client)',
        '/public/assets/img/work/tps-staffing/devices-client-overview.png',
        'The All Requests page is where the client can go for an overview of all requests (e.g., open requests, requests filled, requests on hold, etc.).'
      ),
      create_request_as_the_client: CrookseNode.Applications.PortfolioUtils.defineSample(
        'Create Request (as the client)',
        '/public/assets/img/work/tps-staffing/devices-client-create-request.png',
        'Fill out and submit a request to fill a position. Upon submission, a Staffing Candidate List is sent in response.'
      ),
      request_details_as_the_client: CrookseNode.Applications.PortfolioUtils.defineSample(
        'Request Open (as the client)',
        '/public/assets/img/work/tps-staffing/devices-client-staffing-candidate-list.png',
        'This is the Request Details page where the status of the request is "Open." This means the request is waiting for the client to accept or decline the Staffing Candidate List. The client can also prioritize the list by dragging and dropping the candidate information boxes. This feature exists to allow the client to choose the order in which candidates are contacted. In this sample, John Wick will be contacted first if the client accepts the list.'
      ),
      all_requests_as_the_candidate: CrookseNode.Applications.PortfolioUtils.defineSample(
        'All Requests (as the candidate)',
        '/public/assets/img/work/tps-staffing/devices-candidate-all-requests.png',
        'Candidates have an overview of all requests they are associated with (e.g., requests awaiting responses, accepted requests, etc.).'
      ),
      request_details_as_the_candidate: CrookseNode.Applications.PortfolioUtils.defineSample(
        'Request Fill Pending (as the candidate)',
        '/public/assets/img/work/tps-staffing/devices-candidate-request-details-awaiting-response.png',
        'This is the Request Details page where the status of the request is "Fill Pending." This means the request is waiting for a response from the candidate. Candidates have the option to accept or decline a request.'
      ),
      request_details_as_the_client_filled: CrookseNode.Applications.PortfolioUtils.defineSample(
        'Request Filled (as the client)',
        '/public/assets/img/work/tps-staffing/devices-client-request-details-request-filled.png',
        'This is the Request Details page where the status of the request is "Filled." This means the request has been accepted by a candidate. All filled requests will display the information of the assigned candidate and the invoice total for the job.'
      ),
      account_settings_as_the_candiate: CrookseNode.Applications.PortfolioUtils.defineSample(
        'Account Settings (as the candidate)',
        '/public/assets/img/work/tps-staffing/devices-candidate-account-settings.png',
        'Candidates can update their contact information, password, education, qualifications, and job interests on the Account Settings page. The Job Interests section controls what types of requests they will see on their All Requests page.'
      ),
    };
  }
};

