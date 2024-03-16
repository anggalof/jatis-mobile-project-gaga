import React from "react";
import { Handle, Position } from "reactflow";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faPlay, faRobot } from "@fortawesome/free-solid-svg-icons";

//custome node
function TextNode(props: any) {
  const { data, selected, type } = props;
  return (
    <div
      className={`w-40  shadow-md rounded-md bg-white   ${
        selected ? "border-solid border-2 border-indigo-500/100" : ""
      } `}
    >
      <div className="flex flex-col">
        <div className={`max-h-max px-2 py-1 text-[7px] text-left font-bold rounded-t-md 
          ${type === 'start_bot' ? 'bg-[#E6E6FA] text-[#8A2BE2]' : (
            type === 'user' ? 'bg-[#B0E0E6] text-[#000080]' : 'bg-[#FFE4B5] text-[#483D8B]'
          )}`}
        >
          {type === 'start_bot' ? (
            <>
              <FontAwesomeIcon icon={faPlay} />
              <span className="mx-1">Start</span>
              <span>(bot)</span>
            </>
          ) : (type === 'user' ? (
            <>
              <FontAwesomeIcon icon={faKey} />
              <span className="mx-1">KeywordKataKunciBaru</span>
              <span>(user)</span>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faRobot} />
              <span className="mx-1">Replay Balasan Baru</span>
              <span>(bot)</span>
            </>
          ))}
        </div>
        <div className="px-3 py-2 ">
          <div className="text-[8px] font-normal text-black">
            {data.label ?? "Text Node"}
          </div>
        </div>
      </div>

      <Handle
        id="a"
        type="target"
        position={Position.Left}
        className="w-1 rounded-full bg-slate-500"
      />
      <Handle
        id="b"
        type="source"
        position={Position.Right}
        className="w-1 rounded-full bg-gray-500"
      />
    </div>
  );
}

export default TextNode;
