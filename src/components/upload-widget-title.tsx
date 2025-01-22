import { UploadCloud } from "lucide-react";

export function UploadWidgetTitle () {
    return (
        <div className="flex items-center gap-1.5 text-sm font-medium">
            <UploadCloud className="size-4" strokeWidth={1.5} />
            <span className="text-sm font-medium">Upload files</span>
        </div>
    )
}