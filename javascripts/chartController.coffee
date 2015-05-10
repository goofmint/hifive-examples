#
# * Copyright (C) 2012-2014 NS Solutions Corporation
# *
# * Licensed under the Apache License, Version 2.0 (the "License");
# * you may not use this file except in compliance with the License.
# * You may obtain a copy of the License at
# *
# *    http://www.apache.org/licenses/LICENSE-2.0
# *
# * Unless required by applicable law or agreed to in writing, software
# * distributed under the License is distributed on an "AS IS" BASIS,
# * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# * See the License for the specific language governing permissions and
# * limitations under the License.
# *
# 
(->
  ###*
  データ生成関数
  ###
  DUMMY_DATA_SIZE = 300
  createChartDummyData = (median, vibration, size) ->
    ret = []
    i = 0
    size = DUMMY_DATA_SIZE if typeof size == 'undefined'
    while i < size
      ret.push y: median + (Math.random() - 0.5) * vibration * 2
      i++
    ret
  pageController =
    __name: "ui.chart.pageController"
    _series: []
    _dataIndex: 0
    _width: 600
    _height: 480
    _chartController: h5.ui.components.chart.ChartController # チャートライブラリ
    __meta:
      _chartController:
        rootElement: "#chart"
    __ready: (context) ->
      @_series.push @_createNewSeries()
      # 取得したデータをもとにチャートを表示
      @_chartController.draw
        chartSetting:
          width: @_width
          height: @_height
        axes: # 軸の設定
          xaxis: # x軸
            off: true
          #x軸に垂直な線を引かない
          yaxis: # y軸
            lineNum: 10 # y軸の補助線の数(上部は含む)
            fontSize: "7pt" # ラベルのフォントサイズ
            autoScale: (min, max) -> # オートスケールの定義
              rangeMax: 550
              rangeMin: 250
            range: #Y軸の表示領域
              min: 0
              max: 500
        seriesDefault: # すべての系列のデフォルト設定
          dispDataSize: 100
          # 表示データ数
          mouseover:
            tooltip: false
        series: @_series
      _this = this
      setInterval( ->
        _this.go(createChartDummyData(400, 100, 1))
      ,1000)
      return
    go: (data) ->
      movedNum = @_chartController.go(1)
      return true if movedNum is 1
      addData = [
        name: @_series[0].name,
        data: data[0]
      ]
      @_chartController.addData addData
      @_dataIndex++
    _createNewSeries: () ->
      data = createChartDummyData(400, 100) # ダミーデータを生成
      newData = []
      i = 0
      len = parseInt(@_dataIndex / DUMMY_DATA_SIZE) + 1
      while i < len
        newData = newData.concat(data)
        i++
      newData = newData.concat(data.slice(0, @_dataIndex % data.length))
      name = "series_" + @_series.length
      console.log(newData)
      # 系列定義
      return {
        name: name #系列名(キーとして使用する)
        type: "line"
        data: newData # データ
        color: "#1E98B9"
        animateNum: 20
      }
  h5.core.expose pageController
  return
)()
$ ->
  h5.core.controller "body", ui.chart.pageController
  return
