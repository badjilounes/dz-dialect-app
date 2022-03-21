import {Component, Input, OnInit} from '@angular/core';
import {ResponseSentences} from "../../../../api";

@Component({
  selector: 'app-generated-keyword',
  templateUrl: './generated-keyword.component.html',
  styleUrls: ['./generated-keyword.component.scss']
})
export class GeneratedKeywordComponent implements OnInit {

  @Input() sentences?: ResponseSentences | null;
  @Input() handset!: boolean;

  sourceLanguage = { value: 'fr-FR', label: 'generated-sentence.source-language.fr-fr' };
  targetLanguage = { value: 'dz-AL', label: 'generated-sentence.source-language.dz-al' };
  keyword: any;
  description: any;

  constructor() { }

  ngOnInit(): void {
  }

}
