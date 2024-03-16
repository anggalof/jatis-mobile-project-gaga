/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Panel,
  useReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
} from "reactflow";
import "reactflow/dist/base.css";

import Sidebar from "./sidebar";
import TextNode from "./TextNode";
import dataMessages from "./data/messages.json";
import Chatbox from "../Chatbox";

interface Nodes {
  id: string;
  data: {
    label: string;
  };
  dragging: boolean;
  height: number;
  position: any;
  positionAbsolute: any;
  selected: boolean;
  type: string;
  width: number;
}

const App = () => {
  const flowKey = "flow-key";

  const { data } = dataMessages;

  // Initial node pertama kali muncul
  const introductionBot = data.introduction.message;
  const initialNodes = [
    {
      id: "1",
      type: "start_bot",
      data: { label: introductionBot },
      position: { x: 250, y: 5 },
    },
  ];

  let id = 0;

  // Function untuk generate unique IDs untuk nodes baru yang dibikin
  const getId = () => `node_${id++}`;

  // Define custom node types
  const nodeTypes = useMemo(
    () => ({
      start_bot: TextNode,
      user: TextNode,
      bot: TextNode,
    }),
    []
  );

  const reactFlowWrapper: any = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [selectedElements, setSelectedElements] = useState<any>([]);
  const [nodeName, setNodeName] = useState("");
  const [connect, setConnect] = useState(null);
  const [chatBoxVisible, setChatBoxVisible] = useState<boolean>(false);

  // Update data nodes ketika nodeName atau selectedElements setiap ada perubahan
  useEffect(() => {
    if (selectedElements.length > 0) {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === selectedElements[0]?.id) {
            node.data = {
              ...node.data,
              label: nodeName,
            };
          }
          return node;
        })
      );
    } else {
      setNodeName(""); // Clear nodeName when no node is selected
    }

    // Kondisi apabila ada node yang di connect akan masuk sini
    if (connect !== null && selectedElements.length === 0) {
      onFilterGetNodes(connect);
    }
  }, [nodeName, connect, selectedElements, setNodes, data.introduction.message ]);

  const addLineBreaks = (str: string) => {
    return str.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index !== str.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  // Logic untuk Chatbot disini, harus connect line antara node yang dipilih ke node yang dituju
  const onFilterGetNodes = (params: any) => {
    const match = nodes.filter((item) => item.id === params.source);
    const checkUser = match[0].type === 'user';
    const checkId = match[0].id === 'node_0';
    if (checkUser && checkId) {
      const checkBot = match[0].data.label.toLowerCase()
    
      if (checkBot.includes("tampilkan menu")) {
        const stringWithLineBreak = data.showMenu.message;
        const updatedNodes: any = nodes.map(node =>
          node.id === params.target ? { ...node, data: { label: addLineBreaks(stringWithLineBreak) } } : node
        );
        setNodes(updatedNodes);
        setNodeName(stringWithLineBreak);
      } else {
        const updatedNodes = nodes.map(node =>
          node.id === params.target ? { ...node, data: { label: data.wrongSentence.message } } : node
        );
        setNodes(updatedNodes);
        setNodeName(data.wrongSentence.message);
      }
    }

    const checkIdChoose = match[0].id === 'node_2';
    if (checkUser && checkIdChoose) {
      const checkBot = match[0].data.label.toLowerCase()
    
      if (checkBot.includes("1")) {
        const stringWithLine = data.menuOne.message;
        const updatedNodes = nodes.map(node =>
          node.id === params.target ? { ...node, data: { label: stringWithLine } } : node
        );
        setNodes(updatedNodes);
        setNodeName(stringWithLine);
      } else if (checkBot.includes("2")) {
        const stringWithLine = data.menuTwo.message;
        const updatedNodes = nodes.map(node =>
          node.id === params.target ? { ...node, data: { label: stringWithLine } } : node
        );
        setNodes(updatedNodes);
        setNodeName(stringWithLine);
      } else {
        const updatedNodes = nodes.map(node =>
          node.id === params.target ? { ...node, data: { label: data.notChoose.message } } : node
        );
        setNodes(updatedNodes);
        setNodeName(data.notChoose.message)
      }
    }

    const checkIdFinish = match[0].id === 'node_4';
    if (checkUser && checkIdFinish) {
      const message = data.ending.message;
      const updatedNodes = nodes.map(node =>
        node.id === params.target ? { ...node, data: { label: message } } : node
      );
      setNodes(updatedNodes);
      setNodeName(message);
    }
  };

  // Handle ketika node di click, untuk update isi node nya juga.
  const onNodeClick: any = useCallback((event: any, node: Nodes) => {
    setSelectedElements([node]);
    setNodeName(node.data.label);
    setNodes((nodes) =>
      nodes.map((n) => ({
        ...n,
        selected: n.id === node.id,
      }))
    );
  }, []);

  const { setViewport } = useReactFlow();
  const checkEmptyTargetHandles = () => {
    let emptyTargetHandles = 0;
    edges.forEach((edge) => {
      if (!edge.targetHandle) {
        emptyTargetHandles++;
      }
    });
    return emptyTargetHandles;
  };

  const isNodeUnconnected = useCallback(() => {
    let unconnectedNodes = nodes.filter(
      (node) =>
        !edges.find(
          (edge) => edge.source === node.id || edge.target === node.id
        )
    );

    return unconnectedNodes.length > 0;
  }, [nodes, edges]);

  // Save flow chart ke local storage
  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const emptyTargetHandles = checkEmptyTargetHandles();

      if (nodes.length > 1 && (emptyTargetHandles > 1 || isNodeUnconnected())) {
        alert(
          "Error: More than one node has an empty target handle or there are unconnected nodes."
        );
      } else {
        const flow = reactFlowInstance.toObject();
        localStorage.setItem(flowKey, JSON.stringify(flow));
        alert("Save successful!");
      }
    }
  }, [reactFlowInstance, nodes, isNodeUnconnected]);

  // Restore flow chart dari local storage
  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const dataFromLocalStorage = localStorage.getItem(flowKey);
      const flow: any = dataFromLocalStorage !== null ? JSON.parse(dataFromLocalStorage) : null;

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  // Handle data edge dan connect ketika garisnya di hubungkan
  const onConnect = useCallback(
    (params: any) => {
      console.log("Edge created: ", params);
      setEdges((eds) => addEdge(params, eds));
      setConnect(params);
    },
    [setEdges]
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Untuk bikin Node baru harus di drag dari button message node
  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type === 'user' ? 'Writing text...' : 'Connect node in here'}` },
      };

      console.log("Node created: ", newNode);
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const rfStyle = {
    backgroundColor: "#ffffff",
  };
  
  const handleChatBox = () => {
    setChatBoxVisible(!chatBoxVisible);
  };

  return (
    <React.Fragment>
      {chatBoxVisible ? (
        <Chatbox onHandleChatBox={handleChatBox} />
      ) : (
      <div className="flex flex-row min-h-screen lg:flex-row">
        <div className="flex-grow h-screen" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            style={rfStyle}
            onNodeClick={onNodeClick}
            onPaneClick={() => {
              setSelectedElements([]);
              setNodes((nodes) =>
                nodes.map((n) => ({
                  ...n,
                  selected: false,
                }))
              );
            }}
            fitView
          >
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            <Controls />
            <MiniMap zoomable pannable />
            <Panel position={'top-left'}>
              <button onClick={handleChatBox} className="m-2 bg-[#008B8B] hover:bg-[#778899] text-white font-bold py-2 px-4 rounded">
                Show Chat Bot
              </button>
              <button
                className="m-2 bg-[#778899] hover:bg-[#008B8B] text-white font-bold py-2 px-4 rounded"
                onClick={onSave}
              >
                Save
              </button>
              <button
                className="bg-[#778899] hover:bg-[#008B8B] text-white font-bold py-2 px-4 rounded"
                onClick={onRestore}
              >
                Restore
              </button>
            </Panel>
          </ReactFlow>
        </div>

        <Sidebar
          nodeName={nodeName}
          setNodeName={setNodeName}
          selectedNode={selectedElements[0]}
          setSelectedElements={setSelectedElements}
        />
      </div>
      )}
    </React.Fragment>
  );
};

function FlowCharts() {
  return (
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  );
}

export default FlowCharts;
