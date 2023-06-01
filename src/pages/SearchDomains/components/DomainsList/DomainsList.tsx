import { FC, useMemo } from 'react';
import { cn } from '@bem-react/classname';
import { Domain } from 'types';
import { BuyButton } from 'components';
import { Icons } from 'assets';
import { useAppSelector } from 'hooks';
import { domainsSelectors } from 'store';

import './DomainsList.scss';

const CnDomainsList = cn('domainsList');

interface IDomainsListProps {
    items: Domain[];
}

export const DomainsList: FC<IDomainsListProps> = ({ items }) => {
    const domainsContent = useMemo(() => {
        return items.map((domain) => (
            <DomainsListItem key={domain.id} {...domain} />
        ));
    }, [items]);

    return <div className={CnDomainsList()}>{domainsContent}</div>;
};

const CnDomainsListItem = cn('domainsListItem');

interface IDomainsListItem extends Domain {}

export const DomainsListItem: FC<IDomainsListItem> = ({
    fullName,
    price,
    level,
}) => {
    return (
        <div className={CnDomainsListItem()}>
            <div className={CnDomainsListItem('name')}>
                {level === 1 ? '.' : ''}
                {fullName}
            </div>

            <div className={CnDomainsListItem('action')}>
                <div className={CnDomainsListItem('price')}>
                    <Icons.Venom />
                    {price}
                </div>
                <div className={CnDomainsListItem('button')}>
                    <BuyButton />
                </div>
            </div>
        </div>
    );
};
