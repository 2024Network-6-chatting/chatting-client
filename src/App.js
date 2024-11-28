import { useEffect, useState } from "react";
import * as stomp from "@stomp/stompjs";
import SockJS from "sockjs-client";
import "./App.css";

//
//
//

function App() {
  const [messages, setMessages] = useState([]); // 받은 메시지 목록
  const [inputMesaage, setInputMessage] = useState(""); // 입력 메시지,
  const [client, setClient] = useState(); // stomp client

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

  return (
    <div className="container">
      <div></div>
    </div>
  );
}

export default App;
