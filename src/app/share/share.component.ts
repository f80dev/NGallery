import {Component, OnInit} from '@angular/core';
import {HourglassComponent, wait_message} from "../hourglass/hourglass.component";
import {NetworkService} from "../network.service";
import {Location} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {apply_params} from "../../tools";
import {environment} from "../../environments/environment";
import {StyleManagerService} from "../style-manager.service";
import {UploadFileComponent} from "../upload-file/upload-file.component";
import {FaqLinkComponent} from "../faq-link/faq-link.component";
import {MatExpansionPanel, MatExpansionPanelHeader} from "@angular/material/expansion";
import {GenlinkComponent} from "../genlink/genlink.component";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-share',
  standalone: true,
  templateUrl: './share.component.html',
  imports: [
    UploadFileComponent,
    HourglassComponent,
    FaqLinkComponent,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    GenlinkComponent,
    MatButton
  ],
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {
  message=""
  properties=[
    {label: "Nom de l'application",value:"Gallery",name:"appname"},
    {label: "Réseau",
      options:[{label:"MultiversX Test",value:"elrond-devnet"},{label:"MultiversX",value:"elrond-mainnet"}],
      value:{label:"MultiversX",value:"elrond-mainnet"},
      name:"network",
      type:"list"},

    {label: "Décors",value:"xmusee.svg",name:"svg",width:'450px'},
    {label: "Fond d'écran",value:"https://nfluent.io/assets/wood2.jpg",name:"background",width:"450px",icon_action:"add_photo_alternate"},

    {label: "Ecran de lancement",value:"https://gallery.nfluent.io/assets/musee2.jpg",name:"visual",help:"Image d'ouverture de l'application",width:"450px",icon_action:"add_photo_alternate"},
    {label: "Phrase de lancement",value:"Exposez vos NFT",name:"claim",width:"450px"},

    {label: "Durée d'affichage",value:"10",name:"duration",type:"number",width:"175px"},
    {label: "Nb minimum de NFT",value:"1",name:"quota",type:"number",width: "175px"},
    {label: "FavIcon",value:"favicon.png",name:"favicon",width:"200px"},

    {label: "Prise de controle de l'écran",value:"true",name:"canChange",type:"boolean",help:"Les spectacteurs peuvent afficher leur propre NFT"},
  ];
  background: string=""

  constructor(
      public api:NetworkService,
      public _location:Location,
      public style:StyleManagerService,
      public dialog:MatDialog
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

  ngOnInit() {
    apply_params(this, {},environment)
  }

  go_back() {
    this._location.back();
  }
}
