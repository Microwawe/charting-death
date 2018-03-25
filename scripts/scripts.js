var colors = []

$( document ).ready(function() {

// Variables to refer to our chart selectors
var cdc_chart = "#cdc_chart";
var google_chart = "#google_chart";
var guardian_chart = "#guardian_chart";
var nyt_chart = "#nyt_chart";

// Variables to refer to our data paths
var google_path = 'data/tp_google_trends_normalized.csv';

// Variables to store our csv data as a JS Object
var cdc_data = [];
var google_data = [];
var nyt_data = [];
var guardian_data = [];

var google_config = {
  	delimiter: "",	// auto-detect
  	newline: "",	// auto-detect
  	quoteChar: '"',
  	escapeChar: '"',
  	header: true,
  	dynamicTyping: false,
  	preview: 0,
  	encoding: "",
  	worker: false,
  	comments: false,
  	step: undefined,
  	complete: function(results) {
      google_data = results.data;
      chart_data(google_data, 1, google_chart);
     },
  	error: undefined,
  	download: false,
  	skipEmptyLines: false,
  	chunk: undefined,
  	fastMode: undefined,
  	beforeFirstChunk: undefined,
  	withCredentials: undefined
  }

$.get(google_path, function (data) {
      var csvdata = Papa.parse(data, google_config);
  });

function chart_data(data, year, chart_id) {
  label_list = [];
  data_list = [];

  // Hard-coded limit to solve problems w/ undefined
  for (var i = 0; i < 13; i++) {
    label_list.push(data[0][i]);
    var temp_data = {
      label: data[0][i],
      data: [data[year][i]],
      borderWidth: 1
    };
    data_list.push(temp_data);
  }

  var canvas = $(chart_id);
  var chart = new Chart(canvas, {
    type: 'bar',
    data: {
      // labels: label_list,
      datasets: data_list
    },
    options: {
      scales: {
        yAxes: [{
          beginAtZero:true,
          ticks: {
            min: 0,
            autoSkip: false}}],
        xAxes: [{
          stacked: false,
          beginAtZero: true,
          ticks: {
            min: 0,
            autoSkip: false}}]
        },
        legend: {
          display: true,
          position: 'top'
        }
    }});
  }



});
