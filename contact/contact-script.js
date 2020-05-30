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
  function copy() {
    var text = document.getElementsByTagName("textarea")[0];
    text.select();
    document.execCommand("copy");
  }

  //コピーの挙動：FMTのコピー  copyの定義がうまくいってない？scriptで反映
  //function copy() {
  //var text = document.getElementsByTagName("textarea")[0];
  //text.select();
  //document.execCommand("copy");
  // }
  //コピーの挙動：FMTのコピー  textareaの高さ調節
  //$(function() {
  //var $obj = $("#textarea");
  //var height = parseInt($obj.css("lineHeight"));
  //$obj.on("input", function(e) {
  //  var lines = ($(this).val() + "\n").match(/\n/g).length;
  //  $(this).height(height * lines);
  //});

  //});
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

  //コピーの挙動：各SNSのコピー（mail 読み込まれないのでhtmlに一旦記載）
  function copy_1() {
    var text = document.getElementById("mail").innerText;
    var area = document.createElement("textarea");
    area.textContent = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    document.body.removeChild(area);
  }

  //  function copy() {
  //範囲を指定
  //  let range = document.createRange();
  //  let span = document.getElementById("mail");
  // range.selectNodeContents(mail);

  //指定した範囲を選択状態にする
  //  let selection = document.getSelection();
  //  selection.removeAllRanges();
  //  selection.addRange(range);

  //コピー
  //  document.execCommand("copy");
  //  alert("コピーしました");
  //   }
  //https://fuuno.net/web02/copy/copy.html
  // function copy() {
  //  var text = document.getElementsByTagName("mail")[0];

  // text.select();
  // document.execCommand("copy");
  //}

  //下記は消さない
});
