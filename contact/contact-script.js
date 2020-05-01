$(function() {
  $(".contact-tpl__button-1st").click(function() {
    var $button-2nd_wrapper = $(this).find(".answer");
    if ($button-2nd_wrapper.hasClass("open")) {
      $button-2nd_wrapper.removeClass("open");
    } else {
      $button-2nd_wrapper.addClass("open");
    }
  });
});
