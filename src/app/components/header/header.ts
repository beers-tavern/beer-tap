import { Component, inject, Output, EventEmitter } from '@angular/core';
import { PopUpFormBarComponent } from '../pop-up-form-bar/pop-up-form-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
})
export class Header {

  readonly dialog = inject(MatDialog);
  @Output() newBar = new EventEmitter<Partial<Bar>>();

  openAddBarDialog(): void {
      const dialogRef = this.dialog.open(PopUpFormBarComponent, {
        width: '500px',
        height: '600px',
        data : {
          modifyMode : false,
          bar: null
        } as PopUpFormBarData
      });

      dialogRef.afterClosed().subscribe((result: BarForm) => {
        if (result) {
          result.modifyMode = false;
          this.newBar.emit(result);
        }
      });
    }

}
