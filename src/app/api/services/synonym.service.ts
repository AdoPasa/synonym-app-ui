import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GlobalConfigService } from "../../services/global-config.service";
import { ApiResponse } from "../models/api-response";
import { PaginatedApiResponse } from "../models/paginated-api-response";
import { SynonymResponse } from "../models/synonym-response";

@Injectable()
export class SynonymService{
    baseUrl: string;

    constructor(
        private http: HttpClient,
        configService: GlobalConfigService,
    ){
        const config = configService.getConfig();
        this.baseUrl = config.apiBaseUrl;
    }

    search(name:string){
        let queryParams = new URLSearchParams();

        queryParams.append('name', name);

        return this.http.get<PaginatedApiResponse<SynonymResponse[]>>(
            this.baseUrl + '/Synonym?' + queryParams.toString()
        );
    }

    getByName(name:string){
        return this.http.get<ApiResponse<SynonymResponse>>(
            this.baseUrl + '/Synonym/' + name
        );
    }

    add(name:string, description: string, parentId: string){
        return this.http.post<ApiResponse<SynonymResponse>>(
            this.baseUrl + '/Synonym',
            {
                parentId: parentId ? parseInt(parentId) : null,
                name,
                description
            }
        );
    }
}