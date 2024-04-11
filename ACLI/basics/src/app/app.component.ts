import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = 'basics';
  _titleClickCnt: number = 0;
  _title: string = this.title;

  currentIndex: number = 0;
  initialState: number = 2;

  constructor(public router: Router){}

  uppercaseTitle() {                    // Якщо true, то здійснюється
    var newText = "";
    var allUpperCase = true;
    for (var i = 0; i < this.title.length; i++) {
      var char = this.title.charAt(i);
      if (i === this.currentIndex) {
        newText += char.toUpperCase();
      } else {
        newText += char;
        if (char !== char.toUpperCase()) {
          allUpperCase = false;
        }
      }
    }
    this.title = newText;
    this.currentIndex = (this.currentIndex + 1) % this.title.length;

    if (allUpperCase) {
      newText += '!';
      this.title = newText;
    }
  }

  ///// второй вариант с Tittle
  textUpper() {
    this._titleClickCnt++;
    this.title =
      [ ...this._title]
        .slice(0, this._titleClickCnt)
        .map(c => c.toUpperCase())
        .join('') + (
          (this._titleClickCnt <= this._title.length)
          ? this.title.substring(this._titleClickCnt, this._title.length)
          : "!".repeat(this._titleClickCnt - this._title.length));
  }
  //////////////

  resetClick(){
    this.initialState = 2;
  }
}
