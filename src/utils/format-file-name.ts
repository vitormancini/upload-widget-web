export function formatFileName(fileName: string) {
    const maxNameLength = 15;

    if (fileName.length > maxNameLength) {
        return fileName.substring(0, maxNameLength).concat(" ...");
    }

    return fileName
}