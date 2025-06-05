import { Car } from "lucide-react";

function Register() {
	return (
		<div className='p-4'>
			<header>
				<h1>Registro de veículos</h1>
			</header>
			<div className='flex justify-center'>
				<div className='card card-xl bg-base-100 shadow-sm overflow-hidden'>
					<div className='flex items-center gap-1.5 bg-primary text-white p-6'>
						<Car size={34} />
						<span className='text-2xl font-semibold'>Formulário de Registro</span>
					</div>
					<div className='card-body'>
						<form action='' className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div className='flex flex-col'>
								<label htmlFor=''>Tipo do veículo</label>
								<select id='tipo' className='select select-bordered'>
									<option disabled selected>
										Selecione o tipo
									</option>
									<option value='1'>Motocicleta</option>
									<option value='2'>Carro</option>
									<option value='3'>Caminhão</option>
								</select>
							</div>

							<div className='flex flex-col'>
								<label htmlFor=''>Placa</label>
								<input type='text' className='input' />
							</div>
							<div className='flex flex-col'>
								<label htmlFor=''>Marca</label>
								<input type='text' className='input' />
							</div>
							<div className='flex flex-col'>
								<label htmlFor=''>Modelo</label>
								<input type='text' className='input' />
							</div>
							<div className='flex flex-col'>
								<label htmlFor=''>Ano</label>
								<input type='text' className='input' />
							</div>
							<div className='flex flex-col'>
								<label htmlFor=''>Quilometragem</label>
								<input type='text' className='input' />
							</div>
							<div className='flex flex-col'>
								<label htmlFor=''>Imagem</label>
								<input type='file' className='input' />
							</div>
							<div className='flex flex-col'>
								<label htmlFor=''>Última data de manutanção</label>
								<input type='date' className='input' />
							</div>
						</form>
						<div className='card-actions justify-end'>
							<div className='badge badge-outline'>Fashion</div>
							<div className='badge badge-outline'>Products</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Register;
