import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vowelRemover',
})
export class VowelRemoverPipe implements PipeTransform {
  #vowels = ['a', 'e', 'i', 'o', 'u'];

  transform(value: string, ...args: string[]): string {
    // O(q)
    args = args
      .map((char) => char.toLowerCase())
      .filter((char) => char.length === 1 && this.#vowels.includes(char));
    let newValue = '';

    // O(nv)
    for (let i = 0; i < value.length; i++) {
      if (!args.includes(value[i])) {
        newValue += value[i];
      }
    }

    return newValue;
  }
}
