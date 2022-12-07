import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'racketFiltro',
})
export class RacketFiltroPipe implements PipeTransform {
  transform(value: any, page: number = 0, search: string = ''): any {
    if (search.length === 0) {
      return value.slice(page, page + 8);
    }
    const filteredRackets = value.filter((racket: { name: string }) =>
      racket.name.toLowerCase().includes(search.toLowerCase())
    );
    return filteredRackets.slice(page, page + 8);
  }
}
