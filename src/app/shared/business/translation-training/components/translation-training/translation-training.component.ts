import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { provideComponentStore } from '@ngrx/component-store';
import { map, Observable, shareReplay } from 'rxjs';
import { SentenceDTO } from 'src/clients/dz-dialect-api';
import { TranslationTrainingLanguage } from '../../models/translation-training-language';
import { TranslationTrainingResult } from '../../models/translation-training-result';
import { TranslationTrainingStore } from '../../store/translation-training.store';

@Component({
  selector: 'app-translation-training',
  templateUrl: './translation-training.component.html',
  styleUrls: ['./translation-training.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideComponentStore(TranslationTrainingStore)],
})
export class TranslationTrainingComponent implements OnChanges {
  @Input() skipTraining = false;
  @Input() sentences: SentenceDTO[] = [];
  @Input() language: TranslationTrainingLanguage = { propositions: 'fr', response: 'dz' };

  @Output() trainingEnded: EventEmitter<TranslationTrainingResult> =
    new EventEmitter<TranslationTrainingResult>();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly trainingStore: TranslationTrainingStore,
  ) {
    this.trainingEnded = this.trainingStore.trainingEnded;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sentences']) {
      this.trainingStore.initTraining([...this.sentences], this.language);
    }
  }
}
