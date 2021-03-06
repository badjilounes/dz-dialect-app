import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  tryGet<T>(key: string): T | undefined {
    let value: T | undefined;
    const stored = localStorage.getItem(key);

    if (stored) {
      try {
        value = JSON.parse(stored);
      } catch {
        value = undefined;
      }
    }

    return value;
  }

  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  clear() {
    localStorage.clear();
  }
}
