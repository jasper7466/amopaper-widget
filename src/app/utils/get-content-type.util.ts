const contentTypes: { [key: string]: string } = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  tif: 'image/tiff',
  tiff: 'image/tiff',
  bmp: 'image/bmp',
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  rtf: 'application/rtf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  rar: 'application/vnd.rar',
  zip: 'application/zip',
};

/**
 * Возвращает MIME-type соответствующий расширению или выбрасывает исключение, если
 * тип для данного расширения отсутствует в словаре
 * @param extOrFullName полное имя файла или его расширение ('name.ext', '.ext', 'ext')
 * @returns
 */
export const getContentType = (extOrFullName: string): string | never => {
  const ext = extOrFullName.split('.').pop() || '';

  if (!(ext in contentTypes)) {
    throw new Error('getContentType: empty or unknown extension');
  }

  return contentTypes[ext];
};
