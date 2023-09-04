// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  forum:"",
  company:"",
  mail:"contact@nfluent.io",
  version: "0.1 dev",
  server:"http://127.0.0.1:4242",
    appname:"The Public Gallery",
    quota:"1",
  visual:"./assets/musee2.jpg",
  claim:"Exposez vos NFTs",
  appli:"http://localhost:4200",
    background: "https://gallery.nfluent.io/assets/wood.jpg",
  wallet:"http://127.0.0.1:4200",
    canChange: "true",
    website:"https://nfluent.io",
    faqs:"{{domain_appli}}/assets/faqs.yaml",
    admin_password:"",

  merchant:{
    id:"BCR2DN4TYD4Z5XCR",
    name:"NFluenT",
    currency:"EUR",
    country:"FR",
    contact:"contact@nfluent.io",
    wallet:
        {
          token:"NFLUCOIN-4921ed",
          address:"erd1gkd6f8wm79v3fsyyklp2qkhq0eek28cnr4jhj9h87zwqxwdz7uwstdzj3m",
          network:"elrond-devnet",
          unity: "NfluCoint",
          bank: "nfluent: Z0FBQUFBQmtYUjJVbS1Uc0lpa2FTR2F0SnF4LW1HUHIzbHFKN2hCVmRPN3NRR1R3Wk4tUnhfcUxqUE9IQVdObzMxMHgtazhrT1hpWXVndENZallGNnI1Q2RTLVQ1N2d0TEQ2dHNmVlByV3B0RlR3SUMxejhKMHZUeVJ3NHl6dnNFNEIyZWk2eGZsS1hWU2FuQnljcGRDUEh4WFhSMTBRTFFLdHkxeTJuUjZxYWRRc1dVN2FqYlZzPQ==",
          title:"La banque de NFluent",
          refund: 5
        }
  },
    dictionnary:{
      "en":{
          "Wallet Connect : Flasher depuis xPortal pour afficher vos NFTs":"Wallet Connect : Flash from xPortal to expose your NFTs",
          "Cliquer n'importe ou pour passer en plein écran":"Click anywhere to switch fullscreen",
          "sur cet écran":"on this screen",
          "Exposez vos NFTs":"Show your NFTs",
          "Chargement de la collection":"Collection loading",
          "Vous n'avez pas assez de NFT pour être exposé":"You don't have enough NFT to be exposed"
      },
        "es":{
            "Wallet Connect : Flasher depuis xPortal pour afficher vos NFTs":"Wallet Connect: Flash desde xPortal para mostrar sus NFT",
            "Cliquer n'importe ou pour passer en plein écran":"Faceți clic oriunde pentru a accesa ecranul complet",
            "sur cet écran":"en esta pantalla",
            "Exposez vos NFTs":"Exponga sus NFT",
            "Chargement de la collection":"Cargando la colección",
            "Vous n'avez pas assez de NFT pour être exposé":"No tienes suficiente NFT para estar expuesto"
        },
        "ro":{
            "Wallet Connect : Flasher depuis xPortal pour afficher vos NFTs":"Wallet Connect: Flash de la xPortal pentru a vă afișa NFT-urile",
            "Cliquer n'importe ou pour passer en plein écran":"",
            "sur cet écran":"pe acest ecran",
            "Exposez vos NFTs":"Expuneți-vă NFT-urile",
            "Chargement de la collection":"Chargement de la collection",
            "Vous n'avez pas assez de NFT pour être exposé":"Nu ai suficient NFT pentru a fi expus"
        },
    }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
