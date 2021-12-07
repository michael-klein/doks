import { BehaviorSubject } from "rxjs";

export class ValueSubject<T> extends BehaviorSubject<T> {
  public next(value: T): void {
    if (this.value !== value) {
      super.next(value);
    }
  }
}
