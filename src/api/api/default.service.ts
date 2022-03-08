/**
 * dz-dialect-api
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.2.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { Response } from '../model/response';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class DefaultService {

    protected basePath = 'https://us-central1-dz-dialect-api.cloudfunctions.net/generate-sentence';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * returns sentences
     * 
     * @param count the number of sentences to be generated
     * @param tenses tenses to be used
     * @param verbs verbs to be used
     * @param adjectives adjectives to be used
     * @param nouns nouns to be used
     * @param types types of sentences to be generated
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public sentenceGenerateGet(count?: number, tenses?: Array<string>, verbs?: Array<string>, adjectives?: Array<string>, nouns?: Array<string>, types?: Array<string>, observe?: 'body', reportProgress?: boolean): Observable<Response>;
    public sentenceGenerateGet(count?: number, tenses?: Array<string>, verbs?: Array<string>, adjectives?: Array<string>, nouns?: Array<string>, types?: Array<string>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Response>>;
    public sentenceGenerateGet(count?: number, tenses?: Array<string>, verbs?: Array<string>, adjectives?: Array<string>, nouns?: Array<string>, types?: Array<string>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Response>>;
    public sentenceGenerateGet(count?: number, tenses?: Array<string>, verbs?: Array<string>, adjectives?: Array<string>, nouns?: Array<string>, types?: Array<string>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {







        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (count !== undefined && count !== null) {
            queryParameters = queryParameters.set('count', <any>count);
        }
        if (tenses) {
            tenses.forEach((element) => {
                queryParameters = queryParameters.append('tenses', <any>element);
            })
        }
        if (verbs) {
            verbs.forEach((element) => {
                queryParameters = queryParameters.append('verbs', <any>element);
            })
        }
        if (adjectives) {
            adjectives.forEach((element) => {
                queryParameters = queryParameters.append('adjectives', <any>element);
            })
        }
        if (nouns) {
            nouns.forEach((element) => {
                queryParameters = queryParameters.append('nouns', <any>element);
            })
        }
        if (types) {
            types.forEach((element) => {
                queryParameters = queryParameters.append('types', <any>element);
            })
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json;charset=utf-8'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Response>('get',`${this.basePath}/sentence/generate`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
