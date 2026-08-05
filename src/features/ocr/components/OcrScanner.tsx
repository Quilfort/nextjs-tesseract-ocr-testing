"use client";

import Image from "next/image";
import {
    useEffect,
    useState,
} from "react";

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


const imageProcessor =
    new BasicImageProcessor();


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


    useEffect(() => {

        return () => {

            if (preview) {
                URL.revokeObjectURL(
                    preview
                );
            }

            if (
                processedPreview
            ) {
                URL.revokeObjectURL(
                    processedPreview
                );
            }

        };

    }, [
        preview,
        processedPreview,
    ]);


    async function scanImage() {

        if (!image) {
            return;
        }

        setLoading(true);
        setText("");
        setProgress(0);

        try {

            const processedImage =
                await imageProcessor.process(
                    image
                );


            if (
                processedPreview
            ) {
                URL.revokeObjectURL(
                    processedPreview
                );
            }


            setProcessedPreview(
                processedImage.preview
            );


            const result =
                await ocrEngine.recognize(
                    processedImage.file,
                    setProgress
                );


            setText(
                result.text
            );

        } catch (error) {

            console.error(
                error
            );

            setText(
                "Something went wrong while scanning the image."
            );

        } finally {

            setLoading(
                false
            );

        }
    }


    return (
        <div className="space-y-8">

            <OcrEngineSelector
                value={engine}
                onChange={
                    setEngine
                }
            />

            <ImageUpload
                image={image}
                preview={preview}
                onImageChange={
                    (
                        file,
                        previewUrl
                    ) => {

                        if (
                            preview
                        ) {
                            URL.revokeObjectURL(
                                preview
                            );
                        }

                        if (
                            processedPreview
                        ) {
                            URL.revokeObjectURL(
                                processedPreview
                            );
                        }

                        setImage(
                            file
                        );

                        setPreview(
                            previewUrl
                        );

                        setProcessedPreview(
                            ""
                        );

                        setText(
                            ""
                        );
                    }
                }
            />

            {(preview ||
                processedPreview) && (

                    <section>

                        <h2
                            className="
                            mb-4
                            text-lg
                            font-semibold
                            text-slate-900
                        "
                        >
                            Image Comparison
                        </h2>

                        <div
                            className="
                            grid
                            gap-6
                            lg:grid-cols-2
                        "
                        >

                            <div
                                className="
                                rounded-2xl
                                border
                                border-slate-200
                                bg-white
                                p-4
                            "
                            >

                                <h3
                                    className="
                                    mb-3
                                    text-sm
                                    font-medium
                                    text-slate-600
                                "
                                >
                                    Original
                                </h3>

                                {preview && (

                                    <Image
                                        src={
                                            preview
                                        }
                                        alt="Original image"
                                        width={
                                            1200
                                        }
                                        height={
                                            800
                                        }
                                        unoptimized
                                        className="
                                        max-h-[500px]
                                        w-auto
                                        rounded-xl
                                        object-contain
                                    "
                                    />

                                )}

                            </div>

                            <div
                                className="
                                rounded-2xl
                                border
                                border-slate-200
                                bg-white
                                p-4
                            "
                            >

                                <h3
                                    className="
                                    mb-3
                                    text-sm
                                    font-medium
                                    text-slate-600
                                "
                                >
                                    Processed
                                </h3>

                                {processedPreview ? (

                                    <Image
                                        src={
                                            processedPreview
                                        }
                                        alt="Processed image"
                                        width={
                                            1200
                                        }
                                        height={
                                            800
                                        }
                                        unoptimized
                                        className="
                                        max-h-[500px]
                                        w-auto
                                        rounded-xl
                                        object-contain
                                    "
                                    />

                                ) : (

                                    <div
                                        className="
                                        flex
                                        h-[300px]
                                        items-center
                                        justify-center
                                        rounded-xl
                                        border
                                        border-dashed
                                        border-slate-300
                                        text-sm
                                        text-slate-500
                                    "
                                    >
                                        Run OCR to see
                                        the processed
                                        image
                                    </div>

                                )}

                            </div>

                        </div>

                    </section>

                )}

            <section>

                <button
                    onClick={
                        scanImage
                    }
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
                    {loading
                        ? `Scanning ${progress}%`
                        : "Extract Text"}
                </button>

            </section>

            <OcrResult
                text={text}
            />

        </div>
    );
}