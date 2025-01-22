import { useState } from "preact/hooks";
import { UploadWidgetDropzone } from "./upload-widget-dropzone";
import { UploadwidgetHeader } from "./upload-widget-header";
import { UploadWidgetUploadList } from "./upload-widget-upload-list";
import * as Collapsable from "@radix-ui/react-collapsible"
import { UploadWidgetMinimizedButton } from "./upload-widget-minimize-button";

export function UploadWidget() {
    const [isWidgetOpen, setIsWidgetOpen] = useState(false);

    return (
        <Collapsable.Root onOpenChange={setIsWidgetOpen}>
            <div className="bg-zinc-900 overflow-hidden w-[360px] rounded-xl shadow-shape">

                { !isWidgetOpen && <UploadWidgetMinimizedButton /> }

                <Collapsable.Content>
                
                    <UploadwidgetHeader />

                    <div className="flex flex-col gap-4 py-3">
                        <UploadWidgetDropzone />

                        <div className="h-px bg-zinc-800 border-t border-black/50 box-content"></div>

                        <UploadWidgetUploadList />
                    </div>
                
                </Collapsable.Content>
            </div>
        </Collapsable.Root>
    )
}