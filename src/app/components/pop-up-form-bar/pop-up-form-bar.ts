import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

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
export class PopUpFormBarComponent {
  readonly dialogRef = inject(MatDialogRef<PopUpFormBarComponent>);

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

  onStatusToggle(checked: boolean): void {
    this.barForm.patchValue({ status: checked ? 'Ouvert' : 'Fermé' });
  }

  onSubmit(): void {
    if (this.barForm.valid) {
      const bar = this.formMapper(this.barForm);
      this.dialogRef.close(this.barForm.value);
      this.barForm.reset();
    }
  }

  formMapper(form:FormGroup<any>): Bar {
    const value = form.value;
    return {
      name : value.name,
      category : value.category,
      status : value.status,
      address: value.address,
      lat : value.lat,
      lng : value.lng
    } as Bar
  }
}
