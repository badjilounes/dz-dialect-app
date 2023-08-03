import { Injectable } from '@angular/core';
import { GetExerciseExamResponseDto } from '../../../../../clients/dz-dialect-training-api';
import {
  ButtonData,
  ContextMenuData,
  TrainButtonData,
} from '../../components/train-button/train-button.component';
import { SvgIconService } from '../../../../shared/technical/svg-icon/svg-icon.service';

@Injectable()
export class TrainingButtonDataService {
  constructor(private readonly _svgIconService: SvgIconService) {
    this._svgIconService.registerIcons(['cadena', 'single-star']);
  }

  buildData(exam: GetExerciseExamResponseDto, index: number, courseColor: string): TrainButtonData {
    return {
      isCurrentExam: exam.current !== undefined,
      button: this._buildButtonData(exam, index, courseColor),
      contextMenu: this._buildContextMenuData(exam, courseColor),
    };
  }

  private _buildContextMenuData(
    exam: GetExerciseExamResponseDto,
    courseColor: string,
  ): ContextMenuData {
    const contextMenuData: ContextMenuData = {
      title: exam.name,
      description: exam.description,
      disabled: true,
      buttonLabel: 'pas encore débloqué',
    };

    if (exam.current) {
      contextMenuData.disabled = false;
      contextMenuData.buttonLabel = exam.current.questionIndex ? 'reprendre' : 'commencer';
      contextMenuData.backgroundColor = courseColor;
      contextMenuData.buttonColor = courseColor;
    }

    return contextMenuData;
  }

  private _buildButtonData(
    exam: GetExerciseExamResponseDto,
    index: number,
    courseColor: string,
  ): ButtonData {
    const buttonConfiguration: ButtonData = {
      icon: 'cadena',
      offsetX: this._calculateOffsetX(index),
      floatingLabel: 'commencer',
      floatingLabelColor: courseColor,
    };

    if (exam.current) {
      buttonConfiguration.icon = 'single-star';
      buttonConfiguration.progress =
        (exam.current.questionIndex * 100) / exam.current.questionLength;
      buttonConfiguration.floatingLabel = exam.current.questionIndex ? 'reprendre' : 'commencer';
      buttonConfiguration.backgroundColor = courseColor;
      buttonConfiguration.boxShadow = `0 8px 0 rgb(0, 0, 0, 0.2), 0 8px 0 ${courseColor}`;
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
