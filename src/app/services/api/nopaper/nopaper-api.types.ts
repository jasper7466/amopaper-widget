export interface CheckByPhoneRequest {
  phonenumber: string;
}

export interface CheckByPhoneResponse {
  userGuid?: string;
  errorCode?: number;
  errorText?: string;
}

export interface File {
  fileName: string;
  filebase64: string;
}
export interface PostDraftRequest {
  title?: string;
  clientFlPhoneNumber?: string;
  clientUlInn?: string;
  files: File[];
}

export interface PostDaftResponse {
  documentId: string;
}
