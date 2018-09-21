/**
 * Is the element active? That is, it has the "active" class selector.
 *
 * @param {Object} element The jQuery object of the element.
 *
 * @return {Boolean}
 */
function element_is_active(element, toggleClassSelector) {
  if (element.hasClass("active")) {
    if (toggleClassSelector) {
      element.removeClass("active");
    }
    return true;
  }

  if (toggleClassSelector) {
    element.addClass("active");
  }
  return false;
}

/**
 * Fade in an element.
 *
 * @param {Object} jQueryObject The jQuery object version of the element.
 * @param {Number} duration
 */
function fade_in_element(jQueryObject, duration) {
  if (!duration) {
    duration = 300;
  }
  jQueryObject.fadeIn(duration);
}

/**
 * Fade out an element.
 *
 * @param {Object} jQueryObject The jQuery object version of the element.
 * @param {Number} duration
 */
function fade_out_element(jQueryObject, duration) {
  if (!duration) {
    duration = 300;
  }
  jQueryObject.fadeOut(duration);
}

/**
 * Scroll to an element
 *
 * @param {Object} jQueryObject The jQuery object version of the element.
 * @param {Number} marginTop    Add some top margin.
 */
function scroll_to_element(jQueryObject, marginTop, quickJump = false) {
  var animationSpeed = 300;
  if (quickJump) {
    animationSpeed = 0;
  }

	$('html, body').animate({
		scrollTop: $(jQueryObject).offset().top - marginTop
	}, animationSpeed);
}

/**
 * Is the window mobile width?
 *
 * @return {Boolean}
 */
function window_is_at_mobile_width() {
  return $(window).width() <= 767;
}

