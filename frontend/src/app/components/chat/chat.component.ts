import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { io } from 'socket.io-client';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService],
})
export class ChatComponent implements OnInit {
  user: any = '';
  apiUrl: string = 'http://localhost:4000/api';
  allChats: any = [];
  chatsFiltered: any = [];
  activeChat = 0;
  messageText: string = '';
  search: string = '';
  messageArray: Array<{ user: String; message: String }> = [];

  constructor(
    private _chatService: ChatService,
    private actRoute: ActivatedRoute
  ) {
    this._chatService.newUserJoined().subscribe();
    this._chatService
      .newMessageRecieved()
      .subscribe((data) => this.messageArray.push(data));
  }
  async ngOnInit(): Promise<void> {
    let id = localStorage.getItem('userId');
    if (id) {
      this.user = await this.getUserData(id);
    }

    await this._chatService.setupSocketConnection();
    this.allChats = await this.getChats();

    this.chatsFiltered = this.allChats.filter((a: any) =>
      a.members.includes(localStorage.getItem('userId'))
    );

    console.log(this.chatsFiltered);

    this.chatsFiltered.map((a: any) => {
      a.members.map(async (m: any) => {
        if (m != localStorage.getItem('userId')) {
          a.userTrade = await this.getUserData(m);
        }
      });
    });

    const chatId = this.actRoute.snapshot.paramMap.get('id');

    if (chatId) {
      this.chatsFiltered.map((a: any, index: number) => {
        if (a._id == chatId) {
          this.activeChat = index;
        }
      });
    }
    this.chatsFiltered[this.activeChat].messages.map((m: any) => {
      this.messageArray.push({ user: m.author, message: m.body });
    });
    this._chatService.joinRoom({
      user: localStorage.getItem('userId'),
      room: this.chatsFiltered[this.activeChat]._id,
    });
  }

  sendMessage() {
    const body = {
      chat_id: this.chatsFiltered[this.activeChat]._id,
      author: localStorage.getItem('userId'),
      body: this.messageText,
      date: new Date(),
    };

    this.saveMessage(body);

    this._chatService.sendMessage({
      user: localStorage.getItem('userId'),
      room: this.chatsFiltered[this.activeChat]._id,
      message: this.messageText,
    });

    this.messageText = '';
  }

  onClickChat(i: number) {
    this._chatService.leaveRoom({
      user: localStorage.getItem('userId'),
      room: this.chatsFiltered[this.activeChat]._id,
    });
    this.activeChat = i;
    this._chatService.joinRoom({
      user: localStorage.getItem('userId'),
      room: this.chatsFiltered[this.activeChat]._id,
    });
    this.messageArray = [];
    this.chatsFiltered[this.activeChat].messages.map((m: any) => {
      this.messageArray.push({ user: m.author, message: m.body });
    });

    console.log(this.messageArray);
  }

  onSearchContact(contact: string) {
    this.search = contact;
  }

  public async getChats(): Promise<any> {
    const response = await fetch(`${this.apiUrl}/chat/`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { chats } = await response.json();

    if (!response.ok) {
      return Promise.reject();
    }
    return Promise.resolve(chats);
  }

  public async getUserData(id: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/users/${id}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { user } = await response.json();

    if (!response.ok) {
      return Promise.reject();
    }
    return Promise.resolve(user);
  }

  public async saveMessage(args: any): Promise<any> {
    const response: Response = await fetch(`${this.apiUrl}/chat/message/`, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(args),
    });

    const { user } = await response.json();

    if (!response.ok) {
      return Promise.reject();
    }
    return Promise.resolve(user);
  }
}
