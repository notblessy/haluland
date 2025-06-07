import api from "./api";

export type Haluploader = {
  url: string;
  public_id: string;
};

interface UploadResponse {
  success: boolean;
  data?: Haluploader;
}

type UploadCallback = (data: UploadResponse["data"]) => void;

export const upload = async (
  file: File,
  callback: UploadCallback = () => {}
): Promise<void> => {
  if (!file) {
    throw new Error("[uploadImage.ts] File is required!");
  }

  const formData = new FormData();

  formData.append("file", file);

  const { data: res } = await api.post<UploadResponse>(
    "/v1/uploader/photos",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  if (res.success && res.data) {
    callback(res.data);
  } else {
    throw new Error("[uploadImage.ts] Failed to upload photo");
  }
};
