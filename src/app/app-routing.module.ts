import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AuthorizedGuard } from "./auth/guards/authorized.guard";
import { LoginFormComponent, RegistrationFormComponent } from "./shared/components";
import { NotAuthorizedGuard } from "./auth/guards/not-authorized.guard";

export const routes: Routes = [
    {
        path: "login",
        component: LoginFormComponent,
        canActivate: [NotAuthorizedGuard]
    },
    {
        path: 'registration',
        component: RegistrationFormComponent,
        canActivate: [NotAuthorizedGuard]
    },
    {
        path: "courses", canMatch: [AuthorizedGuard],
        loadChildren: () =>
            import("./features/courses/courses.module").then(m => m.CoursesModule)
    },
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "**", redirectTo: "/courses" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }