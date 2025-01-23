import { Download, ImageUp, Link2, RefreshCcw, X } from "lucide-react";
import { Button } from "./ui/button";
import * as Progress from "@radix-ui/react-progress";

export function UploadWidgetUploadItem() {
    return (
        <div className="p-3 flex flex-col gap-3 rounded-lg shadow-shape-content bg-white/2 relative overflow-hidden">
            <div className="flde flex-col gap-1">

                <span className="text-sx font-medium flex items-center gap-1">
                    <ImageUp className="size-3 text-zinc-300" strokeWidth={1.5} />
                    <span>Screenshot.png</span>
                </span>

                <span className="text-xxs text-zinc-400 flex gap-1.5 items-center">
                    <span className="line-through">3 mb</span>
                    <div className="size-1 rounded-full bg-zinc-700"></div>
                    <span>
                        300KB
                        <span className="text-green-400 ml-1">-94%</span>
                    </span>
                    <div className="size-1 rounded-full bg-zinc-700"></div>
                    <span>45%</span>
                </span>
            </div>

            <Progress.Root className="bg-zinc-800 rounded-full h-1 overflow-hidden group">
                <Progress.Indicator className="bg-indigo-500 h-1" style={{ width: "43%" }} />
            </Progress.Root>

            <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
                <Button size="icon-sm">
                    <Download className="size-4" strokeWidth={1.5} />
                    <span className="sr-only">Download compressed image</span>
                </Button>

                <Button size="icon-sm">
                    <Link2 className="size-4" strokeWidth={1.5} />
                    <span className="sr-only">Copy remote URL</span>
                </Button>

                <Button size="icon-sm">
                    <RefreshCcw className="size-4" strokeWidth={1.5} />
                    <span className="sr-only">Retry upload</span>
                </Button>

                <Button size="icon-sm">
                    <X className="size-4" strokeWidth={1.5} />
                    <span className="sr-only">Cancel upload</span>
                </Button>
            </div>
        </div>
    )
}