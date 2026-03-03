import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AuthorizedGuard } from "./auth/guards/authorized.guard";
import { LoginFormComponent, RegistrationFormComponent } from "./shared/components";
import { NotAuthorizedGuard } from "./auth/guards/not-authorized.guard";

export const routes: Routes = [
    {
        path: "login", canLoad: [NotAuthorizedGuard],
        loadChildren: () =>
            import("./shared/components/login-form/login.module").then(m => m.LoginModule)
        
    },
    {
        path: 'registration', canLoad: [NotAuthorizedGuard],
        loadChildren: () =>
            import("./shared/components/registration-form/registration.module").then(m => m.RegistrationModule)
    },
    {
        path: "courses", canLoad: [AuthorizedGuard],
        loadChildren: () =>
            import("./features/courses/courses.module").then(m => m.CoursesModule)
    },
    { path: "", redirectTo: "courses", pathMatch: "full" },
    { path: "**", redirectTo: "courses" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }