export class MainClass {

	securityTreshold: number = 10;

	constructor() {
		console.log("Hello world!");
	}

	monitoringCallback(callback: (error: string | null, result?: string) => void): void {
		setTimeout(() => {
			const rand = Math.random() * 100;
			if(rand >= this.securityTreshold){
				callback(null, "Fasza volt");
			} else {
				callback('Error');
			}
		}, 3000);
	}
}