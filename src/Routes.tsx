import { createBrowserRouter } from "react-router-dom";
import Register from "./pages/vehicles/register";
import Layout from "./layout";
import Vehicles from "./pages/vehicles/vehicles";
import Vehicle from "./pages/vehicles/vehicle";
import Home from "./pages/vehicles/home";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/register",
				element: <Register />,
			},
			{
				path: "/vehicles",
				element: <Vehicles />,
			},
			{
				path: "/vehicle/:id",
				element: <Vehicle />,
			},
		],
	},
]);

export default router;
