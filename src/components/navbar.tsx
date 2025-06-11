import { Link, NavLink } from "react-router-dom";
import ThemeController from "./themeController";

interface NavbarProps {
	theme: string;
	handleTheme: () => void;
}

function Navbar({ theme, handleTheme }: NavbarProps) {
	return (
		<div className='navbar bg-primary shadow-2xl rounded-full px-6'>
			<div className='navbar-start'>
				<Link to={"/"}>
					<h1 className='text-primary bg-white font-bold rounded-full py-2 px-4'>AutoManager</h1>
				</Link>
			</div>
			<div className='navbar-center text-white'>
				<ul className='menu menu-horizontal px-1'>
					<li>
						<NavLink
							to={`register`}
							className={({ isActive }) => (isActive ? "bg-red-100 text-primary" : "")}
						>
							<span className='font-semibold text-[16px]'>Cadastro</span>
						</NavLink>
					</li>
					<li>
						<NavLink
							to={`vehicles`}
							className={({ isActive }) => (isActive ? "bg-red-100 text-primary" : "")}
						>
							<span className='font-semibold text-[16px]'>Veículos</span>
						</NavLink>
					</li>
				</ul>
			</div>
			<div className='navbar-end'>
				<ThemeController theme={theme} handleTheme={handleTheme} />
			</div>
		</div>
	);
}

export default Navbar;
