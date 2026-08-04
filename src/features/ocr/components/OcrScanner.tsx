"use client";

import { useState } from "react";

import ImageUpload from "@/features/ocr/components/ImageUpload";

import { ocrEngine }
    from "@/features/ocr/services/OcrService";

export default function OcrScanner() {

    const [image, setImage] =
        useState<File | null>(null);

    const [preview, setPreview] =
        useState("");

    const [text, setText] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [progress, setProgress] =
        useState(0);


    async function scanImage() {

        if (!image) {
            return;
        }

        setLoading(true);
        setText("");
        setProgress(0);

        try {

            const result =
                await ocrEngine.recognize(
                    image,
                    setProgress
                );

            setText(result.text);

        } catch (error) {

            console.error(error);

            setText(
                "Something went wrong while scanning the image."
            );

        } finally {

            setLoading(false);

        }
    }


    return (
        <div className="space-y-8">

            <ImageUpload
                image={image}
                preview={preview}
                onImageChange={(
                    file,
                    previewUrl
                ) => {

                    setImage(file);
                    setPreview(
                        previewUrl
                    );

                    setText("");
                }}
            />

            <section>

                <button
                    onClick={scanImage}
                    disabled={
                        !image ||
                        loading
                    }
                    className="
                        rounded-xl
                        bg-blue-600
                        px-5
                        py-3
                        font-medium
                        text-white
                        transition
                        hover:bg-blue-700
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >
                    {
                        loading
                            ? `Scanning ${progress}%`
                            : "Extract Text"
                    }
                </button>

            </section>

            <section>

                <h2 className="mb-3 text-lg font-semibold text-slate-900">
                    Result
                </h2>

                <pre
                    className="
                        min-h-40
                        whitespace-pre-wrap
                        rounded-2xl
                        border
                        border-slate-200
                        bg-slate-50
                        p-5
                        text-slate-800
                    "
                >
                    {
                        text ||
                        "No text detected yet."
                    }
                </pre>

            </section>

        </div>
    );
}