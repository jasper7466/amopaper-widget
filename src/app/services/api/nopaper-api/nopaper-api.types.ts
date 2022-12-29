export interface IBadResponse {
  errorCode: number;
  errorText: string;
}

export interface ICheckByPhoneRequest {
  phonenumber: string;
}

export interface ICheckByPhoneResponse {
  userGuid: string;
}

export type PostDraftFileItem = {
  fileName: string;
  filebase64: string;
};

export interface IPostDraftRequest {
  title?: string;
  clientFlPhoneNumber?: string;
  clientUlInn?: string;
  files: PostDraftFileItem[];
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

export interface IPostStepNameResponse {}

export interface IGetFilesIdsRequest {
  documentId: number;
}

type DocumentListItem = {
  documentFileId: number;
  sourceDocumentFileId: number;
  fileName: string;
  size: number;
};

export type DocumentListItemShortened = Omit<
  DocumentListItem,
  'SourceDocumentFileId'
>;

export interface IGetFilesIdsResponse {
  signDocumentList: DocumentListItem[];
  stampDocumentList: DocumentListItem[];
  ofertaOriginal: DocumentListItemShortened;
  ofertaWithStamp: DocumentListItemShortened;
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

export type SignatureInfo = {
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

type DocumentDataNames =
  | 'NOP_TAB_NOPAPER_DRAFT'
  | 'NOP_TAB_NOPAPER_DOWNLOAD_DOCUMENTS'
  | 'NOP_TAB_NOPAPER_SEND_SIGN_DOCUMENTS';

export interface IGetPacketDetailsRequest {
  documentId: number;
  documentDataNames?: DocumentDataNames[];
}

type DocumentData = {
  name: string;
  data: { [key: string]: any };
};

export interface IGetPacketDetailsResponse {
  documentData: DocumentData[];
  isOwner: boolean;
  title: string;
  stepId: number;
  workflowId: number;
  dateCreate: string;
  availableStatuses: any[];
}

export interface IGetFilesByIdsRequest {
  documentFileIdList: number[];
}

type FilesResponseRecord = {
  documentFileId: number;
  base64Content: string;
  fileName: string;
};

export interface IGetFilesByIdsResponse extends Array<FilesResponseRecord> {}

export interface IGetShareLinkRequest {}

export interface IGetShareLinkResponse {
  shareLink: string;
}
