import { OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';
import { isDefined } from '../functions/is-defined';

export function filterUndefined<T>(): OperatorFunction<T | undefined, T> {
  return filter(isDefined);
}
