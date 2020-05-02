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
});

//コピーの挙動
// コピーボタン
//  const btn_copy = document.querySelector("#contact_tpl_button_2nd");
// コピー対象となるテキスト
//  const copy_target = document.querySelector("#contact_tpl > li");

// コピーボタンのクリックイベント
//  btn_copy.addEventListener("click", () => {
//    copyText(copy_target);
// });

//  const copyText = target => {
// テキストの選択
//    document.getSelection().selectAllChildren(target);
// 選択範囲のコピー
//    document.execCommand("copy");
// テキスト選択の解除
//    document.getSelection().empty(target);
//  };
