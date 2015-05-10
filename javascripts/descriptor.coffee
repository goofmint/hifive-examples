$ ->
  manager = h5.core.data.createManager('SampleManager', 'sample');
  ItemModel =
    name: "Item"
    schema:
      id:
        id: true
        type: 'integer'
      name:
        type: 'string'
        constraint:
          notNull: true
      option:
        type: 'enum'
        enumValue: [1, 'a', 'c']
  Item = manager.createModel ItemModel
  item = Item.create
    id: 1
    name: 'Test'
  console.log item
  console.log item.set('option', 1)
  