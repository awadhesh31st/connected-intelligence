export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-[#F6F1E8] animate-pulse">
      <div className="h-[68px] sm:h-[76px] bg-[#F6F1E8]/80" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-12 sm:pt-16 pb-10 sm:pb-14 text-center">
        <div className="h-3 w-20 bg-black/10 rounded mx-auto mb-4" />
        <div className="h-9 w-3/4 bg-black/10 rounded mx-auto mb-3" />
        <div className="h-4 w-full bg-black/5 rounded mx-auto" />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-14 sm:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-[20px] bg-white border border-black/5 p-7 h-56">
              <div className="w-10 h-10 rounded-xl bg-black/10 mb-4" />
              <div className="h-5 w-2/3 bg-black/10 rounded mb-3" />
              <div className="h-3 w-full bg-black/5 rounded mb-2" />
              <div className="h-3 w-4/5 bg-black/5 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
