const DAILY_PHRASES = [
  { japanese: "お世話になっております。", chinese: "承蒙关照。", scene: "商务邮件/电话开场白" },
  { japanese: "サンプルをご確認いただけますでしょうか。", chinese: "请您确认一下样品。", scene: "样品确认" },
  { japanese: "納期は90日でございます。", chinese: "交期为90天。", scene: "交期说明" },
  { japanese: "品質には自信を持っております。", chinese: "我们对品质很有信心。", scene: "品质保证" },
  { japanese: "ご検討のほど、よろしくお願いいたします。", chinese: "请您考虑一下，谢谢。", scene: "跟进邮件结尾" },
  { japanese: "最小ロットは500個からとなっております。", chinese: "最小起订量为500个。", scene: "MOQ说明" },
  { japanese: "見積もりをお送りいたします。", chinese: "我将发送报价给您。", scene: "报价跟进" },
];

export default function Home() {
  const scenes = [
    { id: "s01", title: "产品介绍", desc: "向客户介绍包袋产品规格、材质、工艺", icon: "🎒" },
    { id: "s02", title: "询价报价", desc: "处理客户询价、报价、MOQ 谈判", icon: "💴" },
    { id: "s03", title: "质量问题处理", desc: "应对客户投诉、质量异议、售后处理", icon: "🔍" },
  ];

  const today = new Date();
  const phraseIndex = today.getDate() % DAILY_PHRASES.length;
  const dailyPhrase = DAILY_PHRASES[phraseIndex];

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-blue-900 text-white py-10 px-6 text-center">
        <h1 className="text-3xl font-bold mb-2">Bag Translate</h1>
        <p className="text-blue-200 text-lg">包袋行业日语口语练习工具</p>
        <p className="text-blue-300 text-sm mt-1">不是学日语，是学「包袋外贸日语」</p>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* 每日一句 */}
        <section className="mb-10">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">📅</span>
              <span className="text-sm font-medium text-blue-700">每日一句</span>
            </div>
            <p className="text-xl font-bold text-gray-800 mb-1">{dailyPhrase.japanese}</p>
            <p className="text-blue-700 mb-2">{dailyPhrase.chinese}</p>
            <p className="text-xs text-gray-400">使用场景：{dailyPhrase.scene}</p>
          </div>
        </section>

        {/* 场景练习 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">选择练习场景</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scenes.map((scene) => (
              <a
                key={scene.id}
                href={`/practice/${scene.id}`}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all block"
              >
                <div className="text-3xl mb-3">{scene.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-1">{scene.title}</h3>
                <p className="text-sm text-gray-500">{scene.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* 词汇库入口 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">专业词汇库</h2>
          <a
            href="/vocabulary"
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all flex items-center gap-4 block"
          >
            <div className="text-3xl">📚</div>
            <div>
              <h3 className="font-semibold text-gray-800">包袋行业日语词汇</h3>
              <p className="text-sm text-gray-500">材质、配件、工艺、商务用语 25+ 核心词汇</p>
            </div>
            <div className="ml-auto text-gray-300 text-xl">→</div>
          </a>
        </section>
      </div>
    </main>
  );
}
