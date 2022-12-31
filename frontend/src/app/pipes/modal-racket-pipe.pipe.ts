import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modalRacketPipe',
})
export class ModalRacketPipePipe implements PipeTransform {
  transform(value: any, search: string = ''): any {
    const filteredRackets = value.filter((racket: { name: string }) =>
      racket.name.toLowerCase().includes(search.toLowerCase())
    );
    return filteredRackets;
  }
}
