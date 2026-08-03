"use client";

import Image from "next/image";
import { useState } from "react";
import { createWorker } from "tesseract.js";

export default function OcrScanner() {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState("");
    const [text, setText] = useState("");

    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    function handleImageChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setImage(file);
        setText("");

        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
    }

    async function scanImage() {
        if (!image) {
            return;
        }

        setLoading(true);
        setText("");
        setProgress(0);

        try {
            const worker = await createWorker(
                ["eng", "nld"],
                1,
                {
                    logger: (message) => {
                        if (
                            message.status ===
                            "recognizing text"
                        ) {
                            setProgress(
                                Math.round(
                                    message.progress * 100
                                )
                            );
                        }
                    },
                }
            );

            const result = await worker.recognize(
                image
            );

            setText(result.data.text);

            await worker.terminate();
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

            {/* Upload */}

            <section>
                <h2 className="mb-3 text-lg font-semibold text-slate-900">
                    Upload Image
                </h2>

                <label
                    htmlFor="image-upload"
                    className="
                        flex
                        cursor-pointer
                        flex-col
                        items-center
                        justify-center
                        rounded-2xl
                        border-2
                        border-dashed
                        border-slate-300
                        bg-slate-50
                        px-6
                        py-12
                        text-center
                        transition
                        hover:border-blue-500
                        hover:bg-blue-50
                    "
                >
                    <span className="text-5xl">
                        📄
                    </span>

                    <span className="mt-4 text-lg font-medium text-slate-900">
                        Click to upload an image
                    </span>

                    <span className="mt-1 text-sm text-slate-500">
                        JPG, PNG or WEBP
                    </span>

                    <span className="mt-1 text-sm text-slate-500">
                        You can upload a new image at any time
                    </span>

                    {image && (
                        <div
                            className="
                                mt-5
                                rounded-full
                                bg-green-100
                                px-4
                                py-2
                                text-sm
                                font-medium
                                text-green-800
                            "
                        >
                            Selected: {image.name}
                        </div>
                    )}
                </label>

                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />
            </section>

            {/* Preview */}

            {preview && (
                <section>
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Preview
                        </h2>

                        <label
                            htmlFor="image-upload"
                            className="
                                cursor-pointer
                                rounded-lg
                                border
                                border-slate-300
                                px-3
                                py-2
                                text-sm
                                font-medium
                                text-slate-700
                                transition
                                hover:bg-slate-100
                            "
                        >
                            Replace Image
                        </label>
                    </div>

                    <div
                        className="
                            overflow-hidden
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            p-4
                        "
                    >
                        <Image
                            src={preview}
                            alt="Uploaded preview"
                            width={1200}
                            height={800}
                            unoptimized
                            className="
                                max-h-[500px]
                                w-auto
                                rounded-xl
                                object-contain
                            "
                        />
                    </div>
                </section>
            )}

            {/* OCR Button */}

            <section>
                <button
                    onClick={scanImage}
                    disabled={!image || loading}
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
                    {loading
                        ? `Scanning ${progress}%`
                        : "Extract Text"}
                </button>
            </section>

            {/* Result */}

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
                    {text ||
                        "No text detected yet."}
                </pre>
            </section>

        </div>
    );
}