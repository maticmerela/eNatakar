import { Component, OnInit } from '@angular/core';
import { EnatakarPodatkiService } from '../enatakar-podatki.service';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from 'rxjs/operators';
import { Artikel } from '../artikel';

@Component({
  selector: 'app-menu-ponudnik',
  templateUrl: './menu-ponudnik.component.html',
  styleUrls: ['./menu-ponudnik.component.css']
})
export class MenuPonudnikComponent implements OnInit {

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
  /*
  private pridobiArtikel(): void {
    this.enatakarPodatkiStoritev
      .pridobiArtikel()
      .then(najdeniArtikli => this.artikel = najdeniArtikli);
  }
  */

  public potrebenid = '';

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
  }
  goTo(location: string): void {
    window.location.hash = '';
    window.location.hash = location;
  }
}
