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

    onSampleSelect() {
        const data = this.fileUploadService.getLocalFile();
        console.log(data);
    }

    onFileLoad(fileLoadedEvent) {
        const textFromFileLoaded = fileLoadedEvent.target.result;
        this.csvContent = textFromFileLoaded;
        this.csvJSON(this.csvContent);
    }

    csvJSON(csvText) {
        console.log(csvText);
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
        this.TransactionList = result.map((transaction: Transaction) =>
            new Transaction().deserialize(transaction)
        );
        console.log(this.TransactionList);
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
