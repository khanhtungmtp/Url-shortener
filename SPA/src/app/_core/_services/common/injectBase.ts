import { NotiflixService } from './notiflix.service';
import { inject } from '@angular/core';
export abstract class InjectBase {
  protected notiflix = inject(NotiflixService)
}
