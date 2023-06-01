import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { Domain, FetchStatus } from 'types';
import { domainsActions } from './domains.action';

export interface DomainsState {
    fetchStatus: FetchStatus;
    domains: Domain[];
    owned: Domain[];
    domainsSearch: {
        exactMatch: Domain | null;
        zone: Domain | null;
        similarZones: Domain[];
        differentZones: Domain[];
        similarNames: Domain[];
    };
    search: string;
}

const initialState: DomainsState = {
    fetchStatus: FetchStatus.INITIAL,
    domains: [],
    owned: [],
    search: '',
    domainsSearch: {
        exactMatch: null,
        zone: null,
        similarNames: [],
        differentZones: [],
        similarZones: [],
    },
};

export const domainsSlice = createSlice<
    DomainsState,
    SliceCaseReducers<DomainsState>
>({
    name: 'domains',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(domainsActions.setSearch, (state, { payload }) => {
            state.search = payload;
        });

        builder.addCase(
            domainsActions.fetchDomainsByKeyword.pending,
            (state) => {
                state.fetchStatus = FetchStatus.FETCHING;
            },
        );

        builder.addCase(
            domainsActions.fetchDomainsByKeyword.fulfilled,
            (state, { payload }) => {
                state.fetchStatus = FetchStatus.FETCHED;
                state.domainsSearch = payload;
            },
        );

        builder.addCase(
            domainsActions.fetchDomainsByKeyword.rejected,
            (state) => {
                state.fetchStatus = FetchStatus.FETCHED;
            },
        );

        builder.addCase(domainsActions.fetchDomainsByOwner.pending, (state) => {
            state.fetchStatus = FetchStatus.FETCHING;
        });

        builder.addCase(
            domainsActions.fetchDomainsByOwner.fulfilled,
            (state, { payload }) => {
                state.fetchStatus = FetchStatus.FETCHED;
                state.owned = payload;
            },
        );

        builder.addCase(
            domainsActions.fetchDomainsByOwner.rejected,
            (state) => {
                state.fetchStatus = FetchStatus.FETCHED;
            },
        );
    },
});

export const domainsReducer = domainsSlice.reducer;
