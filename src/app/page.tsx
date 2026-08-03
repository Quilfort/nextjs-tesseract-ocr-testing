import OcrScanner from "@/components/OcrScanner";

export default function Home() {
  return (
    <main className="
      min-h-screen
      bg-slate-50
      px-6
      py-12
    ">
      <div className="
        mx-auto
        max-w-3xl
      ">

        <h1 className="
          text-4xl
          font-bold
          tracking-tight
          text-slate-900
        ">
          OCR Scanner
        </h1>

        <p className="
          mt-3
          text-slate-600
        ">
          Upload an image and extract text directly in your browser.
        </p>


        <div className="
          mt-8
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        ">
          <OcrScanner />
        </div>

      </div>
    </main>
  );
}