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

    constructor(private fileUploadService: UploadService) {}

    onFileLoad(fileLoadedEvent) {
        const textFromFileLoaded = fileLoadedEvent.target.result;
        this.csvContent = textFromFileLoaded;
        console.log(this.csvContent);
    }

    onFileSelect(input: HTMLInputElement) {
        const files = input.files;
        if (files && files.length) {
            const fileToRead = files[0];
            const fileReader = new FileReader();
            fileReader.onload = this.onFileLoad;
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
