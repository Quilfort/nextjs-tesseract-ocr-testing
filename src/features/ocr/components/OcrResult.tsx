type OcrResultProps = {
    text: string;
};

export default function OcrResult({
    text,
}: OcrResultProps) {
    return (
        <section>
            <h2 className="mb-3 text-lg font-semibold text-slate-900">
                Result
            </h2>

            <div
                className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    p-5
                "
            >
                <pre
                    className="
                        min-h-40
                        whitespace-pre-wrap
                        text-sm
                        leading-relaxed
                        text-slate-800
                    "
                >
                    {
                        text ||
                        "No text detected yet."
                    }
                </pre>
            </div>
        </section>
    );
}