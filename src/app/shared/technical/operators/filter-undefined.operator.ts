import { OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

export function filterUndefined<T>(): OperatorFunction<T | undefined, T> {
  return filter(isDefined);
}

function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}
