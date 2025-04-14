export class User {
	email: string;
	password: string;
	buyer: boolean;

	constructor(email: string, password: string, buyer: boolean){
		this.email = email;
		this.password = password;
		this.buyer = buyer;
	}
}