import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
@Component({
	selector: "kt-detaille-carte",
	templateUrl: "./detaille-carte.component.html",
	styleUrls: ["./detaille-carte.component.scss"],
})
export class DetailleCarteComponent implements OnInit {
	carteId: number;
    carteDetails: any;


    private baseUrl = environment.API_URL;
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private httpClient: HttpClient
		) {}

	ngOnInit() : void {
		this.details = {
			num: "1/2022",
			nom: "nom affaire 1 ",
			defendresse: "Test",
			tribunal: "Tech ",
			typeAffaire: "Administratif",
			demandresse: "Partie  ",
			dateDepot: "01-12-2019",
			dateDebut: "01-01-2020",
			objet: "Objet d'affaire",
			ville: "Rabat",
		};
		this.route.params.subscribe((params) => {
			this.carteId = +params['id']; 
		  });
		  this.fetchCarteDetails()
	}

	fetchCarteDetails(): void {
		const url = `${this.baseUrl}employeur/${this.carteId}`;
		this.httpClient.get(url).subscribe(
		  (response) => {
			this.carteDetails = response;
			console.log("Carte sanitaire Details:", this.carteDetails);
		  },
		  (error) => {
			console.error("Error fetching carte details:", error);
		  }
		);
	}
	RetourEmbalages() {
		this.router.navigate(["/cartesanitaire/list-cartes"]);
	}
}
