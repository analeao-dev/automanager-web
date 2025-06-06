export interface CreateVehicleRequest {
	plate: string;
	type: number;
	brand: string;
	model: string;
	year: number;
	mileage: number;
	image: string;
	lastMaintenanceDate: string;
}
