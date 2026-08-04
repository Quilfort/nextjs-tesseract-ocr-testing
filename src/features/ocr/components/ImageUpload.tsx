"use client";

import Image from "next/image";

type ImageUploadProps = {
    image: File | null;
    preview: string;
    onImageChange: (
        file: File,
        preview: string
    ) => void;
};

export default function ImageUpload({
    image,
    preview,
    onImageChange,
}: ImageUploadProps) {

    function handleFileChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        const previewUrl =
            URL.createObjectURL(file);

        onImageChange(
            file,
            previewUrl
        );
    }

    return (
        <>
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
                    onChange={handleFileChange}
                    className="hidden"
                />
            </section>

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
        </>
    );
}