/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnatakarZunanjeOceneService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'https://app.reviewapi.io/api/v1/reviews?apikey=347aeb50-3ee5-11eb-99fc-9911387768cd&url=https%3A%2F%2Fwww.tripadvisor.com%2F';

  public pridobiLokacije(): Promise<Ocene[]> {
    const web: string = 'Restaurant_Review-g274873-d1098521-Reviews-Azur_tratorija_s_picami-Ljubljana_Upper_Carniola_Region.html';
    const stevilo: number = 2;
    const url: string = `${this.apiUrl}&url=https%3A%2F%2F${web}&amount=${stevilo}`;
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as Ocene[])
      .catch(this.obdelajNapako);
  }

  private obdelajNapako(napaka: any): Promise<any> {
    console.error('Prišlo je do napake', napaka);
    return Promise.reject(napaka.message || napaka);
  }
}

// {"query":{"apikey":"347aeb50-3ee5-11eb-99fc-9911387768cd","url":"https:\/\/www.tripadvisor.com\/Restaurant_Review-g274873-d1098521-Reviews-Azur_tratorija_s_picami-Ljubljana_Upper_Carniola_Region.html","amount":"2"},"reviews":[{"platform":"tripadvisor.com","rating":5,"user_name":"saraU5209KZ","text":"Their pizzas no matter what topping or flavor they have, never disappoint. I love how they use fresh ingredients. 10\/10","title":"Best pizza in town!","timestamp":"2020-11-19","platform_specific":[]},{"platform":"tripadvisor.com","rating":5,"user_name":"saraU5209KZ","text":"One of the best and coziest restaurants I have ever been to. Their spectacular pizzas, which are always made with fresh ingredients, are always worth the wait because of how delicious they are. As for their pasta, the softness and sauces never disappoint. Throughout your...entire stay, the staff is very kind and polite. I highly recommend any person to come here with their families, and friends. This is a perfect restaurant for smaller birthdays or other celebrations. Prices are a bit above average however the food is entirely worth it!More","title":"Top Restaurant","timestamp":"2020-10-17","platform_specific":[]}]}
*/
