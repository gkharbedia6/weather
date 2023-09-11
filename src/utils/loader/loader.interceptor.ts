import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { LaoderService } from './loader.service';
import { ModifyDataService } from '../helpers/modify-data.service';

@Injectable({ providedIn: 'root' })
export class LoaderInterceptor implements HttpInterceptor {
  constructor(
    private _loader: LaoderService,
    private _modifyData: ModifyDataService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        this.handleError(err);
        this._loader.stopLoading();
        return throwError(() => err);
      }),
      finalize(() => {
        this._loader.stopLoading();
      })
    );
  }

  private handleError(err: HttpErrorResponse) {
    const message =
      ` ${this._modifyData.capitalizeWords(err?.error?.message)}` ??
      'Error fetching data.';
    alert(message);
  }
}
