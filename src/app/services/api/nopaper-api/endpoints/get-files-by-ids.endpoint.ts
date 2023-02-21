import { ApiService } from '../../api.service';
import { base64ToFile } from 'src/app/utils/base64-to-file.util';
import { Observable, forkJoin, map, switchMap, take } from 'rxjs';
import { TFile } from 'src/app/interfaces/file.type';
import { IPacketFile } from 'src/app/interfaces/packet-file.interface';

interface IGetFilesByIdsRequest {
  documentFileIdList: number[];
}

type TFilesResponseRecord = {
  documentFileId: number;
  base64Content: string;
  fileName: string;
};

interface IGetFilesByIdsResponse extends Array<TFilesResponseRecord> {}

const requestAdapter = (filesIds: number[]): IGetFilesByIdsRequest => ({
  documentFileIdList: filesIds,
});

const responseAdapter = (
  response: IGetFilesByIdsResponse
): Observable<IPacketFile[]> => {
  const tasks$: Observable<File>[] = [];

  for (const file of response) {
    tasks$.push(base64ToFile(file.base64Content, file.fileName));
  }

  return forkJoin(tasks$).pipe(
    map((files) =>
      files.map((file, index) => ({
        id: response[index].documentFileId,
        file: file,
      }))
    )
  );
};

export function getFilesByIdsEndpoint(
  this: ApiService,
  filesIds: number[]
): Observable<IPacketFile[]> {
  return this.post<IGetFilesByIdsRequest, IGetFilesByIdsResponse>(
    '/document/file-list',
    requestAdapter(filesIds)
  ).pipe(take(1), switchMap(responseAdapter));
}
