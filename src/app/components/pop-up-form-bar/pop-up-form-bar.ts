import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PopUpFormBarData } from '../../models/pop-up-form-bar-data';
import { BarForm } from '../../models/barForm';

@Component({
  selector: 'app-pop-up-form-bar',
  templateUrl: './pop-up-form-bar.html',
  styleUrls: ['./pop-up-form-bar.css'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class PopUpFormBarComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<PopUpFormBarComponent>);

  readonly data = inject<PopUpFormBarData>(MAT_DIALOG_DATA);

  barForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.barForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      category: ['', [Validators.required]],
      status: ['Ouvert', [Validators.required]],
      address: ['', [Validators.required, Validators.maxLength(100)]],
      lat: [null, [Validators.required, Validators.min(-90), Validators.max(90)]],
      lng: [null, [Validators.required, Validators.min(-180), Validators.max(180)]],
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.bar) {
      this.barForm.patchValue(this.data.bar);
    }
  }


  onStatusToggle(checked: boolean): void {
    this.barForm.patchValue({ status: checked ? 'Ouvert' : 'Fermé' });
  }

  onSubmit(): void {
    if (this.barForm.valid) {
      const bar = this.formMapper(this.barForm);
      this.dialogRef.close(bar);
      this.barForm.reset();
    }
  }

  formMapper(form:FormGroup<any>): BarForm {
    const value = form.value;
    return {
      id : this.data.bar ? parseInt(this.data.bar.id) : 0,
      name : value.name,
      category : value.category,
      status : value.status,
      address: value.address,
      lat : value.lat,
      lng : value.lng,
      modifyMode: this.data.bar ? true : false
    } as BarForm
  }
}
