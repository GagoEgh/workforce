import { Component, inject, Signal } from '@angular/core';
import { CandidateInterface } from '../../types/candidate.interface';
import { TaskInterface } from '../../types/task.interface';
import { ApiService } from '../../api.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({

  selector: 'app-candidates',
  imports: [],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss'
})
export class CandidatesComponent {
 
  private apiService = inject(ApiService)
  public candidates:Signal<CandidateInterface[] |undefined> = toSignal(this.apiService.getCandidates());
  public task:Signal<TaskInterface|undefined> = toSignal(this.apiService.getTask())

  constructor(){}

}
