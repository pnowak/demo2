/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _highchartsWrapper = __webpack_require__(4);

var _highchartsWrapper2 = _interopRequireDefault(_highchartsWrapper);

var _amChartsWrapper = __webpack_require__(1);

var _amChartsWrapper2 = _interopRequireDefault(_amChartsWrapper);

var _chartJsWrapper = __webpack_require__(2);

var _chartJsWrapper2 = _interopRequireDefault(_chartJsWrapper);

var _fusionChartsWrapper = __webpack_require__(3);

var _fusionChartsWrapper2 = _interopRequireDefault(_fusionChartsWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SELECTED_CLASS = 'selected';
var START = 'Start';
var PAUSE = 'Pause';
var RESET = 'Reset';
var STARTTIME = '00:00:00';
var chartWrappers = [];
var mapTimerRow = new Map();
var mapChartsToWrapper = new Map();

mapChartsToWrapper.set('Highcharts', _highchartsWrapper2.default);
mapChartsToWrapper.set('amCharts', _amChartsWrapper2.default);
mapChartsToWrapper.set('Chart.js', _chartJsWrapper2.default);
mapChartsToWrapper.set('FusionCharts', _fusionChartsWrapper2.default);

var Timer = function () {
  function Timer(row) {
    _classCallCheck(this, Timer);

    this.row = row;
    this.interval = null;
    this.currentTime = null;
    this.duration = 0;
    this.timeStamp = new Date();
    this.status = 0;
  }

  _createClass(Timer, [{
    key: 'start',
    value: function start(hotInstance, row, column) {
      var _this = this;

      this.currentTime = hotInstance.getDataAtCell(row, column);
      this.duration = moment.duration(this.currentTime);

      if (this.status === 0) {
        this.status = 1;
        this.interval = setInterval(function () {
          _this.timeStamp = new Date(_this.timeStamp.getTime() + 1000);

          _this.duration = moment.duration(_this.duration.asSeconds() + 1, 'seconds');

          var hours = _this.duration.hours();
          var minutes = _this.duration.minutes();
          var seconds = _this.duration.seconds();

          hotInstance.setDataAtCell(row, column, hours + ':' + minutes + ':' + seconds);
        }, 1000);
      }
    }
  }, {
    key: 'pause',
    value: function pause() {
      if (this.status === 1) {
        this.status = 0;
        clearInterval(this.interval);
        this.interval = 0;
      }
    }
  }, {
    key: 'reset',
    value: function reset(hotInstance, row, column) {
      this.status = 0;
      clearInterval(this.interval);
      this.interval = null;

      this.currentTime = STARTTIME;
      this.duration = moment.duration(this.currentTime);

      hotInstance.setDataAtCell(row, column, STARTTIME);
    }
  }]);

  return Timer;
}();

function initButtonsListener(hotInstance) {
  var rootElement = document.getElementById('root');

  for (var rowIndex = 0; rowIndex < hotInstance.countRows(); rowIndex += 1) {
    mapTimerRow.set(rowIndex, new Timer(rowIndex));
  }

  rootElement.addEventListener('click', function (event) {
    var target = event.target;
    var isButton = target.nodeName.toLowerCase() === 'button';

    if (isButton) {
      var td = target.parentNode;
      var colIndex = td.cellIndex - 2;
      var _rowIndex = td.parentNode.rowIndex - 1;

      if (target.textContent === START) {
        mapTimerRow.get(_rowIndex).start(hotInstance, _rowIndex, colIndex);
      } else if (target.textContent === PAUSE) {
        mapTimerRow.get(_rowIndex).pause();
        target.textContent = 'Start';
      } else if (target.textContent === RESET) {
        mapTimerRow.get(_rowIndex).reset(hotInstance, _rowIndex, colIndex - 1);
      }
    }
  });
}

function onAfterInit() {
  var _this2 = this;

  var isListItem = document.getElementsByTagName('li');
  var allListItems = Array.from(isListItem);

  allListItems.forEach(function (li) {
    if (Handsontable.dom.hasClass(li, SELECTED_CLASS)) {
      var chartName = li.children[0].textContent;
      var ActiveChartWrapper = mapChartsToWrapper.get(chartName);

      chartWrappers.push(new ActiveChartWrapper('chart', _this2));
    }
  });
}

function onAfterSetDataAtCell(changes) {
  var _this3 = this;

  changes.forEach(function (change) {
    chartWrappers.forEach(function (chartWrapper) {
      var _change = _slicedToArray(change, 4),
          row = _change[0],
          column = _change[1],
          currentValue = _change[3];

      chartWrapper.updateCellData(row, column, currentValue, _this3);
    });
  });
}

function onAfterRemoveRow(index) {
  var _this4 = this;

  chartWrappers.forEach(function (chartWrapper) {
    chartWrapper.removeRow(index, _this4);
  });
}

function onAfterCreateRow(index) {
  var _this5 = this;

  for (var rowIndex = 0; rowIndex < this.countRows(); rowIndex += 1) {
    mapTimerRow.set(rowIndex, new Timer(rowIndex));
  }

  chartWrappers.forEach(function (chartWrapper) {
    chartWrapper.addNewRow(index, _this5);
  });
}

function startPauseButtonRenderer(instance, td, row, col, prop, value) {
  var escaped = void 0;

  if (mapTimerRow.get(row) === undefined) {
    escaped = Handsontable.helper.stringify('<button type="button">Start</button>');
  } else if (mapTimerRow.get(row).status === 1 && mapTimerRow.get(row).interval > 0) {
    escaped = Handsontable.helper.stringify('<button type="button">Pause</button>');
  } else if (mapTimerRow.get(row).status === 1 && mapTimerRow.get(row).interval > 0) {
    escaped = Handsontable.helper.stringify('<button type="button">Pause</button>');
  } else if (mapTimerRow.get(row).status === 0 && mapTimerRow.get(row).interval === 0) {
    escaped = Handsontable.helper.stringify('<button type="button">Start</button>');
  } else {
    escaped = Handsontable.helper.stringify('<button type="button">Start</button>');
  }

  Handsontable.dom.addClass(td, 'htCenter');

  td.innerHTML = escaped;

  return td;
}

function resetButtonRenderer(instance, td, row, col, prop, value) {
  var escaped = Handsontable.helper.stringify('<button type="button">Reset</button>');

  Handsontable.dom.addClass(td, 'htCenter');

  td.innerHTML = escaped;

  return td;
}

Handsontable.renderers.registerRenderer('start/pause', startPauseButtonRenderer);
Handsontable.renderers.registerRenderer('reset', resetButtonRenderer);

var hot = new Handsontable(document.getElementById('root'), {
  data: [['Task 1', 'Tom', '13/11/2018', STARTTIME, null, null], ['Task 2', 'Mark', '14/11/2018', STARTTIME, null, null], ['Task 3', 'Kate', '15/11/2018', STARTTIME, null, null]],
  colHeaders: ['Task', 'User', 'Date', 'Time spent', 'Start/Pause', 'Reset'],
  rowHeaders: true,
  columns: [{}, {
    type: 'dropdown',
    source: ['Tom', 'Mark', 'Kate', 'Eddy']
  }, {
    type: 'date',
    dateFormat: 'MM/DD/YYYY',
    correctFormat: true,
    allowEmpty: false
  }, {
    type: 'time',
    timeFormat: 'HH:mm:ss',
    correctFormat: true,
    readOnly: true
  }, {
    renderer: 'start/pause',
    readOnly: true
  }, {
    renderer: 'reset',
    readOnly: true
  }],
  contextMenu: ['remove_row', 'row_below', 'commentsAddEdit'],
  className: 'htCenter',
  width: 650,
  colWidth: 110,
  allowInvalid: false,
  autoWrapCol: true,
  autoWrapRow: true,
  afterInit: onAfterInit,
  afterSetDataAtCell: onAfterSetDataAtCell,
  afterRemoveRow: onAfterRemoveRow,
  afterCreateRow: onAfterCreateRow
});

initButtonsListener(hot);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* A amChart data visualisation.
*
* Create amChart instance linked with data from Handsontable.
*
* @class AmChartsWrapper.
*/
var AmChartsWrapper = function () {
  /**
  * Create a AmChartsWrapper.
  * @param {string} amChartsRootId - element id.
  * @param {object} hotInstance - a reference to the Handsontable instance.
  */
  function AmChartsWrapper(amChartsRootId, hotInstance) {
    _classCallCheck(this, AmChartsWrapper);

    this.name = 'amCharts';
    this.chart = AmCharts.makeChart(amChartsRootId, AmChartsWrapper.getChartOptions(hotInstance));
  }

  /**
  *
  * amChart options object.
  *
  * @returns {Object} amChart object configs.
  */


  _createClass(AmChartsWrapper, [{
    key: 'removeRow',


    /**
    *
    * Remove row
    *
    * @param {Number} index index remove row.
    *
    */
    value: function removeRow(index) {
      this.chart.graphs[0].data.splice(index, 1);
      this.chart.dataProvider.splice(index, 1);

      this.chart.validateNow(true);
    }

    /**
    *
    * Create new row
    *
    * @param {Number} index index next row.
    * @param {Object} Handsontable object.
    *
    */

  }, {
    key: 'addNewRow',
    value: function addNewRow(index, hotInstance) {
      var object = {};

      object.name = hotInstance.getDataAtCell(index, 0);
      object.data = 0;

      this.chart.dataProvider.splice(index, 0, object);

      this.chart.validateNow(true);
    }

    /**
    *
    * Watches changes from Handsontable and updates it in the chart.
    *
    * @param {Number} column column index.
    * @param {Number} value column value.
    *
    */

  }, {
    key: 'updateCellData',
    value: function updateCellData(row, column, value) {
      if (value.includes(':')) {
        var valueSplit = value.split(':');
        var seconds = +valueSplit[0] * (60 * 60) + +valueSplit[1] * 60 + +valueSplit[2];

        this.chart.dataProvider[row].data = seconds;
        this.chart.validateNow(true);
      } else if (column === 0) {
        this.chart.dataProvider[row].name = value;
        this.chart.validateNow(true);
      }
    }
  }], [{
    key: 'getChartOptions',
    value: function getChartOptions(hotInstance) {
      return {
        type: 'serial',
        theme: 'light',
        dataProvider: AmChartsWrapper.zipTaskWithTimeData(hotInstance),
        gridAboveGraphs: true,
        startDuration: 0,
        categoryField: 'name',
        categoryAxis: {
          gridPosition: 'start',
          gridAlpha: 0,
          tickPosition: 'start',
          tickLength: 20
        },
        graphs: [{
          balloonText: '[[category]]: <b>[[value]]</b>',
          fillAlphas: 0.8,
          lineAlpha: 0.2,
          type: 'column',
          valueField: 'data'
        }],
        valueAxes: [{
          gridColor: '#FFFFFF',
          gridAlpha: 0.2,
          dashLength: 0
        }],
        export: {
          enabled: true
        }
      };
    }

    /**
    * Helper function.
    *
    * Zip column header to the value of the column from Handsontable object settings.
    * amCharts data provider needs data array in form:
    *
    * @example
    * {
    *  name: "Task 1",
    *  data: 0
    * }
    *
    * @param {Object} Handsontable object.
    * @returns {Array} a merged key-value pair in array.
    */

  }, {
    key: 'zipTaskWithTimeData',
    value: function zipTaskWithTimeData(hotInstance) {
      var rowsArray = [];

      for (var index = 0; index < hotInstance.countRows(); index += 1) {
        var obj = {};

        obj.name = hotInstance.getDataAtCell(index, 0);
        obj.data = 0;

        rowsArray.push(obj);console.log(obj);
      }

      return rowsArray;
    }
  }]);

  return AmChartsWrapper;
}();

exports.default = AmChartsWrapper;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* A ChartJs data visualisation.
*
* Create ChartJs instance linked with data from Handsontable.
*
* @class ChartJsWrapper.
*/
var ChartJsWrapper = function () {
  /**
  * Create a ChartJsWrapper.
  * @param {string} chartJsRootId - element id.
  * @param {object} hotInstance - a reference to the Handsontable instance.
  */
  function ChartJsWrapper(chartJsRootId, hotInstance) {
    _classCallCheck(this, ChartJsWrapper);

    this.name = 'ChartJs';
    this.chart = new Chart(document.getElementById(chartJsRootId), ChartJsWrapper.getChartOptions(hotInstance));
  }

  /**
  *
  * ChartJs options object.
  *
  * @returns {Object} ChartJs object configs.
  */


  _createClass(ChartJsWrapper, [{
    key: 'removeRow',


    /**
    *
    *
    *
    * @param {}
    *
    */
    value: function removeRow(index) {
      this.chart.data.datasets[0].data.splice(index, 1);
      this.chart.data.labels.splice(index, 1);

      this.chart.update();
    }

    /**
    *
    * Create new row
    *
    * @param {Number} index index next row.
    * @param {Object} Handsontable object.
    *
    */

  }, {
    key: 'addNewRow',
    value: function addNewRow(index) {
      this.chart.data.datasets[0].data.splice(index, 0, 0);
      this.chart.data.labels.splice(index, 0, null);

      this.chart.update();
    }

    /**
    *
    * Watches changes from Handsontable and updates it in the chart.
    *
    * @param {Number} column column index.
    * @param {Number} value column value.
    *
    */

  }, {
    key: 'updateCellData',
    value: function updateCellData(row, column, value) {
      if (value.includes(':')) {
        var valueSplit = value.split(':');
        var seconds = +valueSplit[0] * (60 * 60) + +valueSplit[1] * 60 + +valueSplit[2];

        this.chart.data.datasets[0].data[row] = seconds;
        this.chart.update();
      } else if (column === 0) {
        this.chart.data.labels[row] = value;
        this.chart.update();
      }
    }
  }], [{
    key: 'getChartOptions',
    value: function getChartOptions(hotInstance) {
      return {
        type: 'bar',
        data: {
          labels: ChartJsWrapper.updateTaskColumn(hotInstance),
          datasets: [{
            data: ChartJsWrapper.initTimeSpentData(hotInstance),
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
            borderWidth: 1
          }]
        },
        options: {
          animation: {
            duration: 1000,
            easing: 'linear'
          },
          legend: {
            display: false
          },
          title: {
            display: true,
            fontSize: 32,
            fontStyle: 'normal',
            text: 'Chart.js & Handsontable'
          },
          tooltips: {
            titleFontSize: 24,
            bodyFontSize: 21
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                fontSize: 23
              }
            }],
            xAxes: [{
              ticks: {
                fontSize: 23
              }
            }]
          }
        }
      };
    }

    /**
    * Helper function.
    *
    * Zip column header to the value of the column from Handsontable object settings.
    * amCharts data provider needs data array in form:
    *
    * @example
    * {
    *  label: "Game 1",
    *  data: [144, 12, 13]
    * }
    *
    * @param {Object} Handsontable object.
    * @returns {Array} a merged key-value pair in array.
    */

  }, {
    key: 'initTimeSpentData',
    value: function initTimeSpentData(hotInstance) {
      var rowsArray = [];

      for (var index = 0; index < hotInstance.countRows(); index += 1) {
        rowsArray.push(0);
      }

      return rowsArray;
    }

    /**
    * Helper function.
    *
    * @param {Object} Handsontable object.
    * @returns {Array} a array with task label.
    */

  }, {
    key: 'updateTaskColumn',
    value: function updateTaskColumn(hotInstance) {
      var categoriesArray = [];

      for (var indexRow = 0; indexRow < hotInstance.countRows(); indexRow += 1) {
        categoriesArray.push(hotInstance.getDataAtCell(indexRow, 0));
      }

      return categoriesArray;
    }
  }]);

  return ChartJsWrapper;
}();

