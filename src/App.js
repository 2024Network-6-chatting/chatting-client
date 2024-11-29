import { useEffect, useState } from "react";
import * as stomp from "@stomp/stompjs";
import SockJS from "sockjs-client";
import "./App.css";
import axios from "axios";
import React from "react";
import ChatBubble from "./ChatBubble";     // ChatBubble 가져오기

//
//
//

function App() {
  // 더미 데이터
  const messages = [
    { id: 1, text: "안녕하세요. 인천공항 도우미 상담원 박지영입니다.\n공항 이용에 어떤 도움이 필요하신가요?", isSender: false },
    { id: 2, text: "게이트 시간", isSender: true },
    { id: 3, text: "비행기 정보(항공사, 비행기 번호 등)를 알려주시면, 정확한 게이트와 탑승 시간을 확인해 드리겠습니다.", isSender: false },
    { id: 4, text: "저는 20:00에 출발하는 티웨이 항공 TW123편 탑승 예정입니다.", isSender: true },
    { id: 5, text: "티웨이 항공 TW123편의 탑승구는 D5번이며 탑승 시작 시간은 19:30입니다.\nD구역은 공항 내 면세점을 지나 오른쪽에 있습니다.\n탑승 절차를 지나시거나 바로 D 구역으로 이동하시면 됩니다.\n게이트 변경 여부는 공항 모니터를 통해 확인해 주세요.", isSender: false },
    { id: 6, text: "더 궁금하신 사항이 있으실까요?", isSender: false },
  ];

  /* TODO: 서버 주소 정해지면 주석 처리 해제
  useEffect(() => {
    const socket = new SockJS("서버주소");
    const stompClient = new stomp.Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("connected");
        stompClient.subscribe("/sub/chat", (msg) => {
          if (msg.body) {
            const newMsg = JSON.parse(msg.body);
            setMessages((prev) => [...prev, newMsg]);
          }
        });
      },
    });
    setClient(stompClient);
    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);
  */

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      {/* 메시지 목록 표시 */}
      {messages.map((msg) => (
        <ChatBubble key={msg.id} text={msg.text} isSender={msg.isSender} />
      ))}
    </div>
  );
}

export default App;
