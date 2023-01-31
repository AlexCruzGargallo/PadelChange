import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ChatService {
  socket: any = io('http://localhost:3000');

  constructor() {}

  setupSocketConnection() {
  }

  joinRoom(data: any) {
    this.socket.emit('join', data);
  }

  newUserJoined() {
    console.log('HOLAAA', this.socket);
    let observable = new Observable<{ user: String; message: String }>(
      (observer) => {
        this.socket.on('new user joined', (data: any) => {
          console.log('HOLAAA');
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );
    return observable;
  }

  sendMessage(data: any) {
    this.socket.emit('message', data);
  }

  newMessageRecieved(){
    let observable = new Observable<{ user: String; message: String }>(
        (observer) => {
          this.socket.on('new message', (data: any) => {
            console.log('HOLAAA');
            observer.next(data);
          });
          return () => {
            this.socket.disconnect();
          };
        }
      );
      return observable;
  }

  leaveRoom(data: any) {
    this.socket.emit('leave', data);
  }
}
