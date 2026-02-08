export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">AI Chatbot Demo</h1>
        <p className="text-gray-600 mb-8">Choose a demo to explore</p>
        <div className="flex gap-6">
          <a
            href="/ecommerce"
            className="block p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-amber-200"
          >
            <div className="text-4xl mb-3">🛒</div>
            <h2 className="text-xl font-semibold mb-2">E-Commerce</h2>
            <p className="text-gray-500 text-sm">
              Shopping assistant powered by Google Gemini
            </p>
          </a>
          <a
            href="/portfolio"
            className="block p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-purple-200"
          >
            <div className="text-4xl mb-3">💼</div>
            <h2 className="text-xl font-semibold mb-2">Portfolio</h2>
            <p className="text-gray-500 text-sm">
              Portfolio assistant powered by Perplexity Sonar
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
