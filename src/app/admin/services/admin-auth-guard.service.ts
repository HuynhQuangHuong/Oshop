import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';
import { Observable } from 'rxjs/Observable';

import { map, tap, take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(
      take(1),
      map(user => user && user.isAdmin ? true : false),
      tap(isAdmin => {
        if (!isAdmin) {
          console.error('Access Denied - ADMIN only');
          this.router.navigate(['/'])
        }
      })
    )
  }
}
