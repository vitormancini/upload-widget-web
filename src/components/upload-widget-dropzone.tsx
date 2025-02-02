import { useDropzone } from "react-dropzone"
import CircularProgressBar from "./curcular-progress-bar";
import { motion } from "motion/react";
import { usePendingUploads, useUploads } from "../store/uploads";

export function UploadWidgetDropzone () {
    const addUploads = useUploads(store => store.addUploads);
    const uploads = useUploads(store => store.uploads);

    const { isThereAnyPendingUploads, globalPercentage } = usePendingUploads();

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        multiple: true,
        accept: {
            "image/jpeg": [],
            "image/jpg": [],
            "image/png": []
        },
        onDrop(acceptedFiles) {
            addUploads(acceptedFiles);
        }
    })
    return (
        <motion.div 
            className="px-3 flex flex-col gap-3"
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
            }}
            transition={{ 
                duration: 0.6 
            }}
        >
            <div data-active={isDragActive}
                className="cursor-pointer text-zinc-400 bg-black/20 p-5 rounded-lg border border-zinc-700 border-dashed h-32 flex flex-col items-center justify-center gap-1 hover:border-zinc-600 transition-colors data-[active=true]:bg-indigo-500/10 data-[active=true]:border-indigo-500"
                {...getRootProps()}
            >
                <input type="file" {...getInputProps()} />

                { isThereAnyPendingUploads ? (
                    <div className="flex flex-col items-center gap-2.5">
                        <CircularProgressBar progress={globalPercentage} size={56} strokeWidth={4} />
                        <span className="text-xs">Uploading { uploads.size } files</span>
                    </div>
                ) : (
                    <>
                        <span className="text-xs">Drop your files here</span>
                        <span className="text-xs underline">Click to open picker</span>
                    </>
                )}
            </div>

            <span className="text-xxs text-zinc-400">Only PNG, JPG and JPEG files are supported</span>
        </motion.div>
    )
}