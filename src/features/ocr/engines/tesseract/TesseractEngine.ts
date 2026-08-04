import { createWorker } from "tesseract.js";
import {
    OcrEngine,
    OcrResult,
} from "../../types/OcrEngine";

export class TesseractEngine
    implements OcrEngine {
    name = "Tesseract";

    async recognize(
        image: File,
        onProgress?: (progress: number) => void
    ): Promise<OcrResult> {

        const worker = await createWorker(
            ["eng", "nld"],
            1,
            {
                logger: (message) => {
                    if (
                        message.status ===
                        "recognizing text"
                    ) {
                        onProgress?.(
                            Math.round(
                                message.progress * 100
                            )
                        );
                    }
                },
            }
        );

        await worker.setParameters({
            preserve_interword_spaces: "1",
        });

        const result =
            await worker.recognize(image);

        await worker.terminate();

        return {
            text: result.data.text,
        };
    }
}