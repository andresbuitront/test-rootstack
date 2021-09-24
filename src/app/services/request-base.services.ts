import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class RequestBase {
    public urlBase = 'https://coding-test.rootstack.net/api/';
    public showLoading = false;

    // public headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });


    constructor(private httpClient: HttpClient) { }

    getPostData(datajson: any, loading: boolean = true, endpoint: any = null): Observable<any> {
        this.showLoading = loading;

        console.log('=> REQUEST REQUEST: \n', datajson, endpoint);
        return this.httpClient.post(this.urlBase.concat(endpoint), datajson)
            .pipe(map(resp => {
                console.log('********* RESPONSE REQUEST: \n', JSON.stringify(resp));
                this.showLoading = false;
                return resp;
            }));
    }

    getData(datajson: any, loading: boolean = true, endpoint: any = null, auth_token: any = null): Observable<any> {
        this.showLoading = loading;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth_token}`
            }),
            responseType: 'text' as 'json'
        };

        console.log('=> REQUEST REQUEST: \n', datajson, endpoint);
        return this.httpClient.get(this.urlBase.concat(endpoint), httpOptions)
            .pipe(map(resp => {
                console.log('********* RESPONSE REQUEST: \n', JSON.stringify(resp));
                this.showLoading = false;
                return resp;
            }));
    }

}