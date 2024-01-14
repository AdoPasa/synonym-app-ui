export interface PaginatedApiResponse<T> {
    data: T;
    succeeded: boolean;
    message: string | null;
    errors: string[];
    numberOfResults: number;
    skip: number;
    take: number;
}