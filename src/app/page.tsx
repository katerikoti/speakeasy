import { Header } from "@/components/Header";
import { TopicWheel } from "@/components/TopicWheel";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-12 px-6 pb-16">
        <h1 className="text-center font-display text-3xl font-medium text-ink">
          What will you talk about today?
        </h1>
        <TopicWheel />
        <p className="text-center text-sm text-ink-soft">
          Spin the wheel to receive a speaking topic
        </p>
      </main>
    </div>
  );
}
