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

    //モーダル挙動
    $('.credit__open').click(function () {
      $('#producer').fadeIn();
    });
    $('.producer__close').click(function () {
      $('#producer').fadeOut();
    });

  const fixedModal = () => {
    let scrollPosition = 0;
    const ua = window.navigator.userAgent.toLowerCase();
    const isiOS = ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('macintosh') > -1 && 'ontouchend' in document;

    const fixedOn = () => {
      if (isiOS) {
        scrollPosition = $(window).scrollTop();
        $('body').css({
          width: '100%',
          position: 'fixed',
          top: `-${scrollPosition}px`
        });
      } else {
        $('body').css({
          overflow: 'hidden'
        });
      }
    };

    const fixedOff = () => {
      if (isiOS) {
        $('body').css({
          width: '',
          position: '',
          top: ''
        });
        $(window).scrollTop(scrollPosition);
      } else {
        $('body').css({
          overflow: ''
        });
      }
    };

    return {
      fixedOn, fixedOff
    };
  };

  const initFixedModal = () => {
    const onOffModal = fixedModal();
    $('.credit__open').on('click', () => {
      onOffModal.fixedOn();
    });
    $('.producer__close').on('click', () => {
      onOffModal.fixedOff();
    });
  };

  initFixedModal();
}
