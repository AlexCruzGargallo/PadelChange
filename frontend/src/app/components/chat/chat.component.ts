import { Component, OnInit } from '@angular/core';
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
  messageArray: Array<{ user: String; message: String }> = [];

  constructor(private _chatService: ChatService) {
    this._chatService
      .newUserJoined()
      .subscribe((data) => this.messageArray.push(data));
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

    this.chatsFiltered = await this.allChats.filter(async (a: any) => {
      a.members.includes(localStorage.getItem('userId'));
    });

    this.chatsFiltered.map((a: any) => {
      a.members.map(async (m: any) => {
        if (m != localStorage.getItem('userId')) {
          a.userTrade = await this.getUserData(m);
        }
      });
    });

    console.log('ROOM:', this.chatsFiltered[this.activeChat]._id);
    this._chatService.joinRoom({
      user: localStorage.getItem('userId'),
      room: this.chatsFiltered[this.activeChat]._id,
    });
  }
  sendMessage() {
    this._chatService.sendMessage({
      user: localStorage.getItem('userId'),
      room: this.chatsFiltered[this.activeChat]._id,
      message: this.messageText,
    });
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
}
