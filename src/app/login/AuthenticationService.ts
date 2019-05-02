import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';


// const httpoptions=
//   { header : new HttpHeaders({'Content-Type': 'application/json'})}
// ;

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthenticationService {

//   constructor(private http:HttpClient) { }

 


//   authenticate(username, password) {
//     if (username === "javainuse" && password === "password") {
//       sessionStorage.setItem('username', username)
//       return true;
//     } else {
//       return false;
//     }
//   }

//   isUserLoggedIn() {
//     let user = sessionStorage.getItem('username')
//     console.log(!(user === null))
//     return !(user === null)
//   }

//   logOut() {
//     sessionStorage.removeItem('username')
//   }
// }