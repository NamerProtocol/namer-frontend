import { FC, useEffect, useMemo } from 'react';
import { cn } from '@bem-react/classname';
import { PageLayout } from 'layouts';
import { OwnedDomainItem } from './components';
import { useAppDispatch, useAppSelector, useVenom } from 'hooks';
import { domainsActions, domainsSelectors } from 'store';

import './OwnedDomains.scss';

const CnOwnedDomains = cn('ownedDomains');

export const OwnedDomains: FC = () => {
    const { address } = useVenom();
    const dispatch = useAppDispatch();
    const ownedDomains = useAppSelector(domainsSelectors.owned);

    useEffect(() => {
        dispatch(domainsActions.fetchDomainsByOwner(address));
    }, [address, dispatch]);

    const content = useMemo(() => {
        return ownedDomains.map((domain) => (
            <OwnedDomainItem key={domain.id} {...domain} />
        ));
    }, [ownedDomains]);

    return (
        <PageLayout className={CnOwnedDomains()}>
            <div className={CnOwnedDomains('domains')}>{content}</div>
        </PageLayout>
    );
};
