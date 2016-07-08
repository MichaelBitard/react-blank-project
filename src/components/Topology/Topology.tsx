import * as React from "react";
var ReactFauxDOM = require('react-faux-dom');
import * as D3 from 'd3';
import createElement = __React.createElement;

export default class Topology extends React.Component<{}, TopologyState> {
    constructor(props) {
        super(props);

        this.state = {
            mouseOver: false
        };
    }


    public render() {
                // var elementById = document.getElementById("toto");
        // console.log(elementById);
        //
        // var selector = document.createElement('svg');
        var selector = new ReactFauxDOM.Element('svg');
        // var htmlElement = SVGElement;

        // elementById.appendChild(selector);
        // selector.appendChild(elementById);

        // var selector = new ReactFauxDOM.Element('svg', elementById);
        var svg = D3.select(selector)
            .attr({
                width: "1250",
                height: "380"
            });

        // svg
        //     .append('rect')
        //     .attr({
        //         width: 300,
        //         height: 300,
        //         fill: this.state.mouseOver ? 'red' : 'green'
        //     })
        //     .on('mouseover', function () {
        //         this.setState({mouseOver: true});
        //     }.bind(this))
        //     .on('mouseout', function () {
        //         this.setState({mouseOver: false});
        //     }.bind(this));


        var force = D3.layout.force()
            .gravity(.05)
            .chargeDistance(100)
            .linkDistance(100)
            .charge(-100)
            .size([800, 150]);
        var node1 = {"name": "node1", "index": 1, x: 10, y: 10};
        var node2 = {"name": "node2", "index": 2, x: 20, y: 20};
        var node3 = {"name": "node3", "index": 3, x: 30, y: 30};
        var node4 = {"name": "node4", "index": 4, x: 40, y: 40};
        var nodes = [
            node1,
            node2,
            node3,
            node4
        ];
        var links = [
            {"source": node3, "target": node2, "weight": 1},
            {"source": node1, "target": node3, "weight": 3}
        ];
        force
            .nodes(nodes)
            .links(links)
            .start();

        var link = svg.selectAll(".link")
            .data(links)
            .enter().append("line")
            .attr("class", "link")
            .style("stroke-width", function (d) {
                return Math.sqrt(d.weight);
            });

        var node = svg.selectAll(".node")
            .data(nodes)
            .enter().append("g")
            .attr("class", "node")
            .call(force.drag);

        node.append("circle")
            .attr("r", "5");

        node.append("text")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(function (d) {
                return d.name
            });

        force.on("tick", function () {
            link.attr("x1", function (d) {
                return d.source.x;
            })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });

            node.attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
        });

        return selector.toReact();
    }

    changeState(value) {
        this.setState({mouseOver: value});
    }
}


interface TopologyState {
    mouseOver?:boolean;
}