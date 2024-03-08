import React, { useState } from "react";
import Chats from "../Chats";
import FlowChart from "../FlowChart";
import { analyzeNextSteps } from "../../helper/analyzeNextSteps";
import "./index.scss";

interface ResponseBotObject {
  purpose: string;
  message: string;
  options?: string[];
  sender: string;
  confirmation?: string;
}

const Chatbot: React.FC = () => {
  const [userResponse, setUserResponse] = useState<string>("");
  const [flowChartVisible, setFlowChartVisible] = useState<boolean>(false);
  const [purposeMenu, setPurposeMenu] = useState<number>(0);
  const [purposeDeliver, setPurposeDeliver] = useState<number>(0);
  const [botResponse, setBotResponse] = useState<ResponseBotObject>({
    purpose: "",
    message: "",
    sender: "bot",
    confirmation: ""
  });
  const [sendUserResponse, setSendUserResponse] = useState<string>("");

  const setNextStep = (response: string) => {
    setSendUserResponse(response);
    
    let res = analyzeNextSteps(response, purposeMenu, purposeDeliver);
    
    if (res?.purpose?.includes('menu')) {
      setPurposeDeliver(1);
    }

    if (res?.purpose === 'question') {
      setPurposeMenu(1);
    }

    setBotResponse({ ...res, sender: "bot" });
    setUserResponse("");
  };

  const optionClick = (e: React.MouseEvent<HTMLElement>) => {
    let option = e.currentTarget.dataset.id;
    if (option) {
      setNextStep(option);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserResponse(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNextStep(userResponse);
  };

  const handleFlowChart = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setFlowChartVisible(!flowChartVisible);
  };

  return (
    <React.Fragment>
      {flowChartVisible ? (
        <FlowChart handleFlowChart={handleFlowChart} />
      ) : (
        <div className="max-w-screen mx-auto p-10">
          <div className="chat-container">
            <div className="header">
              <img src="/icon-resto.png" alt="icon-resto" />
              <div className="header-name">
                Hotel & Resto Food Lestari
              </div>
              <div className="btn-flowchart" onClick={handleFlowChart}>Show Flow Chart</div>
            </div>
            <Chats
              userResponse={userResponse}
              botResponse={botResponse}
              sendUserResponse={sendUserResponse}
              optionClick={optionClick}
            />
            <form onSubmit={e => handleSubmit(e)} className="form-container">
              <input
                onChange={e => handleInputChange(e)}
                value={userResponse}
              ></input>
              <button>
                <img src="/send.png" alt="send" />
              </button>
            </form>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Chatbot;
