# Bag Translate

包袋行业日语口语练习工具 — 通过 AI 模拟真实客户对话场景，帮助外贸人快速掌握行业专业日语表达。

## 功能

- 🎒 场景化对话练习（产品介绍 / 询价报价 / 质量问题处理）
- 📚 包袋行业专业词汇库（100+ 词汇）
- 🤖 AI 实时点评和评分

## 技术栈

- Next.js 15 + TypeScript
- Tailwind CSS
- Claude API

## 快速开始

```bash
pnpm install
cp .env.example .env.local
# 填入你的 ANTHROPIC_API_KEY
pnpm dev
```

## 部署

推荐部署到 [Vercel](https://vercel.com)，配置环境变量 `ANTHROPIC_API_KEY` 即可。
