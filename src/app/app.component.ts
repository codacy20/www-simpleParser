import { Component } from '@angular/core';
import { UploadService } from '../app/upload/upload.service';
import { Transaction } from './models/transaction.model';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'www-simpleParser';
    fileToUpload: File = null;
    csvContent: string;
    TransactionList: Transaction[];
    processed: boolean;
    isDisabled = true;

    constructor(private fileUploadService: UploadService) {}

    onFileSelect(input: HTMLInputElement) {
        const files = input.files;
        this.isDisabled = false;
        if (files && files.length) {
            const fileToRead = files[0];
            const fileReader = new FileReader();
            fileReader.onload = fileLoadedEvent =>
                this.onFileLoad(fileLoadedEvent);
            fileReader.readAsText(fileToRead, 'UTF-8');
        }
    }

    async onSampleSelect() {
        this.isDisabled = false;
        const data = await this.fileUploadService.getLocalFile();
        this.TransactionList = data;
        this.TransactionList = data.map(row => {
            return row;
        });
    }

    onFileLoad(fileLoadedEvent) {
        const textFromFileLoaded = fileLoadedEvent.target.result;
        this.csvContent = textFromFileLoaded;
        const data = this.fileUploadService.csvJSON(this.csvContent);
        this.TransactionList = data.map(row => {
            return row;
        });
    }

    postFile() {
        const result = this.fileUploadService
            .postFile(this.TransactionList)
            .subscribe(
                response => {
                    this.TransactionList = [];
                    this.TransactionList = response.map(transaction => {
                        return transaction;
                    });
                },
                err => this.fileUploadService.errorHandler(err)
            );
        this.isDisabled = true;
        this.processed = true;
    }
}
