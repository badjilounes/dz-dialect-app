import { OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';
import { isDefined } from '../functions/is-defined';

export function filterUndefinedValues<T>(): OperatorFunction<
  { [key: string]: T | undefined },
  { [key: string]: T }
> {
  return filter(areAllDefined);
}

function areAllDefined<T>(value: { [key: string]: T | undefined }): value is { [key: string]: T } {
  return Object.values(value).every(isDefined);
}
