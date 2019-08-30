import { Component } from '@angular/core';
import { UploadService } from '../app/upload/upload.service';
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

    constructor(private fileUploadService: UploadService) {}

    csvJSON(csvText) {
        const lines = csvText.split('\n');

        const result = [];

        const headers = lines[0].split(',');
        console.log(headers);
        for (let i = 1; i < lines.length - 1; i++) {
            const obj = {};
            const currentline = lines[i].split(',');

            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }

            result.push(obj);
        }

        // return result; //JavaScript object
        console.log(JSON.stringify(result)); // JSON
        this.JSONData = JSON.stringify(result);
    }

    onFileLoad(fileLoadedEvent) {
        const textFromFileLoaded = fileLoadedEvent.target.result;
        this.csvContent = textFromFileLoaded;
        // console.log(this.csvContent);
        this.csvJSON(this.csvContent);
    }

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

    // public handleFileInput(files: FileList) {
    //     this.fileToUpload = files.item(0);
    //     this.uploadFileToActivity();
    // }
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
