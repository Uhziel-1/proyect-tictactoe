import {Routes} from '@angular/router'
import {GameBoardComponent} from './game-board/game-board.component';
import {GameStatusComponent} from './game-status/game-status.component';
import {LayoutComponent} from './layout/layout.component';

export const pagesRoutes: Routes = [
  {
    path: 'partida',
    component: LayoutComponent,
  }
]
