import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sprejeto',
  templateUrl: './sprejeto.component.html',
  styleUrls: ['./sprejeto.component.css']
})
export class SprejetoComponent implements OnInit {

  constructor() { }

  naslov = 'Vaše naročilo je bilo sprejeto!';
  zahvala = 'Hvala, ker ste za pomoč izbrali eNatakar.';
  racun = 'Svoj račun lahko prenesete s klikom na spodnji gumb:';

  ngOnInit(): void {
  }

}
