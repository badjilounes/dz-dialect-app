import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-word-list-question',
  templateUrl: './word-list-question.component.html',
  styleUrls: ['./word-list-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordListQuestionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
