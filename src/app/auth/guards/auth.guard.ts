import { Injectable } from '@angular/core';
import {
   ActivatedRouteSnapshot,
   CanActivate,
   CanLoad,
   Route,
   RouterStateSnapshot,
   UrlSegment,
   UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
   providedIn: 'root',
})
export class AuthGuard implements CanLoad {
   constructor(private authService: AuthService) {}
   // canActivate(
   //   route: ActivatedRouteSnapshot,
   //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   //   return true;
   // }

   //Solo restringe que se pueda cargar el modulo
   canLoad(
      route: Route,
      segments: UrlSegment[]
   ): Observable<boolean> | Promise<boolean> | boolean {
      if (this.authService.auth.id) {
         return true;
      }
      console.log('Bloqueado por AuthGuard');
      return false;
   }
}
