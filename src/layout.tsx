import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
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
		<div className='max-w-7xl mx-auto p-5'>
			<header>
				<Navbar theme={theme} handleTheme={handleTheme} />
			</header>
			<main>
				<Outlet />
			</main>
		</div>
	);
}

export default Layout;
