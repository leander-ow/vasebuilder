import { MathFunction } from './function.js';

export function gen2d(area, res, inputString, wallThickness) {
    const margin = 10;
    const svg = d3.select("#coordinate-system");
    const container = svg.node().parentNode;
    const width = container.clientWidth;
    const height = container.clientHeight;

    svg.attr("width", width).attr("height", height);

    const f = new MathFunction(inputString);
    const points = [];

    for (let x = 0; x <= area; x += 1 / res) {
        const y = f.evaluate(x);
        points.push([x, y]);
    }

    const xMin = -1;
    const xMax = area + 1;
    const yMin = -1;
    const yMax = d3.max(points, d => d[1]) + 1;

    const xScale = d3.scaleLinear().domain([xMin, xMax]).range([10, width - 10]);
    const yScale = d3.scaleLinear().domain([yMin, yMax]).range([height - 10, 10]);

    const xAxis = d3.axisBottom(xScale).ticks(10);
    const yAxis = d3.axisLeft(yScale).ticks(10);

    svg.selectAll(".x-axis")
        .data([null])
        .join("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${yScale(0)})`)
        .call(xAxis);

    svg.selectAll(".y-axis")
        .data([null])
        .join("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${xScale(0)}, 0)`)
        .call(yAxis);

    function drawPoints(points, color, wallThickness) {
        const shiftedPoints = points.map(d => [d[0], d[1] - wallThickness]);

        svg.selectAll(".point")
            .data(points)
            .join("circle")
            .attr("class", "point")
            .attr("cx", d => xScale(d[0]))
            .attr("cy", d => yScale(d[1]))
            .attr("r", 3)
            .attr("fill", color);

        svg.selectAll(".line")
            .data([points])
            .join("path")
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-width", 1)
            .attr("d", d3.line()
                        .x(d => xScale(d[0]))
                        .y(d => yScale(d[1])));

        svg.selectAll(".shifted-point")
            .data(shiftedPoints)
            .join("circle")
            .attr("class", "shifted-point")
            .attr("cx", d => xScale(d[0]))
            .attr("cy", d => yScale(d[1]))
            .attr("r", 3)
            .attr("fill", "green");

        svg.selectAll(".shifted-line")
            .data([shiftedPoints])
            .join("path")
            .attr("class", "shifted-line")
            .attr("fill", "none")
            .attr("stroke", "green")
            .attr("stroke-width", 1)
            .attr("d", d3.line()
                        .x(d => xScale(d[0]))
                        .y(d => yScale(d[1])));
    }

    drawPoints(points, "blue", wallThickness);
}
