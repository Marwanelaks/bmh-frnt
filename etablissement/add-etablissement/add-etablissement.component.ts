import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";

@Component({
  selector: "kt-add-etablissement",
  templateUrl: "./add-etablissement.component.html",
  styleUrls: ["./add-etablissement.component.scss"],
})
export class AddEtablissementComponent implements OnInit {
  typeControl = new FormControl();
  stypeControl = new FormControl();
  communeControl = new FormControl();
  quartierControl = new FormControl();
  arrondissementControl = new FormControl();

  rs: any;
  rc: any;
  nom: any;
  prenom: any;
  cin: any;
  description: any;
  activites: any;
  tel: any;
  fax: any;
  nomprop: any;
  prenomprop: any;
  cinprop: any ;
  telprop: any;
  nomgerant: any;
  prenomgerant: any;
  cingerant: any;
  telgerant: any;
  idf: any;
  adresse: any;
  checkedChoisi: any;

  types: any[] = [];
  stypes: any[] = [];
  commune: any[] = [];
  quartier: any[] = [];
  arrondissement: any[] = [];
//   data: any[] =[];
  private baseUrl = environment.API_URL;

  constructor(private router: Router, private httpClient: HttpClient) {}
  Visible: any = 0;
  isSelected: boolean = false;

  ngOnInit(): void {
    this.fetchTypes();
    this.SousTypes();
    this.fetchCommune();
    this.fetchQuartier();
    this.fetchArrondissement();
  }

  private fetchTypes(): void {
    this.httpClient.get<any[]>(`${this.baseUrl}typectrl`).subscribe(
      (response) => {
        this.types = response;
      },
      (error) => {
        console.error("Error fetching types:", error);
      }
    );
  }

  private fetchCommune(): void {
    this.httpClient.get<any[]>(`${this.baseUrl}commune`).subscribe(
      (response) => {
        this.commune = response;
      },
      (error) => {
        console.error("Error fetching types:", error);
      }
    );
  }

  private fetchQuartier(): void {
    this.httpClient.get<any[]>(`${this.baseUrl}quartier`).subscribe(
      (response) => {
        this.quartier = response;
      },
      (error) => {
        console.error("Error fetching types:", error);
      }
    );
  }

  private fetchArrondissement(): void {
    this.httpClient.get<any[]>(`${this.baseUrl}arrondissement`).subscribe(
      (response) => {
        this.arrondissement = response;
      },
      (error) => {
        console.error("Error fetching types:", error);
      }
    );
  }

  private SousTypes(): void {
    this.httpClient.get<any[]>(`${this.baseUrl}soustype`).subscribe(
      (response) => {
        this.stypes = response;
      },
      (error) => {
        console.error("Error fetching types:", error);
      }
    );
  }
 
  createEtablissement(): void {
    const data: any = {
        description: this.description,
        activite: this.activites,
        tel: this.tel,
        fax: this.fax,
        ifiscal: this.idf,
        adresse: this.adresse,
        personne: this.checkedChoisi,
        nomProp: this.nomprop,
        prenomProp: this.prenomprop,
        cinPro: this.cinprop,
        telProp: this.telprop,
        nomGerant: this.nomgerant,
        prenomGerant: this.prenomgerant,
        cinGerant: this.cingerant,
        telGerant: this.telgerant, 
		typeControleSanitaire : { id: this.typeControl.value },
		sousType : { id: this.stypeControl.value },
		commune : { id: this.communeControl.value },
		arrondissement : { id: this.arrondissementControl.value },
		quartier : { id: this.quartierControl.value }
    };

    if (this.checkedChoisi === "MORALE") {
        data.rs = this.rs;
        data.rc = this.rc;
    } else if (this.checkedChoisi === "PHYSIQUE") {
        data.nom = this.nom;
        data.prenom = this.prenom;
        data.cin = this.cin;
    }

   
    console.log(data);
    this.httpClient.post<any>(`${this.baseUrl}etablissements`, data).subscribe(
        (response) => {
            console.log("Etablissement created successfully:", response);
            this.router.navigate(["/etablissement/list-etablissement"]);
        },
        (error) => {
            console.error("Error creating etablissement:", error);
        }
    );
}





  Console(): void {
    console.log("Values to Log: ", {
      checkedChoisi: this.checkedChoisi,
      rs: this.rs,
      rc: this.rc,
      nom: this.nom,
      prenom: this.prenom,
      cin: this.cin,
      description: this.description,
      typeControl: this.typeControl.value,
      stypeControl: this.stypeControl.value,
      communeControl: this.communeControl.value,
      arrondissementControl: this.arrondissementControl.value,
      quartierControl: this.quartierControl.value,
      activites: this.activites,
      tel: this.tel,
      fax: this.fax,
      idf: this.idf,
      adresse: this.adresse,
    });
  }

  RetourEmbalages(): void {
    this.router.navigate(["/etablissement/list-etablissement"]);
  }
}
