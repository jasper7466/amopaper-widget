type TCompanyInfo = {
    name: string;
    vatId: string;
    auditId: number;
    auditIssueDateTimeUtc: string;
};

export type TSignatureInfo = {
    userFullName: string;
    userGuid: string;
    confirmCode: string;
    signature: string;
    signingDateTime: string;
    isCompany: boolean;
    company: TCompanyInfo;
};
