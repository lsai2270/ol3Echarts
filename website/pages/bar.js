import * as React from 'react';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import EChartsLayer from 'ol-echarts';
import 'ol/ol.css';
import '../assets/style/art.scss'

class Index extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      zoom: 14,
      fov: 0,
      pitch: 0,
      bearing: 0
    };

    this.container = null;
    this.map = null;
  }

  componentDidMount () {
    this.map = new Map({
      target: this.container,
      view: new View({
        center: [113.53450137499999, 34.44104525],
        projection: 'EPSG:4326',
        zoom: 5
      }),
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnline' +
            'StreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
          })
        })
      ]
    });

    var options = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        x: 'left',
        show: true,
        data: ['包租费', '物业费', '水电', '网络', '燃气'],
        selectedMode: 'multiple'
      },
      grid: [],
      xAxis: [],
      yAxis: [],
      series: []
    }

    var series = [
      {
        name: '包租费',
        type: 'bar',
        barWidth: '15',
        coordinates: [87.1435546875, 43.79150390625],
        data: [20, 12, 31, 34, 31],
        xAxisIndex: 0,
        yAxisIndex: 0
      },
      {
        name: '物业费',
        type: 'bar',
        barWidth: '15',
        coordinates: [86.5283203125, 32.40966796875],
        data: [1, 1, 2, 3, 1],
        xAxisIndex: 1,
        yAxisIndex: 1
      },
      {
        name: '水电',
        type: 'bar',
        barWidth: '15',
        coordinates: [98.876953125, 35.74951171875],
        data: [1, 1, 2, 3, 1],
        xAxisIndex: 2,
        yAxisIndex: 2
      },
      {
        name: '网络',
        type: 'bar',
        barWidth: '15',
        coordinates: [108.80859375, 23.44482421875],
        data: [1, 1, 2, 3, 1],
        xAxisIndex: 3,
        yAxisIndex: 3
      },
      {
        name: '燃气',
        type: 'bar',
        barWidth: '15',
        coordinates: [110.53450137499999, 38.44104525],
        data: [1, 1, 2, 3, 1],
        xAxisIndex: 4,
        yAxisIndex: 4
      }
    ];

    series.forEach(function (item, index) {
      options.grid.push({
        show: true,
        containLabel: false,
        borderWidth: 0,
        borderColor: '#fff',
        width: 150,
        height: 80
      });
      options.xAxis.push({
        type: 'category',
        show: true,
        gridIndex: index,
        nameTextStyle: {
          color: '#3c3c3c'
        },
        axisLine: {
          show: false,
          onZero: false
        },
        axisLabel: {
          show: false,
          interval: 0,
          rotate: -45,
          textStyle: {
            color: '#3c3c3c',
            fontSize: 10
          }
        },
        axisTick: {
          show: false
        },
        data: ['新虹桥', '中山公园', '虹桥', '镇宁路', '天山古北']
      });
      options.yAxis.push({
        type: 'value',
        show: true,
        min: 0.001,
        splitLine: {show: false},
        axisLabel: {
          show: false
        },
        axisLine: {
          show: false,
          onZero: false
        },
        nameGap: '1',
        axisTick: {
          show: false
        },
        nameTextStyle: {
          color: '#3c3c3c',
          fontSize: 14
        },
        gridIndex: index
      });
      options.series.push(item)
    })
    const echartslayer = new EChartsLayer(options);
    echartslayer.appendTo(this.map);
  }

  setRef = (x = null) => {
    this.container = x;
  };

  render () {
    return (<div ref={this.setRef} className="map-content"></div>);
  }
}

export default Index;
