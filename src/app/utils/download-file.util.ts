export const downloadFile = (file: File): void => {
    const url = window.URL.createObjectURL(file);
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.setAttribute('style', 'display: none');
    link.href = url;
    link.download = file.name;
    link.click();
    window.URL.revokeObjectURL(url);
    link.remove();
};
