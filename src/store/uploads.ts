import { create } from "zustand";
import { enableMapSet } from "immer";
import { immer } from "zustand/middleware/immer";
import { uploadFileToStorage } from "../http/upload-file-to-storage";
import { CanceledError } from "axios";

export type Upload = {
    name: string;
    file: File;
    abortController: AbortController;
    status: "progress" | "success" | "error" | "canceled";
    uploadSizeInBytes: number;
    originalSizeInBytes: number
};

type UploadState = {
    uploads: Map<string, Upload>;
    addUploads: (files: File[]) => void;
    cancelUpload: (uploadId: string) => void;
};

enableMapSet();

export const useUploads = create<UploadState, [["zustand/immer", never]]>(
    immer((set, get) => {
      function addUploads(files: File[]) {
        for (const file of files) {
          const uploadId = crypto.randomUUID();
          const abortController = new AbortController();

          const upload: Upload = {
            name: file.name,
            file,
            abortController,
            status: "progress",
            uploadSizeInBytes: 0,
            originalSizeInBytes: file.size
          };
          
          set((state) => {
              state.uploads.set(uploadId, upload);
          });

          processUpload(uploadId);
        }
      }

      function updateUpload(uploadId: string, data: Partial<Upload>) {
        const upload = get().uploads.get(uploadId);

        if (!upload) {
          return;
        }

        set(state => {
          state.uploads.set(uploadId, { ...upload, ...data })
        });
      }

      function cancelUpload(uploadId: string) {
        const upload = get().uploads.get(uploadId);

        if (!upload) {
          return;
        }

        upload.abortController.abort();

        set((state) => {
          state.uploads.set(uploadId, {
              ...upload,
              status: "canceled"
          });
        });
      }

      async function processUpload(uploadId: string) {
        const upload = get().uploads.get(uploadId);

        if (!upload) {
          return;
        }

        try {
          await uploadFileToStorage({ 
            file: upload.file, 
            onProgress(sizeInBytes) {
              updateUpload(uploadId, {
                uploadSizeInBytes: sizeInBytes,
              });
            } 
          }, 
          { signal: upload.abortController.signal })

            updateUpload(uploadId, {
              status: "success",
            });
        } catch (err) {
          if (err instanceof CanceledError) {
            updateUpload(uploadId, {
              status: "canceled",
            });
          } else {
            updateUpload(uploadId, {
              status: "error",
            });
          }
        }
      }

      return {
        uploads: new Map(),
        addUploads,
        cancelUpload
      };
    })
);

export const usePendingUploads = () => {
  // Obtem os uploads com status = progress
  const uploadsStore = useUploads(store => store.uploads);
  const uploads = Array.from(uploadsStore.values());
  const isThereAnyPendingUploads = uploads.some(upload => upload.status === "progress");

  if (!isThereAnyPendingUploads) {
    return {
      isThereAnyPendingUploads,
      globalPercentage: 100
    };
  }

  const { total, uploaded } = uploads.reduce(
    (acc, upload) => {
      acc.total += upload.originalSizeInBytes;
      acc.uploaded += upload.uploadSizeInBytes;
      return acc;
    },
    { total: 0, uploaded: 0 }
  );

  const globalPercentage = Math.min(
    Math.round((uploaded * 100) / total),
    100
  );

  return {
        isThereAnyPendingUploads,
        globalPercentage
    };
}