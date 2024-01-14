export interface ApiResponse<T> {
    data: T;
    succeeded: boolean;
    message: string | null;
    errors: string[];
}