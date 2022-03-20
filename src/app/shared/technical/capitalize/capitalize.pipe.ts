import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string | undefined): string | undefined {
    return value !== undefined ? value.charAt(0).toUpperCase() + value.slice(1) : undefined;
  }
}
