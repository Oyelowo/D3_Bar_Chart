// // document.addEventListener('DOMContentLoaded',function(){




const loadData = async () => {
    req = await axios.get('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json');
    const dataset = req.data.data;

    const margin = {
        top: 10,
        right: 20,
        bottom: 10,
        left: 20
    };
    const
        svgWidth = 900 + margin.left + margin.right,
        svgHeight = 500,
        barPadding = 0.1;
    const barwidth = svgWidth / dataset.length;
    // not: barwidth has to be greater than barPadding;

    // Create an x and y scale

    const years = dataset.map(d => d[0]);
    const gdpData = dataset.map(d => d[1]);

    const gdpMin = d3.min(gdpData);
    const gdpMax = d3.max(gdpData);

    // document.getElementById("demo").innerHTML=gdpMax;

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, (d) => d[0])])
        .range([barPadding, svgWidth - barPadding]);

    // Add your code below this line

    const yScale = d3.scaleLinear().domain([0, gdpMax]).range([0, svgHeight - margin.top - margin.bottom]);
    const svg = d3.select("body")
        .append("svg")
        .attr("width", svgWidth )
        .attr("height", svgHeight)
        .style("background", "pink")


    const barChart = svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * barwidth+ margin.left)
        .attr("y", (d, i) => svgHeight  - margin.bottom - yScale(d[1]))
        .attr("width", barwidth - barPadding)
        .attr("height", (d) => yScale(d[1]))
        .attr("fill", "grey")


    yAxisScale = d3.scaleLinear().domain([0, gdpMax]).range([svgHeight, 0]);
    xAxisScale = d3.scaleLinear()
        .domain([d3.min(years), d3.max(years)])
        .range([0, svgWidth]);

    xAxis = d3.axisBottom().scale(xAxisScale);
    yAxis = d3.axisLeft().scale(yAxisScale);

    svg.append("g")
        .call(yAxis)
        .attr("id", "y-axis")
        .attr("transform", "translate(20, 10)")

    xAxisTranslate = svgHeight - 10;

    svg.append("g")
        .attr("transform", "translate(50, " + xAxisTranslate + ")")
        .call(xAxis)

}
// let button = document.getElementById('button');
// button.addEventListener("click", loadData)

loadData()














// ALternative to setting the x and y positions of the bars
// const barChart= svg.selectAll("rect")
// .data(dataset)
// .enter()
// .append("rect")
// // .attr("x", (d, i) => i * barwidth)
// // .attr("y", (d, i) => svgHeight - yScale(d[1]))
// .attr("transform", (d,i)=>{
//     let x=  i * barwidth;
//     let y = svgHeight - yScale(d[1]);
//     return `translate(${x}, ${y})`;
// })
// .attr("width", barwidth - barPadding)
// .attr("height", (d) => yScale(d[1]))
// .attr("fill", "grey")




// function loadData() {
//     let req = new XMLHttpRequest();
//     req.onload = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             let json = JSON.parse(this.responseText);
//             // document.getElementById("demo").innerHTML = req.responseText;
//             console.log(json.data)
//         }
//     };
//     req.open("GET", "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json", true);
//     req.send();
// }