import PenguinBarForm from "@/components/PenguinBarForm";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#E4252C]">
      {/* Yellow stripe accent */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[#FFD60A]/35 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#FFD60A]/25 blur-3xl"></div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header section with yellow background */}
        <div className="mb-12 rounded-2xl border-4 border-[#0B4AA7] bg-[#FFD60A] p-12 shadow-2xl">
          <h1 className="mb-4 text-6xl font-black tracking-tight text-black">
            🐧 PENGUIN BARS DATABASE
          </h1>
          <div className="mb-6 h-2 w-32 rounded-full bg-[#0B4AA7]"></div>
          <p className="max-w-2xl text-xl font-bold text-black">
            Help us collect data on penguin bars jokes, facts, and designs from
            around the UK! Share your wrapper findings and build the ultimate
            penguin bar collection.
          </p>
        </div>

        <div className="mb-12">
          <PenguinBarForm />
        </div>
      </div>
    </div>
  );
}
