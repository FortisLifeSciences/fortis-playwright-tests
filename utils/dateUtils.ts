export function getFormattedTimestamp(): string {
    const now = new Date();

    const MM = String(now.getMonth() + 1).padStart(2, '0');
    const DD = String(now.getDate()).padStart(2, '0');
    const YYYY = now.getFullYear();

    const HH = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const SS = String(now.getSeconds()).padStart(2, '0');

    return `${MM}${DD}${YYYY}${HH}${mm}${SS}`;
}
