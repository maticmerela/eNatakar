import { Component, OnInit } from '@angular/core';
import { EnatakarPodatkiService } from '../enatakar-podatki.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-reg-clana',
  templateUrl: './reg-clana.component.html',
  styleUrls: ['./reg-clana.component.css']
})
export class RegClanaComponent implements OnInit {

  constructor(public enatakarPodatkiStoritev: EnatakarPodatkiService, private router: Router) { }

  public novUporabnik = {
    ime: '',
    priimek: '',
    uporabniskoIme: '',
    geslo: ''
  };

  public obrazecNapaka: string;

  private soPodatkiUstrezni(): boolean {
    if (this.novUporabnik.ime && this.novUporabnik.priimek && this.novUporabnik.uporabniskoIme && this.novUporabnik.geslo) {
      return true;
    } else {
      return false;
    }
  }


  public dodajNovegaUporabnika(): void {
    this.obrazecNapaka = "";
    if (this.soPodatkiUstrezni()) {
      this.enatakarPodatkiStoritev
        .dodajUporabnika(this.novUporabnik)
        .then(uporabnik => {
          console.log("Uporabnik shranjen", uporabnik);
          this.router.navigate(['/']);
        })
        .catch(napaka => this.obrazecNapaka = napaka);
    } else {
      this.obrazecNapaka = "Zahtevani so vsi podatki, prosim poskusite ponovno!";
    }
  }



  naslov = 'Registracija';

  ngOnInit(): void {
  }

}
