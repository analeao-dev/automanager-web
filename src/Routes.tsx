import { createBrowserRouter } from "react-router-dom";
import Register from "./pages/vehicles/register";
import Layout from "./layout";
import Vehicles from "./pages/vehicles/vehicles";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/register",
				element: <Register />,
			},
			{
				path: "/vehicles",
				element: <Vehicles />,
			},
		],
	},
]);

export default router;
