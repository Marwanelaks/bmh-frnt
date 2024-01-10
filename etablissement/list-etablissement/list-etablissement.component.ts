
import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { TranslateService } from "@ngx-translate/core";
import { ExcelAssociationService } from "../../utils/excel-association.service";
import { environment } from "../../../../../environments/environment";
@Component({
	selector: "kt-list-etablissement",
	templateUrl: "./list-etablissement.component.html",
	styleUrls: ["./list-etablissement.component.scss"],
})
export class ListEtablissementComponent implements OnInit {
	TypeAlert: any;
	data: any[] = [];
	columns: any[];
	footerData: any[][] = [];
	private baseUrl = environment.API_URL;

	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"Id",
		"IF",
		// "Adresse",
		"Description",
		// "Proprietaire",
		"Tel",
		"Propriétaire",
		"Gérant",
		// "Indicateur",
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
		private httpClient: HttpClient, 
		private router: Router,
		private datePipe: DatePipe,
		private excelService: ExcelAssociationService
	) {
	
	}

	ngOnInit(): void {
		this.columns = [
			"Id",
			"IF",
			// "Adresse",
			"Description",
			// "Proprietaire",
			"Tel",
			"Propriétaire",
			"Gérant",
			// "Indicateur",
		];
		this.dataSource = new MatTableDataSource(this.data);
		this.loadData();
	}

	loadData(): void {
		this.httpClient.get<any[]>(`${this.baseUrl}etablissements`)
		  .subscribe(response => {
			this.data = response;
			this.dataSource.data = this.data;  // Update MatTableDataSource with new data
			this.isLoadingResults = false;  // Assuming loading is completed
		  });
	  }
	  

	// loadData(): void {
	// 	this.httpClient.get<any[]>('http://localhost:9095/etablissements')
	// 	  .subscribe(response => {
	// 		this.data = response;
	// 	  });
	//   }
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	addAssociation(): void {
		this.router.navigate(["/etablissement/add-etablissement"]);
	}
	ModifierAssociation(): void {
		this.router.navigate(["/etablissement/upd-etablissement"]);
	}
	DetailAssociation(id) {
		this.router.navigate([`/etablissement/etablissements/${id}`]);
	  }	  
	programVisite() {
		this.router.navigate(["/etablissement/program-visit"]);
	}

}
// export interface excelData {
// 	Id: string;
// 	Etablissement: string;
// 	Type: string;
// 	Description: string;
// 	Proprietaire: string;
// 	Date: string;
// 	Indicateur: string;
// }



