/**
 * 
 * 
 *
 * 
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec, HttpContext 
        }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

import { SentenceDTO } from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';



@Injectable({
  providedIn: 'root'
})
export class SentenceControllerHttpService {

    protected basePath = 'https://dz-dialect-api.ew.r.appspot.com';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }


    private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
        if (value == null) {
            return httpParams;
        }

        if (typeof value === "object") {
            if (Array.isArray(value)) {
                (value as any[]).forEach( elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            } else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key,
                        (value as Date).toISOString().substr(0, 10));
                } else {
                   throw Error("key may not be null if value is Date");
                }
            } else {
                Object.keys(value).forEach( k => httpParams = this.addToHttpParamsRecursive(
                    httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        } else if (key != null) {
            httpParams = httpParams.append(key, value);
        } else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }

    /**
     * @param count 
     * @param pronoun 
     * @param verb 
     * @param tense 
     * @param noun 
     * @param adjective 
     * @param question 
     * @param adverb 
     * @param excludePositive 
     * @param excludeNegative 
     * @param sentenceSchema 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public generateRandomSentence(count?: number, pronoun?: string, verb?: string, tense?: string, noun?: string, adjective?: string, question?: string, adverb?: string, excludePositive?: boolean, excludeNegative?: boolean, sentenceSchema?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*', context?: HttpContext}): Observable<Array<SentenceDTO>>;
    public generateRandomSentence(count?: number, pronoun?: string, verb?: string, tense?: string, noun?: string, adjective?: string, question?: string, adverb?: string, excludePositive?: boolean, excludeNegative?: boolean, sentenceSchema?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*', context?: HttpContext}): Observable<HttpResponse<Array<SentenceDTO>>>;
    public generateRandomSentence(count?: number, pronoun?: string, verb?: string, tense?: string, noun?: string, adjective?: string, question?: string, adverb?: string, excludePositive?: boolean, excludeNegative?: boolean, sentenceSchema?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*', context?: HttpContext}): Observable<HttpEvent<Array<SentenceDTO>>>;
    public generateRandomSentence(count?: number, pronoun?: string, verb?: string, tense?: string, noun?: string, adjective?: string, question?: string, adverb?: string, excludePositive?: boolean, excludeNegative?: boolean, sentenceSchema?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (count !== undefined && count !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>count, 'count');
        }
        if (pronoun !== undefined && pronoun !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>pronoun, 'pronoun');
        }
        if (verb !== undefined && verb !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>verb, 'verb');
        }
        if (tense !== undefined && tense !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>tense, 'tense');
        }
        if (noun !== undefined && noun !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>noun, 'noun');
        }
        if (adjective !== undefined && adjective !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>adjective, 'adjective');
        }
        if (question !== undefined && question !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>question, 'question');
        }
        if (adverb !== undefined && adverb !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>adverb, 'adverb');
        }
        if (excludePositive !== undefined && excludePositive !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>excludePositive, 'exclude_positive');
        }
        if (excludeNegative !== undefined && excludeNegative !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>excludeNegative, 'exclude_negative');
        }
        if (sentenceSchema !== undefined && sentenceSchema !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>sentenceSchema, 'sentence_schema');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                '*/*'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' = 'json';
        if(localVarHttpHeaderAcceptSelected && localVarHttpHeaderAcceptSelected.startsWith('text')) {
            responseType_ = 'text';
        }

        return this.httpClient.get<Array<SentenceDTO>>(`${this.configuration.basePath}/api/v1/sentences/generate`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getSentenceSchemas(observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*', context?: HttpContext}): Observable<Array<string>>;
    public getSentenceSchemas(observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*', context?: HttpContext}): Observable<HttpResponse<Array<string>>>;
    public getSentenceSchemas(observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*', context?: HttpContext}): Observable<HttpEvent<Array<string>>>;
    public getSentenceSchemas(observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*', context?: HttpContext}): Observable<any> {

        let localVarHeaders = this.defaultHeaders;

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                '*/*'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' = 'json';
        if(localVarHttpHeaderAcceptSelected && localVarHttpHeaderAcceptSelected.startsWith('text')) {
            responseType_ = 'text';
        }

        return this.httpClient.get<Array<string>>(`${this.configuration.basePath}/api/v1/sentences/schemas`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
