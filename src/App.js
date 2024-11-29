import { useEffect, useState } from "react";
import * as stomp from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "axios";
import GeminiAI from "./GeminiAI";
import "./App.css";

//
//
//

function App() {
  const [messages, setMessages] = useState([]); // 받은 메시지 목록
  const [inputMesaage, setInputMessage] = useState(""); // 입력 메시지,
  const [client, setClient] = useState(); // stomp client
  const [TranslateText, setTranslateText] = useState(""); //번역메시지

  // 메시지 전송 핸들러
  const send = () => {
    if (client && inputMesaage.trim() !== "") {
      const messageObj = {
        content: inputMesaage.trim(),
      };
      client.publish({
        destination: "/pub/chat",
        body: JSON.stringify(messageObj),
      });
      setInputMessage("");
    }
  };

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

  // 번역된 메시지 상태 업데이트
  const handleTranslation = (text, index) => {
    setTranslatedMessages((prev) => ({
      ...prev,
      [index]: { translated: text, isTranslated: true },
    }));
  };

  // 원문으로 돌아가기
  const handleOriginalMessage = (index) => {
    setTranslatedMessages((prev) => ({
      ...prev,
      [index]: { ...prev[index], isTranslated: false },
    }));
  };

  return (
    <div className="container">
      <div></div>
    </div>
  );
}

export default App;
