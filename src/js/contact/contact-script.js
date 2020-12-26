import $ from 'jquery';

window.jQuery = $;

export default function () {
  //表示するボタンを押したときの挙動
  $('#contact_tpl_button_1st').click(function () {
    if ($('#contact_tpl').hasClass('open')) {
      $('#contact_tpl').removeClass('open');
      $('#contact_tpl').slideUp(500);
      $('#contact_tpl_button_1st, .button').text('表示する');
    } else {
      $('#contact_tpl').addClass('open');
      $('#contact_tpl').slideDown(500);
      $('#contact_tpl_button_1st, .button').text('非表示');
    }
  });

  //コピーの挙動：FMTのコピー
  $('.contact-tpl__button-2nd').click(function () {
    copy();
  });

  function copy() {
    var text = document.getElementsByTagName('textarea')[0];
    text.select();
    document.execCommand('copy');
    alert('コピーしました');
  }

  //コピーの挙動：各SNSのコピー
  $('.contact-primary__mail-copy').click(function () {
    var text = document.getElementById('mail').innerText;
    copy_1(text);
  });
  $('.contact-primary__phone-copy').click(function () {
    var text = document.getElementById('phone').innerText;
    copy_1(text);
  });
  $('.contact-secondary__twitter-copy').click(function () {
    var text = document.getElementById('twitter').innerText;
    copy_1(text);
  });
  $('.contact-secondary__facebook-copy').click(function () {
    var text = document.getElementById('facebook').innerText;
    copy_1(text);
  });
  $('.contact-secondary__line-copy').click(function () {
    var text = document.getElementById('line').innerText;
    copy_1(text);
  });

  function copy_1(_text) {
    var area = document.createElement('textarea');
    area.textContent = _text;
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    document.body.removeChild(area);
    alert('コピーしました');
  }
}
