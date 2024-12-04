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

  // 더미 데이터
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: "안녕하세요. 인천공항 도우미 상담원 박지영입니다.\n공항 이용에 어떤 도움이 필요하신가요?",
        isSender: false,
      },
      { id: 2, text: "게이트 시간", isSender: true },
      {
        id: 3,
        text: "비행기 정보(항공사, 비행기 번호 등)를 알려주시면, 정확한 게이트와 탑승 시간을 확인해 드리겠습니다.",
        isSender: false,
      },
      {
        id: 4,
        text: "저는 20:00에 출발하는 티웨이 항공 TW123편 탑승 예정입니다.",
        isSender: true,
      },
      {
        id: 5,
        text: "티웨이 항공 TW123편의 탑승구는 D5번이며 탑승 시작 시간은 19:30입니다.\nD구역은 공항 내 면세점을 지나 오른쪽에 있습니다.\n탑승 절차를 지나시거나 바로 D 구역으로 이동하시면 됩니다.\n게이트 변경 여부는 공항 모니터를 통해 확인해 주세요.",
        isSender: false,
      },
      { id: 6, text: "더 궁금하신 사항이 있으실까요?", isSender: false },
      { id: 7, text: "This is the test English to Korean", isSender: false },
      { id: 8, text: "Bonjour. Il s'agit d'un test de français.", isSender: false },
    ]);
  }, []);

  // 메시지가 변경될 때 스크롤 하단으로 이동
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
      // brokerURL: "http://3.35.171.53:8080/chat",
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
          <ChatBubble key={msg.id} text={msg.content} isSender={msg.isSender} />
        ))}
        <div ref={messageEndRef} /> {/* 스크롤 하단 */}
      </div>
      {/* 모바일 뷰 하단바 */}
      <MobileView onSendMessage={handleSend} />
    </div>
  );
}

export default App;
