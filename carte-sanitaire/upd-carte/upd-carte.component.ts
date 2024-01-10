import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "kt-upd-carte",
	templateUrl: "./upd-carte.component.html",
	styleUrls: ["./upd-carte.component.scss"],
})
export class UpdCarteComponent implements OnInit {
	isVisible: any;
	isSelected: boolean = false;

	constructor(private router: Router) {}

	ngOnInit() {}
	RetourEmbalages(): void {
		this.router.navigate(["/cartesanitaire/list-carte"]);
	}
}
