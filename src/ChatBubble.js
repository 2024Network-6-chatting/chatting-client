import React, { useState } from "react";
import axios from "axios";
import { traslateGeminiAI }from "./GeminiAI";

function ChatBubble({ text, isSender }) {
  const [showTranslation, setShowTranslation] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false); // 로딩 상태

  // 번역 버튼 클릭 핸들러
  const handleTranslateClick = async () => {
    if (!showTranslation && !translatedText) {
      setLoading(true); // 로딩 시작
      try {
        const translation = await traslateGeminiAI(text); //gemini 사용
        setTranslatedText(translation);
        setShowTranslation(true);
      } catch (error) {
        console.error("번역 중 에러:", error);
        setTranslatedText("번역 실패"); // 에러 시 메시지
      } finally {
        setLoading(false); // 로딩 종료
      }
    } else {
      setShowTranslation(!showTranslation); // 번역 숨기기/보이기
    }
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