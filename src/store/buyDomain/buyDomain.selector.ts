import { createSelector } from '@reduxjs/toolkit';
import { State } from '../store';

const buyDomainSelector = (state: State) => state.buyDomain;

const price = createSelector(buyDomainSelector, (state) => state.price);
const domain = createSelector(buyDomainSelector, (state) => state.domain);
const feePerYear = createSelector(
    buyDomainSelector,
    (state) => state.feePerYear,
);

export const buyDomainSelectors = {
    price,
    domain,
    feePerYear,
};
