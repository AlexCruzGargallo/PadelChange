import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'racketFiltro',
})
export class RacketFiltroPipe implements PipeTransform {
  transform(
    value: any,
    page: number = 0,
    brand: string = '',
    search: string = '',
    sort: string = ''
  ): any {
    console.log(brand);
    console.log(search);

    switch (sort) {
      case 'No ordenar': {
        value = value.sort((a: { name: string }, b: { name: string }) =>
          a.name < b.name ? -1 : 1
        );
        break;
      }
      case 'priceasc': {
        value = value.sort((a: { price: number }, b: { price: number }) =>
          a.price > b.price ? -1 : 1
        );
        //statements;
        break;
      }
      case 'pricedesc': {
        value = value.sort((a: { price: number }, b: { price: number }) =>
          a.price < b.price ? -1 : 1
        );
        //statements;
        break;
      }
      case 'nameasc': {
        value = value.sort((a: { name: string }, b: { name: string }) =>
          a.name < b.name ? -1 : 1
        );
        //statements;
        break;
      }
      case 'namedesc': {
        value = value.sort((a: { name: string }, b: { name: string }) =>
          a.name > b.name ? -1 : 1
        );
        //statements;
        break;
      }
      case 'season': {
        value = value.sort((a: { season: number }, b: { season: number }) =>
          a.season > b.season ? -1 : 1
        );
        //statements;
        break;
      }
      case 'rating': {
        value = value.sort(
          (a: { ovr_rating: number }, b: { ovr_rating: number }) =>
            a.ovr_rating > b.ovr_rating ? -1 : 1
        );
        //statements;
        break;
      }
      default: {
        //statements;
        break;
      }
    }

    //filtro por marca
    if (brand !== 'Sin filtrar') {
      let filteredRacketsBrand = value.filter(
        (racket: { brand: string }) => racket.brand == brand
      );
      console.log(filteredRacketsBrand);
      filteredRacketsBrand = filteredRacketsBrand.filter(
        (racket: { name: string }) =>
          racket.name.toLowerCase().includes(search.toLowerCase())
      );
      return filteredRacketsBrand.slice(page, page + 8);
    }

    //filtro por busqueda
    if (search.length === 0) {
      return value.slice(page, page + 8);
    }
    //filtro por busqueda
    const filteredRackets = value.filter((racket: { name: string }) =>
      racket.name.toLowerCase().includes(search.toLowerCase())
    );
    return filteredRackets.slice(page, page + 8);
  }
}
