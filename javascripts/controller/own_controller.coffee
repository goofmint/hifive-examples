$ ->
	ownController = 
    __name: 'sample.OwnController'
    '#btn_with_own click': (context) ->
      context.event.preventDefault()
      dfd = this.deferred()
      setTimeout this.own( ->
        console.info "setTimeoutで1秒後に実行しています"
        console.info "================================="
        console.info "this", this
        console.info "コントローラなので、__nameがあります。"
        console.info "this.__name", this.__name
        console.info "================================="
        dfd.resolve()
     	),1000
      dfd.promise()
    '#btn_without_own click': (context) ->
      context.event.preventDefault()
      dfd = this.deferred()
      setTimeout ->
        console.info "setTimeoutで1秒後に実行しています"
        console.info "================================="
        console.info "this", this
        console.info "Windowオブジェクトなので、__nameがありません。"
        console.info "this.__name", this.__name
        console.info "================================="
        dfd.resolve()
     	,1000
      dfd.promise()
  h5.core.controller '#container', ownController
  	