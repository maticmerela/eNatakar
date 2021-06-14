import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EnatakarPodatkiService } from './enatakar-podatki.service';
// import { AppComponent } from './app.component';
import { OsnZaslonComponent } from './osn-zaslon/osn-zaslon.component';
import { OgrodjeComponent } from './ogrodje/ogrodje.component';
import { NalaganjeComponent } from './nalaganje/nalaganje.component';
import { VnosHraneComponent } from './vnos-hrane/vnos-hrane.component';
import { GrafComponent } from './graf/graf.component';
import { MenuStrankaComponent } from './menu-stranka/menu-stranka.component';
import { MenuPonudnikComponent } from './menu-ponudnik/menu-ponudnik.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegPonudnikaComponent } from './reg-ponudnika/reg-ponudnika.component';
import { RegClanaComponent } from './reg-clana/reg-clana.component';
import { SprejetoComponent } from './sprejeto/sprejeto.component';
import { AlergeniPipe } from './alergeni.pipe';
import { ZvezdicePipe } from './zvezdice.pipe';
import { PlaciloComponent } from './placilo/placilo.component';
import { NarocilaComponent } from './narocila/narocila.component';
import { KosaricaComponent } from './kosarica/kosarica.component';
import { PrazenNizPipe } from './prazen-niz.pipe';
import { ReplacePipe } from './replace.pipe';
import { DbComponent } from './db/db.component';
import { VremePodatkiService } from './vreme-podatki.service';


@NgModule({
  declarations: [
    OsnZaslonComponent,
    OgrodjeComponent,
    NalaganjeComponent,
    VnosHraneComponent,
    GrafComponent,
    MenuStrankaComponent,
    MenuPonudnikComponent,
    PrijavaComponent,
    RegPonudnikaComponent,
    RegClanaComponent,
    SprejetoComponent,
    AlergeniPipe,
    ZvezdicePipe,
    PlaciloComponent,
    NarocilaComponent,
    KosaricaComponent,
    PrazenNizPipe,
    ReplacePipe,
    DbComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: OsnZaslonComponent
      }, {
        path: 'nalaganje',
        component: NalaganjeComponent
      }, {
        path: ':idPonudnika/vnoshrane',
        component: VnosHraneComponent
      }, {
        path: 'osnovno/:idPonudnika/menu',
        component: MenuStrankaComponent
      }, {
        path: 'osnovno/:idPonudnika/menuPonudnik',
        component: MenuPonudnikComponent
      }, {
        path: 'prijava',
        component: PrijavaComponent
      }, {
        path: 'regclana',
        component: RegClanaComponent
      }, {
        path: 'regponudnika',
        component: RegPonudnikaComponent
      }, {
        path: 'sprejeto',
        component: SprejetoComponent
      }, {
      path: 'placilo/:idPlacila',
        component: PlaciloComponent
      }, {
        path: 'narocila',
        component: NarocilaComponent
      }, {
        path: ':idPlacila/kosarica',
        component: KosaricaComponent
      }, {
        path: 'db',
        component: DbComponent
      }
    ])
  ],
  providers: [EnatakarPodatkiService, VremePodatkiService],
  bootstrap: [OgrodjeComponent]
})
export class AppModule { }
