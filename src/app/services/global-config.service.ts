import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

type Nullable<T> = T | null;

@Injectable({
  providedIn: 'root',
})
export class GlobalConfigService {
  config: Nullable<Config> = null;

  constructor(private httpClient: HttpClient) {}

  getConfig(): Config {
    if (this.config == null) throw new Error('Configuration is not initialized');
    return this.config;
  }

  loadConfig(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get('./webClient.config.json').subscribe({
        next: (response) => {
          this.config = response as Config;       
          resolve(this.config);
        },
        error: () => {
          reject();
        }
      });
    });
  }
}

export interface Config {
  apiBaseUrl: string;
  uiBaseUrl: string;
}
