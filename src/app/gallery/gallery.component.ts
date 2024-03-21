import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {NFT} from "../../nft";
import {$$, apply_params, enterFullScreen, getParams, setParams, showMessage} from "../../tools";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {NetworkService} from "../network.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DOCUMENT} from "@angular/common";
import {wait_message} from "../hourglass/hourglass.component";
import {Connexion, get_default_connexion} from "../../operation";
import {NgNavigatorShareService} from "ng-navigator-share";
import {TranslatePipe} from "../translate.pipe";

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
  authent_mode:Connexion=get_default_connexion("wallet_connect")
  collection_id: string="";
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
  svg=environment.appli+"/assets/canvas.svg";         //Code remplacé à chaque image
  zone_nft: any={left:"10%",top:"10%",size:"50vh"}
  svg_code="";   //Code originel
  params: any;
  direct_showqrcode: boolean=true;

  constructor(
      public routes:ActivatedRoute,
      public api:NetworkService,
      public router:Router,
      public toast:MatSnackBar,
      public translate:TranslatePipe,
      public ngShare:NgNavigatorShareService,
      @Inject(DOCUMENT) public document: any
  ) { }



  async initform() {
    this.params=await getParams(this.routes)
    apply_params(this,this.params,environment);

    this.animation=this.params.animation || "svg";
    this.collection_id=this.params.collection || ""
    if(typeof(this.collection_id)=="object")this.collection_id=this.collection_id["id"];
    this.svg=this.params.svg || environment.appli+"/assets/canvas.svg"

    if(!this.svg.startsWith("http"))this.svg=environment.appli+"/assets/"+this.svg
    $$("Récupération du fichier svg "+this.svg)
    this.api.canvas(this.svg,"100vw","100vh").subscribe((r:any)=>{
      if(r.zone)this.zone_nft=r.zone
      this.svg_code=r.svg;
    })

    this.canChange=(environment.canChange=="true")
    if(this.params.hasOwnProperty("canChange"))this.canChange=this.params.canChange;

    if(this.collection_id.length>0){
      this.showAuthent=false;
      wait_message(this,this.translate.transform("Chargement de la collection")+" "+this.collection_id);
      this.api.get_nfts_from_collection(this.collection_id,this.network).subscribe((r)=>{
        wait_message(this)
        this.nfts=r.nfts;
        this.anim();
      })
    }else{
      this.address=this.params.address || this.params.miner || "";
      this.on_authen({provider: undefined, strong: false, address:this.address});
    }

    this.duration=this.params.duration || 3;

    this.quota=Number(this.params.quota || environment.quota || "10")

    showMessage(this,this.translate.transform("Cliquer n'importe ou pour passer en plein écran"),6000);

  }

  histo:number[]=[];
  slide=1;
  anim(){
    let i=-1;
    let nft=null;
    for(let ntry=0;ntry<100;ntry++){
      let temp=Math.trunc(Math.random()*this.nfts.length);
      if(this.histo.indexOf(temp)==-1){
        i=temp;
        break;
      }
    }
    if(i>-1) {
      this.update_nft(this.nfts[i]);
      this.histo.push(i);
    }
    if(this.histo.length==this.nfts.length)this.histo=[];
    setTimeout(()=>{this.anim()},this.duration*1000);
  }

  async on_authen($event: { strong: boolean; address: string; provider: any }) {
    if($event.address.length>0){
      this.showAuthent=false;
      showMessage(this,this.translate.transform("Récupération de vos NFTs en cours sur ")+this.network);
      wait_message(this,this.translate.transform("Chargement des NFTs"))
      let r:any=await this.api.get_tokens_from("owner",$event.address,100,false,null,0,this.network)
      wait_message(this)
      if(r.result && r.result.length>=this.quota){
        this.address=$event.address;
        this.nfts=r.result;
        this.background=""
        this.anim();
        this.api.get_account_settings(this.address).subscribe((r)=>{this.excludes_collections=r.exclude_from_gallery || [];})
      } else {
        showMessage(this,this.translate.transform("Vous n'avez pas assez de NFT pour être exposé"));
        this.showAuthent=true
      }
    } else {
      showMessage(this,"Votre adresse n'est pas disponible")
    }
  }

  update_nft($event: NFT) {
    if(!$event)return false;
    this.svg=this.svg_code
    let i=1;
    for(let a of $event.attributes){
      if(a.trait_type && a.value){
        let label=a.trait_type+": "+a.value
        this.svg=this.svg.replace("{{prop"+i+"}}",label.substring(0,100))
        i=i+1;
      }
    }

    this.svg=this.svg.replace("{{visual}}",$event.visual).replace("{{NFT}}",$event.visual).replace("%7B%7Bvisual%7D%7D",$event.visual);
    this.svg=this.svg.replace("{{title}}",$event.name).replace("{{name}}",$event.name)
    this.svg=this.svg.replace("{{description}}",$event.description)
    if($event.collection && $event.collection.name){
      this.svg=this.svg.replace("{{collection}}",$event.collection!.name)
    }
    let to_clear=["collection","title","description","properties","attributes","name","NFT","%7B%7Bvisual%7D%7D"]
    for(let i=0;i<15;i++)to_clear.push("prop"+i);
    for(let k of to_clear){
      this.svg=this.svg.replace("{{"+k+"}}","")
    }
    $$("Affichage de "+$event.visual)
    return true;
  }

  open_about() {
    this.router.navigate(["about"],{queryParams:{p:setParams({
        appname:this.params.appname || environment.appname,
        version:this.params.version,
        website:this.params.website || environment.website,
        contact:this.params.contact,
        cgu:this.params.cgu,
          logo:this.params.logo || "https://nfluent.io/assets/logo.png",
          company:this.params.company,
    },"","")}});
  }

  open_full_screen(){
      enterFullScreen(this.document.documentElement)
  }

  ngAfterViewInit(): void {

  }

  switch_authent_mode() {
    if(this.authent_mode.nfluent_wallet_connect){
      this.direct_showqrcode=true;
      this.authent_mode=get_default_connexion()
    } else {
      this.direct_showqrcode=false;
      this.authent_mode=get_default_connexion()
    }
  }

  async open_share() {
    this.router.navigate(["share"])

  }

  ngOnInit(): void {
    setTimeout(()=>{this.initform()},200)
  }
}
