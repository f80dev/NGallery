import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {NFT} from "../../nft";
import {apply_params, enterFullScreen, getParams, showMessage} from "../../tools";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {NetworkService} from "../network.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit,AfterViewInit {
  nfts: NFT[] = [];
  address:string="";
  network: string="";
  duration=3;
  size=80;
  collection: string="";
  showNfluentWalletConnect=true;
  visual: string="";
  nft_title:string="";
  canChange: boolean=true;
  quota: number=10
  background: string="";
  appname="";
  claim="";

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

    this.collection=params.collection || ""
    if(this.collection.length>0){
      this.api.get_nfts_from_collection(this.collection,this.network).subscribe((r)=>{
        this.nfts=r.nfts;
      })
    }else{
      this.address=params.address || params.miner || "";
      this.on_authen({provider: undefined, strong: false, address:this.address});
    }

    this.duration=params.duration || 3;
    this.canChange=((params.chanChange || environment.canChange)=="true")
    this.size=Number(params.size || "80")
    this.quota=Number(params.quota || environment.quota || "10")
    this.showNfluentWalletConnect=(params.showNfluentWalletConnect=="true");

    showMessage(this,"Cliquer n'importe ou pour passer en plein écran",6000);
  }


  async on_authen($event: { strong: boolean; address: string; provider: any }) {
    if($event.address.length>0){
      showMessage(this,"Récupération de vos NFTs en cours");
      let r:any=await this.api.get_tokens_from("owner",$event.address,100,false,null,0,this.network)
      if(r.result && r.result.length>=this.quota){
        this.address=$event.address;
        this.nfts=r.result;
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
