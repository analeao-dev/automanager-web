import { format, parseISO } from "date-fns";

export function formattedDate(date: string) {
	return format(parseISO(date), "dd/MM/yyyy");
}
