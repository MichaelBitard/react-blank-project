import * as React from "react";
import * as D3 from 'd3';
import createElement = __React.createElement;


const style = require('./Topology.scss');
export default class Topology extends React.Component<{}, TopologyState> {
    constructor(props) {
        super(props);

        this.state = {
            mouseOver: false
        };
    }


    public render() {
        return (
            <div>
                <div id="chart" style={{width:"1250px", height:"380px"}}></div>
            </div>)
    }


    public componentDidMount() {
        var elementById = document.getElementById("chart");

        var svg = D3.select(elementById).append('svg')
            .attr({
                width: "1250",
                height: "380"
            });

        var force = D3.layout.force()
            .gravity(.05)
            .chargeDistance(100)
            .linkDistance(100)
            .charge(-100)
            .size([800, 150]);

        var node1:MyNode = {"name": "node1", "index": 1};
        var node2:MyNode = {"name": "node2", "index": 2};
        var node3:MyNode = {"name": "node3", "index": 3};
        var node4:MyNode = {"name": "node4", "index": 4};
        var nodes = [
            node1,
            node2,
            node3,
            node4
        ];
        var links:MyLink<MyNode>[] = [
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
            .attr("class", style.link)
            .style("stroke-width", function (d) {
                return Math.sqrt(d.weight);
            });

        var node = svg.selectAll(".node")
            .data(nodes)
            .enter().append("g")
            .attr("class", style.node)
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

    }

    changeState(value) {
        this.setState({mouseOver: value});
    }
};

interface MyNode extends D3.layout.force.Node {
    name: string;
}

interface MyLink<T extends D3.layout.force.Node> extends D3.layout.force.Link<T> {
    weight: number;
}

interface TopologyState {
    mouseOver?:boolean;
}