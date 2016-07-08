import * as React from "react";
import {Link} from "react-router";
import {TopologyNode, TopologyLink} from "../Topology/Topology.tsx";
import Topology from "../Topology/Topology.tsx";

export default class World extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }

    public render() {
        var node1:TopologyNode = {"name": "node1", "index": 1};
        var node2:TopologyNode = {"name": "node2", "index": 2};
        var node3:TopologyNode = {"name": "node3", "index": 3};
        var node4:TopologyNode = {"name": "node4", "index": 4};
        var nodes = [
            node1,
            node2,
            node3,
            node4
        ];
        var links:TopologyLink<TopologyNode>[] = [
            {"source": node3, "target": node2, "weight": 1},
            {"source": node1, "target": node3, "weight": 3}
        ];
        return (
            <div>
                <h1>World</h1>
                <Link to="/app/hello">To Hello</Link>
                <br />
                <Topology nodes={nodes} links={links}/>
            </div>)
    }
}