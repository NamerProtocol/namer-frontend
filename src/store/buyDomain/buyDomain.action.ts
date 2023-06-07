import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDomainsByKeywordRequest } from 'api/domains';
import { Domain } from 'types';

const fetchDomainsByKeyword = createAsyncThunk(
    '@domains/fetchDomainsByKeyword',
    async (keyword: string) => {
        return await fetchDomainsByKeywordRequest(keyword);
    },
);

const setPrice = createAction<string>('@buyDomain/setPrice');

const setDomainToBuy = createAction<Domain>('@buyDomain/setDomainToBuy');

const clear = createAction('@buyDomain/clear');

export const buyDomainActions = {
    setPrice,
    setDomainToBuy,
    clear,
};
