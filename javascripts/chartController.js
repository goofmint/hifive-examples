// Generated by CoffeeScript 1.7.1
(function() {

  /**
  データ生成関数
   */
  var DUMMY_DATA_SIZE, createChartDummyData, pageController;
  DUMMY_DATA_SIZE = 300;
  createChartDummyData = function(median, vibration, size) {
    var i, ret;
    ret = [];
    i = 0;
    if (typeof size === 'undefined') {
      size = DUMMY_DATA_SIZE;
    }
    while (i < size) {
      ret.push({
        y: median + (Math.random() - 0.5) * vibration * 2
      });
      i++;
    }
    return ret;
  };
  pageController = {
    __name: "ui.chart.pageController",
    _series: [],
    _dataIndex: 0,
    _width: 600,
    _height: 480,
    _chartController: h5.ui.components.chart.ChartController,
    __meta: {
      _chartController: {
        rootElement: "#chart"
      }
    },
    __ready: function(context) {
      var _this;
      this._series.push(this._createNewSeries());
      this._chartController.draw({
        chartSetting: {
          width: this._width,
          height: this._height
        },
        axes: {
          xaxis: {
            off: true
          },
          yaxis: {
            lineNum: 10,
            fontSize: "7pt",
            autoScale: function(min, max) {
              return {
                rangeMax: 550,
                rangeMin: 250
              };
            },
            range: {
              min: 0,
              max: 500
            }
          }
        },
        seriesDefault: {
          dispDataSize: 100,
          mouseover: {
            tooltip: false
          }
        },
        series: this._series
      });
      _this = this;
      setInterval(function() {
        return _this.go(createChartDummyData(400, 100, 1));
      }, 1000);
    },
    go: function(data) {
      var addData, movedNum;
      movedNum = this._chartController.go(1);
      if (movedNum === 1) {
        return true;
      }
      addData = [
        {
          name: this._series[0].name,
          data: data[0]
        }
      ];
      this._chartController.addData(addData);
      return this._dataIndex++;
    },
    _createNewSeries: function() {
      var data, i, len, name, newData;
      data = createChartDummyData(400, 100);
      newData = [];
      i = 0;
      len = parseInt(this._dataIndex / DUMMY_DATA_SIZE) + 1;
      while (i < len) {
        newData = newData.concat(data);
        i++;
      }
      newData = newData.concat(data.slice(0, this._dataIndex % data.length));
      name = "series_" + this._series.length;
      console.log(newData);
      return {
        name: name,
        type: "line",
        data: newData,
        color: "#1E98B9",
        animateNum: 20
      };
    }
  };
  h5.core.expose(pageController);
})();

$(function() {
  h5.core.controller("body", ui.chart.pageController);
});
