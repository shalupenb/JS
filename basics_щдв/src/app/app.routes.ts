import { Routes } from '@angular/router';
import { CurrencyRatesComponent } from './currency-rates/currency-rates.component'; 


export const routes: Routes = [
  {path: "rates", title: "Currency Rates", component: CurrencyRatesComponent}
];
