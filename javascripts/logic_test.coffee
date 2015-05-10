$ ->
  test "a basic test example", ->
    ok true, "this test is fine"
    value = "hello"
    equal "hello", value, "We expect value to be hello"
  test "getItemData", ->
    logic = h5.core.logic ItemSearchController.itemSearchLogic
    logic._getItemData(1)
    .then (data) ->
      equal data.length, 20, "We expect data length is 20."
  test "getItemList", ->
    logic = h5.core.logic ItemSearchController.itemSearchLogic
    logic.getItemList(1)
    .then (data1) ->
      equal data1.length, 20, "We expect data length is 20."
      logic._getItemData(1)
      .then (data2) ->
        equal data1.length, data2.length, "We expect data1 length is equal to data2 length"
        