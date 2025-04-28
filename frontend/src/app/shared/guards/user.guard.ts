import {CanActivateFn, Router} from '@angular/router'
import {inject} from '@angular/core'
import {AuthService} from '../services/auth.service'
import {catchError, map, of} from 'rxjs'

export function userGuard(userRole: string): CanActivateFn {
  return (route, state) => {
    const router = inject(Router)
    return inject(AuthService).loggedInUser().pipe(map(user => {
      if(user && (user.userRole === userRole || user.userRole === 'admin'))
      {
        return true
      } else {
        router.navigateByUrl("/home")
        return false
      }
    }), catchError(error => {
      return of(false)
    }))
  }
}

