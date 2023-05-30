import { FC } from 'react';
import { cn } from '@bem-react/classname';
import { PageLayout } from 'layouts';
import { DomainFilters, DomainNames, DomainZone } from './components';
import { BuyButton, Title } from 'components';

import './SearchDomainNames.scss';

const CnSearchDomainNames = cn('searchDomainNames');

export const SearchDomainNames: FC = () => {
    return (
        <PageLayout className={CnSearchDomainNames()}>
            <DomainZone />
            <div className={CnSearchDomainNames('layout')}>
                <Title view="black" size="xs">
                    Domain names
                </Title>
                <div className={CnSearchDomainNames('row')}>
                    <DomainNames />
                    <DomainFilters />
                </div>
            </div>
        </PageLayout>
    );
};
