import React, { useState } from "react";
import axios from "axios";

const GeminiAIExample = () => {
  const [ResponseText, setResponseText] = useState("");
  const [userInput, setUserInput] = useState("");
  
  // Gemini AI 활용 함수
  const handleGenerate = async () => {
    try {
      const apiKey = process.env.REACT_APP_GEMINI_API
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      //프롬프트 설정
      const prompt = `You are a translator in chatting system between employees in airport. Don't distrupt the original message's meaning. Translate the following text into English: "${userInput}"`;

      const data = {
        contents: [
          {
            parts: [{ text: prompt }], // 번역 프롬프트를 포함
          },
        ],
      };

      const headers = {
        "Content-Type": "application/json",
      };

      const result = await axios.post(url, data, { headers });

      // 응답에서 text만 추출
      const text = result.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No text found";
      setResponseText(text);
    } catch (error) {
      console.error("API 호출 중 에러 발생:", error);
      setResponseText(`에러 발생: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Gemini AI Example</h1>
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="입력하세요"
      />
      <button onClick={handleGenerate}>Generate</button>
      <div>
        <h2>결과</h2>
        <p>{ResponseText}</p>
      </div>
    </div>
  );
};

export default GeminiAIExample;
