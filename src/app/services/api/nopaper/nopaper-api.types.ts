export interface IBadResponse {
  errorCode: number;
  errorText: string;
}

export interface IGetAmoAccessTokenResponse {
  accessToken: string;
}

export interface ICheckByPhoneRequest {
  phonenumber: string;
}

export interface ICheckByPhoneResponse {
  userGuid: string;
}

export type PostDraftRequestFileItem = {
  fileName: string;
  filebase64: string;
};

export interface IPostDraftRequest {
  title?: string;
  clientFlPhoneNumber?: string;
  clientUlInn?: string;
  files: PostDraftRequestFileItem[];
}

export interface IPostDraftResponse {
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

export interface IGetFilesIdsRequest {
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

export interface IGetFileSignatureRequest {
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

type DocumentData = {
  name: string;
  data: { [key: string]: any };
};
export interface IGetPacketInfoResponse {
  documentData: DocumentData[];
  isOwner: boolean;
  title: string;
  stepId: number;
  workflowId: number;
  dateCreate: string;
  availableStatuses: any[];
}
