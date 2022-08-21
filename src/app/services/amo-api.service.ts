import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AmoApiService {
  private token: string | null = null;

  constructor() {}

  set accessToken(token: string) {
    this.token = token;
  }
}
