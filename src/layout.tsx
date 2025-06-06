import { Link, Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar";
import { Menu } from "lucide-react";

function Layout() {
	return (
		<div className='drawer lg:drawer-open drawer-overlay'>
			<input id='main-drawer' type='checkbox' className='drawer-toggle' />
			<div className='drawer-content'>
				<main className='p-10'>
					<Outlet />
				</main>
				<label htmlFor='main-drawer' className='btn btn-primary drawer-button lg:hidden'>
					<Menu />
				</label>
			</div>
			<div className='drawer-side'>
				<label htmlFor='main-drawer' aria-label='close sidebar' className='drawer-overlay'></label>
				<nav className='menu bg-base-200 text-base-content min-h-full w-80 p-4'>
					<Link to={"/"}>
						<h3>AutoManager</h3>
					</Link>
					<Sidebar />
				</nav>
			</div>
		</div>
	);
}

export default Layout;
