## Test environment
The APP UI has been released (using Netlify) with the following URL: https://polite-mooncake-479ce3.netlify.app/
The API has been released with the following URL: https://185.218.126.206:9997/ 

## Certificate

Due to the unavailability of a spare domain, the API lacks a valid SSL certificate. Let's Encrypt doesn't permit the generation and binding of a certificate to an IP address; it only supports domains. 
As a temporary solution, I have generated a certificate that can be imported using OpenSSL

- Import the `Certificates/SynonymAppCA.cer` file into your browser, this will tell the browser that served API from our server is legit/trusted.
  - For Chrome : Open settings search for Manage certificates, import the `Certificates/SynonymAppCA.cer` file and trust it, now open the APP on the folowing link: https://polite-mooncake-479ce3.netlify.app/


# SynonymsApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
