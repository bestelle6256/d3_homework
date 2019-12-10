////////////////////  load the csv data and grab state names, poverty and obesity //////////////////////////////

console.log("Beginning:113");

d3.csv("../StarterCode/assets/data/data.csv").then(function (econdata) {

    // if (error) return console.warn(error);
    // econdata.forEach(function(d){
    //     console.log(d.state);
    //     console.log(d.poverty);
    // });

    console.log("type of econdata ", typeof econdata);
    console.log("length of econdata", econdata.length);


    var state_names = econdata.map(data => data.state);
    var state_poverty = econdata.map(data => parseInt(data.poverty));
    var state_obesity = econdata.map(data => parseInt(data.obesity));
    var max_obesity = d3.max(state_obesity);
    var min_obesity = d3.min(state_obesity);
    var max_poverty = d3.max(state_poverty);
    var min_poverty = d3.min(state_poverty);

    console.log("state names: ", state_names);
    console.log("obesity: ", state_obesity);
    console.log("max obesity: ", max_obesity);
    console.log("poverty: ", state_poverty);
    console.log("max poverty: ",max_poverty);
    // state_names = ["A","B"]


//////////////////////////////// set up the svg ////////////////////////////////////////

var svgHeight = 500;
var svgWidth = 1000;

var margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  };

var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;

var svg = d3.select("#scatter").append("svg");
svg.attr("width",svgWidth).attr("height",svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);


//////////////////////////////// create the circles ////////////////////////////////////////

// function used for updating x-scale and y-scale

var xScale = d3.scaleLinear()
      .domain([min_poverty*0.9, max_poverty*1.1])
      .range([0, chartWidth]);
  

var yScale = d3.scaleLinear()
  .domain([min_obesity*0.9, max_obesity*1.1])
  .range([chartHeight, 0]);


// append circles
chartGroup.selectAll("circle")
.data(econdata)
.enter()
.append("circle")
.attr("cx", d => xScale(d.poverty))
.attr("cy", d => yScale(d.obesity))
.attr("r", 15)
.attr("fill","green");


// add state names to circles - for some reason this part didn't work
chartGroup.selectAll("circle")
.data(econdata)
.enter()
.append("text")
.text(d => d.abbr)
.attr("dx", d => xScale(d.poverty))
.attr("dy", d => yScale(d.obesity)+5)
.attr("font-size",15)
.attr("class", "stateText");

//////////////////////////////// create axis //////////////////////////////////////////////

// X and Y axis (not the labels but only axis)
var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);


chartGroup.append("g")
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(xAxis);

chartGroup.append("g")
  .call(yAxis);



});