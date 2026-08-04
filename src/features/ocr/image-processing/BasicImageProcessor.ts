import imageCompression from "browser-image-compression";

import {
    ImageProcessor,
    ProcessedImage,
} from "./ImageProcessor";


export class BasicImageProcessor
    implements ImageProcessor {


    async process(
        image: File
    ): Promise<ProcessedImage> {


        const options = {

            maxWidthOrHeight: 2500,

            useWebWorker: true,

            fileType: "image/jpeg",

            initialQuality: 0.9,

        };


        const processed =
            await imageCompression(
                image,
                options
            );


        const preview =
            URL.createObjectURL(
                processed
            );


        return {

            file: processed,

            preview,

        };

    }
}