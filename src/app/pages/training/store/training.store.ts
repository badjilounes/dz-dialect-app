import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, EMPTY, filter, Observable, switchMap, tap } from 'rxjs';
import { SentenceControllerHttpService, SentenceDTO } from 'src/clients/dz-dialect-api';

export type StepResponse = {
  step: number;
  responses: string[];
};

export type StepResult = {
  success: boolean;
  answer: string;
};

export enum TrainingDisplay {
  HOME = 'HOME',
  TRAINING = 'TRAINING',
  RESULT = 'RESULT',
}

type TrainingState = {
  display: TrainingDisplay;
  nbSteps: number;
  currentStep: number;
  currentQuestion: string;
  currentAnswer: string;
  currentPropositions: string[];
  allSentences: SentenceDTO[];
  allUserResponses: StepResponse[];
  userScore: number;
  language: { source: 'fr' | 'dz'; target: 'fr' | 'dz' };
  isLoading: boolean;
};

@Injectable()
export class TrainingStore extends ComponentStore<TrainingState> {
  readonly showHome$: Observable<boolean> = this.select(
    (state) => state.display === TrainingDisplay.HOME,
  );
  readonly showTraining$: Observable<boolean> = this.select(
    (state) => state.display === TrainingDisplay.TRAINING,
  );
  readonly showResult$: Observable<boolean> = this.select(
    (state) => state.display === TrainingDisplay.RESULT,
  );

  readonly isFirstStep$: Observable<boolean> = this.select((state) => state.currentStep === 0);
  readonly isLastStep$: Observable<boolean> = this.select(
    (state) => state.currentStep === state.nbSteps - 1,
  );

  readonly progress$: Observable<number> = this.select(
    (state) => ((state.currentStep + 1) * 100) / state.nbSteps,
  );
  readonly success$: Observable<boolean> = this.select(
    (state) =>
      state.allSentences[state.currentStep]?.fr?.replace(/ /g, '') ===
      state.allUserResponses[state.currentStep]?.responses?.join().replace(/,/g, ''),
  );

  readonly currentUserResponse$: Observable<string[]> = this.select(
    (state) => state.allUserResponses[state.currentStep]?.responses ?? [],
  );

  readonly currentStep$: Observable<number> = this.select((state) => state.currentStep);
  readonly currentQuestion$: Observable<string> = this.select((state) => state.currentQuestion);
  readonly currentAnswer$: Observable<string> = this.select((state) => state.currentAnswer);
  readonly currentPropositions$: Observable<string[]> = this.select(
    (state) => state.currentPropositions,
  );

  readonly nbSteps$: Observable<number> = this.select((state) => state.nbSteps);
  readonly score$: Observable<number> = this.select((state) => state.userScore);
  readonly isLoading$: Observable<boolean> = this.select((state) => state.isLoading);

  constructor(
    private readonly sentenceApi: SentenceControllerHttpService,
    private readonly snackBar: MatSnackBar,
  ) {
    super({
      display: TrainingDisplay.HOME,
      language: { source: 'fr', target: 'dz' },
      currentStep: 0,
      nbSteps: 10,
      currentQuestion: '',
      currentAnswer: '',
      currentPropositions: [],
      allSentences: [],
      allUserResponses: [],
      userScore: 0,
      isLoading: false,
    });
  }

  readonly startTraining = this.effect((save$: Observable<void>) => {
    return save$.pipe(
      tap(() => this.patchState(() => ({ isLoading: true }))),
      switchMap(() => this.sentenceApi.generateRandomSentence(this.get().nbSteps)),
      tap((sentences: SentenceDTO[]) => {
        this.patchState(() => ({
          isLoading: false,
          currentStep: 0,
          allUserResponses: [],
          allSentences: sentences,
          display: TrainingDisplay.TRAINING,
        }));
        this.updateTrainingContent();
      }),
      catchError((error) => {
        this.patchState(() => ({ isLoading: false }));
        this.snackBar.open(error.message, 'OK', { duration: 3000 });
        return EMPTY;
      }),
    );
  });

  readonly nextStep = this.effect((save$: Observable<void>) => {
    return save$.pipe(
      filter(() => this.get().currentStep < this.get().nbSteps - 1),
      tap(() => this.patchState(() => ({ currentStep: this.get().currentStep + 1 }))),
      tap(() => this.updateTrainingContent()),
      switchMap(() => this.success$),
      tap((isSuccess) => isSuccess && this.patchState({ userScore: this.get().userScore + 1 })),
      switchMap(() => this.isLastStep$),
      filter((isLastStep) => isLastStep),
      tap(() => this.patchState({ display: TrainingDisplay.RESULT })),
    );
  });

  readonly addToCurrentResponse = this.effect((save$: Observable<string>) => {
    return save$.pipe(
      tap((word: string) => {
        const allResponses = this.get().allUserResponses;
        const currentResponses = allResponses[this.get().currentStep]?.responses ?? [];

        allResponses[this.get().currentStep] = {
          step: this.get().currentStep,
          responses: [...currentResponses, word],
        };

        const propositions = this.get().currentPropositions;
        const index = propositions.indexOf(word);
        propositions.splice(index, 1);

        this.patchState({ allUserResponses: allResponses, currentPropositions: propositions });
      }),
    );
  });

  readonly removeToCurrentResponse = this.effect((save$: Observable<string>) => {
    return save$.pipe(
      tap((word: string) => {
        const allResponses = this.get().allUserResponses;
        const currentResponses = allResponses[this.get().currentStep]?.responses ?? [];
        const wordIndex = currentResponses.indexOf(word);
        currentResponses.splice(wordIndex, 1);

        allResponses[this.get().currentStep] = {
          step: this.get().currentStep,
          responses: currentResponses,
        };

        const currentPropositions = this.get().currentPropositions;
        currentPropositions.push(word);

        this.patchState({
          allUserResponses: allResponses,
          currentPropositions: currentPropositions,
        });
      }),
    );
  });

  readonly finishTraining = this.effect((save$: Observable<void>) => {
    return save$.pipe(tap(() => this.patchState({ display: TrainingDisplay.RESULT })));
  });

  readonly updateTrainingContent = this.effect((save$: Observable<void>) => {
    return save$.pipe(
      tap(() =>
        this.patchState((state) => ({
          currentPropositions:
            state.allSentences[state.currentStep]?.word_propositions?.[state.language.source] ?? [],
          currentAnswer: state.allSentences[state.currentStep]?.[state.language.source] ?? '',
          currentQuestion: state.allSentences[state.currentStep]?.[state.language.target] ?? '',
        })),
      ),
    );
  });
}
