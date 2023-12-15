// add your JavaScript/D3 to this file

// The data values below were computed in r as the
// server did not allow us to directly load csv
const data = [
  { Group: "Top 5", "% Total Saves": 20.90370 },
  { Group: "5th-10th", "% Total Saves": 27.24783 },
  { Group: "11th-15th", "% Total Saves": 27.15655 },
  { Group: "Bottom 5", "% Total Saves": 24.69192 }
];

const width = 700, // Adjust as needed
      height = 700, // Adjust as needed
      radius = Math.min(width, height) / 3;

const svg = d3.select("#plot")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    // Decrease the x-offset to move the pie chart to the left
    .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");

svg.append("text")
    .attr("x", 10) // Center the title by setting x to 0
    // Adjust the y position to prevent cutting off the title
    .attr("y", -250) // Slightly below the top edge of the SVG
    .attr("text-anchor", "middle") // Ensure text is centered on the x position
    .style("font-size", "22px") // Font size is already increased
    .style("text-decoration", "underline")
    .text("Percentage of Total Saves in the League (Teams Grouped by Wins)");

// Define an array of green shades from dark to light
const greenShades = [
  '#00441b', // Dark green for "Top 5"
  '#006d2c', // Less dark green for "5th-10th"
  '#238b45', // Medium green for "11th-15th"
  '#41ab5d'  // Light green for "Bottom 5"
];

const color = d3.scaleOrdinal()
  .domain(data.map(function(d) { return d.Group; }))
  .range(greenShades);

const pie = d3.pie()
  .value(function(d) { return d["% Total Saves"]; });

const arc = d3.arc()
  .innerRadius(0)
  .outerRadius(radius);

const tooltip = d3.select("#tooltip");

const arcs = svg.selectAll(".arc")
  .data(pie(data))
  .enter().append("g")
    .attr("class", "arc");

arcs.append("path")
  .attr("d", arc)
  .attr("fill", function(d) { return color(d.data.Group); })
  .on("mouseover", function(event, d) {
    tooltip.style("visibility", "visible")
           .html("Team: " + d.data.Group + "<br>% Total Saves: " + d.data["% Total Saves"]);
  })
  .on("mousemove", function(event) {
    tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
  })
  .on("mouseout", function() {
    tooltip.style("visibility", "hidden");
  });
