import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "kt-program-visit",
	templateUrl: "./program-visit.component.html",
	styleUrls: ["./program-visit.component.scss"],
})
export class ProgramVisitComponent implements OnInit {
	constructor(private router: Router) {}

	ngOnInit() {}

	RetourEmbalages() {
		this.router.navigate(["/etablissement/list-programme"]);
	}

	// Suivant() {
	// 	this.router.navigate(["pages/Etablissement/list-visite"]);
	// }
}
