import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class UploadService {
    constructor(private http: HttpClient) {}

    postFile(fileToUpload: File): Observable<boolean> {
        const endpoint = 'http://localhost:3000/parser/upload';
        console.log(fileToUpload);
        const formData: FormData = new FormData();
        formData.append('fileKey', fileToUpload, fileToUpload.name);
        return this.http
            .post<any>(endpoint, formData)
            .pipe(catchError(this.errorHandler));
    }

    errorHandler(error: HttpErrorResponse) {
        return throwError(error.message || 'Server Error! Sorry');
    }
}
