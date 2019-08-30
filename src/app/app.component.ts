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
    JSONData: any;
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

    onFileLoad(fileLoadedEvent) {
        const textFromFileLoaded = fileLoadedEvent.target.result;
        this.csvContent = textFromFileLoaded;
        this.csvJSON(this.csvContent);
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
        this.JSONData = result;
        this.TransactionList = this.JSONData.map((transaction: Transaction) =>
            new Transaction().deserialize(transaction)
        );
    }

    // uploadFileToActivity() {
    //     this.fileUploadService.postFile(this.fileToUpload).subscribe(
    //         data => {
    //             // do something, if upload success
    //         },
    //         error => {
    //             console.log(error);
    //         }
    //     );
    // }
}
