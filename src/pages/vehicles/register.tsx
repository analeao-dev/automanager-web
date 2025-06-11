import { Car } from "lucide-react";
import React, { useState } from "react";
import { createVehicle } from "../../services/vehicleService";
import { Alert } from "../../components/alert";
import Card from "../../components/card";
import STATES from "../../utils/states";
import VEHICLE_BRANDS from "../../utils/vehiclesBrands";
import VEHICLES_TYPES from "../../utils/vehiclesTypes";

function Register() {
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
	const [alertType, setAlertType] = useState<"success" | "error" | "info" | "warning">("info");

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		setLoading(true);

		const newVehicle = {
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

		if (!newVehicle.type || !newVehicle.plate || !newVehicle.brand || !newVehicle.model) {
			setLoading(false);
			setAlertMessage("Preencha os campos obrigatórios");
			setAlertType("error");
			setTimeout(() => setAlertMessage(""), 2000);
			return;
		}

		try {
			const response = await createVehicle(newVehicle);
			setAlertMessage(response.message);
			setAlertType("success");
			setTimeout(() => setAlertMessage(""), 2000);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div>
			<header className='my-6'>
				<h1 className='text-primary font-semibold text-2xl'>Registro de veículos</h1>
				<p>Registre um novo veículo no sistema</p>
			</header>
			<Card>
				<Card.Title>
					<Car size={22} />
					<span className='text-lg font-semibold'>Formulário de Registro</span>
				</Card.Title>
				<Card.Body>
					{alertMessage && <Alert message={alertMessage} type={alertType} />}
					<form onSubmit={handleSubmit}>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div className='flex flex-col'>
								<label htmlFor='type' className='font-semibold'>
									Tipo do veículo <span className='text-red-600'>*</span>
								</label>
								<select
									id='type'
									className='select select-bordered w-full'
									value={type}
									onChange={(e) => setType(Number(e.target.value))}
									required
								>
									<option value='0' disabled>
										Selecione o tipo
									</option>
									{VEHICLES_TYPES.map((type) => (
										<option key={type.id} value={type.id}>
											{type.label}
										</option>
									))}
								</select>
							</div>

							<div className='flex flex-col'>
								<label htmlFor='plate' className='font-semibold'>
									Placa <span className='text-red-600'>*</span>
								</label>
								<input
									id='plate'
									type='text'
									className='input w-full'
									value={plate}
									onChange={(e) => setPlate(e.target.value)}
									required
								/>
							</div>

							<div className='flex flex-col'>
								<label htmlFor='brand' className='font-semibold'>
									Marca <span className='text-red-600'>*</span>
								</label>
								<select
									id='brand'
									value={brand}
									className='select select-bordered w-full'
									onChange={(e) => setBrand(e.target.value)}
									required
								>
									<option value='' disabled>
										Selecione a marca
									</option>

									{VEHICLE_BRANDS.map((brand) => (
										<option key={brand.id} value={brand.brand}>
											{brand.brand}
										</option>
									))}
								</select>
							</div>

							<div className='flex flex-col'>
								<label htmlFor='model' className='font-semibold'>
									Modelo <span className='text-red-600'>*</span>
								</label>
								<input
									id='model'
									type='text'
									className='input w-full'
									value={model}
									onChange={(e) => setModel(e.target.value)}
								/>
							</div>

							<div className='flex flex-col'>
								<label htmlFor='year' className='font-semibold'>
									Ano
								</label>
								<input
									id='year'
									type='text'
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
								<label htmlFor='mileage' className='font-semibold'>
									Quilometragem
								</label>
								<input
									id='mileage'
									type='text'
									className='input w-full'
									value={mileage}
									onChange={(e) => setMileage(Number(e.target.value))}
								/>
							</div>

							<div className='flex flex-col'>
								<label htmlFor='image' className='font-semibold'>
									Imagem
								</label>
								<input
									id='image'
									type='file'
									className='input w-full'
									value={image}
									onChange={(e) => setImage(e.target.value)}
								/>
							</div>

							<div className='flex flex-col'>
								<label htmlFor='lastMaintenanceDate' className='font-semibold'>
									Última data de manutanção
								</label>
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
							<button disabled={loading} type='submit' className='btn btn-primary mt-4'>
								{loading ? (
									<span className='loading loading-dots loading-md'></span>
								) : (
									<span>Registrar</span>
								)}
							</button>
						</div>
					</form>
				</Card.Body>
			</Card>
		</div>
	);
}

export default Register;
