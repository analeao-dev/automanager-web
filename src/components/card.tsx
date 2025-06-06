import type { ReactNode } from "react";

interface CardProps {
	children: ReactNode;
}

interface CardTitleProps {
	children: ReactNode;
}

interface CardBodyProps {
	children: ReactNode;
}

function Card({ children }: CardProps) {
	return (
		<div className='flex justify-center'>
			<div className='card card-md bg-base-100 shadow-2xl overflow-hidden w-full'>{children}</div>
		</div>
	);
}

function Title({ children }: CardTitleProps) {
	return <div className='flex items-center gap-1.5 bg-primary text-white p-6'>{children}</div>;
}

function Body({ children }: CardBodyProps) {
	return <div className='card-body'>{children}</div>;
}

Card.Title = Title;
Card.Body = Body;

export default Card;
