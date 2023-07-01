import { Component } from '@angular/core';
import {wait_message} from "../hourglass/hourglass.component";
import {NetworkService} from "../network.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent {
  message=""
  properties=[
    {label: "Décors",value:"xmusee.svg",name:"svg",width:'450px'},
    {label: "Nom de l'application",value:"Gallery",name:"appname"},
    {label: "Réseau",options:["elrond-devnet","elrond-mainnet"],name:"network",type:"list"},
    {label: "Fond d'écran",value:"https://s.f80.fr/assets/wood.jpg",name:"background",width:"450px"},
    {label: "Splash Screen",value:"https://gallery.nfluent.io/assets/musee2.jpg",name:"visual",help:"Image d'ouverture de l'application",width:"450px"},
    {label: "Claim",value:"Exposez vos NFT",name:"claim",width:"450px"},

    {label: "Durée d'affichage",value:"10",name:"duration",type:"number",width:"175px"},
    {label: "Nb minimum de NFT",value:"1",name:"quota",type:"number",width: "175px"},
    {label: "FavIcon",value:"favicon.png",name:"favicon",width:"200px"},


    {label: "Prise de controle de l'écran",value:"true",name:"canChange",type:"boolean",help:"Les spectacteurs peuvent afficher leur propre NFT"},
  ];

  constructor(
      public api:NetworkService,
      public _location:Location,
  ) {
  }

  upload_svg(file: any) {
    wait_message(this,"Chargement du fichier")
    this.api.upload(file).subscribe({
      next:(r:any)=>{
        wait_message(this)
        for(let p of this.properties){
          if(p.name=="svg")p.value=r.url;
        }
      }
    })
  }

  go_back() {
    this._location.back();
  }
}
