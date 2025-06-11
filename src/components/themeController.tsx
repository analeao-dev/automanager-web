import { Moon, Sun } from "lucide-react";

interface ThemeControllerProps {
	theme: string;
	handleTheme: () => void;
}

function ThemeController({ theme, handleTheme }: ThemeControllerProps) {
	return (
		<div className='bg-white p-2 rounded-full'>
			<label className='swap swap-rotate'>
				<input type='checkbox' className='theme-controller' value={theme} onChange={handleTheme} />

				<Sun className='swap-off h-6 w-6 text-primary' />
				<Moon className='swap-on h-6 w-6 text-primary' />
			</label>
		</div>
	);
}

export default ThemeController;
