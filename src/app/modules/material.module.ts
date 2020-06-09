import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
    declarations: [],
    imports: [
        MatTableModule,
        DragDropModule,
        ScrollingModule,
        CdkTableModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatInputModule,
        MatButtonModule
    ],
    exports: [
        MatTableModule,
        DragDropModule,
        ScrollingModule,
        CdkTableModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatInputModule,
        MatButtonModule
    ]
})
export class MaterialModule {

}