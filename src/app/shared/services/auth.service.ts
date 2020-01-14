import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { auth } from 'firebase/app'
import { AppUser } from 'shared/models/app-user';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  appUser$: Observable<AppUser>;

  constructor( 
    private afAuth: AngularFireAuth, 
    private db: AngularFireDatabase , 
    private router: Router,
    private route: ActivatedRoute
    ) { 
    this.user$ = afAuth.authState;
    this.appUser$ = afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.object<AppUser>(`/users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }

  async signUp(value) {
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password);
    console.log(result);
    this.afAuth.auth.currentUser.updateProfile({
      displayName: value.username
    })
    this.db.object(`/users/${result.user.uid}`).set({
      name: value.username,
      email: value.email,
      uid: result.user.uid
    })
    this.router.navigate(['/'])
  }

  async loginEmail(value) {
    const result = await this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password);
    console.log(result);
    this.router.navigate(['/'])
  }

  async login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    console.log(credential)
    // const data = await this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    this.save(credential.user);
    return this.router.navigate(['/']);
  }

  logout(){
    this.afAuth.auth.signOut();
    return this.router.navigate(['/'])
  }


  save(user: firebase.User) {
    this.db.object(`/users/${user.uid}`).update({
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      trinhdo: 'A1'
    })
}
}
