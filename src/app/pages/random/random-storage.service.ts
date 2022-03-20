import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResponseSentences } from 'src/api';
import { StorageService } from 'src/app/shared/technical/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class RandomStorageService {
  private static SENTENCE_HISTORY_KEY = 'sentence-history';

  history$: BehaviorSubject<ResponseSentences[]> = new BehaviorSubject<ResponseSentences[]>(
    this.storage.tryGet(RandomStorageService.SENTENCE_HISTORY_KEY) || [],
  );

  constructor(private readonly storage: StorageService) {}

  add(sentence: ResponseSentences | undefined): void {
    if (sentence) {
      const history = this.history$.value;
      const newHistory = [...history, sentence];
      this.history$.next(newHistory);
      this.storage.set(RandomStorageService.SENTENCE_HISTORY_KEY, newHistory);
    }
  }

  clear() {
    this.history$.next([]);
    this.storage.clear();
  }
}
