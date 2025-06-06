import { useEffect, useState } from "react";
import type { Vehicle } from "../../@types/vehicle";
import { deleteVehicle, getVehicles } from "../../services/vehicleService";
import type { PagedRequest } from "../../@types/requests/pagedResquest";
import type { PagedResponse } from "../../@types/responses/pagedResponse";
import { formattedDate } from "../../utils/formattedDate";
import { Car, Eye, SquarePen, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../../components/card";

function Vehicles() {
	const [vehicles, setVehicles] = useState<PagedResponse<Vehicle[]> | null>(null);
	const [pagedRequest, setPagedRequest] = useState<PagedRequest>({
		pageNumber: 1,
		pageSize: 10,
	});

	useEffect(() => {
		const fetchVehicles = async () => {
			try {
				const response = await getVehicles(pagedRequest);
				setVehicles(response);
			} catch (error) {
				console.log(error);
			}
		};
		fetchVehicles();
	}, [pagedRequest]);

	async function handleDeleteVehicle(id: number) {
		try {
			await deleteVehicle({ id: Number(id) });
			const response = await getVehicles(pagedRequest);
			setVehicles(response);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div>
			<header className='mb-8'>
				<h1 className='text-primary font-semibold text-3xl'>Veículos</h1>
				<p>Gerencie e visualize todos os veículos registrados</p>
			</header>
			<Card>
				<Card.Title>
					<Car size={34} />
					<span className='text-xl font-semibold'>
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
										<th>Data da última manuteção</th>
										<th>Quilometragem</th>
										<th>Ações</th>
									</tr>
								</thead>
								<tbody>
									{vehicles && vehicles.data.length > 0 ? (
										vehicles.data.map((vehicle) => (
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
									) : (
										<tr>
											<td colSpan={8} className='text-secondary font-semibold text-sm text-center'>
												Nenhum veículo encontrado
											</td>
										</tr>
									)}
								</tbody>
								<tfoot>
									<tr>
										<th>Modelo</th>
										<th>Ano</th>
										<th>Marca</th>
										<th>Placa</th>
										<th>Tipo</th>
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
										setPagedRequest((prev) => ({
											...prev,
											pageNumber: (vehicles?.currentPage ?? 1) - 1,
										}))
									}
								>
									Anterior
								</button>
								<span className='join-item btn btn-disabled'>
									{vehicles?.currentPage} de {vehicles?.totalCount}
								</span>
								<button
									className='join-item btn'
									disabled={vehicles?.currentPage === vehicles?.totalCount}
									onClick={() =>
										setPagedRequest((prev) => ({
											...prev,
											pageNumber: (vehicles?.currentPage ?? 1) + 1,
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
	);
}

export default Vehicles;
