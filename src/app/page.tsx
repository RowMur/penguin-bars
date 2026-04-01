import PenguinBarForm from "@/components/PenguinBarForm";
import { prisma } from "@/lib/db";

export default async function Home() {
  const totalBars = await prisma.penguinBar.count();
  const uniqueJokes = await prisma.penguinBar.findMany({
    select: { joke: true },
    distinct: ["joke"],
  });

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#E4252C]">
      {/* Yellow stripe accent */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[#FFD60A]/35 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#FFD60A]/25 blur-3xl"></div>

      <div className="relative z-10 w-fit container mx-auto px-4 py-12 text-center">
        {/* Header section with yellow background */}
        <div className="mb-12 rounded-2xl border-4 border-[#0B4AA7] bg-[#FFD60A] p-12 shadow-2xl">
          <div className="flex text-xl md:text-6xl justify-center items-center mb-4">
            <span className="pr-2">🐧</span>
            <h1 className="font-black tracking-tight text-black">
              PENGUIN BARS DATABASE
            </h1>
            <span className="pl-2">🐧</span>
          </div>
          <div className="mb-6 h-2 w-32 rounded-full bg-[#0B4AA7] mx-auto"></div>
          <p className="max-w-2xl mx-auto text-md md:text-xl font-bold text-black">
            Help us collect data on penguin bars jokes, facts, and designs from
            around the UK!
          </p>
          <div className="mt-8 flex flex-wrap gap-8 justify-center">
            <div className="flex flex-col items-center">
              <p className="text-sm font-semibold text-[#0B4AA7]">
                BARS COLLECTED
              </p>
              <p className="text-3xl md:text-4xl font-black text-black">
                {totalBars}
              </p>
            </div>
            <div className="hidden md:block w-1 bg-[#0B4AA7]"></div>
            <div className="flex flex-col items-center">
              <p className="text-sm font-semibold text-[#0B4AA7]">
                UNIQUE JOKES
              </p>
              <p className="text-3xl md:text-4xl font-black text-black">
                {uniqueJokes.length}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <PenguinBarForm />
        </div>

        <div className="mb-12 rounded-2xl border-4 border-[#0B4AA7] bg-[#FFD60A] p-12 shadow-2xl">
          <h1 className="mb-4 text-xl font-black tracking-tight text-black">
            Credit
          </h1>
          <div className="mb-6 h-2 w-32 rounded-full bg-[#0B4AA7] mx-auto"></div>
          <p className="max-w-2xl mx-auto text-md font-bold text-black">
            Original YouTube video:{" "}
            <a
              href="https://www.youtube.com/watch?v=NoA7H7KqOQM"
              className="text-[#0B4AA7] underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch here
            </a>
          </p>
          <p className="max-w-2xl mx-auto text-md font-bold text-black">
            Commenter who suggested the idea:{" "}
            <a
              href="https://www.youtube.com/@OnlineIsMisinformation"
              className="text-[#0B4AA7] underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              @OnlineIsMisinformation
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
