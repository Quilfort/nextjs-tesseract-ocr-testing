"use client";

import { useState } from "react";

import ImageUpload from "@/features/ocr/components/ImageUpload";
import OcrResult from "@/features/ocr/components/OcrResult";
import OcrEngineSelector, {
    OcrEngineType,
} from "@/features/ocr/components/OcrEngineSelector";

import {
    ocrEngine,
} from "@/features/ocr/services/OcrService";

import {
    BasicImageProcessor,
} from "@/features/ocr/image-processing/BasicImageProcessor";


export default function OcrScanner() {

    const [image, setImage] =
        useState<File | null>(null);

    const [preview, setPreview] =
        useState("");

    const [
        processedPreview,
        setProcessedPreview,
    ] = useState("");


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


    const imageProcessor =
        new BasicImageProcessor();



    async function scanImage() {

        if (!image) {
            return;
        }


        setLoading(true);

        setText("");

        setProgress(0);


        try {

            /*
             * Step 1:
             * Prepare image
             */
            const processedImage =
                await imageProcessor.process(
                    image
                );


            setProcessedPreview(
                processedImage.preview
            );


            /*
             * Step 2:
             * OCR
             */
            const result =
                await ocrEngine.recognize(
                    processedImage.file,
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


                        // Clear old processing result
                        setProcessedPreview("");


                        setText("");

                    }
                }
            />



            {
                processedPreview && (

                    <section>

                        <h2
                            className="
                                mb-3
                                text-lg
                                font-semibold
                                text-slate-900
                            "
                        >
                            Processed Image
                        </h2>


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

                            <img
                                src={processedPreview}
                                alt="Processed image for OCR"
                                className="
                                    max-h-[500px]
                                    w-auto
                                    rounded-xl
                                    object-contain
                                "
                            />

                        </div>

                    </section>

                )
            }



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