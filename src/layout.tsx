import { Link, Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar";
import { Menu } from "lucide-react";
import Logo from "./assets/logo-automanager.png";
import ThemeController from "./components/themeController";
import { useEffect, useState } from "react";
function Layout() {
	const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem("theme", theme);
	}, [theme]);

	const handleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	return (
		<div className='drawer lg:drawer-open drawer-overlay'>
			<input id='main-drawer' type='checkbox' className='drawer-toggle' />
			<div className='drawer-content'>
				<main className='w-full mx-auto p-10'>
					<div className='flex justify-end'>
						<ThemeController theme={theme} handleTheme={handleTheme} />
					</div>
					<Outlet />
				</main>
				<label
					htmlFor='main-drawer'
					className='btn btn-primary drawer-button lg:hidden absolute top-26 right-12 z-50'
				>
					<Menu />
				</label>
			</div>
			<div className='drawer-side'>
				<label htmlFor='main-drawer' aria-label='close sidebar' className='drawer-overlay'></label>
				<nav className='menu bg-secondary border-r-1 border-secondary text-base-content min-h-full w-72 p-4'>
					<Link to={"/"}>
						<img src={Logo} alt='Logo automanager' />
					</Link>
					<Sidebar />
				</nav>
			</div>
		</div>
	);
}

export default Layout;
