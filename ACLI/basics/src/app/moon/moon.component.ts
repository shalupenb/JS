import { HttpClient } from '@angular/common/http';
import { Component, Sanitizer } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-moon',
  standalone: true,
  imports: [],
  templateUrl: './moon.component.html',
  styleUrl: './moon.component.css'
})
export class MoonComponent {
  todayMoonPhase: MoonPhase = {};
  url = "https://www.icalendar37.net/lunar/api/?year=2024&month=4&shadeColor=gray&size=150&texturize=true&day=10"
  trustedSvg: SafeHtml = "";
  toTrusted: Function;
  phases: Array<MoonPhase> = [];
  displayPhases: Array<MoonPhase> = [];
  inputDate;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    this.toTrusted = sanitizer.bypassSecurityTrustHtml;
    let today = new Date();
    this.inputDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;

    this.http.get(this.url).subscribe((obj: any) => {
      // ( "1": {.1.}, "2": {.2.}, "3": {.3.}, ... } -- > [{.1.}, {.2.}, {.3.}, ...]
      this.phases =
        Object.keys(obj.phase)      // ["1", "2", "3", ...]
          .map(k => obj.phase[k]);  // [{.1.}, {.2.}, {.3.}, ...]
      this.todayMoonPhase = this.phases[2 - 1]; 
      let day = today.getDate();
      this.displayPhases = [this.phases[day-2], this.phases[day-1], this.phases[day]];
      this.trustedSvg = sanitizer.bypassSecurityTrustHtml(this.todayMoonPhase.svg!);
    });
  }
  dateChange(event:any){
    console.log(event.target.value);
    this.inputDate = event.target.value;
  }
}

interface MoonPhase {
  phaseName?: string,
  isPhaseLimit?: number | false,
  lighting?: number,
  svg?: string,
  svgMini?: string | false,
  timeEvent?: string | false,
  dis?: number,
  dayWeek?: number,
  npWidget?: string
}