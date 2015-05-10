$ ->
  # ロジックを定義
  calcLogic =
    __name: "CalcLogic"
    add: (left, right) ->
      @__name = "Test"
      left = parseInt(left)
      right = parseInt(right)
      if isNaN(left) or isNaN(right)
        return throw "numbers have to be integer."
      a = 'b'
      b = 'c'
      left + right
  # コントローラの元となるオブジェクトを作成
  controller =
    __name: "CalcController"
    # ロジックの宣言
    calcLogic: calcLogic
    "#calc click": ->
      # CalcLogicのaddメソッドを呼び出します。
      ret = @calcLogic.add $("#right").val(), $("#left").val()
      # 結果を画面に出力
      @$find("#result").html ret
      return
  h5.u.obj.expose calcLogic.__name, calcLogic
  # id="container"である要素にコントローラをバインド
  h5.core.controller "#container", controller
  return
