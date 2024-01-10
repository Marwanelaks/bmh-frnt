import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "kt-upd-programme",
	templateUrl: "./upd-programme.component.html",
	styleUrls: ["./upd-programme.component.scss"],
})
export class UpdProgrammeComponent implements OnInit {
	selected = ["etablissements2"];
	selected1 = "Type1";
	selected2 = "Sous2";
	selected3 = "Convention3";
	constructor(private router: Router) {}

	ngOnInit() {}

	RetourEmbalages() {
		this.router.navigate(["/etablissement/list-programme"]);
	}
}
