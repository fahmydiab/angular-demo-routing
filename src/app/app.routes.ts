import {CanMatchFn, RedirectCommand, Router, Routes} from "@angular/router";
import {NoTaskComponent} from "./tasks/no-task/no-task.component";
import {resolveTitle, resolveUserName, UserTasksComponent} from "./users/user-tasks/user-tasks.component";
import {routes as usersRoutes} from "./users/users.routes";
import {NotFoundComponent} from "./not-found/not-found.component";
import {inject} from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random();
  if (shouldGetAccess < 1) {
    return true;
  }
  return new RedirectCommand(router.parseUrl('/unauthorized'));
}

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
    title: 'No task selected'
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: usersRoutes,
    canMatch: [dummyCanMatch],
    title: resolveTitle,
    data: {
      message: "Hello!"
    },
    resolve: {
      userName: resolveUserName
    }
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
]
