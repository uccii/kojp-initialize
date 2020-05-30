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

  //コピーの挙動：FMTのコピー
  //$("#contact_tpl_button_1st").click(function() {
  //  document.getElementById( "#copy_target li" ).value = "list" ;
  //  $("#copy_area").append('<textarea id="copy_textarea"></textarea>')
  //  document.getElementById( "#copy_textarea" ).value = "target" ;
  //  list.each ->
  //    target.append($(@).text() + '\n')
  //  target.select()
  //  document.execCommand("Copy")
  //  target.remove()
  //  alert("ブレスト結果をコピーしました！")
  //https://qiita.com/at-946/items/16902fc9e26926d6ff4f

  //コピーの挙動：各SNSのコピー

  //下記は消さない
});
