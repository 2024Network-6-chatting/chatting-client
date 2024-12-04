import React, { useState } from "react";
import { traslateGeminiAI } from "./GeminiAI";

function ChatBubble({ text, isSender, isEmergency }) {
  const [showTranslation, setShowTranslation] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false); // 로딩 상태

  // 번역 버튼 클릭 핸들러
  const handleTranslateClick = async () => {
    if (!showTranslation && !translatedText) {
      setLoading(true); // 로딩 시작
      try {
        const translation = await traslateGeminiAI(text); // 번역 요청
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
          backgroundColor: isEmergency
            ? "#ff4d4f"   // 긴급 메시지: 빨간색
            : isSender
            ? "#dcf8c6"   // 보낸 사람: 연두색
            : "#ffffff",  // 받은 사람: 흰색
          color: isEmergency ? "#ffffff" : isSender ? "#000000" : "#333333", // 긴급 메시지는 흰색 텍스트
          borderRadius: "12px",
          borderBottomRightRadius: isSender ? "0" : "12px",
          borderBottomLeftRadius: isSender ? "12px" : "0",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          overflowWrap: "break-word",
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
              overflowWrap: "break-word",
              wordWrap: "break-word",
              whiteSpace: "pre-wrap",
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
              color: loading ? "#f369b4" : "#007bff", // 번역 중 색상과 번역 보기 색상 구분
              border: "none",
              fontSize: "12px",
              cursor: loading ? "not-allowed" : "pointer", // 번역 중 클릭 방지
              padding: 0,
            }}
            disabled={loading} // 로딩 중 버튼 비활성화
          >
            {loading
              ? "번역 중..." // 로딩 상태
              : showTranslation
              ? "번역 숨기기"
              : "번역 보기"}
          </button>
        )}
      </div>
    </div>
  );
}

export default ChatBubble;
