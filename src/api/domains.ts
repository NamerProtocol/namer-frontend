import axios, { AxiosResponse } from 'axios';
import { domainsApiUrl } from 'consts/api';
import { Domain } from 'types';

interface FetchDomainsByKeywordResponse {
    exactMatch: Domain;
    zone: Domain;
    similarZones: Domain[];
    differentZones: Domain[];
    similarNames: Domain[];
}

export const fetchDomainsByKeywordRequest = async (keyword: string) => {
    return await axios
        .get<never, AxiosResponse<FetchDomainsByKeywordResponse>>(
            `${domainsApiUrl}/domain/search?domain=${keyword}`,
        )
        .then((res) => res.data);
};

export const fetchDomainsByOwnerRequest = async (address: string) => {
    return await axios
        .get<never, AxiosResponse<Domain[]>>(
            `${domainsApiUrl}/domain/byOwner?owner=${address}`,
        )
        .then((res) => res.data);
};

export const fetchDomainsByIdRequest = async (id: string) => {
    return await axios
        .get<never, AxiosResponse<Domain>>(
            `${domainsApiUrl}/domain/${id}?subDomains=true`,
        )
        .then((res) => res.data);
};

export const fetchDomainUpdateRequest = async ({
    id,
    owner,
    price,
}: {
    id: string;
    owner: string;
    price: any;
}) => {
    return await axios
        .patch<never, AxiosResponse<Domain>>(`${domainsApiUrl}/domain/${id}`, {
            owner,
            price,
        })
        .then((res) => res.data);
};

export const fetchDomainConfigurationUpdateRequest = async ({
    id,
    additionalData,
    price,
}: {
    id: string;
    additionalData: any;
    price: number;
}) => {
    return await axios
        .patch<never, AxiosResponse<Domain>>(`${domainsApiUrl}/domain/${id}`, {
            additionalData,
            price,
        })
        .then((res) => res.data);
};

export const fetchDomainCreateRequest = async ({
    owner,
    parentId,
    name,
    price,
}: {
    parentId: string;
    name: string;
    owner: string;
    price: any;
}) => {
    return await axios
        .post<never, AxiosResponse<Domain[]>>(`${domainsApiUrl}/domain`, {
            owner,
            parentId,
            name,
            subPrice: price,
        })
        .then((res) => res.data);
};
