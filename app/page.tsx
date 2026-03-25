export default function Home() {
  const scenes = [
    { id: "s01", title: "产品介绍", desc: "向客户介绍包袋产品规格、材质、工艺", icon: "🎒" },
    { id: "s02", title: "询价报价", desc: "处理客户询价、报价、MOQ 谈判", icon: "💴" },
    { id: "s03", title: "质量问题处理", desc: "应对客户投诉、质量异议、售后处理", icon: "🔍" },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-900 text-white py-8 px-6 text-center">
        <h1 className="text-3xl font-bold mb-2">Bag Translate</h1>
        <p className="text-blue-200 text-lg">包袋行业日语口语练习工具</p>
        <p className="text-blue-300 text-sm mt-1">不是学日语，是学「包袋外贸日语」</p>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* 场景练习 */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">选择练习场景</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scenes.map((scene) => (
              <a
                key={scene.id}
                href={`/practice/${scene.id}`}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer block"
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
          <h2 className="text-xl font-semibold text-gray-800 mb-6">专业词汇库</h2>
          <a
            href="/vocabulary"
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all flex items-center gap-4 block"
          >
            <div className="text-3xl">📚</div>
            <div>
              <h3 className="font-semibold text-gray-800">包袋行业日语词汇</h3>
              <p className="text-sm text-gray-500">材质、配件、工艺、商务用语 100+ 词汇</p>
            </div>
          </a>
        </section>
      </div>
    </main>
  );
}
