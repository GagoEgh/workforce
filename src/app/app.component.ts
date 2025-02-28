import { Component } from '@angular/core';
import { CandidatesComponent } from './components/candidates/candidates.component';


@Component({
  selector: 'app-root',
  imports: [CandidatesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
