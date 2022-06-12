import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from 'src/app/shared/technical/storage/storage.service';
import { SentenceDTO } from 'src/clients/dz-dialect-api';

@Injectable({
  providedIn: 'root',
})
export class HistoryStorageService {
  private static SENTENCE_HISTORY_KEY = 'sentence-history';

  history$: BehaviorSubject<SentenceDTO[]> = new BehaviorSubject<SentenceDTO[]>(
    this.storage.tryGet(HistoryStorageService.SENTENCE_HISTORY_KEY) || [],
  );

  constructor(private readonly storage: StorageService) {}

  add(sentence: SentenceDTO | undefined): void {
    if (sentence) {
      const history = this.history$.value;
      const newHistory = [...history, sentence];
      this.history$.next(newHistory);
      this.storage.set(HistoryStorageService.SENTENCE_HISTORY_KEY, newHistory);
    }
  }

  clear() {
    this.history$.next([]);
    this.storage.set(HistoryStorageService.SENTENCE_HISTORY_KEY, []);
  }
}