exports.default = ChartJsWrapper;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* A FusionCharts data visualisation.
*
* Create FusionCharts instance linked with data from Handsontable.
*
* @class FusionChartsWrapper.
*/
var FusionChartsWrapper = function () {
  /**
  * Create a FusionChartsWrapper.
  * @param {string} fusionChartsRootId - element id.
  * @param {object} hotInstance - a reference to the Handsontable instance.
  */
  function FusionChartsWrapper(fusionChartsRootId, hotInstance) {
    _classCallCheck(this, FusionChartsWrapper);

    this.name = 'fusioncharts';
    this.chart = new FusionCharts(FusionChartsWrapper.getChartOptions(fusionChartsRootId, hotInstance)).render();
  }

  /**
  *
  * FusionCharts options object.
  *
  * @returns {Object} FusionCharts object configs.
  */


  _createClass(FusionChartsWrapper, [{
    key: 'removeRow',


    /**
    *
    *
    *
    * @param {}
    *
    */
    value: function removeRow(index) {
      this.chart.args.dataSource.data.splice(index, 1);

      this.chart.setJSONData(this.chart.args.dataSource);
    }

    /**
    *
    * Create new row
    *
    * @param {Number} index index next row.
    * @param {Object} Handsontable object.
    *
    */

  }, {
    key: 'addNewRow',
    value: function addNewRow(index, hotInstance) {
      var obj = {};

      obj.label = hotInstance.getDataAtCell(index, 0);
      obj.value = 0;

      this.chart.args.dataSource.data.splice(index, 0, obj);

      this.chart.setJSONData(this.chart.args.dataSource);
    }

    /**
    *
    * Watches changes from Handsontable and updates it in the chart.
    *
    * @param {Number} column column index.
    * @param {Number} value column value.
    *
    */

  }, {
    key: 'updateCellData',
    value: function updateCellData(row, column, value) {
      if (value.includes(':')) {
        var valueSplit = value.split(':');
        var seconds = +valueSplit[0] * (60 * 60) + +valueSplit[1] * 60 + +valueSplit[2];

        this.chart.args.dataSource.data[row].value = seconds;
        this.chart.setJSONData(this.chart.args.dataSource);
      } else if (column === 0) {
        this.chart.args.dataSource.data[row].label = value;
        this.chart.setJSONData(this.chart.args.dataSource);
      }
    }
  }], [{
    key: 'getChartOptions',
    value: function getChartOptions(fusionChartsRootId, hotInstance) {
      return {
        id: 'fusionChart',
        type: 'column2d',
        renderAt: fusionChartsRootId,
        width: 650,
        height: 420,
        dataFormat: 'json',
        dataSource: {
          chart: {
            caption: 'FusionCharts & Handsontable',
            xAxisName: 'Task',
            yAxisName: 'Seconds'
          },
          data: FusionChartsWrapper.zipTaskWithTimeData(hotInstance)
        }
      };
    }

    /**
    * Helper function.
    *
    * Zip column header to the value of the column from Handsontable object settings.
    * amCharts data provider needs data array in form:
    *
    * @example
    * {
    *  label: "1",
    *  value: 0
    * }
    *
    * @param {Object} Handsontable object.
    * @returns {Array} a merged key-value pair in array.
    */

  }, {
    key: 'zipTaskWithTimeData',
    value: function zipTaskWithTimeData(hotInstance) {
      var rowsArray = [];

      for (var index = 0; index < hotInstance.countRows(); index += 1) {
        var obj = {};

        obj.label = hotInstance.getDataAtCell(index, 0);
        obj.value = 0;

        rowsArray.push(obj);console.log(obj);
      }

      return rowsArray;
    }

    /**
    * Helper function.
    *
    *
    *
    * @param {Object} Handsontable object.
    * @returns {Array} a merged key-value pair in array.
    */

  }, {
    key: 'updateChartColumns',
    value: function updateChartColumns(hotInstance) {
      var category = [];

      for (var index = 0; index < hotInstance.countRows(); index += 1) {
        var o = {};

        o.label = hotInstance.getDataAtCell(index, 0);

        category.push(o);
      }

      return category;
    }
  }]);

  return FusionChartsWrapper;
}();

