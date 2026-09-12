export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-[#F6F1E8] animate-pulse">
      <div className="h-[68px] sm:h-[76px] bg-[#F6F1E8]/80" />
      <div className="mx-3 sm:mx-4 md:mx-6 lg:mx-auto lg:max-w-6xl mt-4 rounded-[20px] sm:rounded-[24px] bg-black/90 h-64 sm:h-72" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-[20px] bg-white border border-black/5 p-6 h-28" />
          ))}
        </div>
      </div>
    </div>
  );
}
