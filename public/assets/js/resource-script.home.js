$(document).ready(function closure_documentReady() {
  addBackgroundToSiteHeaderTopBar();
  resizeLedeSlide();
});

$(window).resize(function windowResize() {
  resizeLedeSlide();
});

$(window).scroll(function windowScroll() {
  addBackgroundToSiteHeaderTopBar();
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS ///////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Add the white background to the site header.
 */
function addBackgroundToSiteHeaderTopBar() {
  if($(window).scrollTop() >= 5) {
    $(".c-header").addClass("c-header--has-white-background");
  } else {
    $(".c-header").removeClass("c-header--has-white-background");
  }
}

/**
 * Resize the lede slide.
 */
function resizeLedeSlide() {
  $('.c-slide-homepage-lede').css('height', (window.innerHeight * (FRONT_END_CONF.header_height_percentage / 100)));
}
