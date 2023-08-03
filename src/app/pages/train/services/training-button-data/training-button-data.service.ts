import { Injectable } from '@angular/core';
import { GetExerciseExamResponseDto } from '../../../../../clients/dz-dialect-training-api';
import {
  ButtonData,
  ContextMenuData,
  TrainButtonData,
} from '../../components/train-button/train-button.component';

@Injectable()
export class TrainingButtonDataService {
  buildData(exam: GetExerciseExamResponseDto, index: number): TrainButtonData {
    return {
      isCurrentExam: exam.current !== undefined,
      button: this._buildButtonData(exam, index),
      contextMenu: this._buildContextMenuData(exam),
    };
  }

  private _buildContextMenuData(exam: GetExerciseExamResponseDto): ContextMenuData {
    return {
      title: exam.name,
      description: exam.description,
      disabled: !exam.current,
      buttonLabel: !!exam.current ? 'commencer' : 'pas encore débloqué',
    };
  }

  private _buildButtonData(exam: GetExerciseExamResponseDto, index: number): ButtonData {
    const buttonConfiguration: ButtonData = {
      icon: 'cadena',
      offsetX: this._calculateOffsetX(index),
      floatingLabel: 'commencer',
    };

    if (exam.current) {
      buttonConfiguration.icon = 'home';
      buttonConfiguration.progress =
        (exam.current.questionIndex * 100) / exam.current.questionLength;
      buttonConfiguration.floatingLabel = exam.current.questionIndex ? 'reprendre' : 'commencer';
    }

    return buttonConfiguration;
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
