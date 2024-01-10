import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "../../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Component({
	selector: "kt-list-programme",
	templateUrl: "./list-programme.component.html",
	styleUrls: ["./list-programme.component.scss"],
})
export class ListProgrammeComponent implements OnInit {
	TypeAlert: any;
	data: excelData[] = [];
	columns: any[];
	footerData: any[][] = [];
	private baseUrl = environment.API_URL; 
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"Id",
		"Liste Etablissement",
		"Type",
		"Sous-type",
		"Motif de visite",
		"Date",
		"Agent",
		"actions",
	];
	// ============================================
	// Declarations
	// ============================================
	dataSource = new MatTableDataSource<any>();
	isLoadingResults = true;
	isLoading = true;
	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		private translate: TranslateService,
		private router: Router,
        private httpClient: HttpClient,
		private datePipe: DatePipe
	) {


		// this.data = [
		// 	{
		// 		Id: "01",
		// 		Liste_Etablissement: "établissement 1",
		// 		Type: "Type 1",
		// 		Sous_Type: "Sous-type 1",
		// 		Motif_de_visite: "Motif de visite 1 ",
		// 		Date: "2000-10-1",
		// 		Agent: "Agent 1",
		// 	},
		// 	{
		// 		Id: "02",
		// 		Liste_Etablissement: "établissement 2",
		// 		Type: "Type 2",
		// 		Sous_Type: "Sous-type 2",
		// 		Motif_de_visite: "Motif de visite 2 ",
		// 		Date: "2020-12-2",
		// 		Agent: "Agent 2",
		// 	},
		// 	{
		// 		Id: "03",
		// 		Liste_Etablissement: "établissement 3",
		// 		Type: "Type 3",
		// 		Sous_Type: "Sous-type 3",
		// 		Motif_de_visite: "Motif de visite 3 ",
		// 		Date: "2023-10-3",
		// 		Agent: "Agent 3",
		// 	},
		// ];
	}

	ngOnInit() {
		this.columns = [
			"Id",
			"Liste Etablissement",
			"Type",
			"Sous-type",
			"Motif de visite",
			"Date",
			"Agent",
		];
		this.dataSource = new MatTableDataSource(this.data);
		this.loadData()
	}



	text: string = "";

    getFirstThreeWords(text: string): string {

        const words = text.split(/\s+/);

        const firstThreeWords = words.slice(0, 3);
        let result = firstThreeWords.join(' ');
		if (words.length > 3) {
			result += '...';
		}
        return result;
    }
	loadData(): void {
		this.httpClient.get<any[]>(`${this.baseUrl}programme`)
		  .subscribe(response => {
			this.data = response;
			this.dataSource.data = this.data;  
			this.isLoadingResults = false;  
		  });
	  }

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	addAssociation(): void {
		this.router.navigate(["/etablissement/program-visit"]);
	}
	ModifierAssociation(): void {
		this.router.navigate(["/etablissement/upd-programme"]);
	}
	DetailAssociation(id) {
		this.router.navigate([`/etablissement/detaille-programme/${id}`]);
	}

	createDataJson(i: number): excelData {
		return {
			Id: this.TypeAlert[i].Id,
			Liste_Etablissement: this.TypeAlert[i].Liste_Etablissement,
			Type: this.TypeAlert[i].Type,
			Sous_Type: this.TypeAlert[i].Sous_Type,
			Motif_de_visite: this.TypeAlert[i].Motif_de_visite,
			Date: this.TypeAlert[i].Date,
			Agent: this.TypeAlert[i].Agent,
		};
	}
}
export interface excelData {
	Id: string;
	Liste_Etablissement: string;
	Type: string;
	Sous_Type: string;
	Motif_de_visite: string;
	Date: string;
	Agent: string;
}
