// // document.addEventListener('DOMContentLoaded',function(){

const loadData = async() => {
    req = await axios.get('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-d' +
            'ata.json');
    const dataset = req.data.data;
    // console.log(dataset)
    const margin = {
        top: 40,
        right: 20,
        bottom: 60,
        left: 50
    };
    const svgWidth = 900,
        svgHeight = 500,
        barPadding = 0;
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;
    const barwidth = (width) / dataset.length;
    // note: barwidth has to be greater than barPadding;

    const gpdDates = dataset.map(d => d[0]);

    const gdpYearsAndQuarters = gpdDates.map(d => {
        let gdpMonth = d.slice(5, 7);
        let gdpYear = d.slice(0, 4)
        // console.log(gdpMonth)
        let gdpQuarter = ""
        switch (gdpMonth) {
            case "01":
                gdpQuarter = "Q1";
                break;
            case "04":
                gdpQuarter = "Q2";
                break;
            case "07":
                gdpQuarter = "Q3";
                break;
            case "10":
                gdpQuarter = "Q4";
                break;
            default:
                ''
        }
        return (gdpYear + "-" + gdpQuarter)
    })

    const gdpYears = gpdDates.map(d => d.slice(0, 4));
    const gdpData = dataset.map(d => d[1]);

    const gdpMin = d3.min(gdpData);
    const gdpMax = d3.max(gdpData);

    const yScale = d3
        .scaleLinear()
        .domain([0, gdpMax])
        .range([0, height]);

    const svg = d3
        .select("#visBody")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .style("background", "#eaeaea");

    let tooltip = d3
        .select("#visBody")
        .append('div')
        .attr("id", "tooltip")
        .style("opacity", 0);

    let barOverlay = d3
        .select("#visBody")
        .append("div")
        .attr("class", "barOverlay")
        .style("opacity", 0);

    const barChart = svg
        .selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("data-date", (d) => d[0])
        .attr("data-gdp", (d) => d[1])
        .attr("x", (d, i) => i * barwidth)
        .attr("y", (d) => height - yScale(d[1]))
        .attr("width", barwidth - barPadding)
        .attr("height", (d) => yScale(d[1]))
        .attr("fill", "lightgreen")
        .attr("class", "bar")
        .attr("transform", `translate(${margin.left},${margin.top})`)
        .on("mouseover", function (d, i) {

            tooltip
                .transition()
                .duration(200)
                .style("opacity", 0.8)

            tooltip.style("bottom", (margin.bottom) + "px")
            .style("left", (i * barwidth) + "px")
            .style("transform", `translate(${ 60}px, ${ -100}px)`)
            .attr("data-date", d[0]);

            tooltip.html(`${gdpYearsAndQuarters[i]}  $${gdpData[i].toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')} Billion`)

        }).on("mouseout", function(d,i){
            tooltip.transition()
            .duration(200)
            .style("opacity", 0)
        })

    // barChart.transition() .attr("height", (d)=>yScale(d[1])) .attr("y",
    // (d)=>height-yScale(d[1])) .duration(700) .delay((d,i=>i*100))
    // .ease("elastic")

    yAxisScale = d3
        .scaleLinear()
        .domain([0, gdpMax])
        .range([height, 0]);

    xAxisScale = d3
        .scaleLinear()
        .domain([
            d3.min(gdpYears),
            d3.max(gdpYears)
        ])
        .range([
            barPadding, width - barPadding
        ]);

    xAxis = d3
        .axisBottom()
        .scale(xAxisScale)
        .tickFormat(d3.format("d"));

    yAxis = d3
        .axisLeft()
        .scale(yAxisScale);

    svg
        .append("g")
        .call(yAxis)
        .attr("id", "y-axis")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)

    const xAxisTranslate = svgHeight - margin.bottom;
    svg
        .append("g")
        .attr("id", "x-axis")
        .attr("transform", `translate(${margin.left}, ${xAxisTranslate})`)
        .call(xAxis)

}

loadData()

// ALternative to setting the x and y positions of the bars const barChart=
// svg.selectAll("rect") .data(dataset) .enter() .append("rect") // .attr("x",
// (d, i) => i * barwidth) // .attr("y", (d, i) => svgHeight - yScale(d[1]))
// .attr("transform", (d,i)=>{     let x=  i * barwidth;     let y = svgHeight -
// yScale(d[1]);     return `translate(${x}, ${y})`; }) .attr("width", barwidth
// - barPadding) .attr("height", (d) => yScale(d[1])) .attr("fill", "grey")
// function loadData() {     let req = new XMLHttpRequest();     req.onload =
// function () {         if (this.readyState == 4 && this.status == 200) { let
// json = JSON.parse(this.responseText);             //
// document.getElementById("demo").innerHTML = req.responseText;
// console.log(json.data)         }     };     req.open("GET",
// "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/G
// D P-data.json", true);     req.send(); }