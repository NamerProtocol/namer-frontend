import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
    fetchDomainConfigurationUpdateRequest,
    fetchDomainsByIdRequest,
} from 'api/domains';
import { Domain } from 'types';

const updateConfiguration = createAction<any>(
    '@domainConfiguration/updateConfiguration',
);

const updateDomain = createAction<{ key: string; value: any }>(
    '@domainConfiguration/updateDomain',
);

const fetchUpdateDomain = createAsyncThunk(
    '@domainConfiguration/fetchUpdateDomain',
    async (_: any, { getState }) => {
        const state: any = getState();

        const configuration = state.domainConfiguration.configuration;
        const domain = state.domainConfiguration.domain;

        return await fetchDomainConfigurationUpdateRequest({
            id: domain.id,
            additionalData: configuration,
            price: Number(domain.price),
        });
    },
);

const setDomain = createAction<Domain>('@domainConfiguration/setDomain');

const fetchDomainById = createAsyncThunk(
    '@domainConfiguration/fetchDomainById',
    async (id: string) => {
        return fetchDomainsByIdRequest(id);
    },
);

export const domainConfigurationActions = {
    updateConfiguration,
    fetchUpdateDomain,
    setDomain,
    fetchDomainById,
    updateDomain,
};
