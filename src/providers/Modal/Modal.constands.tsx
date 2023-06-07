import {
    BuyDomainSuccessModal,
    BuyDomainLoaderModal,
    BuyDomainModal,
} from 'components';

export const modalTypes: Record<string, JSX.Element> = {
    buyDomain: <BuyDomainModal />,
    buyDomainLoader: <BuyDomainLoaderModal />,
    buyDomainSuccess: <BuyDomainSuccessModal />,
};
