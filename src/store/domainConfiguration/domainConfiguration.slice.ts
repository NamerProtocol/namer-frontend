import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { FetchStatus } from 'types';
import { domainConfigurationActions } from './domainConfiguration.action';

export interface DomainConfigurationState {
    fetchStatus: FetchStatus;
    domain: null | any;
    configuration: any;
}

const initialState: DomainConfigurationState = {
    fetchStatus: FetchStatus.INITIAL,
    domain: null,
    configuration: {},
};

export const domainConfigurationSlice = createSlice<
    DomainConfigurationState,
    SliceCaseReducers<DomainConfigurationState>
>({
    name: 'domainConfiguration',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            domainConfigurationActions.fetchDomainById.pending,
            (state, { payload }) => {
                state.fetchStatus = FetchStatus.FETCHING;
            },
        );

        builder.addCase(
            domainConfigurationActions.fetchDomainById.rejected,
            (state, { payload }) => {
                state.fetchStatus = FetchStatus.FETCHED;
            },
        );

        builder.addCase(
            domainConfigurationActions.fetchDomainById.fulfilled,
            (state, { payload }) => {
                state.fetchStatus = FetchStatus.FETCHED;

                state.domain = payload;

                if (payload?.additionalData) {
                    state.configuration = payload.additionalData;
                } else {
                    state.configuration = {};
                }
            },
        );

        builder.addCase(
            domainConfigurationActions.fetchUpdateDomain.pending,
            (state, { payload }) => {
                state.fetchStatus = FetchStatus.FETCHING;
            },
        );

        builder.addCase(
            domainConfigurationActions.fetchUpdateDomain.fulfilled,
            (state, { payload }) => {
                state.fetchStatus = FetchStatus.FETCHED;

                state.domain = payload;

                if (payload.additionalData) {
                    state.configuration = payload.additionalData;
                }
            },
        );

        builder.addCase(
            domainConfigurationActions.fetchUpdateDomain.rejected,
            (state) => {
                state.fetchStatus = FetchStatus.FETCHED;
            },
        );

        builder.addCase(
            domainConfigurationActions.updateConfiguration,
            (state, { payload: { key, value } }) => {
                state.configuration[key] = value;
            },
        );

        builder.addCase(
            domainConfigurationActions.updateDomain,
            (state, { payload: { key, value } }) => {
                state.domain[key] = value;

                if (key === 'price') {
                    state.configuration['pricePerYear'] = Number(value) * 0.01;
                }
            },
        );

        builder.addCase(
            domainConfigurationActions.setDomain,
            (state, { payload }) => {
                state.domain = payload;

                if (payload?.additionalData) {
                    state.configuration = payload.additionalData;
                }
            },
        );
    },
});

export const domainConfigurationReducer = domainConfigurationSlice.reducer;
