import type { PagedRequest } from "../pagedResquest";

export interface FilterVehicleRequest extends PagedRequest {
	model: string;
	state: number[];
	brand: string[];
	type: number[];
}
