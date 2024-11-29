import React, { useState } from "react";
import axios from "axios";

function ChatBubble({ text, isSender }) {
  const [showTranslation, setShowTranslation] = useState(false);
  const [translatedText, setTranslatedText] = useState("");

  // 번역 버튼 클릭 핸들러
  const handleTranslateClick = () => {
    if (!showTranslation) {
      // 번역 API 호출 대신 임시 텍스트 추가
      const mockTranslatedText = "This is a translated text."; // 예시 번역 텍스트
      setTranslatedText(mockTranslatedText);
    }
    setShowTranslation(!showTranslation);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isSender ? "row-reverse" : "row",
        marginBottom: "10px",
      }}
    >
      {/* 메시지 버블 */}
      <div
        style={{
          maxWidth: "70%",
          padding: "10px 15px",
          backgroundColor: isSender ? "#dcf8c6" : "#ffffff",
          color: isSender ? "#000000" : "#333333",
          borderRadius: "12px",
          borderBottomRightRadius: isSender ? "0" : "12px",
          borderBottomLeftRadius: isSender ? "12px" : "0",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          fontSize: "14px",
          lineHeight: "1.5",
        }}
      >
        {/* 기본 메시지 */}
        <div>{text}</div>

        {/* 번역된 텍스트 */}
        {showTranslation && (
          <div
            style={{
              marginTop: "10px",
              fontSize: "12px",
              color: "#555",
              backgroundColor: "#f1f1f1",
              padding: "8px",
              borderRadius: "8px",
              wordWrap: "break-word",
            }}
          >
            {translatedText}
          </div>
        )}

        {/* 번역 보기 버튼 */}
        {!isSender && (
          <button
            onClick={handleTranslateClick}
            style={{
              marginTop: "10px",
              background: "none",
              color: "#007bff",
              border: "none",
              fontSize: "12px",
              cursor: "pointer",
              padding: 0,
            }}
          >
            {showTranslation ? "번역 숨기기" : "번역 보기"}
          </button>
        )}
      </div>
    </div>
  );
}

export default ChatBubble;