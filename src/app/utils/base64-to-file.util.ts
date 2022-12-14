import { Observable, switchMap, map } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { getContentType } from './get-content-type.util';

export const base64ToFile = (
  base64: string,
  filename: string
): Observable<File> => {
  const mime = getContentType(filename);
  const url = `data:${mime};base64,${base64}`;

  return fromFetch(url).pipe(
    switchMap((response) => response.arrayBuffer()),
    map((buffer) => new File([buffer], filename, { type: mime }))
  );
};
