import { Component, OnInit } from '@angular/core';
import { EnatakarPodatkiService } from '../enatakar-podatki.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Artikel } from '../artikel';
import { Placilo } from "../placilo";

@Component({
  selector: 'app-menu-stranka',
  templateUrl: './menu-stranka.component.html',
  styleUrls: ['./menu-stranka.component.css']
})
export class MenuStrankaComponent implements OnInit {

  constructor(public enatakarPodatkiStoritev: EnatakarPodatkiService,
              private pot: ActivatedRoute) { }

  // title = 'Menu'
  // style = 'styleMenu.css'
  glavaStrani = {
    // naslov: 'Bisto Satem',
    podnaslov: 'Prepustite razvajanje svojih brbončic in dovolite da Vas popeljemo na kulinarično popotovanje',
    ocena: '4'
  };

  mostPopular = {
    keyword: 'Najbolj priljubljene jedi',
    // artikel: dataJSON_menu
  };

  menuVse = {
    keyword: 'Menu',
  };
  public artikel: Artikel[];
  public placilo: Placilo;
  public potrebenid = '';


  // private pridobiArtikel(): void {
  //   const idPonudnika: string = this.artikel._id;
  //   this.enatakarPodatkiStoritev
  //     .pridobiArtikel(idPonudnika)
  //     .then(najdeniArtikli => this.artikel = najdeniArtikli);
  // }



  ngOnInit(): void {
    this.pot.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let idPonudnika = params.get('idPonudnika');
          this.potrebenid = idPonudnika;
          return this.enatakarPodatkiStoritev.pridobiArtikel(idPonudnika);
        })
      )
      .subscribe((artikel: Artikel[]) => {
        this.artikel = artikel;
      });

    this.pot.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return this.enatakarPodatkiStoritev.pridobiPrvoPlacilo();
        })
      )
      .subscribe((placilo: Placilo) => {
        this.placilo = placilo;
      });
  }
  goTo(location: string): void {
    window.location.hash = '';
    window.location.hash = location;
  }

}




