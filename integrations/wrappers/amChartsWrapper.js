/**
* A amChart data visualisation.
*
* Create amChart instance linked with data from Handsontable.
*
* @class AmChartsWrapper.
*/
class AmChartsWrapper {
/**
* Create a AmChartsWrapper.
* @param {string} amChartsRootId - element id.
* @param {object} hotInstance - a reference to the Handsontable instance.
*/
  constructor(amChartsRootId, hotInstance) {
    this.name = 'amCharts';
    this.chart = AmCharts.makeChart(amChartsRootId,
    AmChartsWrapper.getChartOptions(hotInstance));
  }

/**
*
* amChart options object.
*
* @returns {Object} amChart object configs.
*/
  static getChartOptions(hotInstance) {
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
        tickLength: 20,
      },
      graphs: [{
        balloonText: '[[category]]: <b>[[value]]</b>',
        fillAlphas: 0.8,
        lineAlpha: 0.2,
        type: 'column',
        valueField: 'data',
      }],
      valueAxes: [{
        gridColor: '#FFFFFF',
        gridAlpha: 0.2,
        dashLength: 0,
      }],
      export: {
        enabled: true,
      },
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
  static zipTaskWithTimeData(hotInstance) {
    const rowsArray = [];

    for (let index = 0; index < hotInstance.countRows(); index += 1) {
      const obj = {};

      obj.name = hotInstance.getDataAtCell(index, 0);
      obj.data = 0;

      rowsArray.push(obj); console.log(obj);
    }

    return rowsArray;
  }

  /**
*
* Remove row
*
* @param {Number} index index remove row.
*
*/
  removeRow(index) {
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
  addNewRow(index, hotInstance) {
    const object = {};

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
  updateCellData(row, column, value) {
    if (value.includes(':')) {
      const valueSplit = value.split(':');
      const seconds = (((+valueSplit[0]) * (60 * 60)) + ((+valueSplit[1]) * 60) + (+valueSplit[2]));

      this.chart.dataProvider[row].data = seconds;
      this.chart.validateNow(true);
    } else if (column === 0) {
      this.chart.dataProvider[row].name = value;
      this.chart.validateNow(true);
    }
  }
}

export default AmChartsWrapper;
