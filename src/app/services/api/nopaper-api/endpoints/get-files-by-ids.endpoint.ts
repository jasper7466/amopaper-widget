import { ApiService } from '../../api.service';
import { base64ToFile } from 'src/app/utils/base64-to-file.util';
import { IDecodedFilesProps } from '../../../../store/signatures/actions';
import { IFileInfo } from '../../../../store/signatures/index';
import { Observable, forkJoin, map, switchMap, take } from 'rxjs';

interface IGetFilesByIdsRequest {
  documentFileIdList: number[];
}

type FilesResponseRecord = {
  documentFileId: number;
  base64Content: string;
  fileName: string;
};

interface IGetFilesByIdsResponse extends Array<FilesResponseRecord> {}

const requestAdapter = (data: IFileInfo[]): IGetFilesByIdsRequest => ({
  documentFileIdList: data.map((item) => item.id),
});

const responseAdapter = (
  response: IGetFilesByIdsResponse
): Observable<IDecodedFilesProps> => {
  const tasks$: Observable<File>[] = [];

  for (const file of response) {
    tasks$.push(base64ToFile(file.base64Content, file.fileName));
  }

  return forkJoin(tasks$).pipe(map((files) => ({ payload: files })));
};

export function getFilesByIdsEndpoint(
  this: ApiService,
  filesIds: IFileInfo[]
): Observable<IDecodedFilesProps> {
  return this.post<IGetFilesByIdsRequest, IGetFilesByIdsResponse>(
    '/document/file-list',
    requestAdapter(filesIds)
  ).pipe(take(1), switchMap(responseAdapter));
}
