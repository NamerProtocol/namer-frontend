import {
    MainInformationForm,
    PriceForm,
    RoyaltySettingsForm,
    SubdomainsForm,
} from './components';

export const manageDomainItems: Record<string, JSX.Element> = {
    '#zone': <MainInformationForm />,
    '#subdomains': <SubdomainsForm />,
    '#price': <PriceForm />,
    '#royalty': <RoyaltySettingsForm />,
};