exports.default = FusionChartsWrapper;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* A Highcharts data visualisation.
*
* Create Highcharts instance linked with data from Handsontable.
*
* @class HighchartsWrapper.
*/
var HighchartsWrapper = function () {
  /**
  * Create a HighChartsWrapper.
  * @param {string} highChartsRootId - element id.
  * @param {object} hotInstance - a reference to the Handsontable instance.
  */
  function HighchartsWrapper(highChartsRootId, hotInstance) {
    _classCallCheck(this, HighchartsWrapper);

    this.name = 'highcharts';
    this.chart = new Highcharts.Chart(document.getElementById(highChartsRootId), HighchartsWrapper.getChartOptions(hotInstance));
  }

  /**
  *
  * HighCharts options object.
  *
  * @returns {Object} HighCharts object configs.
  */


  _createClass(HighchartsWrapper, [{
    key: 'removeRow',


    /**
    *
    * Remove row
    *
    * @param {Number} index index remove row.
    * @param {Object} Handsontable object.
    *
    */
    value: function removeRow(index, hotInstance) {
      this.chart.series[0].data.splice(index, 1);console.log(this.chart.series[0]);

      this.chart.update(HighchartsWrapper.getChartOptions(hotInstance));
    }

    /**
    *
    * Create new row
    *
    * @param {Number} index index next row.
    * @param {Object} Handsontable object.
    *
    */

  }, {
    key: 'addNewRow',
    value: function addNewRow(index, hotInstance) {
      this.chart.series[0].data.splice(index, 0, 0);console.log(this.chart.series[0]);

      this.chart.update(HighchartsWrapper.getChartOptions(hotInstance));
    }

    /**
    *
    * Watches changes from Handsontable and updates it in the chart.
    *
    * @param {Number} row row index.
    * @param {Number} column column index.
    * @param {Number} value column value.
    *
    */

  }, {
    key: 'updateCellData',
    value: function updateCellData(row, column, value) {
      if (value.includes(':')) {
        var valueSplit = value.split(':');
        var seconds = +valueSplit[0] * (60 * 60) + +valueSplit[1] * 60 + +valueSplit[2];

        this.chart.series[0].data[row].update(seconds);
      } else if (column === 0) {
        this.chart.series[0].data[row].update(value);
        console.log(this.chart.series[0].data[row]);
      }
    }
  }], [{
    key: 'getChartOptions',
    value: function getChartOptions(hotInstance) {
      return {
        chart: {
          type: 'column',
          width: 650,
          animation: Highcharts.svg
        },
        title: {
          text: 'Highcharts & Handsontable'
        },
        plotOptions: {
          spline: {
            dataLabels: {
              enabled: true
            },
            marker: {
              enabled: true
            },
            enableMouseTracking: false
          }
        },
        yAxis: {
          title: {
            text: 'Seconds'
          }
        },
        xAxis: {
          categories: HighchartsWrapper.updateTaskColumn(hotInstance)
        },
        series: [{
          colorByPoint: true,
          data: HighchartsWrapper.initTimeSpentData(hotInstance)
        }]
      };
    }

    /**
    * Helper function.
    *
    * Zip column header to the value of the column from Handsontable object settings.
    * amCharts data provider needs data array in form:
    *
    * @example
    *
    *  "data": [0, 1, 2]
    *
    *
    * @param {Object} Handsontable object.
    * @returns {Array} a merged key-value pair in array.
    */

  }, {
    key: 'initTimeSpentData',
    value: function initTimeSpentData(hotInstance) {
      var rowsArray = [];

      for (var index = 0; index < hotInstance.countRows(); index += 1) {
        rowsArray.push(0);
      }

      return rowsArray;
    }

    /**
    * Helper function.
    *
    *
    *
    * @param {Object} Handsontable object.
    * @returns {Array} a date array.
    */

  }, {
    key: 'updateTaskColumn',
    value: function updateTaskColumn(hotInstance) {
      var categoriesArray = [];

      for (var index = 0; index < hotInstance.countRows(); index += 1) {
        categoriesArray.push(hotInstance.getDataAtCell(index, 0));
      }

      return categoriesArray;
    }
  }]);

  return HighchartsWrapper;
}();

exports.default = HighchartsWrapper;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map