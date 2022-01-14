
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpParameterCodec } from "@angular/common/http";
export enum Verbs {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE'
}
export class HttpUrlEncodingCodec implements HttpParameterCodec {
    encodeKey(k: string): string { return standardEncoding(k); }
    encodeValue(v: string): string { return standardEncoding(v); }
    decodeKey(k: string): string { return decodeURIComponent(k); }
    decodeValue(v: string) { return decodeURIComponent(v); }
}
function standardEncoding(v: string): string {
    return encodeURIComponent(v);
}

interface HttpOptions  {};

@Injectable({ providedIn: 'root' })
export class HttpClientService {

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {
    }

    get<T>(options: HttpOptions): Observable<T> {
        return this.httpCall(Verbs.GET, options);
    }

    delete<T>(options: HttpOptions): Observable<T> {
        return this.httpCall(Verbs.DELETE, options);
    }

    post<T>(options: HttpOptions): Observable<T> {
        return this.httpCall(Verbs.POST, options);
    }

    put<T>(options: HttpOptions): Observable<T> {
        return this.httpCall(Verbs.PUT, options);
    }

    httpCall<T>(verb: Verbs, options: HttpOptions): Observable<T> {
        return ;
    }

    download(verb: Verbs, options: HttpOptions) {
    }

    upload(options: HttpOptions) {
    }

    tokenValid(url): boolean {
        return false;
    }

    navigateLogin(){
    }
}


