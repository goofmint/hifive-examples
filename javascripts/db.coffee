$ ->
  db = null
  async = h5.async
  SqlLogic =
    __name: 'SqlLogic'
    init: ->
      dfd = async.deferred()
      if !h5.api.sqldb.isSupported
        alert 'お使いのブラウザはWEB SQL Databaseをサポートしていません。'
        dfd.reject 'SQLDB is not support.'
        return
      db = h5.api.sqldb.open 'taskdb', '1', 'taskdb', 2 * 1024 * 1024
      table_query = db.select('sqlite_master', '*').where('type =': 'table').execute()
      table_query.done (tables) ->
        table_names = []
        for table, i in tables
          table_names.push tables.item(i).name
        unless table_names.indexOf("TASKS") >= 0
          query  = 'CREATE TABLE TASKS (key INTEGER NOT NULL CONSTRAINT PK_ACCOUNT PRIMARY KEY AUTOINCREMENT,'
          query += 'task CHAR(200) NOT NULL)' 
          db.sql(query).execute().done ->
            dfd.notify 'TASKS テーブル作成'
          .fail (error) ->
            dfd.reject error
        dfd.resolve()
      dfd.promise()

  SqlController =
    __name: 'SqlController'
    logic: SqlLogic
    __templates: 'table.ejs'
    __init: ->
      promise = this.logic.init()
      promise.progress (msg) ->
        console.log msg
      .fail (error) ->
        console.log error
      .done ->
        console.log 'done'
  h5.core.controller 'body', SqlController
