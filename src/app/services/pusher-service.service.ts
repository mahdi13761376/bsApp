import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class PusherServiceService {
  presenceChannel;

  constructor(public http: HttpClient) {
    let pusher = new Pusher('0637c27faa22b112d96c', {
      cluster: 'ap2',
    });

    this.presenceChannel = pusher.subscribe('test');
  }

  public init() {
    return this.presenceChannel;
  }
}