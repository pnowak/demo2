/**
* A FusionCharts data visualisation.
*
* Create FusionCharts instance linked with data from Handsontable.
*
* @class FusionChartsWrapper.
*/
class FusionChartsWrapper {
/**
* Create a FusionChartsWrapper.
* @param {string} fusionChartsRootId - element id.
* @param {object} hotInstance - a reference to the Handsontable instance.
*/
  constructor(fusionChartsRootId, hotInstance) {
    this.name = 'fusioncharts';
    this.chart = new FusionCharts(FusionChartsWrapper
      .getChartOptions(fusionChartsRootId, hotInstance))
    .render();
  }

/**
*
* FusionCharts options object.
*
* @returns {Object} FusionCharts object configs.
*/
  static getChartOptions(fusionChartsRootId, hotInstance) {
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
          yAxisName: 'Seconds',
        },
        data: FusionChartsWrapper.zipTaskWithTimeData(hotInstance),
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
*  label: "1",
*  value: 0
* }
*
* @param {Object} Handsontable object.
* @returns {Array} a merged key-value pair in array.
*/
  static zipTaskWithTimeData(hotInstance) {
    const rowsArray = [];

    for (let index = 0; index < hotInstance.countRows(); index += 1) {
      const obj = {};

      obj.label = hotInstance.getDataAtCell(index, 0);
      obj.value = 0;

      rowsArray.push(obj); console.log(obj);
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
  static updateChartColumns(hotInstance) {
    const category = [];

    for (let index = 0; index < hotInstance.countRows(); index += 1) {
      const o = {};

      o.label = hotInstance.getDataAtCell(index, 0);

      category.push(o);
    }

    return category;
  }

  /**
*
*
*
* @param {}
*
*/
  removeRow(index) {
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
  addNewRow(index, hotInstance) {
    const obj = {};

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
  updateCellData(row, column, value) {
    if (value.includes(':')) {
      const valueSplit = value.split(':');
      const seconds = (((+valueSplit[0]) * (60 * 60)) + ((+valueSplit[1]) * 60) + (+valueSplit[2]));

      this.chart.args.dataSource.data[row].value = seconds;
      this.chart.setJSONData(this.chart.args.dataSource);
    } else if (column === 0) {
      this.chart.args.dataSource.data[row].label = value;
      this.chart.setJSONData(this.chart.args.dataSource);
    }
  }
}

export default FusionChartsWrapper;
