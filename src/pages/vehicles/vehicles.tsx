import { useEffect, useState } from "react";
import type { Vehicle } from "../../@types/vehicle";
import { deleteVehicle, filterVehicles } from "../../services/vehicleService";
import type { PagedResponse } from "../../@types/responses/pagedResponse";
import { formattedDate } from "../../utils/formattedDate";
import { Car, Eye, Filter, SquarePen, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../../components/card";
import STATES from "../../utils/states";
import VEHICLE_BRANDS from "../../utils/vehiclesBrands";
import VEHICLES_TYPES from "../../utils/vehiclesTypes";
import type { FilterVehicleRequest } from "../../@types/requests/vehicles/filterVehicleRequest";

function Vehicles() {
	const [vehicles, setVehicles] = useState<PagedResponse<Vehicle[]> | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [filters, setFilters] = useState<FilterVehicleRequest>({
		model: "",
		brand: [],
		state: [],
		type: [],
		pageNumber: 1,
		pageSize: 10,
	});

	useEffect(() => {
		const fetchFilteredVehicles = async () => {
			setIsLoading(true);
			try {
				const response = await filterVehicles(filters);
				console.log(response);
				setVehicles(response);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchFilteredVehicles();
	}, [filters]);

	async function handleDeleteVehicle(id: number) {
		try {
			await deleteVehicle({ id: Number(id) });
			const response = await filterVehicles(filters);
			setVehicles(response);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<div>
				<header className='mb-8'>
					<h1 className='text-primary font-semibold text-3xl'>Veículos</h1>
					<p>Gerencie e visualize todos os veículos registrados</p>
				</header>
			</div>
			<div className='grid grid-cols-[266px_1fr] gap-6'>
				<div>
					<Card>
						<Card.Title>
							<Filter size={22} />
							<span className='text-lg font-semibold'>Filtrar por:</span>
						</Card.Title>
						<Card.Body>
							<label className='floating-label'>
								<input
									type='text'
									placeholder='Modelo'
									className='input input-md'
									value={filters.model}
									onChange={(e) => setFilters((prev) => ({ ...prev, model: e.target.value }))}
								/>
								<span>Modelo</span>
							</label>
							<fieldset className='fieldset bg-base-100 border-base-300 rounded-box border p-4 h-40 overflow-auto'>
								<legend className='fieldset-legend'>Estados</legend>
								<div className='grid grid-cols-2 gap-2'>
									{STATES.map((state) => (
										<label className='label' key={state.id}>
											<input
												id={`${state.id}-${state.abbreviation}`}
												type='checkbox'
												className='checkbox'
												checked={filters.state.includes(state.id)}
												onChange={(e) => {
													const checked = e.target.checked;
													setFilters((prev) => ({
														...prev,
														state: checked
															? [...prev.state, state.id]
															: prev.state.filter((id) => id !== state.id),
													}));
												}}
											/>
											{state.abbreviation}
										</label>
									))}
								</div>
							</fieldset>
							<fieldset className='fieldset bg-base-100 border-base-300 rounded-box border p-4'>
								<legend className='fieldset-legend'>Marcas</legend>
								<div className='grid grid-cols-2 gap-2'>
									{VEHICLE_BRANDS.map((brand) => (
										<label className='label' key={brand.id}>
											<input
												id={`${brand.id}-${brand.brand}`}
												type='checkbox'
												className='checkbox'
												checked={filters.brand.includes(brand.brand)}
												onChange={(e) => {
													const checked = e.target.checked;
													setFilters((prev) => ({
														...prev,
														brand: checked
															? [...prev.brand, brand.brand]
															: prev.brand.filter((b) => b !== brand.brand),
													}));
												}}
											/>
											{brand.brand}
										</label>
									))}
								</div>
							</fieldset>
							<fieldset className='fieldset bg-base-100 border-base-300 rounded-box border p-4'>
								<legend className='fieldset-legend'>Tipos</legend>
								<div className='grid grid-cols-2 gap-2'>
									{VEHICLES_TYPES.map((type) => (
										<label className='label' key={type.id}>
											<input
												id={`${type.id}`}
												type='checkbox'
												className='checkbox'
												checked={filters.type.includes(type.id)}
												onChange={(e) => {
													const checked = e.target.checked;
													setFilters((prev) => ({
														...prev,
														type: checked
															? [...prev.type, type.id]
															: prev.type.filter((t) => t !== type.id),
													}));
												}}
											/>
											{type.label}
										</label>
									))}
								</div>
							</fieldset>
						</Card.Body>
					</Card>
				</div>
				<div>
					<Card>
						<Card.Title>
							<Car size={22} />
							<span className='text-lg font-semibold'>
								Veículos encontrados: {vehicles?.totalCount}
							</span>
						</Card.Title>
						<Card.Body>
							<div>
								<div className='overflow-x-auto'>
									<table className='table table-sm'>
										<thead>
											<tr>
												<th>Modelo</th>
												<th>Ano</th>
												<th>Marca</th>
												<th>Placa</th>
												<th>Tipo</th>
												<th>Estado</th>
												<th>Data da última manuteção</th>
												<th>Quilometragem</th>
												<th>Ações</th>
											</tr>
										</thead>
										<tbody>
											{isLoading ? (
												<tr>
													<td colSpan={9} className='text-center text-sm text-gray-500'>
														Buscando veículos...
													</td>
												</tr>
											) : vehicles && vehicles.data.length === 0 ? (
												<tr>
													<td colSpan={9} className='text-center text-sm text-gray-500'>
														Nenhum veículo encontrado.
													</td>
												</tr>
											) : (
												vehicles?.data.map((vehicle) => (
													<tr key={vehicle.id}>
														<td>{vehicle.model}</td>
														<td>{vehicle.year}</td>
														<td>{vehicle.brand}</td>
														<td>{vehicle.plate}</td>
														<td>
															{vehicle.type === 1 ? (
																<div className='badge badge-soft badge-primary'>Motocicleta</div>
															) : vehicle.type === 2 ? (
																<div className='badge badge-soft badge-primary'>Carro</div>
															) : (
																<div className='badge badge-soft badge-primary'>Caminhão</div>
															)}
														</td>
														<td>{STATES.find((state) => state.id === vehicle.state)?.name}</td>
														<td>{formattedDate(vehicle.lastMaintenanceDate)}</td>
														<td>{vehicle.mileage} km</td>
														<td>
															<div className='flex items-center'>
																<Link
																	to={`/vehicle/${vehicle.id}`}
																	className='btn btn-xs btn-ghost'
																	type='button'
																	title='Visualizar veículo'
																>
																	<Eye className='text-info' size={18} />
																</Link>
																<Link
																	to={`/vehicle/${vehicle.id}`}
																	className='btn btn-xs btn-ghost'
																	type='button'
																	title='Editar veículo'
																>
																	<SquarePen className='text-warning' size={18} />
																</Link>
																<button
																	className='btn btn-xs btn-ghost'
																	type='button'
																	title='Excluir veículo'
																	onClick={() => handleDeleteVehicle(vehicle.id)}
																>
																	<Trash className='text-red-600' size={18} />
																</button>
															</div>
														</td>
													</tr>
												))
											)}
										</tbody>
										<tfoot>
											<tr>
												<th>Modelo</th>
												<th>Ano</th>
												<th>Marca</th>
												<th>Placa</th>
												<th>Tipo</th>
												<th>Estado</th>
												<th>Data da última manuteção</th>
												<th>Quilometragem</th>
												<th>Ações</th>
											</tr>
										</tfoot>
									</table>
								</div>
								<div className='flex justify-end mt-4'>
									<div className='join'>
										<button
											className='join-item btn'
											disabled={vehicles?.currentPage === 1}
											onClick={() =>
												setFilters((prev) => ({
													...prev,
													pageNumber: prev.pageNumber - 1,
												}))
											}
										>
											Anterior
										</button>
										<span className='join-item btn btn-disabled'>
											{vehicles?.currentPage} de{" "}
											{Math.ceil((vehicles?.totalCount ?? 1) / (vehicles?.pageSize ?? 10))}
										</span>
										<button
											className='join-item btn'
											disabled={
												vehicles?.currentPage ===
												Math.ceil((vehicles?.totalCount ?? 1) / (vehicles?.pageSize ?? 10))
											}
											onClick={() =>
												setFilters((prev) => ({
													...prev,
													pageNumber: prev.pageNumber + 1,
												}))
											}
										>
											Próxima
										</button>
									</div>
								</div>
							</div>
						</Card.Body>
					</Card>
				</div>
			</div>
		</>
	);
}

export default Vehicles;
