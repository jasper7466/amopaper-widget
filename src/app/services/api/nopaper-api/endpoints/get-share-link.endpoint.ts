import { ApiService } from './../../api.service';
import { Observable } from 'rxjs';
import { IShareLinkProps } from './../../../../store/misc/actions';

interface IGetShareLinkRequest {}

interface IGetShareLinkResponse {
  shareLink: string;
}

export function getShareLinkEndpoint(
  this: ApiService,
  packetId: number
): Observable<IShareLinkProps> {
  return this.post<IGetShareLinkRequest, IGetShareLinkResponse>(
    `/document/${packetId}/generate-link`,
    {}
  );
}
