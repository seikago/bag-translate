import { NextRequest, NextResponse } from "next/server";

const SCENE_PROMPTS: Record<string, string> = {
  s01: "产品介绍场景：用户是中国包袋供应商，正在向你介绍他们的包袋产品（规格、材质、工艺等）。",
  s02: "询价报价场景：你正在向中国供应商询问包袋产品的价格、MOQ、交期等信息。",
  s03: "质量问题处理场景：你收到的包袋产品有质量问题，正在与供应商沟通处理方案。",
};

export async function POST(req: NextRequest) {
  const { messages, scene } = await req.json();

  const systemPrompt = `你是一位日本包袋采购负责人，正在与中国供应商进行商务沟通。

角色设定：
- 公司：日本知名品牌采购部
- 职位：采购负责人
- 性格：专业、礼貌，偶尔会提出价格压力或质量疑虑
- 语言：使用标准商务日语

当前场景：${SCENE_PROMPTS[scene] || "一般商务沟通"}

对话规则：
1. 用日语与用户对话（每次回复1-3句）
2. 每次对话后，用中文给出对用户上一句回复的简短点评
3. 点评格式：【点评】语法/用词建议...（如果用户还没回复则跳过点评）
4. 对话进行6-8轮后，给出总体评分（满分10分）和改进建议`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY || "",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    }),
  });

  const data = await response.json();
  return NextResponse.json({ content: data.content?.[0]?.text || "エラーが発生しました。" });
}
