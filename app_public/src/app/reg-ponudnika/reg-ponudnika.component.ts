import { Component, OnInit } from '@angular/core';
import { EnatakarPodatkiService } from '../enatakar-podatki.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-reg-ponudnika',
  templateUrl: './reg-ponudnika.component.html',
  styleUrls: ['./reg-ponudnika.component.css']
})
export class RegPonudnikaComponent implements OnInit {

  constructor(public enatakarPodatkiStoritev: EnatakarPodatkiService, private router: Router) { }

  naslov = 'Registracija gostinskega obrata';
  uporabnik = 'Podatki o uporabniku';
  obrat = 'Podatki o gostinskem obratu';

  public novPonudnik = {
    ime: '',
    priimek: '',
    uporabniskoIme: '',
    geslo: '',
    obrat: '',
    tipKuhinje: '',
    ulica: '',
    hisnaSt: '',
    zip: 1000,
    obcina: ''
  };

  public obrazecNapaka: string;

  private soPodatkiUstrezni(): boolean {
    if (this.novPonudnik.ime && this.novPonudnik.priimek && this.novPonudnik.uporabniskoIme && this.novPonudnik.geslo && this.novPonudnik.obrat && this.novPonudnik.tipKuhinje && this.novPonudnik.ulica && this.novPonudnik.hisnaSt && this.novPonudnik.zip && this.novPonudnik.obcina) {
      return true;
    } else {
      return false;
    }
  }

  public dodajNovegaPonudnika(): void {
    this.obrazecNapaka = "";
    if (this.soPodatkiUstrezni()) {
      this.enatakarPodatkiStoritev
        .dodajPonudnika(this.novPonudnik)
        .then(ponudnik => {
          console.log("Ponudnik shranjen", ponudnik);
          this.router.navigate(['/']);
        })
        .catch(napaka => this.obrazecNapaka = napaka);
    } else {
      this.obrazecNapaka = "Zahtevani so vsi podatki, prosim poskusite ponovno!";
    }
  }

  ngOnInit(): void {
  }

}
