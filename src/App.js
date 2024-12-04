import { useEffect, useState, useRef } from "react";
import * as stomp from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "axios";
import "./App.css";
import React from "react";
import ChatBubble from "./ChatBubble"; // ChatBubble 가져오기
import MobileView from "./MobileView"; // MobileView 가져오기
import { v4 as uuidv4 } from "uuid";

//
//
//

function App() {
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(); // stomp client
  const [TranslateText, setTranslateText] = useState(""); // 번역메시지
  const [clientId, setClientId] = useState(); // client 고유 id
  const messageEndRef = useRef(null); // 스크롤 하단 이동을 위한 ref

  // 클라이언트 고유 id값 확인 및 생성
  useEffect(() => {
    let storedId = localStorage.getItem("clientId");
    if (!storedId) {
      storedId = uuidv4();
      localStorage.setItem("clientId", storedId);
    }
    setClientId(storedId);
  }, []);

  // 메시지 전송 핸들러
  const handleSend = (message) => {
    if (client && message.trim() !== "") {
      const messageObj = {
        sender: clientId,
        content: message.trim(),
        isEmergency: false,
      };
      client.publish({
        destination: "/pub/chat",
        body: JSON.stringify(messageObj),
      });

      setMessages((prev) => [
        ...prev,
        {
          ...messageObj,
          isSender: true,
          id: prev.length ? prev[prev.length - 1].id + 1 : 1, // 1씩 증가하는 id
        },
      ]);
    }
  };

  // 웹소켓 연결 및 구독
  useEffect(() => {
    const stompClient = new stomp.Client({
      webSocketFactory: () => {
        return new SockJS("http://3.35.171.53:8080/chat");
      },
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log("connected");
        stompClient.subscribe("/sub/chat", (msg) => {
          if (msg.body) {
            const newMsg = JSON.parse(msg.body);
            if (newMsg.sender !== clientId) {
              // ID 값 1씩 증가시키며 메시지 추가
              setMessages((prev) => [
                ...prev,
                {
                  ...newMsg,
                  isSender: false,
                  id: prev.length ? prev[prev.length - 1].id + 1 : 1,
                },
              ]);
            }
          }
        });
      },
      onDisconnect: () => {
        console.log("disconnected");
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, [clientId]);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
        {/* 메시지 목록 표시 */}
        {messages.map((msg) => (
          <ChatBubble key={msg.id} text={msg.content} isSender={msg.isSender} isEmergency={msg.isEmergency}/>
        ))}
        <div ref={messageEndRef} /> {/* 스크롤 하단 */}
      </div>
      {/* 모바일 뷰 하단바 */}
      <MobileView onSendMessage={handleSend} />
    </div>
  );
}

export default App;
