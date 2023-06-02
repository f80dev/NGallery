import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {NFT} from "../../nft";
import {apply_params, enterFullScreen, getParams, showMessage} from "../../tools";
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
  animation="crossfade";
  duration=3;
  collection: string="";
  showNfluentWalletConnect=true;
  visual: string="";
  nft_title:string="";
  canChange: boolean=true;
  quota: number=10
  background: string="";
  appname="";
  claim="";
  excludes_collections: string[]=[];
  showAuthent: boolean=true;
  message="";
  private canvas: string="./assets/canvas.svg"

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

    this.animation=params.animation || "crossfade";
    this.collection=params.collection || ""

    //Positionnement
    this.canvas=params.canvas || "./assets/canvas.svg"


    this.canChange=(environment.canChange=="true")
    if(params.hasOwnProperty("canChange"))this.canChange=params.canChange;


    if(this.collection.length>0){
      wait_message(this,"Chargement de la collection "+this.collection);
      this.api.get_nfts_from_collection(this.collection,this.network).subscribe((r)=>{
        wait_message(this)
        this.nfts=r.nfts;
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
        this.api.get_account_settings(this.address).subscribe((r)=>{this.excludes_collections=r.exclude_from_gallery || [];})
      } else {
        showMessage(this,"Vous n'avez pas assez de NFT pour être exposé");
      }
    }
  }

  update_nft($event: NFT) {
    this.nft_title=$event.name;
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
