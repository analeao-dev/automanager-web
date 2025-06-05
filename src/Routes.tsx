import { createBrowserRouter } from "react-router-dom";
import Register from "./pages/vehicles/register";
import Layout from "./layout";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/register",
				element: <Register />,
			},
		],
	},
]);

export default router;
