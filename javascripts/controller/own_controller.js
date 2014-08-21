// Generated by CoffeeScript 1.6.3
$(function() {
  var ownController;
  ownController = {
    __name: 'sample.OwnController',
    '#btn_with_own click': function(context) {
      var dfd;
      context.event.preventDefault();
      dfd = this.deferred();
      setTimeout(this.own(function() {
        console.info("setTimeoutで1秒後に実行しています");
        console.info("=================================");
        console.info("this", this);
        console.info("コントローラなので、__nameがあります。");
        console.info("this.__name", this.__name);
        console.info("=================================");
        return dfd.resolve();
      }), 1000);
      return dfd.promise();
    },
    '#btn_without_own click': function(context) {
      var dfd;
      context.event.preventDefault();
      dfd = this.deferred();
      setTimeout(function() {
        console.info("setTimeoutで1秒後に実行しています");
        console.info("=================================");
        console.info("this", this);
        console.info("Windowオブジェクトなので、__nameがありません。");
        console.info("this.__name", this.__name);
        console.info("=================================");
        return dfd.resolve();
      }, 1000);
      return dfd.promise();
    }
  };
  return h5.core.controller('#container', ownController);
});