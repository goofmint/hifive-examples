$ ->
  # ロジックを定義
  calcLogic =
    __name: "CalcLogic"
    add: (left, right) ->
      left + right
  # コントローラの元となるオブジェクトを作成
  controller =
    __name: "CalcController"
    # ロジックの宣言
    calcLogic: calcLogic
    "#calc click": ->
      # 左辺の値を取得
      left = $("#left").val()
      # StringからNumberへ変換。変換に失敗したら終了
      left = parseInt(left)
      return  if isNaN(left)
      # 右辺の値を取得
      right = $("#right").val()
      # StringからNumberへ変換。変換に失敗したら終了
      right = parseInt(right)
      return  if isNaN(right)
      # CalcLogicのaddメソッドを呼び出す
      ret = @calcLogic.add(left, right)
      # 結果を画面に出力
      @$find("#result").html ret
      return
  # id="container"である要素にコントローラをバインド
  h5.core.controller "#container", controller
  return
