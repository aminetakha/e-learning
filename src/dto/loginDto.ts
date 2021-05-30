export interface LoginDto {
	email: string;
	password: string;
	cart?: cart[];
}

interface cart {
	id: number;
	title: string;
	price: number;
	thumbnail: string;
}
