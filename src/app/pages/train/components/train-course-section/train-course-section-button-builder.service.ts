import { Injectable } from '@angular/core';
import {
  GetExerciseExamCurrentResponseDto,
  GetExerciseExamResponseDto,
} from '../../../../../clients/dz-dialect-training-api';
import { TrainButtonAppearance } from '../train-button/train-button.component';
import { SvgIconService } from '../../../../shared/technical/svg-icon/svg-icon.service';
import { TrainCourseButton } from './train-course-section.component';
import { TrainButtonContextMenu } from '../train-button-context-menu/train-button-context-menu.component';
import { TrainButtonTooltip } from '../train-button-tooltip/train-button-tooltip.component';

type TrainBackgroundResolver = (color: string) => string;

type TrainTooltipResolver = (alreadyStarted: boolean, color: string) => TrainButtonTooltip;

type TrainProgressResolver = (current: GetExerciseExamCurrentResponseDto) => number;

type TrainContextMenuResolverParams = {
  color: string;
  offsetX: number;
  title: string;
  description: string;
  alreadyStarted: boolean;
  link: string;
};

type TrainContextMenuResolver = (params: TrainContextMenuResolverParams) => TrainButtonContextMenu;

@Injectable()
export class TrainCourseSectionButtonBuilderService {
  backgroundMap: Map<TrainButtonAppearance, TrainBackgroundResolver> = new Map([
    ['current', (color: string): string => color],
    ['success', (): string => 'rgb(255,200,0)'],
    ['failure', (): string => 'rgb(239, 83, 80)'],
  ]);

  iconMap: Map<TrainButtonAppearance, string> = new Map([
    ['locked', 'cadena'],
    ['current', 'single-star'],
    ['success', 'done'],
    ['failure', 'close'],
  ]);

  tooltipMap: Map<TrainButtonAppearance, TrainTooltipResolver> = new Map([
    [
      'current',
      (alreadyStarted: boolean, color: string): TrainButtonTooltip => ({
        text: alreadyStarted ? 'reprendre' : 'commencer',
        color,
      }),
    ],
  ]);

  progressMap: Map<TrainButtonAppearance, TrainProgressResolver> = new Map([
    [
      'current',
      (current: GetExerciseExamCurrentResponseDto): number =>
        (current.questionIndex * 100) / current.questionLength,
    ],
  ]);

  contextMenuMap: Map<TrainButtonAppearance, TrainContextMenuResolver> = new Map([
    [
      'locked',
      ({ offsetX, title, description, link }): TrainButtonContextMenu => ({
        title,
        description,
        offsetX,
        appearance: 'locked',
        actions: [
          {
            text: 'pas encore débloqué',
            disabled: true,
            link,
          },
        ],
      }),
    ],

    [
      'current',
      ({ offsetX, title, description, link, color, alreadyStarted }): TrainButtonContextMenu => ({
        title,
        description,
        offsetX,
        appearance: 'unlocked',
        background: color,
        color: 'white',
        actions: [
          {
            text: alreadyStarted ? 'reprendre' : 'commencer',
            color,
            disabled: false,
            link,
          },
        ],
      }),
    ],

    [
      'success',
      ({ offsetX, title, description, link }): TrainButtonContextMenu => ({
        title,
        description,
        offsetX,
        appearance: 'unlocked',
        background: 'rgb(255,200,0)',
        color: 'white',
        actions: [
          {
            text: "s'entrainer",
            color: 'rgb(255,200,0)',
            disabled: false,
            link,
          },
        ],
      }),
    ],

    [
      'failure',
      ({ offsetX, title, description, link }): TrainButtonContextMenu => ({
        title,
        description,
        offsetX,
        appearance: 'unlocked',
        background: 'rgb(239, 83, 80)',
        color: 'white',
        actions: [
          {
            text: "s'entrainer",
            color: 'rgb(239, 83, 80)',
            disabled: false,
            link,
          },
        ],
      }),
    ],
  ]);

  constructor(private readonly _svgIconService: SvgIconService) {
    this._svgIconService.registerIcons(['cadena', 'single-star', 'done', 'close']);
  }

  build(exam: GetExerciseExamResponseDto, index: number, color: string): TrainCourseButton {
    const offsetX = this._calculateOffsetX(index);
    const appearance = this._resolveButtonAppearance(exam);
    return {
      appearance,
      offsetX,
      background: this.backgroundMap.get(appearance)?.(color) ?? '',
      icon: this.iconMap.get(appearance) ?? '',
      contextMenu: this.contextMenuMap.get(appearance)?.({
        color,
        offsetX,
        title: exam.name,
        description: exam.description,
        alreadyStarted: !!exam.current?.questionIndex,
        link: `/exam/${exam.id}`,
      })!,
      progress: exam.current && this.progressMap.get(appearance)?.(exam.current),
      tooltip: this.tooltipMap.get(appearance)?.(!!exam.current?.questionIndex, color),
    };
  }

  private _resolveButtonAppearance(exam: GetExerciseExamResponseDto): TrainButtonAppearance {
    let state: TrainButtonAppearance = 'locked';

    if (exam.result) {
      const success = exam.result.score >= exam.result.maxScore / 2;
      if (success) {
        state = 'success';
      } else {
        state = 'failure';
      }
    }

    if (exam.current && !exam.result) {
      state = 'current';
    }

    return state;
  }

  private _calculateOffsetX(index: number): number {
    let multiplicator = index % 4;

    if (multiplicator) {
      multiplicator--;
      multiplicator = (multiplicator % 2) + 1;
    }

    const isLeft = Math.floor(index / 4) % 2 === 0;

    return multiplicator * 36 * (isLeft ? -1 : 1);
  }
}
