import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-currency-rates',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './currency-rates.component.html',
  styleUrl: './currency-rates.component.css'
})
export class CurrencyRatesComponent {
  searchControl = new FormControl('');
  searchClick(){
    console.log(this.searchControl.value);
    if(!this.searchControl.value){
      this.shownRates = this.rates;
    }
    else
    {
    this.shownRates = this.rates.filter(r=> 
      r.cc.toLocaleLowerCase().includes(this.searchControl.value!.toLocaleLowerCase()))
    }
  };

  nbuUrl = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
  rates: Array<NbuRate> = []; // массив данних про курси, початково порожній
  shownRates: Array<NbuRate> =[];
  
  
  hashes: Array<Hash> = [];
  title: string = "";
  //Інжекція - запит на використання сервісу у провайдерив (див. app.config.ts)
  // Найбільш традиційна форма інжекціі - через конструктор обьекту.
  // Це , зоакрема унеможливлює створення обькту без передачі йому сервісу.
  constructor(private http: HttpClient) { // cинтаксис Оголошеня поля через конструктор.....
    // .... тому цей http доступний не як параметр "http", а як поле "this.http"
    this.http.get<Array<NbuRate>>(this.nbuUrl).subscribe(data => this.rates = this.shownRates = data);
    this.http.get("https://localhost:7022/Home/Ioc?format=json")
      .subscribe((data: any) => {
        this.hashes = Object.keys(data.hashes).map(k => {
          return { input: k, digest: data.hashes[k] } as Hash;
        });
        this.title = data.title;
      });
  }
}
/* Інтерфейс даних, що одержуються з ASP */
interface Hash {
  input: string,
  digest: string
}
// Інтерфейс для типізаціі данних, що одержується по API
interface NbuRate {
  r030: number,
  txt: string,
  rate: number,
  cc: string,
  exchangedate: string
}