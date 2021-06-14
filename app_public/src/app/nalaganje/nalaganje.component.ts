import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nalaganje',
  templateUrl: './nalaganje.component.html',
  styleUrls: ['./nalaganje.component.css']
})
export class NalaganjeComponent implements OnInit {

  constructor() { }
  glavaStrani = {
    title: "Obdelava naročila",
    naslov: 'Vaše naročilo je bilo uspešno oddano.',
    prosnja: 'Prosimo počakajte na potrditev ponudnika'
  }

  ngOnInit(): void {
  }

}
