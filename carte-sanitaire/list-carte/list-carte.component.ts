import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ExcelAssociationService } from "../../utils/excel-association.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";

@Component({
	selector: "kt-list-carte",
	templateUrl: "./list-carte.component.html",
	styleUrls: ["./list-carte.component.scss"],
})
export class ListCarteComponent implements OnInit {
	TypeAlert: any;
	data: excelData[] = [];
	columns: any[];
	footerData: any[][] = [];
    private baseUrl = environment.API_URL; 

	etablissementId: number;
    etablissementDetails: any;

	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"Id",
		"Etablissement",
		"Type",
		"Description",
		"Proprietaire",
		"Date",
		"Indicateur",
		"Statut",
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
		private datePipe: DatePipe,
		private excelService: ExcelAssociationService
	) {
		// this.data = [
		// 	{
		// 		Id: "01",
		// 		Etablissement: "Sample Texte",
		// 		Type: "Sample Texte",
		// 		Description: "Sample Texte",
		// 		Proprietaire: " Sample Texte ",
		// 		Date: "Sample Texte",
		// 		Indicateur: "Sample Texte",
		// 		Statut: "En cours de traitement",
		// 	},
		// 	{
		// 		Id: "02",
		// 		Etablissement: "Sample Texte",
		// 		Type: "Sample Texte",
		// 		Description: "Sample Texte",
		// 		Proprietaire: "Sample Texte ",
		// 		Date: "Sample Texte",
		// 		Indicateur: "Sample Texte",
		// 		Statut: "Expirée",
		// 	},
		// 	{
		// 		Id: "03",
		// 		Etablissement: "Sample Texte",
		// 		Type: "Sample Texte",
		// 		Description: "Sample Texte",
		// 		Proprietaire: "Sample Texte ",
		// 		Date: "Sample Texte",
		// 		Indicateur: "Sample Texte",
		// 		Statut: "Valide",
		// 	},
		// ];
	}

	ngOnInit() {
		this.columns = [
			"Id",
			"Etablissement",
			"Type",
			"Description",
			"Proprietaire",
			"Date",
			"Indicateur",
			"Statut",
		];
		this.dataSource = new MatTableDataSource(this.data);
		this.loadData();
	}



	loadData(): void {
		this.httpClient.get<any[]>(`${this.baseUrl}employeur`)
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
		this.router.navigate(["/cartesanitaire/view-carte"]);
	}
	ModifierAssociation(): void {
		this.router.navigate(["/cartesanitaire/upd-carte"]);
	}
	DetailAssociation(id) {
		this.router.navigate([`/cartesanitaire/detaille-carte/${id}`]);
	}

	createDataJson(i: number): excelData {
		return {
			Id: this.TypeAlert[i].Id,
			Etablissement: this.TypeAlert[i].Etablissement,
			Type: this.TypeAlert[i].Type,
			Description: this.TypeAlert[i].Description,
			Proprietaire: this.TypeAlert[i].Proprietaire,
			Date: this.TypeAlert[i].Date,
			Indicateur: this.TypeAlert[i].Indicateur,
			Statut: this.TypeAlert[i].Statut,
		};
	}
}
export interface excelData {
	Id: string;
	Etablissement: string;
	Type: string;
	Description: string;
	Proprietaire: string;
	Date: string;
	Indicateur: string;
	Statut: string;
}
