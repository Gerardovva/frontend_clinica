import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private storage!: Storage;
  constructor() {
    this.storage = localStorage;
  }


  set(name: string, value: string): void {
    this.storage.setItem(name, value);
  }

  get(name: string): any {
    return this.storage.getItem(name);
  }

  remove(name: string): void {
    this.storage.removeItem(name);
  }




}