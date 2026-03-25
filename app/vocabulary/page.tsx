"use client";

import { useState } from "react";
import { vocabularies } from "../data/vocabulary";

const CATEGORIES = ["全部", "材质面料", "五金配件", "产品类型", "工艺术语", "商务用语"];

export default function VocabularyPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("全部");

  const filtered = vocabularies.filter((v) => {
    const matchCategory = category === "全部" || v.category === category;
    const matchSearch =
      !search ||
      v.japanese.includes(search) ||
      v.chinese.includes(search) ||
      v.romaji.includes(search);
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-900 text-white py-6 px-6">
        <div className="max-w-4xl mx-auto">
          <a href="/" className="text-blue-200 text-sm mb-2 inline-block hover:text-white">← 返回首页</a>
          <h1 className="text-2xl font-bold">专业词汇库</h1>
          <p className="text-blue-200 text-sm mt-1">包袋行业日语核心词汇</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* 搜索框 */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索词汇（中文或日文）..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
        />

        {/* 分类筛选 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                category === cat
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 词汇列表 */}
        <div className="text-sm text-gray-500 mb-4">共 {filtered.length} 个词汇</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((v) => (
            <div key={v.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-blue-200 transition">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-xl font-bold text-gray-800">{v.japanese}</span>
                  <span className="text-gray-500 ml-2 text-sm">{v.romaji}</span>
                </div>
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">{v.category}</span>
              </div>
              <div className="text-blue-700 font-medium mb-3">{v.chinese}</div>
              <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                <div className="mb-1">{v.example}</div>
                <div className="text-gray-400">{v.exampleTranslation}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
