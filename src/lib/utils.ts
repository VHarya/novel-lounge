export const preventDefault = (e: Event) => {
    e.preventDefault();
}

export const stopPropagation = (e: Event) => {
    e.stopPropagation();
}

export const serializeNonPOJOs = (obj:any) => {
	return JSON.parse(JSON.stringify(obj));
};

export function convertFilenameToFileURL(baseFilesUrl:string, collection:string, itemId:string, filename:string,): string {
    return `${baseFilesUrl}/${collection}/${itemId}/${filename}`;
}

export function formatToShortDate(date:Date|string): string {
    const dt = new Date(date);
    return `${dt.getDate().toString().padStart(2, '0')}-${dt.getMonth().toString().padStart(2, '0')}-${dt.getFullYear().toString()}`
}

export function formatFileSize(bytes:number) {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    
    while (bytes >= 1024 && i < units.length - 1) {
      bytes /= 1024;
      i++;
    }
    
    return `${bytes.toFixed(2)} ${units[i]}`;
}

export function formatChapterTitle(chapterNumber:number|null, chapterTitle:string) {
    return `Chapter ${chapterNumber} - ${chapterTitle}`.trim();
}

export function formatToTimeAgo(date:Date|string) : string {
    const now = new Date();
    const convertedDate = new Date(date);
    const seconds = Math.floor((now.getTime() - convertedDate.getTime()) / 1000);

    const units = [
        { name: "second", value: 60 },
        { name: "minute", value: 60 },
        { name: "hour", value: 24 },
        { name: "day", value: 7 },
        { name: "week", value: 4 },
        { name: "month", value: 12 },
        { name: "year", value: Infinity }
    ];

    let time = seconds;
    for (const unit of units) {
        if (time < unit.value) {
            const plural = unit.name + (time === 1 ? "" : "s");
            return `${time} ${plural} ago`;
        }
        time = Math.floor(time / unit.value);
    }

    return `${time} years ago`; // Fallback in case of years
}