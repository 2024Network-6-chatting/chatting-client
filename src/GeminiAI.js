import React from "react";
import axios from "axios";

export const traslateGeminiAI = async (userInput) => {

  const apiKey = process.env.REACT_APP_GEMINI_API
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    //프롬프트 설정
    //채팅 언어가 영어가 아니라면, 영어로 번역
    //채팅 언어가 영어라면 한국어로 번역
  const prompt = `You are a translator in chatting system between employees in airport. 
                Don't distrupt the original message's meaning. 
                If the text is not English, translate it into English.
                If the text is in English, translate it into Korean: "${userInput}"`;

  const data = {
    contents: [
      {
        parts: [{ text: prompt }], // 번역 프롬프트를 포함
      },
    ],
  };
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json"
      },
    });

    const translatedText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No text found";
    return translatedText
  } catch (error) {
      console.error("번역 중 에러 발생:", error);
      throw new Error("번역 실패");
  } 
};
