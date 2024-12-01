import React, { useState } from "react";
import "./MobileView.css";

const MobileView = ({ onSendMessage }) => {
  const [message, setMessage] = useState(""); // 메세지 입력 상태

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message); // 부모 컴포넌트로 메시지 전송
      setMessage(""); // 메시지 입력창 초기화
    }
  };

  return (
    <div>
      {/* 하단바 */}
      <div className="mobile-chat-container">
        <input
          className="input-field"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요."
        />
        <button className="send-button" onClick={handleSendMessage}>
          ✈️
        </button>
      </div>
    </div>
  );
};

export default MobileView;
