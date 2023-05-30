import { combineReducers } from '@reduxjs/toolkit';
import { domainsReducer } from './domains/domains.slice';

export const rootReducer = combineReducers({
    domains: domainsReducer,
});
