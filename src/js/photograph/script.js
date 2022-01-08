import $ from 'jquery';

creditModal: () => {
  $('.photograph-show').on('click', () => {
    $('#photograph').fadeIn();
  });
  $('.photograph-list__close').on('click', () => {
    $('#photographr').fadeOut();
  });



window.jQuery = $;