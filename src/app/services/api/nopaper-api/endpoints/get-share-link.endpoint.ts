import { IShareLink } from 'src/app/interfaces/share-link.interface';
import { ApiService } from './../../api.service';
import { Observable, map } from 'rxjs';

interface IGetShareLinkRequest {}

interface IGetShareLinkResponse {
  shareLink: string;
}

const responseAdapter = (response: IGetShareLinkResponse): IShareLink => ({
  link: response.shareLink,
});

export function getShareLinkEndpoint(
  this: ApiService,
  packetId: number
): Observable<IShareLink> {
  return this.post<IGetShareLinkRequest, IGetShareLinkResponse>(
    `/document/${packetId}/generate-link`,
    {}
  ).pipe(map((response) => responseAdapter(response)));
}
