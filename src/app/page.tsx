import OcrScanner from "@/components/OcrScanner";

export default function Home() {
  return (
    <main className="min-h-screen p-10">

      <h1 className="mb-8 text-4xl font-bold">
        Next.js OCR Test
      </h1>

      <OcrScanner />

    </main>
  );
}