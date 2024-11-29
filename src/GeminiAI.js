import React, { useState } from "react";
import axios from "axios";

const GeminiAIExample = () => {
  const [result, setResult] = useState("");
  const [prompt, setPrompt] = useState("");
  const apiKey = process.env.REACT_APP_GEMINI_API

  const handleGenerate = async () => {
    try {
      const response = await axios.post(
        "https://api.generativeai.google/v1/models/gemini-1.5-flash:generateContent",
        {
          prompt: { text: prompt },
        },
        {
          headers: {
            Authorization: apiKey, //api 키
            "Content-Type": "application/json",
          },
        }
      );
      setResult(response.data.response.text);
    } catch (error) {
      console.error("API 호출 중 에러 발생:", error);
    }
  };

  return (
    <div>
      <h1>Gemini AI Example</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="프롬프트 입력하세요"
      />
      <button onClick={handleGenerate}>Generate</button>
      <div>
        <h2>결과</h2>
        <p>{result}</p>
      </div>
    </div>
  );
};

export default GeminiAIExample;
