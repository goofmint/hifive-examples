$ ->
  h5.core.data.createManager 'DatabaseManager', 'db'
  Item = db.DatabaseManager.createModel
    name: "Item"
    schema:
      id:
        id: true
      name:
        type: 'string'
      point:
        type: 'integer'
        defaultValue: 0
      message:
        type: 'string',
        depend:
          on: ['name', 'point']
          calc: (e) ->
            "#{@get('name')}は#{@get('point')}です。"
  item = Item.create
    id: '1'
    name: "テストのアイテム"
    point: 100
  Item.addEventListener 'itemsChange', (e) ->
    console.log 'データモデル', 'Change!'
    console.log e
  item.addEventListener 'change', (e) ->
    console.log 'データアイテム', 'Change!'
  console.info item
  console.info item.get 'name'
  item.set 'point', 50
  console.info item.get('message')

