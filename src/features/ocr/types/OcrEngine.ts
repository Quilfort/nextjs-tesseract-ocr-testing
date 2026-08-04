export interface OcrResult {
    text: string;
}

export interface OcrEngine {
    name: string;

    recognize(
        image: File,
        onProgress?: (progress: number) => void
    ): Promise<OcrResult>;
}