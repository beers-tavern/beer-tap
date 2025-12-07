import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogActions,
  MatDialogContent,
} from '@angular/material/dialog';

@Component({
  selector: 'app-beer-dialog',
  templateUrl: './beer-dialog.component.html',
  styleUrls: ['./beer-dialog.component.css'],
  imports: [MatDialogActions, MatDialogContent],
})
export class BeerDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<BeerDialogComponent>
  ) {}

  close() {
    this.dialogRef.close();
  }
}
