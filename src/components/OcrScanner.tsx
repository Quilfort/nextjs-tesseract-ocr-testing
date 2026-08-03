"use client";

import { useState } from "react";
import { createWorker } from "tesseract.js";

export default function OcrScanner() {
  const [image, setImage] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function scanImage() {
    if (!image) return;

    setLoading(true);
    setText("");

    const worker = await createWorker("eng");

    const result = await worker.recognize(image);

    setText(result.data.text);

    await worker.terminate();

    setLoading(false);
  }

  return (
    <div className="space-y-6">

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setImage(e.target.files?.[0] ?? null)
        }
      />

      <button
        onClick={scanImage}
        disabled={!image || loading}
        className="rounded bg-black px-4 py-2 text-white"
      >
        {loading ? "Scanning..." : "Scan image"}
      </button>


      <div>
        <h2 className="font-bold">
          Result:
        </h2>

        <pre className="mt-2 whitespace-pre-wrap rounded bg-gray-100 p-4">
          {text}
        </pre>
      </div>

    </div>
  );
}