import Logo from "../../assets/logo-automanager.png";
function Home() {
	return (
		<div className='flex justify-center items-center flex-col'>
			<h1 className='font-extrabold text-4xl'>Bem-vindo ao </h1>
			<img src={Logo} className='w-80' />
		</div>
	);
}

export default Home;
