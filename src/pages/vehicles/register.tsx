import { Car } from "lucide-react";
import React, { useState } from "react";
import { createVehicle } from "../../services/vehicleService";
import { Alert } from "../../components/alert";

function Register() {
	const [type, setType] = useState<number>(0);
	const [plate, setPlate] = useState<string>("");
	const [brand, setBrand] = useState<string>("");
	const [model, setModel] = useState<string>("");
	const [year, setYear] = useState<number>(0);
	const [mileage, setMileage] = useState<number>(0);
	const [image, setImage] = useState<string>("");
	const [lastMaintenanceDate, setLastMaintenanceDate] = useState<string>("");
	const [loading, setLoading] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertType, setAlertType] = useState<"success" | "error" | "info" | "warning">("success");

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
		};

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
			<header className='mb-8'>
				<h1 className='text-primary font-semibold text-3xl'>Registro de veículos</h1>
				<p>Registre um novo veículo no sistema</p>
			</header>
			<div className='flex justify-center'>
				<div className='card card-xl bg-base-100 shadow-sm overflow-hidden'>
					<div className='flex items-center gap-1.5 bg-primary text-white p-6'>
						<Car size={34} />
						<span className='text-2xl font-semibold'>Formulário de Registro</span>
					</div>
					<div className='card-body'>
						<form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div className='flex flex-col'>
								<label htmlFor='type'>Tipo do veículo</label>
								<select
									id='type'
									className='select select-bordered'
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
									className='input'
									value={plate}
									onChange={(e) => setPlate(e.target.value)}
								/>
							</div>

							<div className='flex flex-col'>
								<label htmlFor='brand'>Marca</label>
								<input
									id='brand'
									type='text'
									className='input'
									value={brand}
									onChange={(e) => setBrand(e.target.value)}
								/>
							</div>

							<div className='flex flex-col'>
								<label htmlFor='model'>Modelo</label>
								<input
									id='model'
									type='text'
									className='input'
									value={model}
									onChange={(e) => setModel(e.target.value)}
								/>
							</div>

							<div className='flex flex-col'>
								<label htmlFor='year'>Ano</label>
								<input
									id='year'
									type='text'
									className='input'
									value={year}
									onChange={(e) => setYear(Number(e.target.value))}
								/>
							</div>

							<div className='flex flex-col'>
								<label htmlFor='mileage'>Quilometragem</label>
								<input
									id='mileage'
									type='text'
									className='input'
									value={mileage}
									onChange={(e) => setMileage(Number(e.target.value))}
								/>
							</div>

							<div className='flex flex-col'>
								<label htmlFor='image'>Imagem</label>
								<input
									id='image'
									type='file'
									className='input'
									value={image}
									onChange={(e) => setImage(e.target.value)}
								/>
							</div>

							<div className='flex flex-col'>
								<label htmlFor='lastMaintenanceDate'>Última data de manutanção</label>
								<input
									id='lastMaintenanceDate'
									type='date'
									className='input'
									value={lastMaintenanceDate}
									onChange={(e) => setLastMaintenanceDate(e.target.value)}
								/>
							</div>

							<button disabled={loading} type='submit' className='btn btn-primary col-span-2 mt-4'>
								{loading ? (
									<span className='loading loading-dots loading-md'></span>
								) : (
									<span>Registrar</span>
								)}
								{/* <span>Registrar</span> */}
							</button>
						</form>
					</div>
				</div>
			</div>
			{alertMessage && <Alert message={alertMessage} type={alertType} />}
		</div>
	);
}

export default Register;
