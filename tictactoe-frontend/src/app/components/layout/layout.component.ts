import { Component } from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {GameStatusComponent} from '../game-status/game-status.component';
import {GameBoardComponent} from '../game-board/game-board.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    MatFormField,
    MatButton,
    GameStatusComponent,
    GameBoardComponent,
    NgIf
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  showStatusBoard: boolean = false;

  toggleStatusBoard() {
    this.showStatusBoard = !this.showStatusBoard;
  }

}
