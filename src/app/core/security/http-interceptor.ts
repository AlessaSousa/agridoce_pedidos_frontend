import { HttpInterceptorFn } from '@angular/common/http';
export class CustomHttpInterceptor {}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cloned = req.clone({
    setHeaders: {
      Authorization: `Basic`
    }
  });
  return next(cloned);
};
