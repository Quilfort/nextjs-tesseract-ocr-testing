export interface ImageProcessor {
    process(
        image: File
    ): Promise<File>;
}