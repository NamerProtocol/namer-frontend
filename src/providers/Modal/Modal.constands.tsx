import {
    BuyDomainSuccessModal,
    BuyDomainLoaderModal,
    BuyDomainModal,
    TransactionLoaderModal,
} from 'components';

export const modalTypes: Record<string, JSX.Element> = {
    buyDomain: <BuyDomainModal />,
    buyDomainLoader: <BuyDomainLoaderModal />,
    buyDomainSuccess: <BuyDomainSuccessModal />,
    transactionLoader: <TransactionLoaderModal />,
};
