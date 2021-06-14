import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  constructor() { }

  naslov = 'Prijava';
  bottomText = 'Še nimate eNatakar računa?';
  registracija = 'Včlanite se!';

  ngOnInit(): void {
  }

}
