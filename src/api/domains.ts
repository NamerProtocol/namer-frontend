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
            `${domainsApiUrl}/domain/getByOwner?owner=${address}`,
        )
        .then((res) => res.data);
};

export const fetchDomainUpdateRequest = async ({
    id,
    owner,
}: {
    id: string;
    owner: string;
}) => {
    return await axios
        .patch<never, AxiosResponse<Domain[]>>(
            `${domainsApiUrl}/domain/${id}`,
            {
                owner,
            },
        )
        .then((res) => res.data);
};

export const fetchDomainCreateRequest = async ({
    owner,
    parentId,
    name,
}: {
    parentId: string;
    name: string;
    owner: string;
}) => {
    return await axios
        .post<never, AxiosResponse<Domain[]>>(`${domainsApiUrl}/domain`, {
            owner,
            parentId,
            name,
        })
        .then((res) => res.data);
};
