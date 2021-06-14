import { Component, OnInit } from '@angular/core';
import {EnatakarPodatkiService} from '../enatakar-podatki.service';
import { Ponudnik } from '../ponudnik';

@Component({
  selector: 'app-osn-zaslon',
  templateUrl: './osn-zaslon.component.html',
  styleUrls: ['./osn-zaslon.component.css']
})
export class OsnZaslonComponent implements OnInit {

  constructor(public enatakarPodatkiStoritev: EnatakarPodatkiService) { }

  glavaStrani = {
    title: 'eNatakar',
    style: 'styleIndex.css',
    moto: 'Prihodnost naročanja v vaših rokah!',
    navodila: 'Povprečna cena artiklov na menijih posameznih restavracij:'
  };
  public ponudnik: Ponudnik[];
  private pridobiPonudnika(): void {
    this.enatakarPodatkiStoritev
      .pridobiPonudnika()
      .then(najdeniPonudniki => this.ponudnik = najdeniPonudniki);
  }

  ngOnInit(): void {
    this.pridobiPonudnika();
  }

}

