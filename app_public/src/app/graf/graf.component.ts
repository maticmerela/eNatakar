
import {Component, OnInit} from '@angular/core';
import {VremePodatkiService} from '../vreme-podatki.service';
import {Chart} from 'chart.js';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap} from '@angular/router';


@Component({
  selector: 'app-graf',
  templateUrl: './graf.component.html',
  styleUrls: ['./graf.component.css']
})
export class GrafComponent implements OnInit {

  chart = [];
  public graf: Graf[];

  constructor(public vremePodatkiStoritev: VremePodatkiService,
              private pot: ActivatedRoute) {
  }
  // public graf: Graf[];
  //
  // private pridobiPodatkeGraf(): void {
  //   this.enatakarPodatkiStoritev
  //     .pridobiPodatkeGraf()
  //     .then(najdeniPodatkiGraf => this.graf = najdeniPodatkiGraf);
  // }
  //
  // ngOnInit(): any {
  //   this.vremePodatkiStoritev.podatkiCena()
  //     .subscribe(res => {
  //       console.log(res);
  //     });
  // }
  ngOnInit(): void {
    this.pot.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const idPonudnika = params.get('idPonudnika');
          return this.vremePodatkiStoritev.pridobiArtikelGraf(idPonudnika);
        })
      )
      .subscribe((graf: Graf[]) => {
        this.graf = graf;
        graf.forEach((naziv) => {
          console.log(naziv);
        });
      });
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Foculus', 'Azur'],
        datasets: [{
          label: '# of Votes',
          data: [8.9, 11.2],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
export class Graf {
  naziv: string;
  cena: number;
}



