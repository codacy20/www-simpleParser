import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';

import { AppComponent } from './app.component';

const importExport = [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    HttpClientModule,
    MatDividerModule,
];

@NgModule({
    declarations: [AppComponent],
    imports: [importExport],
    exports: [importExport],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
