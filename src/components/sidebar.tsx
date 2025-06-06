import { List, Plus } from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar() {
	return (
		<ul>
			<li className='my-2.5'>
				<NavLink
					to={`register`}
					className={({ isActive }) => (isActive ? "bg-red-100 text-primary" : "")}
				>
					<Plus />
					<span className='font-semibold'>Cadastro</span>
				</NavLink>
			</li>
			<li>
				<NavLink
					to={`vehicles`}
					className={({ isActive }) => (isActive ? "bg-red-100 text-primary" : "")}
				>
					<List />
					<span className='font-semibold'>Veículos</span>
				</NavLink>
			</li>
		</ul>
	);
}

export default Sidebar;
