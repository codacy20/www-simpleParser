import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpResponse,
    HttpHeaders,
} from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Transaction } from '../models/transaction.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class UploadService {
    transactions: Transaction[];
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

    postFile(transactions: Transaction[]): Observable<Transaction[]> {
        const endpoint = 'http://localhost:3000/parser';
        return this.http
            .post<Transaction[]>(endpoint, transactions, this.httpOptions)
            .pipe(catchError(this.errorHandler));
    }

    async getLocalFile(): Promise<Transaction[]> {
        const unparsedResult = await this.http
            .get('assets/records.csv', { responseType: 'text' })
            .toPromise();
        this.csvJSON(unparsedResult);
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
        this._snackBar.open(
            'Please check your connection and Input',
            'dismiss',
            { duration: 3000 }
        );
        return throwError(error.message || 'Server Error! Sorry');
    }
}
