"use client";

export const runtime = "edge";

import { useState } from "react";
import { useParams } from "next/navigation";

const SCENES = {
  s01: { title: "产品介绍", desc: "向客户介绍包袋产品规格、材质、工艺" },
  s02: { title: "询价报价", desc: "处理客户询价、报价、MOQ 谈判" },
  s03: { title: "质量问题处理", desc: "应对客户投诉、质量异议、售后处理" },
};

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function PracticePage() {
  const params = useParams();
  const scene = params.scene as string;
  const sceneInfo = SCENES[scene as keyof typeof SCENES];

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);

  const startConversation = async () => {
    setStarted(true);
    setLoading(true);
    
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [], scene }),
    });
    
    const data = await res.json();
    setMessages([{ role: "assistant", content: data.content }]);
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        scene 
      }),
    });

    const data = await res.json();
    setMessages([...newMessages, { role: "assistant", content: data.content }]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-900 text-white py-6 px-6">
        <div className="max-w-4xl mx-auto">
          <a href="/" className="text-blue-200 text-sm mb-2 inline-block hover:text-white">← 返回首页</a>
          <h1 className="text-2xl font-bold">{sceneInfo?.title}</h1>
          <p className="text-blue-200 text-sm mt-1">{sceneInfo?.desc}</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {!started ? (
          <div className="bg-white rounded-xl p-8 shadow-sm text-center">
            <h2 className="text-xl font-semibold mb-4">准备开始练习</h2>
            <p className="text-gray-600 mb-6">AI 将扮演日本客户，与你进行商务对话。对话结束后会给出评分和建议。</p>
            <button
              onClick={startConversation}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              开始对话
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-sm min-h-[400px] max-h-[600px] overflow-y-auto">
              {messages.map((msg, i) => (
                <div key={i} className={`mb-4 ${msg.role === "user" ? "text-right" : ""}`}>
                  <div className={`inline-block max-w-[80%] p-4 rounded-lg ${
                    msg.role === "user" 
                      ? "bg-blue-100 text-gray-800" 
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="text-gray-400 text-sm">AI 正在回复...</div>
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="输入你的日语回复..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300"
              >
                发送
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
