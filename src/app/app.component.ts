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

    constructor(private fileUploadService: UploadService) {}

    onFileSelect(input: HTMLInputElement) {
        const files = input.files;
        if (files && files.length) {
            const fileToRead = files[0];
            const fileReader = new FileReader();
            // fileReader.onload = this.onFileLoad;
            fileReader.onload = fileLoadedEvent =>
                this.onFileLoad(fileLoadedEvent);
            fileReader.readAsText(fileToRead, 'UTF-8');
        }
    }

    async onSampleSelect() {
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
}
