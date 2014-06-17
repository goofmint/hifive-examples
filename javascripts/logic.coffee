$ ->
  itemSearchLogic =
    __name: "ItemSearchLogic"
    ###
    商品リスト(商品名と税込価格)を取得する。
    
    @param categoryId {Number} カテゴリID
    @returns 商品リスト
    ###
    getItemList: (categoryId) ->
      dfd = @deferred()
      result = null
      @_getItemData(categoryId).done((data) ->
        result = $.map(data, (obj) ->
          dfd.notify data.length
          obj.price = Math.floor(obj.price * 1.05)
          obj
        )
        dfd.resolve result
      ).fail (error) ->
        dfd.reject error.message
      dfd.promise()
      
    ###
    カテゴリIDから商品(商品名と税抜価格)リストをサーバから取得する。
    
    @param categoryId {Number} カテゴリID
    @returns 商品リスト
    ###
    _getItemData: (categoryId) ->
      $.ajax # [ {"itemname":"hoge", "price": "1000"}, ...] のようなJSONオブジェクトを返す
        type: "GET"
        dataType: "json"
        url: "./itemList" + categoryId
  itemSearchController =
    ###
    コントローラ名
    ###
    __name: "ItemSearchController"
    
    ###
    テンプレート
    ###
    __templates: "template.ejs"
    
    ###
    商品検索ロジック
    ###
    itemSearchLogic: itemSearchLogic
    
    ###
    検索ボタン押下アクション
    ###
    "#searchBtn click": (context) ->
      $resultDiv = @$find("#resultList")
      that = this
      $resultDiv.empty()
      
      # 画面で選択されたカテゴリ
      category = $("#select-category option:selected").val()
      @itemSearchLogic.getItemList(category).done((resultData) ->
        that.view.append $resultDiv, "template1",
          listData: resultData
      ).fail (errMsg) ->
        alert "取得に失敗しました" + errMsg
  h5.core.controller "#container", itemSearchController
