import React, { useCallback } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
} from 'reactflow';

import { nodes as initialNodes, edges as initialEdges } from './initial-elements';
import CustomNode from './CustomNode';

import 'reactflow/dist/style.css';
import './index.scss';

const nodeTypes = {
  custom: CustomNode,
};

const minimapStyle = {
  height: 120,
};

interface DataObject {
  label: string,
  selects: object
}

interface Position {
  x: number,
  y: number
}

interface Style {
  background: string,
  color: string,
  width: string
}

interface ResponseNodes {
  id: string,
  type: string,
  data: DataObject,
  position: Position,
  draggable: boolean,
  className: string,
  style: Style,
  sourcePosition: string,
  targetPosition: string,
};

const onInit = (reactFlowInstance: any) => console.log('flow loaded:', reactFlowInstance);

const OverviewFlow = (props: any) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<ResponseNodes[] | any>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>(initialEdges);
  const onConnect = useCallback((params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)), []);

  const edgesWithUpdatedTypes = edges.map((edge) => {
    if (edge.sourceHandle) {
      const edgeType = nodes?.find((node) => node.type === 'custom')?.data.selects[edge.sourceHandle];
      edge.type = edgeType;
    }

    return edge;
  });

  return (
    <div className="react-flow-wrapper">
      <button onClick={props.handleFlowChart}>Back to Chat Bot</button>
      <ReactFlow
        nodes={nodes}
        edges={edgesWithUpdatedTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        fitView
        attributionPosition="top-right"
        nodeTypes={nodeTypes}
      >
        <MiniMap style={minimapStyle} zoomable pannable />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default OverviewFlow;