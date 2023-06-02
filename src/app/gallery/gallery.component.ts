import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {NFT} from "../../nft";
import {$$, apply_params, enterFullScreen, getParams, showMessage} from "../../tools";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {NetworkService} from "../network.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DOCUMENT} from "@angular/common";
import {wait_message} from "../hourglass/hourglass.component";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit,AfterViewInit {
  nfts: NFT[] = [];
  address:string="";
  network: string="";
  animation="svg";
  duration=3;
  collection: string="";
  showNfluentWalletConnect=true;
  visual: string="";
  nft_title:string="";
  canChange: boolean=true;
  quota: number=3            //Nombre minimum de NFT
  background: string="";
  appname="";
  claim="";
  excludes_collections: string[]=[];
  showAuthent: boolean=true;
  message="";
  private canvas: string="./assets/canvas.svg"
  svg="";         //Code remplacé à chaque image
  zone_nft: any={left:"10%",top:"10%",size:"50vh"}
  svg_code="";   //Code originel

  constructor(
      public routes:ActivatedRoute,
      public api:NetworkService,
      public router:Router,
      public toast:MatSnackBar,
      @Inject(DOCUMENT) public document: any
  ) { }

  async ngOnInit() {
    let params:any=await getParams(this.routes)
    apply_params(this,params,environment);

    this.animation=params.animation || "svg";
    this.collection=params.collection || ""
    this.svg=params.svg || environment.appli+"/assets/musee.svg"
    if(!this.svg.startsWith("http"))this.svg=environment.appli+"/assets/"+this.svg
    this.api.canvas(this.svg).subscribe((r:any)=>{
      if(r.zone)this.zone_nft=r.zone
      this.svg_code=r.svg;
    })

    //Positionnement
    this.canvas=params.canvas || "./assets/canvas.svg"

    this.canChange=(environment.canChange=="true")
    if(params.hasOwnProperty("canChange"))this.canChange=params.canChange;


    if(this.collection.length>0){
      wait_message(this,"Chargement de la collection "+this.collection);
      this.api.get_nfts_from_collection(this.collection,this.network).subscribe((r)=>{
        wait_message(this)
        this.nfts=r.nfts;
        this.anim();
      })
    }else{
      this.address=params.address || params.miner || "";
      this.on_authen({provider: undefined, strong: false, address:this.address});
    }

    this.duration=params.duration || 3;


    this.quota=Number(params.quota || environment.quota || "10")
    this.showNfluentWalletConnect=(params.showNfluentWalletConnect=="true");

    showMessage(this,"Cliquer n'importe ou pour passer en plein écran",6000);

  }

  histo:number[]=[];
  anim(){
    let i=Math.trunc(Math.random()*this.nfts.length);
    if(this.histo.indexOf(i)==-1){
      this.update_nft(this.nfts[i]);
      this.histo.push(i);
      if(this.histo.length==this.nfts.length)this.histo=[];
      setTimeout(()=>{this.anim()},this.duration*1000);
    }
  }

  async on_authen($event: { strong: boolean; address: string; provider: any }) {
    if($event.address.length>0){
      this.showAuthent=false;
      showMessage(this,"Récupération de vos NFTs en cours");
      wait_message(this,"Chargement des NFTs")
      let r:any=await this.api.get_tokens_from("owner",$event.address,100,false,null,0,this.network)
      wait_message(this)
      if(r.result && r.result.length>=this.quota){
        this.address=$event.address;
        this.nfts=r.result;
        this.anim();
        this.api.get_account_settings(this.address).subscribe((r)=>{this.excludes_collections=r.exclude_from_gallery || [];})
      } else {
        showMessage(this,"Vous n'avez pas assez de NFT pour être exposé");
      }
    }
  }

  update_nft($event: NFT) {
    if(!$event)return false;
    let props="<table>"
    for(let a of $event.attributes){
      if(a.trait_type && a.value)props=props+"<tr><td>"+a.trait_type+"</td><td>"+a.value+"</td><tr>";
    }
    props=props+"</table>"
    this.svg=this.svg_code
    this.svg=this.svg.replace("{{visual}}",$event.visual).replace("{{NFT}}",$event.visual).replace("%7B%7Bvisual%7D%7D",$event.visual);
    this.svg=this.svg.replace("{{properties}}",props).replace("{{attributes}}",props)
    this.svg=this.svg.replace("{{title}}",$event.name).replace("{{name}}",$event.name)
    this.svg=this.svg.replace("{{description}}",$event.description)
    if($event.collection && $event.collection.name){
      this.svg=this.svg.replace("{{collection}}",$event.collection?.name)
    }
    for(let k of ["collection","title","description","properties","attributes","name","NFT","%7B%7Bvisual%7D%7D"]){
      this.svg=this.svg.replace("{{"+k+"}}","")
    }
    $$("Affichage de "+$event.visual)
    return true;
  }

  open_about() {
    this.router.navigate(["about"]);
  }

  open_full_screen(){
      enterFullScreen(this.document.documentElement)
  }

  ngAfterViewInit(): void {

  }
}
