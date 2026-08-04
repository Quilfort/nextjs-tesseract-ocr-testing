import imageCompression from "browser-image-compression";

import {
    ImageProcessor,
} from "./ImageProcessor";


export class BasicImageProcessor
    implements ImageProcessor {


    async process(
        image: File
    ): Promise<File> {


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


        return processed;

    }
}