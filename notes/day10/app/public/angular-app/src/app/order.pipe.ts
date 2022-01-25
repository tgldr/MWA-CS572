import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'order',
})
export class OrderPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    const digit = value % 10;
    let suffix = 'th';

    switch (digit) {
      case 1:
        suffix = 'st';
        break;
      case 2:
        suffix = 'nd';
        break;
      case 3:
        suffix = 'rd';
        break;
    }
    return value + suffix + ' ' + args[0];
  }
}
