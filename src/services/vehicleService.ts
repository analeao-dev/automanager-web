import type { CreateVehicleRequest } from "../@types/requests/vehicles/createVehicleRequest";
import type { PagedRequest } from "../@types/requests/pagedResquest";
import type { Response } from "../@types/responses/response";
import type { PagedResponse } from "../@types/responses/pagedResponse";
import type { Vehicle } from "../@types/vehicle";
import api from "./api";

export async function createVehicle(request: CreateVehicleRequest): Promise<Response<Vehicle>> {
	const response = await api.post<Response<Vehicle>>("/api/v1/vehicles", request);
	return response.data;
}

export async function getVehicles(request: PagedRequest): Promise<PagedResponse<Vehicle[]>> {
	const response = await api.get<PagedResponse<Vehicle[]>>("/api/v1/vehicles", { params: request });
	return response.data;
}
