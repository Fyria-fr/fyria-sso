export interface AxiosError extends Error {
  response?: {
    data: {
      message: string;
    };
  };
}
