import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timer',
})
export class TimerPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) return '00:00';

    let seconds = (value / 1000).toFixed(0);
    let milliseconds = ((value % 1000) / 10).toFixed(0);
    // @ts-ignore: Unreachable code error
    return (seconds < 10 ? '0' : '') + seconds + ':' + milliseconds;
  }
}
