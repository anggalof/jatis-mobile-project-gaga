import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import dataMessages from "../../data/messages.json";

interface Props {
  userResponse: string;
  botResponse: {
    purpose: string;
    message: string;
    options?: string[];
    confirmation?: string;
    sender: string;
  };
  sendUserResponse: string;
  optionClick: (ev: React.MouseEvent<HTMLElement>) => void;
}

interface MessagesInfo {
  purpose?: string;
  message: string;
  options?: string[];
  confirmation?: string;
  sender: string;
}

const Chats: React.FC<Props> = props => {
  const [messages, setMessages] = useState<MessagesInfo[]>([]);
  const dummyRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  let data = dataMessages.data;

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          purpose: data.introduction.purpose,
          message: data.introduction.message,
          sender: data.introduction.sender
        }
      ]);
    } else {
      let tempArray = [...messages];
      tempArray.push({ message: props.sendUserResponse, sender: "user" });
      setMessages(tempArray);

      setTimeout(() => {
        let temp2 = [...tempArray];
        temp2.push(props.botResponse);
        setMessages(temp2);
      }, 1000);
    }
  }, [props.sendUserResponse, props.botResponse]);

  useEffect(() => {
    if (dummyRef && dummyRef.current && bodyRef && bodyRef.current) {
      bodyRef.current.scrollTo({
        top: dummyRef.current.offsetTop,
        behavior: "smooth"
      });
    }
  }, [messages]);

  return (
    <div className="message-container" ref={bodyRef}>
      {messages.map((chat, index) => (
        <div key={`${chat.purpose}-${index}`}>
          <div className={`message-wrapper ${chat.sender === 'bot' ? 'bot-left' : 'user-right'}`}>
            {chat.sender === 'bot' && <img src="/bot.png" alt={chat.sender} />}
            <div className="message-detail">
              <div className={`message ${chat.sender}`}>
                <p dangerouslySetInnerHTML={{ __html: chat.message }} />
                {chat.options ? (
                  <div className="options">
                    {chat.options.map(option => (
                      <div key={option}>
                        <p
                          dangerouslySetInnerHTML={{ __html: option }}
                          onClick={e => props.optionClick(e)}
                          data-id={option}
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
                <p>{chat.confirmation}</p>
              </div>
            </div>
          </div>
          <div ref={dummyRef} className="dummy-div"></div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
