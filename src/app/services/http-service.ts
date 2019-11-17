import { Injectable } from '@angular/core';
import { Http, ConnectionBackend, Request, RequestOptions, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { PreloaderService } from './preloader.service';
import { finalize, catchError, tap, map } from 'rxjs/operators';

@Injectable()
export class HttpService extends Http {

  constructor(backend: ConnectionBackend,
              defaultOptions: RequestOptions,
              private preloaderService: PreloaderService) {
    super(backend, defaultOptions);
  }

  /**
   * Performs any type of http request.
   * @param url
   * @param options
   * @returns {Observable<Response>}
   */
  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options);
  }

  /**
   * Performs a request with `get` http method.
   * @param url
   * @param options
   * @param preloaderType
   * @returns {Observable<>}
   */
  get(url: string, options?: RequestOptionsArgs, preloaderType?: string): Observable<any> {
    this.requestInterceptor(preloaderType);

    return super.get(url, this.requestOptions(options))
                
                .pipe(
                    catchError(this.onCatch),
                    map(res => res.json()),
                    tap((res: Response) => {
                        this.onSubscribeSuccess(res);
                    }, (error: any) => {
                        this.onSubscribeError(error);
                    }),
                    finalize(() => {
                        this.onFinally();
                    })
                )
  }

  /**
   * Performs a request with `post` http method.
   * @param url
   * @param body
   * @param options
   * @returns {Observable<>}
   */
  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    this.requestInterceptor();

    return super.post(url, body, this.requestOptions(options))
              .pipe(
                  catchError(this.onCatch),
                  map(res => res.json()),
                  tap((res: Response) => {
                      this.onSubscribeSuccess(res);
                  }, (error: any) => {
                      this.onSubscribeError(error);
                  }),
                  finalize(() => {
                      this.onFinally();
                  })
              )
  }

  /**
   * Performs a request with `put` http method.
   * @param url
   * @param body
   * @param options
   * @returns {Observable<>}
   */
  put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    this.requestInterceptor();

    return super.put(url, body, this.requestOptions(options))
          .pipe(
            catchError(this.onCatch),
            map(res => res.json()),
            tap((res: Response) => {
                this.onSubscribeSuccess(res);
            }, (error: any) => {
                this.onSubscribeError(error);
            }),
            finalize(() => {
                this.onFinally();
            })
          )
  }

  /**
   * Performs a request with `delete` http method.
   * @param url
   * @param options
   * @returns {Observable<>}
   */
  delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.requestInterceptor();

    return super.delete(url, options)
          .pipe(
            catchError(this.onCatch),
            map(res => res.json()),
            tap((res: Response) => {
                this.onSubscribeSuccess(res);
            }, (error: any) => {
                this.onSubscribeError(error);
            }),
            finalize(() => {
                this.onFinally();
            })
          )
  }

  /**
   * Request options.
   * @param options
   * @returns {RequestOptionsArgs}
   */
  private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }

    if (options.headers == null) {
      options.headers = new Headers();
    }

    return options;
  }

  /**
   * Request interceptor.
   */
  private requestInterceptor(preloaderType = 'full'): void {
    this.preloaderService.showPreloader(preloaderType);
  }

  /**
   * Response interceptor.
   */
  private responseInterceptor(preloaderType = 'full'): void {
      this.preloaderService.hidePreloader(preloaderType);
  }

  /**
   * Error handler.
   * @param error
   * @param caught
   * @returns {ErrorObservable}
   */
  private onCatch(error: any): Observable<any> {
    console.log('onCatch');
    return Observable.throw(error);
  }

  /**
   * onSubscribeSuccess
   * @param res
   */
  private onSubscribeSuccess(res: Response): void {
      
  }

  /**
   * onSubscribeError
   * @param error
   */
  private onSubscribeError(error: any): void {
  }

  /**
   * onFinally
   */
  private onFinally(preloaderType = 'full'): void {
    this.responseInterceptor(preloaderType);
  }
}