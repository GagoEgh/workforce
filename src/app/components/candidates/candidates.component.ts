import { Component, effect, inject, Signal } from '@angular/core';
import { CandidateInterface } from '../../types/candidate.interface';
import { TaskInterface } from '../../types/task.interface';
import { ApiService } from '../../api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { WorkerTimeLineComponent } from '../worker-time-line/worker-time-line.component';
import { WorkerTableComponent } from '../worker-table/worker-table.component';

@Component({
  selector: 'app-candidates',
  imports: [ WorkerTimeLineComponent, WorkerTableComponent ],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss'
})
export class CandidatesComponent{
  private apiService = inject(ApiService)
  private candidatesSingnal:Signal<CandidateInterface[] |undefined> = toSignal(this.apiService.getCandidates());

  public candidates!:CandidateInterface[]|undefined;
  public task:Signal<TaskInterface|undefined> = toSignal(this.apiService.getTask())
  public single:Array<{value:number,name:string}> = [];

  constructor(){
    effect(()=>{
      this.candidates = this.candidatesSingnal();
      const task = this.task();
      if(this.candidates && task){
        this.candidates = this.sortedCandidates(task,this.candidates)
        this.pushInSingle(this.candidates)
      }
    })
  }

  private sortedCandidates(task:TaskInterface,candidates:CandidateInterface[]):CandidateInterface[]{
    let primary:CandidateInterface[] =[];
    let timeWorkers:CandidateInterface[] = [];
    let secondSkills:CandidateInterface[]=[];
    let workers:CandidateInterface[]=[];

    candidates.forEach((worker:CandidateInterface)=>{
      if (worker.primarySkill === task.primarySkill) {
        primary.push(worker)
      } else if((new Date(worker.startDate).getTime() === new Date(task.startDate).getTime() &&
        new Date(worker.endDate).getTime() === new Date(task.endDate).getTime())){
        timeWorkers.push(worker)
      }else if (worker.secondarySkill === task.secondarySkill) {
        secondSkills.push(worker)
      } else {
        workers.push(worker)
      }
    });

    return [...primary, ...timeWorkers, ...secondSkills, ...workers];
  }

  private pushInSingle(sortCandidate:CandidateInterface[]):void{
    this.single = [];
    sortCandidate.forEach((item)=>{
      const start = new Date(item.startDate).getTime();
      const end = new Date(item.endDate).getTime();
      const day = (Math.abs(end-start))/(24*60*60*1000)
      this.single.push({name:item.nameSurname, value:day})
    })
  }

}
