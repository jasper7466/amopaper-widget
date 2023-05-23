const contentTypes: { [key: string]: string } = {
    /* eslint-disable @cspell/spellchecker */
    // MIME-типы
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
    /* eslint-enable @cspell/spellchecker */
};

/**
 * Возвращает MIME-type соответствующий расширению или выбрасывает исключение, если
 * тип для данного расширения отсутствует в словаре
 * @param extensionOrFullName полное имя файла или его расширение ('name.ext', '.ext', 'ext')
 * @returns
 */
export const getContentType = (extensionOrFullName: string): string | never => {
    const extension = extensionOrFullName.split('.').pop() || '';

    if (!(extension in contentTypes)) {
        throw new Error('getContentType: empty or unknown extension');
    }

    return contentTypes[extension];
};
