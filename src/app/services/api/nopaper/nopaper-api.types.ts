export interface CheckByPhoneRequest {
  phonenumber: string;
}

export interface CheckByPhoneResponse {
  userGuid?: string;
  errorCode?: number;
  errorText?: string;
}

export type PostDraftRequestFileField = {
  fileName: string;
  filebase64: string;
};
export interface IPostDraftRequest {
  title?: string;
  clientFlPhoneNumber?: string;
  clientUlInn?: string;
  files: PostDraftRequestFileField[];
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
export interface IGetStepNameResponse {
  stepName: StepName;
}

export interface IPostStepNameRequest {
  documentId: number;
  stepSystemName: string;
}

export interface GetFilesIdentifiersRequest {
  documentId: number;
}

type DocumentListItem = {
  documentFileId: number;
  SourceDocumentFileId: number;
  fileName: string;
  size: number;
};

type DocumentListItemShortened = Omit<DocumentListItem, 'SourceDocumentFileId'>;

export interface IGetFilesIdentifiersResponse {
  signDocumentList: DocumentListItem[];
  stampDocumentList: DocumentListItem[];
  ofertaOriginal?: DocumentListItemShortened[];
  ofertaWithStamp?: DocumentListItemShortened[];
  procuratoryOriginalList: DocumentListItemShortened[];
  procuratoryWithStampList: DocumentListItemShortened[];
}

export interface GetFileSignatureRequest {
  documentFileId: number;
}

type Snapshot = {
  companyInn: string;
  companyName: string;
  companyNameOpf: string;
  signerIsHead: boolean;
  headPosition: string;
  employeePosition: string;
  procuratoryId: number;
  procuratoryIssueDateTimeUtc: string;
  procuratoryRevokeDateTimeUtc: string;
};

type SignatureInfo = {
  certificateId: number;
  certificateOwner: string;
  confirmCode: string;
  cryptoProviderUserIdentifer: string;
  documentFileId: number;
  signature: string;
  signingDateTime: string;
  userGuid: string;
  signatureInfoFileTxt: string;
  isUl: boolean;
  snapshot: Snapshot;
};
export interface IGetFileSignatureResponse {
  [0]: SignatureInfo;
  [1]: SignatureInfo;
}
