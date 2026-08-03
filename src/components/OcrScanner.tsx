"use client";

import Image from "next/image";
import { useState } from "react";
import { createWorker } from "tesseract.js";

export default function OcrScanner() {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");
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
                        if (message.status === "recognizing text") {
                            setProgress(
                                Math.round(message.progress * 100)
                            );
                        }
                    },
                }
            );


            const result = await worker.recognize(image);


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
        <div className="space-y-6">


            <div>
                <label
                    className="block text-sm font-medium text-slate-700"
                >
                    Upload image
                </label>


                <input
                    className="mt-2 block w-full rounded-lg border border-slate-300 bg-white p-2 text-sm"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />

            </div>



            {
                preview && (
                    <div>
                        <p className="mb-2 text-sm font-medium text-slate-700">
                            Preview
                        </p>

                        <Image
                            src={preview}
                            alt="Uploaded preview"
                            width={800}
                            height={600}
                            unoptimized
                            className="
                                max-h-80
                                w-auto
                                rounded-xl
                                border
                                border-slate-200
                                object-contain
                            "
                        />

                    </div>
                )
            }



            <button
                onClick={scanImage}
                disabled={!image || loading}
                className="
                    rounded-lg
                    bg-blue-600
                    px-5
                    py-2.5
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
                        : "Scan image"
                }

            </button>



            <div>

                <h2 className="font-semibold text-slate-900">
                    Result
                </h2>


                <pre
                    className="
                        mt-3
                        min-h-32
                        whitespace-pre-wrap
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        p-5
                        text-slate-800
                    "
                >
                    {text || "No text detected yet."}
                </pre>

            </div>


        </div>
    );
}