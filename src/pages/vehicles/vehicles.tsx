import { useEffect, useState } from "react";
import type { Vehicle } from "../../@types/vehicle";
import { getVehicles } from "../../services/vehicleService";
import type { PagedRequest } from "../../@types/requests/pagedResquest";
import type { PagedResponse } from "../../@types/responses/pagedResponse";
import { formattedDate } from "../../utils/formattedDate";
import { Eye, SquarePen, Trash } from "lucide-react";

function Vehicles() {
	const [vehicles, setVehicles] = useState<PagedResponse<Vehicle[]> | null>(null);
	const [pagedRequest, setPagedRequest] = useState<PagedRequest>({
		pageNumber: 1,
		pageSize: 10,
	});

	console.log("vehicles:", vehicles);
	console.log("pagedRequest:", pagedRequest);

	useEffect(() => {
		const fetchVehicles = async () => {
			try {
				const response = await getVehicles(pagedRequest);
				setVehicles(response);
			} catch (error) {
				console.log(error);
			} finally {
				console.log("fim");
			}
		};
		fetchVehicles();
	}, [pagedRequest]);

	console.log(vehicles);
	return (
		<div>
			<header className='mb-8'>
				<h1 className='text-primary font-semibold text-3xl'>Veículos</h1>
				<p>Gerencie e visualize todos os veículos registrados</p>
			</header>
			<div>
				<div className='overflow-x-auto'>
					<table className='table'>
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
							{vehicles?.data.map((vehicle) => (
								<tr key={vehicle.id}>
									<td>{vehicle.model}</td>
									<td>{vehicle.year}</td>
									<td>{vehicle.brand}</td>
									<td>{vehicle.plate}</td>
									<td>{vehicle.type}</td>
									<td>{formattedDate(vehicle.lastMaintenanceDate)}</td>
									<td>{vehicle.mileage} km</td>
									<td>
										<div className='flex items-center'>
											<button
												className='btn btn-xs btn-ghost'
												type='button'
												title='Visualizar veículo'
											>
												<Eye className='text-info' size={18} />
											</button>
											<button className='btn btn-xs btn-ghost' type='button' title='Editar veículo'>
												<SquarePen className='text-warning' size={18} />
											</button>
											<button
												className='btn btn-xs btn-ghost'
												type='button'
												title='Excluir veículo'
											>
												<Trash className='text-red-600' size={18} />
											</button>
										</div>
									</td>
								</tr>
							))}
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
		</div>
	);
}

export default Vehicles;
