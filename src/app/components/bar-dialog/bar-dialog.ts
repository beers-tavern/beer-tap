import { Component, EventEmitter, Output, inject, model } from '@angular/core';
import { BarMapComponent } from '../bar-map/bar-map';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { AddressIcon } from "../icons/address-icon";
import { TelephoneIcon } from "../icons/telephone-icon";
import { ClockIcon } from "../icons/clock-icon";
import { DollarIcon } from "../icons/dollar-icon";
import { PopUpFormBarComponent } from '../pop-up-form-bar/pop-up-form-bar';

@Component({
  selector: 'app-bar-dialog',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, AddressIcon, TelephoneIcon, ClockIcon, DollarIcon],
  templateUrl: 'bar-dialog.html',
  styleUrl: 'bar-dialog.css',
})
export class BarDialog {
  readonly dialog = inject(MatDialog);
  readonly dialogRef = inject(MatDialogRef<BarDialog>);

  readonly data = inject<Bar>(MAT_DIALOG_DATA);
  readonly bar = model(this.data);

  @Output() modifiedBar = new EventEmitter<Partial<Bar>>();

  onClose(): void {
    this.dialogRef.close();
  }

  deleteBar() {
    this.dialogRef.close(this.bar());
  }

  modifyBar() { 
    const dialogRef = this.dialog.open(PopUpFormBarComponent, {
      width: '500px',
      height: '600px',
      data : {
        modifyMode : true,
        bar : this.bar()
      } as PopUpFormBarData
    });
    
    dialogRef.afterClosed().subscribe((result: BarForm) => {
      if (result) {
        result.modifyMode = true;
        this.dialogRef.close(result);
      }
    });
  }
}
