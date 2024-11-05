import { Routes } from '@angular/router';
import {GameBoardComponent} from './components/game-board/game-board.component';

export const routes: Routes = [
  { path: '', redirectTo: 'game', pathMatch: 'full' },
  {
    path: 'game',
    component: GameBoardComponent,
    loadChildren: () => import('./components/pages.route').then(x => x.pagesRoutes)}
];
