import { Injectable } from '@angular/core';
import { PreloaderService } from './preloader.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  
  constructor(protected preloaderService : PreloaderService, protected http : HttpClient) { }

  /**
   * Request interceptor.
   */
  protected requestInterceptor(preloaderType = 'full'): void {
    this.preloaderService.showPreloader(preloaderType);
  }

  /**
   * Response interceptor.
   */
  protected responseInterceptor(preloaderType = 'full'): void {
      this.preloaderService.hidePreloader(preloaderType);
  }
}
