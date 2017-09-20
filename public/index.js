import Handsontable from 'handsontable';
import HighchartsWrapper from './integrations/highcharts';
import AmChartsWrapper from './integrations/amCharts';
import ChartJsWrapper from './integrations/chartJs';
import FusionChartsWrapper from './integrations/fusionCharts';

const chartWrappers = [];
const selectedClass = 'selected';
const mapChartsToWrapper = new Map();

mapChartsToWrapper.set('Highcharts', HighchartsWrapper);
mapChartsToWrapper.set('amCharts', AmChartsWrapper);
mapChartsToWrapper.set('Chart.js', ChartJsWrapper);
mapChartsToWrapper.set('FusionCharts', FusionChartsWrapper);

function onAfterInit() {
  const isListItem = document.getElementsByTagName('li');
  const allListItems = Array.from(isListItem);

  allListItems.forEach((li) => {
    if (Handsontable.dom.hasClass(li, selectedClass)) {
      const chartName = li.children[0].textContent;
      const ActiveChartWrapper = mapChartsToWrapper.get(chartName);

      chartWrappers.push(new ActiveChartWrapper('chart', this));
    }
  });
}

function onBeforeChange(changes) {
  changes.forEach((change) => {
    chartWrappers.forEach((chartWrapper) => {
      const [row, column] = change;
      const currentValue = change[3] === '' ? 0 : change[3];

      if (change[3] === '') {
        this.setDataAtCell(row, column, 0, 'onBeforeChange');
      }

      chartWrapper.updateChartData(column, currentValue);
    });
  });
}

function initJsFiddle() {
  const jsFiddleLink = document.getElementById('jsfiddle');
  const textAreaValue = document.getElementById('codeExample').value;
  const chartDOMElement = document.getElementById('chart');
  const html = `<div id="root"></div>\n${chartDOMElement.getContext ? '<canvas id="chart" style="width: 650px; height: 420px;"></canvas>' : '<div id="chart" style="width: 650px; height: 420px;"></div>'}`;
  const css = '</style><link rel="stylesheet" type="text/css" href="http://docs.handsontable.com/pro/bower_components/handsontable-pro/dist/handsontable.full.min.css"><script src="http://docs.handsontable.com/pro/bower_components/handsontable-pro/dist/handsontable.full.min.js"></script><script src="https://code.highcharts.com/highcharts.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.0/Chart.bundle.min.js"></script><script src="https://www.amcharts.com/lib/3/amcharts.js"></script><script src="https://cdn.amcharts.com/lib/3/serial.js"></script><script src="https://cdn.amcharts.com/lib/3/pie.js"></script><script src="https://cdn.amcharts.com/lib/3/themes/light.js"></script><script type="text/javascript" src="https://cdn.jsdelivr.net/npm/fusioncharts@3.12.1/fusioncharts.js"></script><script type="text/javascript" src="https://cdn.jsdelivr.net/npm/fusioncharts@3.12.1/fusioncharts.charts.js"></script>';
  const js = textAreaValue;

  const form = document.createElement('form');
  form.action = 'http://jsfiddle.net/api/post/library/pure/';
  form.method = 'POST';
  form.target = '_blank';
  form.innerHTML = `<input type="text" name="title" value="">
    <textarea name="html">${html.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</textarea>
    <textarea name="css">${css.replace(/,/g, '').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</textarea>;
    <textarea name="js">${js.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</textarea>`;

  form.style.visibility = 'hidden';

  document.body.appendChild(form);

  jsFiddleLink.addEventListener('click', (event) => {
    event.preventDefault();
    form.submit();
  });
}

// eslint-disable-next-line no-new
new Handsontable(document.getElementById('root'), {
  data: [
    [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
  ],
  colHeaders: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  rowHeaders: true,
  type: 'numeric',
  width: 650,
  maxRows: 1,
  stretchH: 'all',
  allowInvalid: false,
  afterInit: onAfterInit,
  beforeChange: onBeforeChange,
});

initJsFiddle();
