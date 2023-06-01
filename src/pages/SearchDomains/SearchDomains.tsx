import { FC, useMemo } from 'react';
import { cn } from '@bem-react/classname';
import { PageLayout } from 'layouts';
import { DomainFilters, DomainsList, DomainZone } from './components';
import { Title } from 'components';
import { useAppSelector } from 'hooks';
import { domainsSelectors } from 'store';

import './SearchDomains.scss';

const CnSearchDomains = cn('searchDomains');

export const SearchDomains: FC = () => {
    const domainsSearch = useAppSelector(domainsSelectors.domainsSearch);

    const domainNamesItems = useMemo(() => {
        if (!domainsSearch.exactMatch) return [];

        return [domainsSearch.exactMatch, ...domainsSearch.differentZones];
    }, [domainsSearch]);

    const domainSimilarItems = useMemo(() => {
        return domainsSearch.similarNames;
    }, [domainsSearch]);

    return (
        <PageLayout className={CnSearchDomains()}>
            <DomainZone />
            <div className={CnSearchDomains('layout')}>
                <Title view="black" size="xs">
                    Domain names
                </Title>
                <div className={CnSearchDomains('row')}>
                    <div className={CnSearchDomains('col')}>
                        <DomainsList items={domainNamesItems} />
                        <Title view="black" size="xs">
                            Similar
                        </Title>
                        <DomainsList items={domainSimilarItems} />
                    </div>

                    <div>
                        <DomainFilters />
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};
