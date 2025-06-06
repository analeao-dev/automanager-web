import { Link, Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar";
import { Menu } from "lucide-react";
import Logo from "./assets/logo-automanager.png";

function Layout() {
	return (
		<div className='drawer lg:drawer-open drawer-overlay'>
			<input id='main-drawer' type='checkbox' className='drawer-toggle' />
			<div className='drawer-content'>
				<main className='max-w-5xl mx-auto p-10'>
					<Outlet />
				</main>
				<label
					htmlFor='main-drawer'
					className='btn btn-primary drawer-button lg:hidden absolute top-4 right-14 z-50'
				>
					<Menu />
				</label>
			</div>
			<div className='drawer-side'>
				<label htmlFor='main-drawer' aria-label='close sidebar' className='drawer-overlay'></label>
				<nav className='menu bg-base-200 border-r-1 border-base-300 text-base-content min-h-full w-80 p-4'>
					<Link to={"/register"}>
						<img src={Logo} alt='Logo automanager' />
					</Link>
					<Sidebar />
				</nav>
			</div>
		</div>
	);
}

export default Layout;
