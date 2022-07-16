import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { BuyMeACoffeeService } from 'src/app/core/buy-me-a-coffee/buy-me-a-coffee.service';
import { SentenceDTO } from 'src/clients/dz-dialect-api';
import { TranslationTrainingCancelEvent } from '../../models/translation-training-cancel-event';
import { TranslationTrainingEndEvent } from '../../models/translation-training-end-event';
import { TranslationTrainingLanguage } from '../../models/translation-training-language';
import { TranslationTrainingStepChangeEvent } from '../../models/translation-training-step-change-event';
import { TranslationTrainingStore } from '../../store/translation-training.store';

@Component({
  selector: 'app-translation-training',
  templateUrl: './translation-training.component.html',
  styleUrls: ['./translation-training.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TranslationTrainingStore],
})
export class TranslationTrainingComponent implements OnInit, OnChanges, OnDestroy {
  @Input() sentences: SentenceDTO[] = [];
  @Input() language: TranslationTrainingLanguage = { propositions: 'fr', response: 'dz' };

  @Input() skipTraining = false;

  @Output() stepChanged: EventEmitter<TranslationTrainingStepChangeEvent> =
    new EventEmitter<TranslationTrainingStepChangeEvent>();
  @Output() trainingCanceled: EventEmitter<TranslationTrainingCancelEvent> =
    new EventEmitter<TranslationTrainingCancelEvent>();
  @Output() trainingEnded: EventEmitter<TranslationTrainingEndEvent> =
    new EventEmitter<TranslationTrainingEndEvent>();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly trainingStore: TranslationTrainingStore,
    private readonly buyMeACoffeeService: BuyMeACoffeeService,
  ) {
    this.stepChanged = this.trainingStore.stepChanged;
    this.trainingCanceled = this.trainingStore.trainingCanceled;
    this.trainingEnded = this.trainingStore.trainingEnded;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sentences']) {
      this.trainingStore.initTraining([...this.sentences], this.language);
    }
  }

  ngOnInit(): void {
    this.buyMeACoffeeService.updatePosition({ bottom: 108 });
  }

  ngOnDestroy(): void {
    this.buyMeACoffeeService.resetPosition();
  }
}
