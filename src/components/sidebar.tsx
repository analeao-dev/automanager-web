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
					Cadastro
				</NavLink>
			</li>
			<li>
				<NavLink
					to={`vehicles`}
					className={({ isActive }) => (isActive ? "bg-red-100 text-primary" : "")}
				>
					<List />
					Vehicles
				</NavLink>
			</li>
		</ul>
	);
}

export default Sidebar;
