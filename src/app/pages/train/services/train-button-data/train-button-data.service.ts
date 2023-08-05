import { Injectable } from '@angular/core';
import { GetExerciseExamResponseDto } from '../../../../../clients/dz-dialect-training-api';
import {
  ButtonData,
  ContextMenuData,
  TrainButtonData,
} from '../../components/train-button/train-button.component';
import { SvgIconService } from '../../../../shared/technical/svg-icon/svg-icon.service';

@Injectable()
export class TrainButtonDataService {
  constructor(private readonly _svgIconService: SvgIconService) {
    this._svgIconService.registerIcons(['cadena', 'single-star', 'done', 'close']);
  }

  buildData(exam: GetExerciseExamResponseDto, index: number, color: string): TrainButtonData {
    return {
      isCurrentExam: exam.current !== undefined,
      button: this._buildButtonData(exam, index, color),
      contextMenu: this._buildContextMenuData(exam, color),
    };
  }

  private _buildContextMenuData(exam: GetExerciseExamResponseDto, color: string): ContextMenuData {
    const contextMenuData: ContextMenuData = {
      title: exam.name,
      description: exam.description,
      disabled: true,
      buttonLabel: 'pas encore débloqué',
    };

    if (exam.current) {
      contextMenuData.disabled = false;
      contextMenuData.buttonLabel = exam.current.questionIndex ? 'reprendre' : 'commencer';
      contextMenuData.backgroundColor = color;
      contextMenuData.buttonColor = color;
    }

    if (exam.result) {
      contextMenuData.disabled = false;
      contextMenuData.buttonLabel = "s'entrainer";
      contextMenuData.backgroundColor = color;
      contextMenuData.buttonColor = color;

      const success = exam.result.score >= exam.result.maxScore / 2;
      if (success) {
        const successColor = 'rgb(255,200,0)';
        contextMenuData.backgroundColor = successColor;
        contextMenuData.buttonColor = successColor;
      } else {
        const failureColor = 'rgb(239, 83, 80)';
        contextMenuData.backgroundColor = failureColor;
        contextMenuData.buttonColor = failureColor;
      }
    }

    return contextMenuData;
  }

  private _buildButtonData(
    exam: GetExerciseExamResponseDto,
    index: number,
    color: string,
  ): ButtonData {
    const buttonConfiguration: ButtonData = {
      icon: 'cadena',
      offsetX: this._calculateOffsetX(index),
      floatingLabel: 'commencer',
      floatingLabelColor: color,
    };

    if (exam.current) {
      buttonConfiguration.icon = 'single-star';
      buttonConfiguration.progress =
        (exam.current.questionIndex * 100) / exam.current.questionLength;
      buttonConfiguration.floatingLabel = exam.current.questionIndex ? 'reprendre' : 'commencer';
      buttonConfiguration.backgroundColor = color;
      buttonConfiguration.boxShadow = `0 8px 0 rgb(0, 0, 0, 0.2), 0 8px 0 ${color}`;
    }

    if (exam.result) {
      const success = exam.result.score >= exam.result.maxScore / 2;
      if (success) {
        const successColor = 'rgb(255,200,0)';
        buttonConfiguration.icon = 'done';
        buttonConfiguration.backgroundColor = successColor;
        buttonConfiguration.boxShadow = `0 8px 0 rgb(0, 0, 0, 0.2), 0 8px 0 ${successColor}`;
      } else {
        const failureColor = 'rgb(239, 83, 80)';
        buttonConfiguration.icon = 'close';
        buttonConfiguration.backgroundColor = failureColor;
        buttonConfiguration.boxShadow = `0 8px 0 rgb(0, 0, 0, 0.2), 0 8px 0 ${failureColor}`;
      }
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
