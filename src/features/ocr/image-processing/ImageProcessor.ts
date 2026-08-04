export interface ImageProcessor {
    process(
        image: File
    ): Promise<ProcessedImage>;

}
export interface ProcessedImage {

    file: File;

    preview: string;

}