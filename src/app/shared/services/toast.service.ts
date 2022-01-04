import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public notification$: Subject<string> = new Subject();
  constructor() {}
}
