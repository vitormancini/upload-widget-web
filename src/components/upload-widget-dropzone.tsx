import { useDropzone } from "react-dropzone"
import CircularProgressBar from "./curcular-progress-bar";

export function UploadWidgetDropzone () {
    const isTherAnyPendingUpload = true;
    const uploadGlobalPercentage = 66;

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        multiple: true,
        accept: {
            "image/jpeg": [],
            "image/jpg": [],
            "image/png": []
        }
    })
    return (
        <div className="px-3 flex flex-col gap-3">
            <div data-active={isDragActive}
                className="cursor-pointer text-zinc-400 bg-black/20 p-5 rounded-lg border border-zinc-700 border-dashed h-32 flex flex-col items-center justify-center gap-1 hover:border-zinc-600 transition-colors data-[active=true]:bg-indigo-500/10 data-[active=true]:border-indigo-500"
                {...getRootProps()}
            >
                <input type="file" {...getInputProps()} />

                { isTherAnyPendingUpload ? (
                    <div className="flex flex-col items-center gap-2.5">
                        <CircularProgressBar progress={uploadGlobalPercentage} size={56} strokeWidth={4} />
                        <span className="text-xs">Uploading 2 files</span>
                    </div>
                ) : (
                    <>
                        <span className="text-xs">Drop your files here</span>
                        <span className="text-xs underline">Click to open picker</span>
                    </>
                )}
            </div>

            <span className="text-xxs text-zinc-400">Only PNG, JPG and JPEG files are supported</span>
        </div>
    )
}