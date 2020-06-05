//表示するボタンを押したときの挙動
$(function() {
  $("#contact_tpl_button_1st").click(function() {
    if ($("#contact_tpl").hasClass("open")) {
      $("#contact_tpl").removeClass("open");
      $("#contact_tpl").slideUp(500);
      $("#contact_tpl_button_1st, .button").text("表示する");
    } else {
      $("#contact_tpl").addClass("open");
      $("#contact_tpl").slideDown(500);
      $("#contact_tpl_button_1st, .button").text("非表示");
    }
  });

  //コピーの挙動：FMTのコピー  copyの定義がうまくいってない？scriptで反映
  $(".contact-tpl__button-2nd").click(function() {
    copy();
  });
  function copy() {
    var text = document.getElementsByTagName("textarea")[0];
    text.select();
    document.execCommand("copy");
    alert("コピーしました");
  }

  //コピーの挙動：各SNSのコピー（mail 読み込まれないのでhtmlに一旦記載）
  $(".contact-primary__mail-copy").click(function() {
    //指定のclassのボタンをクリック
    var text = document.getElementById("mail").innerText;
    //mailの文字列を取得
    copy_1(text);
  });
  function copy_1(_text) {
    var area = document.createElement("textarea");
    //textareaを生成
    area.textContent = _text;
    //mailの内容をtextarea
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    document.body.removeChild(area);
  }
  //定数名がcopy_1、引数名が_text _textに　textメゾットで書き換えて
  //下記は消さない
});
