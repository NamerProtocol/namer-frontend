import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { Domain, FetchStatus } from 'types';
import { buyDomainActions } from './buyDomain.action';

export interface BuyDomainState {
    fetchStatus: FetchStatus;
    domain: null | Domain;
    price: string;
    feePerYear: string;
}

const initialState: BuyDomainState = {
    fetchStatus: FetchStatus.INITIAL,
    domain: null,
    price: '',
    feePerYear: '',
};

export const buyDomainSlice = createSlice<
    BuyDomainState,
    SliceCaseReducers<BuyDomainState>
>({
    name: 'buyDomain',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            buyDomainActions.setDomainToBuy,
            (state, { payload }) => {
                state.domain = payload;
                state.price = payload.hPrice
                    ? String(payload.hPrice)
                    : String(payload.price);
                state.feePerYear = String(
                    Number(
                        payload.hPrice
                            ? String(payload.hPrice)
                            : String(payload.price),
                    ) * 0.01,
                );
            },
        );

        builder.addCase(buyDomainActions.setPrice, (state, { payload }) => {
            state.price = payload;

            state.feePerYear = String(Number(payload) * 0.01);
        });

        builder.addCase(buyDomainActions.clear, (state) => {
            state.price = '';
            state.feePerYear = '';
            state.domain = null;
        });
    },
});

export const buyDomainReducer = buyDomainSlice.reducer;
