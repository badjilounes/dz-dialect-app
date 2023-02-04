import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppStore} from 'src/app/app.store';
import {GetTrainingChapterListResponseDto, StudentHttpService} from "../../../clients/dz-dialect-training-api";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {map, Observable} from "rxjs";
import {LetModule} from "@ngrx/component";

const sections =
  {
    number: 1,
    description: 'Utilise des mots de base, présente-toi',
  }
;

@Component({
  selector: 'app-train',
  templateUrl: './train.page.html',
  styleUrls: ['./train.page.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    MatIconModule,
    LetModule
  ]
})
export class TrainPage implements OnInit {
  section$: Observable<GetTrainingChapterListResponseDto[]> = this.studentHttpService.getTrainingChapterList();
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly userAppStore: AppStore,
    private readonly studentHttpService: StudentHttpService,
  ) {
  }


  ngOnInit(): void {
    const accessToken = this.route.snapshot.queryParams['access_token'];
    if (accessToken) {
      this.router
        .navigate(['/train'], {replaceUrl: true})
        .then(() => this.userAppStore.setAsAuthenticated(accessToken));
    }
    this.studentHttpService.getTrainingChapterList().subscribe((data) => {
      console.log(data);
    });
  }
}
