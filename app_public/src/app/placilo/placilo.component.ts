import {Component, OnInit} from '@angular/core';
import {EnatakarPodatkiService} from '../enatakar-podatki.service';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from 'rxjs/operators';
import { Placilo, Kosarica } from '../placilo';

@Component({
  selector: 'app-placilo',
  templateUrl: './placilo.component.html',
  styleUrls: ['./placilo.component.css']
})
export class PlaciloComponent implements OnInit {
  constructor(public enatakarPodatkiStoritev: EnatakarPodatkiService,
              private pot: ActivatedRoute) {  }

  // title = 'placilo';
  // style = 'style_placilo.css';
  kosarica2 = {
    naslov: 'Košarica',
// produkti: dataJSON_placilo,
    skupaj: 'Skupaj',
  };
  placilo = {
    naslov: 'Plačilo',
    navodila: 'Prosimo, izpolnite spodnja polja.'
  };

  public placila: Kosarica[];
  public placilo2: Placilo;

  ngOnInit(): void {
    this.pot.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let idPlacila = params.get('idPlacila');
          return this.enatakarPodatkiStoritev.pridobiPlacilo(idPlacila);
        })
      ).subscribe((placila: Kosarica[]) => {
        this.placila = placila;
      });
    this.pot.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return this.enatakarPodatkiStoritev.pridobiPrvoPlacilo();
        })
      )
      .subscribe((placilo: Placilo) => {
        this.placilo2 = placilo;
      });
  }

}

