import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const {authorization}=context.switchToHttp().getRequest().headers
    console.log({authorization})


    return true
  }
}
