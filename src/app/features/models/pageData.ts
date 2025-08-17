import { HttpParams } from "@angular/common/http";

export type PagedList<T> = {
    data: T[];
    metadata: PageMetadata;
    links: PageLinks;
}

export type PageLink = {
    baseUrl: string;
    queryOptions: RecipeQueryParams;
}

export type PageLinks = {
    self: PageLink;
    first: PageLink;
    last: PageLink;
    next: PageLink | null;
    previous: PageLink | null;
}

export type PageMetadata = {
    currentPage: number;
    totalPages: number;
    totalCount: number;
}

export type RecipeFilter = {
    difficulty?: 1 | 2 | 3 | 4 | 5;
    rating?: 1 | 2 | 3 | 4 | 5;
}

export type RecipeQueryParams = {
    filter?: RecipeFilter;
    searchTerm?: string;
    currentPage: number;
    pageSize: number;
}

export function defaultQueryParams(): RecipeQueryParams {
    return {
        currentPage: 1,
        pageSize: 5
    };
}

export function emptyPagedList<T>(): PagedList<T> {
    return {
        data: [],
        metadata: {
            currentPage: 1,
            totalPages: 1,
            totalCount: 0,
        },
        links: {
            self: { baseUrl: '', queryOptions: defaultQueryParams() },
            first: { baseUrl: '', queryOptions: defaultQueryParams() },
            last: { baseUrl: '', queryOptions: defaultQueryParams() },
            next: null,
            previous: null
        }
    };
}

export function toUrlParams(queryParams: RecipeQueryParams): Record<string, any> {
    const urlParams: Record<string, any> = {};
    
    if (queryParams.searchTerm) {
        urlParams["search"] = queryParams.searchTerm;
    }
    
    if (queryParams.currentPage > 1) {
        urlParams["page"] = queryParams.currentPage;
    }
    
    if (queryParams.filter?.difficulty) {
        urlParams["difficulty"] = queryParams.filter.difficulty;
    }
    
    if (queryParams.filter?.rating) {
        urlParams["rating"] = queryParams.filter.rating;
    }
    
    return urlParams;
}

export function fromUrlParams(urlParams: Record<string, any>): RecipeQueryParams {
    const queryParams = defaultQueryParams();
    
    if (urlParams['search']) {
        queryParams.searchTerm = urlParams['search'];
    }
    
    if (urlParams['page']) {
        const page = parseInt(urlParams['page'], 10);
        if (!isNaN(page) && page > 0) {
            queryParams.currentPage = page;
        }
    }
    
    const filter: RecipeFilter = {};
    
    if (urlParams['difficulty']) {
        const difficulty = parseInt(urlParams['difficulty'], 10) as 1 | 2 | 3 | 4 | 5;
        if (difficulty >= 1 && difficulty <= 5) {
            filter.difficulty = difficulty;
        }
    }
    
    if (urlParams['rating']) {
        const rating = parseInt(urlParams['rating'], 10) as 1 | 2 | 3 | 4 | 5;
        if (rating >= 1 && rating <= 5) {
            filter.rating = rating;
        }
    }
    
    if (Object.keys(filter).length > 0) {
        queryParams.filter = filter;
    }
    
    return queryParams;
}


