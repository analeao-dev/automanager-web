export interface PagedResponse<T> {
	data: T;
	totalCount: number;
	currentPage: number;
	pageSize: number;
	message?: string | null;
}
