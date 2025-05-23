export type ApiResponse<T> = {
  status?: number;
  message?: string;
  data: T;
};

export type ImageDataSuccess = {
  id: number;
  image_data: string[];
};

export type ReportUploadSuccess = {
  id: number;
  createdAt?: Date;
};
