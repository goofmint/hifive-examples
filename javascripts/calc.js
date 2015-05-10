$(function() {
  var calcLogic, controller;
  calcLogic = {
    __name: "CalcLogic",
    add: function(left, right) {
      this.__name = "Test";
      left = parseInt(left);
      right = parseInt(right);
      
      if (isNaN(left) || isNaN(right)) {
        throw "numbers have to be integer.";
      }
      return left + right;
    }
  };
  
  controller = {
    __name: "CalcController",
    calcLogic: calcLogic,
    "#calc click": function() {
      var ret;
      ret = this.calcLogic.add($("#right").val(), $("#left").val());
      this.$find("#result").html(ret);
    }
  };
  
  h5.u.obj.expose(calcLogic.__name, calcLogic);
  h5.core.controller("#container", controller);
});
