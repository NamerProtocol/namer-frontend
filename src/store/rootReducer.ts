import { combineReducers } from '@reduxjs/toolkit';
import { domainsReducer } from './domains/domains.slice';
import { buyDomainReducer } from './buyDomain/buyDomain.slice';
import { domainConfigurationReducer } from './domainConfiguration/domainConfiguration.slice';

export const rootReducer = combineReducers({
    domains: domainsReducer,
    buyDomain: buyDomainReducer,
    domainConfiguration: domainConfigurationReducer,
});
