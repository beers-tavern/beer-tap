import { Component, inject, model } from '@angular/core';
import { BarMapComponent } from '../bar-map/bar-map';

import {
  MAT_DIALOG_DATA,
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

@Component({
  selector: 'app-bar-dialog',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, AddressIcon, TelephoneIcon, ClockIcon, DollarIcon],
  templateUrl: 'bar-dialog.html',
  styleUrl: 'bar-dialog.css',
})
export class BarDialog {
  readonly dialogRef = inject(MatDialogRef<BarDialog>);

  readonly data = inject<Bar>(MAT_DIALOG_DATA);
  readonly bar = model(this.data);

  onClose(): void {
    this.dialogRef.close();
  }
}
