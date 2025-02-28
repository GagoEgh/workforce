import { Component, input } from '@angular/core';
import { CandidateInterface } from '../../types/candidate.interface';
import { TaskInterface } from '../../types/task.interface';

@Component({
  selector: 'app-worker-table',
  imports: [],
  templateUrl: './worker-table.component.html',
  styleUrl: './worker-table.component.scss'
})
export class WorkerTableComponent {

  task = input<TaskInterface>();
  candidates = input<CandidateInterface[]>()
  public getWorkerColor(worker:CandidateInterface): string {
    if (worker.primarySkill === this.task()!.primarySkill) {
      return '#5AA454';
    } else if((new Date(worker.startDate).getTime() == new Date(this.task()!.startDate).getTime() &&
      new Date(worker.endDate).getTime() == new Date(this.task()!.endDate).getTime())){
      return 'orange';
    }else if (worker.secondarySkill === this.task()!.secondarySkill) {
      return '#C7B42C';
    } else {
      return '#A10A28';
    }
  }
}
