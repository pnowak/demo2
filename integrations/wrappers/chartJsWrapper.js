/**
* A ChartJs data visualisation.
*
* Create ChartJs instance linked with data from Handsontable.
*
* @class ChartJsWrapper.
*/
class ChartJsWrapper {
/**
* Create a ChartJsWrapper.
* @param {string} chartJsRootId - element id.
* @param {object} hotInstance - a reference to the Handsontable instance.
*/
  constructor(chartJsRootId, hotInstance) {
    this.name = 'ChartJs';
    this.chart = new Chart(document.getElementById(chartJsRootId),
    ChartJsWrapper.getChartOptions(hotInstance));
  }

/**
*
* ChartJs options object.
*
* @returns {Object} ChartJs object configs.
*/
  static getChartOptions(hotInstance) {
    return {
      type: 'bar',
      data: {
        labels: ChartJsWrapper.updateTaskColumn(hotInstance),
        datasets: [{
          data: ChartJsWrapper.initTimeSpentData(hotInstance),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        }],
      },
      options: {
        animation: {
          duration: 1000,
          easing: 'linear',
        },
        legend: {
          display: false,
        },
        title: {
          display: true,
          fontSize: 32,
          fontStyle: 'normal',
          text: 'Chart.js & Handsontable',
        },
        tooltips: {
          titleFontSize: 24,
          bodyFontSize: 21,
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              fontSize: 23,
              min: 0,
              stepSize: 100,
            },
            scaleSteps: 10,
          }],
          xAxes: [{
            ticks: {
              fontSize: 23,
            },
          }],
        },
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
*  label: "Game 1",
*  data: [144, 12, 13]
* }
*
* @param {Object} Handsontable object.
* @returns {Array} a merged key-value pair in array.
*/
  static initTimeSpentData(hotInstance) {
    const rowsArray = [];

    for (let index = 0; index < hotInstance.countRows(); index += 1) {
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
  static updateTaskColumn(hotInstance) {
    const categoriesArray = [];

    for (let indexRow = 0; indexRow < hotInstance.countRows(); indexRow += 1) {
      categoriesArray.push(hotInstance.getDataAtCell(indexRow, 0));
    }

    return categoriesArray;
  }

  /**
*
*
*
* @param {}
*
*/
  removeRow(index) {
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
  addNewRow(index) {
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
  updateCellData(row, column, value) {
    if (value.includes(':')) {
      const valueSplit = value.split(':');
      const seconds = (((+valueSplit[0]) * (60 * 60)) + ((+valueSplit[1]) * 60) + (+valueSplit[2]));

      this.chart.data.datasets[0].data[row] = seconds;
      this.chart.update();
    } else if (column === 0) {
      this.chart.data.labels[row] = value;
      this.chart.update();
    }
  }
}

export default ChartJsWrapper;
