import { EventEmitter, Injectable } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, tap } from 'rxjs';
import { SentenceDTO } from 'src/clients/dz-dialect-api';
import { TranslationTrainingEndEvent } from '../models/translation-training-end-event';
import { TranslationTrainingLanguage } from '../models/translation-training-language';
import { EMPTY_RESULT, TranslationTrainingResult } from '../models/translation-training-result';
import { EMPTY_STEP, TranslationTrainingStep } from '../models/translation-training-step';
import { TranslationTrainingStepChangeEvent } from '../models/translation-training-step-change-event';

type TranslationTrainingState = {
  sentences: SentenceDTO[];
  step: TranslationTrainingStep;
  result: TranslationTrainingResult;
  language: TranslationTrainingLanguage;
  isLoading: boolean;
};

@Injectable()
@UntilDestroy()
export class TranslationTrainingStore extends ComponentStore<TranslationTrainingState> {
  readonly step$: Observable<TranslationTrainingStep> = this.select((state) => state.step);
  readonly result$: Observable<TranslationTrainingResult> = this.select((state) => state.result);
  readonly sentences$: Observable<SentenceDTO[]> = this.select((state) => state.sentences);
  readonly note$: Observable<number> = this.select((state) => state.result.note);
  readonly isLoading$: Observable<boolean> = this.select((state) => state.isLoading);

  readonly progress$: Observable<number> = this.select(
    (state) => ((state.step.index + 1) * 100) / state.sentences.length,
  );
  readonly isResponseCorrect$: Observable<boolean> = this.select((state) =>
    this.isResponseCorrect(state.step),
  );

  readonly stepChanged: EventEmitter<TranslationTrainingStepChangeEvent> =
    new EventEmitter<TranslationTrainingStepChangeEvent>();
  readonly trainingEnded: EventEmitter<TranslationTrainingEndEvent> =
    new EventEmitter<TranslationTrainingEndEvent>();
  readonly trainingCanceled: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
    super({
      language: {
        propositions: 'fr',
        response: 'dz',
      },
      step: EMPTY_STEP,
      sentences: [],
      result: EMPTY_RESULT,
      isLoading: false,
    });
  }

  cancelTraining() {
    this.trainingCanceled.emit();
  }

  initTraining(
    sentences: SentenceDTO[],
    language: TranslationTrainingLanguage,
    result = EMPTY_RESULT,
  ): void {
    this.patchState(() => ({
      sentences,
      language,
      result,
      step: this.buildStep(result.history.length, sentences, language),
    }));
  }

  isResponseCorrect(step: TranslationTrainingStep): boolean {
    return step.answer.replace(/ /g, '') === step.response.join().replace(/,/g, '');
  }

  readonly nextStep = this.effect((save$: Observable<void>) => {
    return save$.pipe(
      tap(() => this.updateResult()),
      tap(() => {
        const { step, sentences, result, language } = this.get();
        if (step.index + 1 === sentences.length) {
          this.trainingEnded.emit({ result });
        } else {
          const nextStep = this.buildStep(step.index + 1, sentences, language);
          this.patchState(() => ({ step: nextStep }));
          this.stepChanged.emit({ result, current: nextStep, previous: step });
        }
      }),
    );
  });

  readonly addToResponse = this.effect((save$: Observable<string>) => {
    return save$.pipe(
      tap((word: string) => {
        this.patchState((state) => ({
          step: {
            ...state.step,
            response: [...state.step.response, word],
            propositions: this.removeFrom(state.step.propositions, word),
          },
        }));
      }),
    );
  });

  readonly removeFromResponse = this.effect((save$: Observable<string>) => {
    return save$.pipe(
      tap((word: string) => {
        this.patchState((state) => ({
          step: {
            ...state.step,
            response: this.removeFrom(state.step.response, word),
            propositions: [...state.step.propositions, word],
          },
        }));
      }),
    );
  });

  private buildStep(
    index: number,
    sentences: SentenceDTO[],
    language: TranslationTrainingLanguage,
  ): TranslationTrainingStep {
    return {
      index,
      question: sentences[index]?.[language.response] ?? '',
      answer: sentences[index]?.[language.propositions] ?? '',
      propositions: sentences[index]?.word_propositions?.[language.propositions] ?? [],
      response: [],
    };
  }

  private removeFrom(array: string[], item: string): string[] {
    const index = array.indexOf(item);
    array.splice(index, 1);
    return array;
  }

  private updateResult() {
    this.patchState((state) => ({
      result: {
        history: [...state.result.history, state.step],
        note: state.result.note + (this.isResponseCorrect(state.step) ? 1 : 0),
      },
    }));
  }
}
