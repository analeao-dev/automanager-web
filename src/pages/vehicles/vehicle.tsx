import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Car } from "lucide-react";
import Card from "../../components/card";
import { getVehicleById, updateVehicle } from "../../services/vehicleService";
import STATES from "../../utils/states";

function Vehicle() {
	const { id } = useParams();
	const [type, setType] = useState<number>(0);
	const [plate, setPlate] = useState<string>("");
	const [brand, setBrand] = useState<string>("");
	const [model, setModel] = useState<string>("");
	const [year, setYear] = useState<number>(0);
	const [mileage, setMileage] = useState<number>(0);
	const [image, setImage] = useState<string>("");
	const [lastMaintenanceDate, setLastMaintenanceDate] = useState<string>("");
	const [state, setState] = useState<number>(0);
	const [loading, setLoading] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertType, setAlertType] = useState<"success" | "error" | "info" | "warning">("success");

	useEffect(() => {
		async function getVehicle() {
			if (!id) return;
			setLoading(true);
			try {
				const vehicle = await getVehicleById({ id: Number(id) });

				setType(vehicle.data.type);
				setPlate(vehicle.data.plate);
				setBrand(vehicle.data.brand);
				setModel(vehicle.data.model);
				setYear(vehicle.data.year);
				setMileage(vehicle.data.mileage);
				setImage(vehicle.data.image);
				setLastMaintenanceDate(vehicle.data.lastMaintenanceDate);
				setState(vehicle.data.state);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}
		getVehicle();
	}, [id]);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);

		const updatedVehicle = {
			id: Number(id),
			type,
			plate,
			brand,
			model,
			year: Number(year),
			mileage: Number(mileage),
			image,
			lastMaintenanceDate,
			state,
		};

		try {
			const response = await updateVehicle(updatedVehicle);
			setAlertMessage(response.message);
			setAlertType("success");
			setTimeout(() => setAlertMessage(""), 2000);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}
	console.log(state);
	return (
		<div>
			<header className='mb-8'>
				<h1 className='text-primary font-semibold text-3xl'>Informações do Veículo</h1>
				<p>Gerencie e atualize informações sobre o veículo</p>
			</header>
			<Card>
				<Card.Title>
					<Car size={34} />
					<span className='text-xl font-semibold'>Editar Veículo</span>
				</Card.Title>
				<Card.Body>
					{alertMessage && <div className={`alert alert-${alertType} mb-4`}>{alertMessage}</div>}
					<form onSubmit={handleSubmit}>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div className='flex flex-col'>
								<label htmlFor='type'>Tipo do veículo</label>
								<select
									id='type'
									className='select select-bordered w-full'
									value={type}
									onChange={(e) => setType(Number(e.target.value))}
								>
									<option value='0' disabled>
										Selecione o tipo
									</option>
									<option value='1'>Motocicleta</option>
									<option value='2'>Carro</option>
									<option value='3'>Caminhão</option>
								</select>
							</div>

							<div className='flex flex-col'>
								<label htmlFor='plate'>Placa</label>
								<input
									id='plate'
									type='text'
									className='input w-full'
									value={plate}
									onChange={(e) => setPlate(e.target.value)}
								/>
							</div>

							<div className='flex flex-col'>
								<label htmlFor='brand'>Marca</label>
								<input
									id='brand'
									type='text'
									className='input w-full'
									value={brand}
									onChange={(e) => setBrand(e.target.value)}
								/>
							</div>

							<div className='flex flex-col'>
								<label htmlFor='model'>Modelo</label>
								<input
									id='model'
									type='text'
									className='input w-full'
									value={model}
									onChange={(e) => setModel(e.target.value)}
								/>
							</div>

							<div className='flex flex-col'>
								<label htmlFor='year'>Ano</label>
								<input
									id='year'
									type='number'
									className='input w-full'
									value={year}
									onChange={(e) => setYear(Number(e.target.value))}
								/>
							</div>

							<div className='flex flex-col'>
								<label htmlFor='state' className='font-semibold'>
									Estado <span className='text-red-600'>*</span>
								</label>
								<select
									id='state'
									className='input w-full'
									value={state}
									onChange={(e) => setState(Number(e.target.value))}
								>
									<option value='0' disabled>
										Selecione um estado
									</option>
									{STATES.map((state) => (
										<option key={state.id} value={state.id}>
											{state.name} - {state.abbreviation}
										</option>
									))}
								</select>
							</div>

							<div className='flex flex-col'>
								<label htmlFor='mileage'>Quilometragem</label>
								<input
									id='mileage'
									type='number'
									className='input w-full'
									value={mileage}
									onChange={(e) => setMileage(Number(e.target.value))}
								/>
							</div>

							<div className='flex flex-col'>
								<label htmlFor='image'>Imagem (URL)</label>
								<input
									id='image'
									type='text'
									className='input w-full'
									value={image}
									onChange={(e) => setImage(e.target.value)}
								/>
							</div>

							<div className='flex flex-col'>
								<label htmlFor='lastMaintenanceDate'>Última data de manutenção</label>
								<input
									id='lastMaintenanceDate'
									type='date'
									className='input w-full'
									value={lastMaintenanceDate}
									onChange={(e) => setLastMaintenanceDate(e.target.value)}
								/>
							</div>
						</div>

						<div className='flex justify-end'>
							<button disabled={loading} type='submit' className='btn btn-primary col-span-2 mt-4'>
								{loading ? (
									<span className='loading loading-dots loading-md'></span>
								) : (
									<span>Salvar</span>
								)}
							</button>
						</div>
					</form>
				</Card.Body>
			</Card>
		</div>
	);
}

export default Vehicle;
