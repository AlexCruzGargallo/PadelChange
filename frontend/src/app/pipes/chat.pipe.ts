import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatFiltro',
})
export class ChatFiltroPipe implements PipeTransform {
  transform(value: any, search: string = ''): any {
    if (search.length === 0) {
      return value;
    }
    const filteredContacts = value.filter((chat: any) =>
      chat.userTrade.name.toLowerCase().includes(search.toLowerCase())
    );
    return filteredContacts;
  }
}
