// Generated by CoffeeScript 1.7.1
(function() {
  $(function() {
    var calcLogic, controller;
    calcLogic = {
      __name: "CalcLogic",
      add: function(left, right) {
        return left + right;
      }
    };
    controller = {
      __name: "CalcController",
      calcLogic: calcLogic,
      "#calc click": function() {
        var left, ret, right;
        left = $("#left").val();
        left = parseInt(left);
        if (isNaN(left)) {
          return;
        }
        right = $("#right").val();
        right = parseInt(right);
        if (isNaN(right)) {
          return;
        }
        ret = this.calcLogic.add(left, right);
        this.$find("#result").html(ret);
      }
    };
    h5.core.controller("#container", controller);
  });

}).call(this);