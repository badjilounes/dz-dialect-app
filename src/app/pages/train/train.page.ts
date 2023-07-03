import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { Observable } from 'rxjs';
import { AppStore } from 'src/app/app.store';
import {
  GetTrainingChapterListResponseDto,
  StudentHttpService,
} from '../../../clients/dz-dialect-training-api';

@Component({
  selector: 'app-train',
  templateUrl: './train.page.html',
  styleUrls: ['./train.page.scss'],
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatIconModule, LetModule],
})
export class TrainPage implements OnInit {
  section$: Observable<GetTrainingChapterListResponseDto[]> =
    this.studentHttpService.getTrainingChapterList();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly userAppStore: AppStore,
    private readonly studentHttpService: StudentHttpService,
  ) {}

  ngOnInit(): void {
    const accessToken = this.route.snapshot.queryParams['access_token'];
    if (accessToken) {
      this.router
        .navigate(['/train'], { replaceUrl: true })
        .then(() => this.userAppStore.setAsAuthenticated(accessToken));
    }
    this.studentHttpService.getTrainingChapterList().subscribe((data) => {
      console.log(data);
    });
  }
}
