const FRONT_END_CONF = Object.freeze({
  header_height_percentage: 100
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// VUE-RELATED /////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

var app_vue = {};

////////////////////////////////////////////////////////////////////////////////////////////////////
// INITIALIZATIONS /////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function documentReady() {
  addEventHandlers();
  if ($("#extendable__portfolio").length > 0) {
    $(".c-header").addClass("c-header--has-white-background");
  }
  toggleSidebar();
});

$(window).resize(function windowResize() {
  toggleSidebar();
});

$(window).scroll(function windowScroll() {
  toggleBackToTopButton();
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS ///////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Add event handlers.
 */
function addEventHandlers() {
  $(".c-nav__link.scroll-to").click(function() {
    scroll_to_element($($(this).data('jquery-element')), 100);
  });
}

/**
 * Toggle the "Back To Top" button
 */
function toggleBackToTopButton() {
  if($(window).scrollTop() >= 90) {
    $(".c-btn-back-to-top").fadeIn(100);
  } else {
    $(".c-btn-back-to-top").fadeOut(100);
  }
}

/**
 * Toggle the sidebar
 *
 * TODO: Clean up... it works though.
 */
function toggleSidebar() {
  var mobileButton = $(".c-btn-mobile");
  if ($(window).width() >= 950) {
    $(".c-sidebar a").unbind("click");
    // Hide the button
    mobileButton.removeClass("open");
    mobileButton.find(".fa-bars").show();
    mobileButton.find(".fa-times").hide();
    // Show the sidebar
    $(".c-sidebar").removeClass("hide--soft");
  } else {
    $(".c-sidebar a").click(function() {
      $(".c-sidebar").addClass("hide--soft");
      mobileButton.removeClass("open");
      mobileButton.find(".fa-bars").show();
      mobileButton.find(".fa-times").hide();
    });
    // If the menu is NOT open, then hide the sidebar
    if (!mobileButton.hasClass("open")) {
      mobileButton.find(".fa-bars").show();
      mobileButton.find(".fa-times").hide();
      $(".c-sidebar").addClass("hide--soft");
    } else {
      mobileButton.find(".fa-times").show();
    }
  }
}
