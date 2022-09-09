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

export interface PostDraftResponse {
  documentId: string;
}

export type StepName =
  | 'new'
  | 'nopaperPrepareFiles'
  | 'nopaperPreview'
  | 'nopaperPreviewBeforeOferta'
  | 'nopaperOfertaSenderPreview'
  | 'nopaperSenderSign'
  | 'nopaperReceiverPreview'
  | 'nopaperReceiverPreviewBeforeOferta'
  | 'nopaperOfertaReceiverPreview'
  | 'nopaperReceiverSigning'
  | 'nopaperEnd'
  | 'nopaperEndRead'
  | 'nopaperError'
  | 'nopaperErrorEnd'
  | 'nopaperDelete'
  | 'nopaperSenderCancel'
  | 'nopaperSenderCancelEnd'
  | 'nopaperSignRefused'
  | 'nopaperSignRefusedEnd'
  | 'nopaperSignRefusedRead';
export interface GetStatusResponse {
  stepName: StepName;
}

export interface PostStepNameRequest {
  documentId: number;
  stepSystemName: string;
}
