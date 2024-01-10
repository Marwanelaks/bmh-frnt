import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "kt-upd-etablissement",
	templateUrl: "./upd-etablissement.component.html",
	styleUrls: ["./upd-etablissement.component.scss"],
})
export class UpdEtablissementComponent implements OnInit {
	Visible: any = 0;

	constructor(private router: Router) {}

	ngOnInit() {}

	RetourEmbalages() {
		this.router.navigate(["/etablissement/list-etablissement"]);
	}
}
