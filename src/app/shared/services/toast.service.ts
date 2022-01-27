import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum ToastType {
  SUCCESS = 'toast__success',
  ERROR = 'toast__error',
  INFO = 'toast__info',
}
export interface Toast {
  message: string;
  type: ToastType;
}
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public notification$: Subject<Toast> = new Subject();
  constructor() {}
}
