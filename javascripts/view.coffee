$ ->
  # コントローラの元となるオブジェクトを作成
  controller =
    __name: "NumListController"
    # 使用するテンプレートのパスを書く
    __templates: "./views/list.ejs"
    "#output click": ->
      # 入力値を取得
      to = $("#to").val()
      # 値がなければ処理を終了
      return  unless to
      # StringからNumberへ変換。変換に失敗したら終了
      try
        to = parseInt(to)
      catch e
        return
      
      # テンプレートに値を渡してHTML文字列を取得する
      numList = @view.get("list",
        num: to
      )
      # 結果を画面に出力
      $("#list").html numList
  # id="container"である要素にコントローラをバインド
  h5.core.controller "#container", controller
