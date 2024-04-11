import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'traffic-light',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './traffic-light.component.html',
  styleUrl: './traffic-light.component.css'
})
export class TrafficLightComponent {
  @Input()
  state: number = 0;
  nextState(){
    this.state = (this.state + 1) % 4;
  }
  redColor(){
    this.state = 0;
  }
  redYellowColor(){
    this.state = 1;
  }
  yellowCollor(){
    this.state = 3;
  }
  greenColor(){
    this.state = 2;
  }
}
