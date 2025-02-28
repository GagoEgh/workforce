import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CandidateInterface } from './types/candidate.interface';
import { map, Observable } from 'rxjs';
import { TaskInterface } from './types/task.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient)
  constructor() { }
  
  getCandidates():Observable<CandidateInterface[]>{
    return this.http.get<CandidateInterface[]>('json/candidates.json')
      .pipe(map((response:any)=>response.candidates))
  }

  getTask():Observable<TaskInterface>{
    return this.http.get<TaskInterface>('json/task.json')
  }
}
