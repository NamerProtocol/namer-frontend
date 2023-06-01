import { cn } from '@bem-react/classname';
import { FC } from 'react';

import './DomainFilters.scss';
import { Input } from 'components';
import { Icons } from 'assets';

const CnDomainFilters = cn('domainFilters');

const CnDomainFiltersItem = cn('domainFiltersItem');

export const DomainFilters: FC = () => {
    return (
        <div className={CnDomainFilters()}>
            <div className={CnDomainFiltersItem()}>
                <div className={CnDomainFiltersItem('label')}>Name</div>
                <div className={CnDomainFiltersItem('content')}>
                    <Input
                        bordered
                        view="white"
                        placeholder="Search"
                        icon={<Icons.Search />}
                        className={CnDomainFiltersItem('search')}
                    />
                </div>
            </div>
        </div>
    );
};

export const DomainFiltersItem: FC = () => {
    return (
        <div className={CnDomainFiltersItem()}>
            <div className={CnDomainFiltersItem('label')}></div>
            <div className={CnDomainFiltersItem('content')}></div>
        </div>
    );
};
