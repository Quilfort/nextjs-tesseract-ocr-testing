export type OcrEngineType =
    | "tesseract";


type OcrEngineSelectorProps = {
    value: OcrEngineType;

    onChange: (
        engine: OcrEngineType
    ) => void;
};


export default function OcrEngineSelector({
    value,
    onChange,
}: OcrEngineSelectorProps) {

    return (
        <section>

            <h2 className="mb-3 text-lg font-semibold text-slate-900">
                OCR Engine
            </h2>


            <select
                value={value}
                onChange={(event) =>
                    onChange(
                        event.target.value as OcrEngineType
                    )
                }
                className="
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    bg-white
                    px-4
                    py-3
                    text-slate-900
                    shadow-sm
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-200
                "
            >
                <option value="tesseract">
                    Tesseract.js
                </option>

            </select>

        </section>
    );
}