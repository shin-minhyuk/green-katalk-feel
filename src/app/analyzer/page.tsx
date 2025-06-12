import { Header, Footer } from "@/components/common";
import AnalyzerQuestionnaire from "@/components/analyzer/AnalyzerQuestionnaire";

export default function AnalyzerPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white px-4 py-10">
        <AnalyzerQuestionnaire />
      </main>
      <Footer />
    </>
  );
}
