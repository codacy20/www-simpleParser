import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpResponse,
} from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Transaction } from '../models/transaction.model';

@Injectable({
    providedIn: 'root',
})
export class UploadService {
    transactions: Transaction[];
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

    getLocalFile(): Transaction[] {
        this.http.get('assets/records.csv', { responseType: 'text' }).subscribe(
            data => {
                this.transactions = this.csvJSON(data);
            },
            error => {
                console.log(error);
            }
        );
        console.log(this.transactions);
        return this.transactions;
    }

    csvJSON(csvText) {
        const lines = csvText.split('\n');
        const result = [];
        const headers = lines[0].split(',');
        for (let i = 1; i < lines.length - 1; i++) {
            const obj = {};
            const currentline = lines[i].split(',');
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }
        this.transactions = result.map((transaction: Transaction) =>
            new Transaction().deserialize(transaction)
        );
        return this.transactions;
    }

    errorHandler(error: HttpErrorResponse) {
        return throwError(error.message || 'Server Error! Sorry');
    }
}
