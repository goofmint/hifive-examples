$ ->
  helloWorldController = 
    __name: 'HelloWorldController'
    '#btn click': ->
      alert 'Hello, World!'
  h5.core.controller '#container', helloWorldController
