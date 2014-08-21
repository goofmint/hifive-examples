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
    '#btn_with_own_ajax click': (context) ->
      context.event.preventDefault()
      h5.ajax
        url: '/javascripts/json/own.json'
      .done this.own((data) ->
        console.info data
        console.info 'this', this
      )
    '#btn_without_own_ajax click': (context) ->
      context.event.preventDefault()
      h5.ajax
        url: '/javascripts/json/own.json'
      .done (data) ->
        console.info data
        console.info 'this', this
        
  h5.core.controller '#container', ownController
  	