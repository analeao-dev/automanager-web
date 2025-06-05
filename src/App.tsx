import { RouterProvider } from "react-router-dom";
import router from "./Routes";

function App() {
	return (
		<>
			<RouterProvider router={router} />
			<h1 className='text-3xl font-bold underline'>AutoManager 🚗</h1>
		</>
	);
}

export default App;
