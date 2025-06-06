import { Moon, Sun } from "lucide-react";

interface ThemeControllerProps {
	theme: string;
	handleTheme: () => void;
}

function ThemeController({ theme, handleTheme }: ThemeControllerProps) {
	return (
		<div className='bg-primary p-2 rounded-full'>
			<label className='swap swap-rotate'>
				<input type='checkbox' className='theme-controller' value={theme} onChange={handleTheme} />

				<Sun className='swap-off h-8 w-8 text-white' />
				<Moon className='swap-on h-8 w-8 text-white' />
			</label>
		</div>
	);
}

export default ThemeController;
