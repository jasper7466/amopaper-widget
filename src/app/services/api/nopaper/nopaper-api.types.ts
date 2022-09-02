export interface CheckByPhoneRequest {
  phonenumber: string;
}

export interface CheckByPhoneResponse {
  userGuid?: string;
  errorCode?: number;
  errorText?: string;
}
