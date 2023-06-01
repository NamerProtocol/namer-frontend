import { createSelector } from '@reduxjs/toolkit';
import { State } from '../store';

const domainsSelector = (state: State) => state.domains;

const domains = createSelector(domainsSelector, (state) => state.domains);

const domainsSearch = createSelector(
    domainsSelector,
    (state) => state.domainsSearch,
);

const owned = createSelector(domainsSelector, (state) => state.owned);

const search = createSelector(domainsSelector, (state) => state.search);

export const domainsSelectors = {
    domainsSelector,
    domains,
    owned,
    search,
    domainsSearch,
};
