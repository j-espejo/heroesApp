import { Injectable } from '@angular/core';
import {
   ActivatedRouteSnapshot,
   CanActivate,
   CanLoad,
   Route,
   Router,
   RouterStateSnapshot,
   UrlSegment,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
   providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
   constructor(
      private authService: AuthService,
      private router: Router
   ) {}

   canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
   ): Observable<boolean> | Promise<boolean> | boolean {
      // if (this.authService.auth.id) {
      //    return true;
      // }
      // console.log('Bloqueado por AuthGuard - canActivate');
      // return false;
      return this.authService.verificaAutenticacion().pipe(
         tap((estaAutenticado) => {
            if (!estaAutenticado) {
               this.router.navigate(['./auth/login']);
            }
         })
      );
   }

   //Solo restringe que se pueda cargar el modulo
   canLoad(
      route: Route,
      segments: UrlSegment[]
   ): Observable<boolean> | Promise<boolean> | boolean {
      //verificamos
      return this.authService.verificaAutenticacion().pipe(
         tap((estaAutenticado) => {
            if (!estaAutenticado) {
               this.router.navigate(['./auth/login']);
            }
         })
      );

      // if (this.authService.auth.id) {
      //    return true;
      // }
      // console.log('Bloqueado por AuthGuard - canLoad');
      // return false;
   }
}
