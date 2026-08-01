type PaginationItem = number | "ellipsis";

interface GetPaginationRangeParams {
    currentPage: number;
    totalPages: number;
    siblingCount?: number;
}

export function getPaginationRange({currentPage, totalPages, siblingCount = 1,}: GetPaginationRangeParams): PaginationItem[] {
    const totalVisible = siblingCount * 2 + 5;

    if (totalPages <= totalVisible) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const showLeftEllipsis = leftSibling > 2;
    const showRightEllipsis = rightSibling < totalPages - 1;

    if (!showLeftEllipsis && showRightEllipsis) {
        const leftRange = Array.from({ length: 3 + siblingCount * 2 }, (_, i) => i + 1);
        return [...leftRange, "ellipsis", totalPages];
    }

    if (showLeftEllipsis && !showRightEllipsis) {
        const rightRange = Array.from(
            { length: 3 + siblingCount * 2 },
            (_, i) => totalPages - (3 + siblingCount * 2) + i + 1
        );
        return [1, "ellipsis", ...rightRange];
    }

    const middleRange = Array.from(
        { length: rightSibling - leftSibling + 1 },
        (_, i) => leftSibling + i
    );
    return [1, "ellipsis", ...middleRange, "ellipsis", totalPages];
}

export function clampPage(page: number, totalPages: number): number {
    if (Number.isNaN(page) || page < 1) return 1;
    if (page > totalPages) return totalPages;
    return page;
}

export function buildPageHref(basePath: string, searchParams: URLSearchParams, page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    return `${basePath}?${params.toString()}`;
}