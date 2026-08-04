"use client";

import { useState } from "react";

import ImageUpload from "@/features/ocr/components/ImageUpload";
import OcrResult from "@/features/ocr/components/OcrResult";
import OcrEngineSelector, {
    OcrEngineType,
} from "@/features/ocr/components/OcrEngineSelector";

import { ocrEngine } from "@/features/ocr/services/OcrService";


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

    const [engine, setEngine] =
        useState<OcrEngineType>(
            "tesseract"
        );


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


            setText(
                result.text
            );


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


            <OcrEngineSelector
                value={engine}
                onChange={setEngine}
            />


            <ImageUpload
                image={image}
                preview={preview}
                onImageChange={
                    (
                        file,
                        previewUrl
                    ) => {

                        setImage(file);

                        setPreview(
                            previewUrl
                        );

                        setText("");
                    }
                }
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


            <OcrResult
                text={text}
            />


        </div>
    );
}