import api from "./api";
import type { CreateVehicleRequest } from "../@types/requests/vehicles/createVehicleRequest";
import type { PagedRequest } from "../@types/requests/pagedResquest";
import type { Response } from "../@types/responses/response";
import type { PagedResponse } from "../@types/responses/pagedResponse";
import type { Vehicle } from "../@types/vehicle";
import type { UpdateVehicleRequest } from "../@types/requests/vehicles/updateVehicleRequest";
import type { GetVehicleByIdRequest } from "../@types/requests/vehicles/getVehicleByIdRequest";
import type { DeleteVehicleRequest } from "../@types/requests/vehicles/deleteVehicleRequest";
import type { FilterVehicleRequest } from "../@types/requests/vehicles/filterVehicleRequest";

export async function createVehicle(request: CreateVehicleRequest): Promise<Response<Vehicle>> {
	const response = await api.post<Response<Vehicle>>("/api/v1/vehicles", request);
	return response.data;
}

export async function updateVehicle(request: UpdateVehicleRequest): Promise<Response<Vehicle>> {
	console.log(request);
	const response = await api.put<Response<Vehicle>>(`/api/v1/vehicles/${request.id}`, request);
	return response.data;
}

export async function getVehicleById(request: GetVehicleByIdRequest): Promise<Response<Vehicle>> {
	const response = await api.get<Response<Vehicle>>(`/api/v1/vehicles/${request.id}`);
	return response.data;
}

export async function getVehicles(request: PagedRequest): Promise<PagedResponse<Vehicle[]>> {
	const response = await api.get<PagedResponse<Vehicle[]>>("/api/v1/vehicles", { params: request });
	return response.data;
}

export async function deleteVehicle(request: DeleteVehicleRequest): Promise<Response<Vehicle>> {
	const response = await api.delete<Response<Vehicle>>(`/api/v1/vehicles/${request.id}`);
	return response.data;
}

export async function filterVehicles(
	request: FilterVehicleRequest
): Promise<PagedResponse<Vehicle[]>> {
	const response = await api.get(`/api/v1/vehicles/filter`, { params: request });
	return response.data;
}
