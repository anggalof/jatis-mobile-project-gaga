import React from "react";

export default function Sidebar({
  nodeName,
  setNodeName,
  selectedNode,
  setSelectedElements,
}: any) {
  const handleInputChange = (event: any) => {
    setNodeName(event.target.value);
  };
  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="border-r-2 border-blue-200 p-4 text-sm bg-[#B0C4DE] w-64 h-screen text-black">
      {selectedNode ? (
        <div>
          <h3 className="text-xl mb-2 text-blue-900">Update Node</h3>
          <label className="block mb-2 text-sm font-medium text-blue-900">
            Node Name:
          </label>
          <input
            type="text"
            className="block w-full pt-2 px-3 pb-3 text-gray-700 border border-blue-300 rounded-lg bg-white focus:outline-none focus:border-blue-500"
            value={nodeName}
            onChange={handleInputChange}
          />
          <button
            className="mt-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
            onClick={() => setSelectedElements([])}
          >
            Save
          </button>
        </div>
      ) : (
        <>
          <h3 className="text-xl mb-4 text-white font-semibold">Nodes Panel</h3>
          <div className="my-4 text-md">Create for Users</div>
          <div
            className="bg-white p-3 border-2 border-[#778899] rounded cursor-move flex justify-center items-center text-[#000080] hover:bg-[#778899] hover:text-white transition-colors duration-200"
            onDragStart={(event) => onDragStart(event, "user")}
            draggable
          >
            Message User
          </div>
          <div className="my-4 text-md">Create for Bot</div>
          <div
            className="bg-white p-3 border-2 border-[#778899] rounded cursor-move flex justify-center items-center text-[#483D8B] hover:bg-[#778899] hover:text-white transition-colors duration-200"
            onDragStart={(event) => onDragStart(event, "bot")}
            draggable
          >
            Message Bot
          </div>
        </>
      )}
    </aside>
  );
}
