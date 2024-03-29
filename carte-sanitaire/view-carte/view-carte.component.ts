import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { FormControl } from '@angular/forms';

@Component({
	selector: "kt-view-carte",
	templateUrl: "./view-carte.component.html",
	styleUrls: ["./view-carte.component.scss"],
})
export class ViewCarteComponent implements OnInit {

	data: any[] = [];
    employe: any[] = [];
	employeur: any [] = [];


	typeControl = new FormControl();
	statutControl = new FormControl();
	sexeControl = new FormControl();
	decisionControl = new FormControl()
	// quartierControl = new FormControl();
	// arrondissementControl = new FormControl();
  

	// quartier: any[] = [];
	// arrondissement: any[] = [];


	rs: any;
	ifiscal:any;
	nbremploye:any;
	ice:any;
	tel:any;
	fax:any;
	taxe:any;
	numauto:any;
	email:any;
	adresse:any;
	pieceJointemployeur : any;

    handleFileInput(event: any): void{
		this.pieceJointemployeur = event.target.files[0];
	}
  
	nom: any;
	prenom: any;
	cin: any;
	numcnss: any;
	datenaissance: any;
	telemploye: any;
	duree: any;
	emailemploye: any;
	fonctionemploye: any;
	daterecrutement: any;
	datedemandecarte: any;
	dateprocontrol: any;
	decision: any;
	dateresultat: any;
	datequittance: any;
	numquitance: any;
	datedelivrance: any;
	adresseemploye: any;
    photo: any;
	pieceJointe: any;



  handleImgInput(event: any): void{
    this.photo = event.target.files[0];
  }
  handlePieceJointe(event: any): void{
	this.pieceJointe = event.target.files[0];
  }




	isVisible: any;
	isSelected: boolean = false;
	private baseUrl = environment.API_URL;
	constructor(private httpClient: HttpClient, private router: Router) {}

	ngOnInit() {}


	createCarte():void{
  
		const employee = {
			nom: this.nom,
			prenom: this.prenom,
			cin: this.cin,
			cnss: this.numcnss,
			dateNaissance: this.datenaissance,
			tel: this.telemploye,
			dureCarte: this.duree,
			email: this.emailemploye,
			fonction: this.fonctionemploye,
			dateRecrutement: this.daterecrutement,
			dateDemendeDeCarte: this.datedemandecarte,
			dateProchainControle: this.dateprocontrol,

			typeAnalyseDemande: this.typeControl.value,
			statutDemandeDeCarte: this.statutControl.value,
			sexe: this.sexeControl.value,

			decision: this.decisionControl.value,

			dateResultat: this.dateresultat,
			dateQuittance: this.datequittance,
			numQuittance: this.numquitance,
			dateDelivranceCarte: this.datedelivrance,
			adresse: this.adresseemploye,
			employeurd : {
				raisonSocial: this.rs ,
				idFiscal: this.ifiscal,
				nombreEmployes : this.nbremploye,
				taxe: this.taxe,
				numeroAutorisation : this.numauto,
				ice : this.ice,
				tel : this.tel,
				fax : this.fax,
				email : this.email,
				adresse: this.adresse,
			}
		}
	    console.log(employee)
		const formDataemployeur = new FormData();
		const formData = new FormData();
		formData.append('employe', new Blob([JSON.stringify(employee)], { type: 'application/json' }));
		formData.append('photo', this.photo);
		formData.append('pieceJointe', this.pieceJointe);
		console.log(formData);
		setTimeout(() => {
		  this.httpClient.post(`${this.baseUrl}employe`, formData)
			.subscribe(
			  (response) => {
				console.log('Employee created successfully:', response);
				console.log(response.id);
				const employeur = {
					raisonSocial: this.rs ,
					idFiscal: this.ifiscal,
					nombreEmployes : this.nbremploye,
					taxe: this.taxe,
					numeroAutorisation : this.numauto,
					ice : this.ice,
					tel : this.tel,
					fax : this.fax,
					email : this.email,
					adresse: this.adresse,
					employe: {
						id: response.id 
					}
				};
                formDataemployeur.append('employeur', new Blob([JSON.stringify(employeur)], { type: 'application/json' }));
				formDataemployeur.append('pieceJointes', this.pieceJointemployeur)
				this.httpClient.post(`${this.baseUrl}employeur`, formDataemployeur)
				.subscribe(
					(employeurResponse) => {
					console.log('Employeur created successfully:', employeurResponse);
					},
					(error) => {
					console.error('Error creating employeur:', error);
					}
				);
			  },
			  (error) => {
				console.error(error);
			  }
			);
		}, 100);
	}


	RetourEmbalages(): void {
		this.router.navigate(["/cartesanitaire/list-cartes"]);
	}
}
