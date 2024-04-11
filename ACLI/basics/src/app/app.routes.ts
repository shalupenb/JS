import { Routes } from '@angular/router';
import { TrafficLightComponent } from './traffic-light/traffic-light.component';
import { CalcComponent } from './calc/calc.component';
import { HomeComponent } from './home/home.component';
import { CurrencyRatesComponent } from './currency-rates/currency-rates.component';
import { MoonComponent } from './moon/moon.component';
import { FormsComponent } from './forms/forms.component';

export const routes: Routes = [
    { path: "", title: "Home", component: HomeComponent },
    { path: "calc", title: "Calculator", component: CalcComponent },
    { path: "forms", title: "Calculator", component: FormsComponent },
    { path: "moon", title: "Moon Phase", component: MoonComponent },
    { path: "rates", title: "Rates", component: CurrencyRatesComponent },
    { path: "traffic", title: "Traffic Light", component: TrafficLightComponent }
];
