import { Plus } from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar() {
	return (
		<ul>
			<li>
				<NavLink
					to={`register`}
					className={({ isActive }) => (isActive ? "bg-red-100 text-primary" : "")}
				>
					<Plus />
					Cadastro
				</NavLink>
			</li>
		</ul>
	);
}

export default Sidebar;
