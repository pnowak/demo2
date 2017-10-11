/**
* A Highcharts data visualisation.
*
* Create Highcharts instance linked with data from Handsontable.
*
* @class HighchartsWrapper.
*/
class HighchartsWrapper {
/**
* Create a HighChartsWrapper.
* @param {string} highChartsRootId - element id.
* @param {object} hotInstance - a reference to the Handsontable instance.
*/
  constructor(highChartsRootId, hotInstance) {
    this.name = 'highcharts';
    this.chart = new Highcharts.Chart(document.getElementById(highChartsRootId),
    HighchartsWrapper.getChartOptions(hotInstance)); console.log(this.chart);
  }

/**
*
* HighCharts options object.
*
* @returns {Object} HighCharts object configs.
*/
  static getChartOptions(hotInstance) {
    return {
      chart: {
        type: 'column',
        width: 650,
        animation: Highcharts.svg,
      },
      title: {
        text: 'Highcharts & Handsontable',
      },
      plotOptions: {
        spline: {
          dataLabels: {
            enabled: true,
          },
          marker: {
            enabled: true,
          },
          enableMouseTracking: false,
        },
      },
      yAxis: {
        title: {
          text: 'Seconds',
        },
        minRange: 100,
        min: 0,
      },
      xAxis: {
        categories: HighchartsWrapper.updateTaskColumn(hotInstance),
      },
      series: HighchartsWrapper.initTimeSpentData(hotInstance),
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
  static initTimeSpentData(hotInstance) {
    const rowsArray = [];

    for (let index = 0; index < hotInstance.countRows(); index += 1) {
      const object = {};

      object.name = hotInstance.getDataAtCell(index, 0);
      object.data = 0;

      rowsArray.push(object);
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
  static updateTaskColumn(hotInstance) {
    const categoriesArray = [];

    for (let index = 0; index < hotInstance.countRows(); index += 1) {
      categoriesArray.push(hotInstance.getDataAtCell(index, 0));
    }

    return categoriesArray;
  }

  /**
*
* Remove row
*
* @param {Number} index index remove row.
* @param {Object} Handsontable object.
*
*/
  removeRow(index, hotInstance) {
    this.chart.series[index].remove(); console.log(this.chart.series);

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
  addNewRow(index, hotInstance) {
    const object = {};

    object.name = 'Task';
    object.data = 0;

    this.chart.addSeries(object); console.log(this.chart.series);

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
  updateCellData(row, column, value, hotInstance) {
    if (value.includes(':')) {
      const valueSplit = value.split(':');
      const seconds = (((+valueSplit[0]) * (60 * 60)) + ((+valueSplit[1]) * 60) + (+valueSplit[2]));
      console.log(this.chart.series);
      this.chart.series[row].data.update(seconds);
    } else if (column === 0) {
      this.chart.series[row].data.update(value);
    }
  }
}

export default HighchartsWrapper;
