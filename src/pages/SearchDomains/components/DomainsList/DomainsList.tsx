import { FC, useCallback, useMemo } from 'react';
import { cn } from '@bem-react/classname';
import { Domain } from 'types';
import { BuyButton } from 'components';
import { Icons } from 'assets';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useNavigate } from 'react-router-dom';

import './DomainsList.scss';
import { buyDomainActions } from 'store';
import { fromDecimals } from 'utils/decimals';

const CnDomainsList = cn('domainsList');

interface IDomainsListProps {
    items: Domain[];
}

export const DomainsList: FC<IDomainsListProps> = ({ items }) => {
    const domainsContent = useMemo(() => {
        return items.map((domain, index) => (
            <DomainsListItem key={`${domain.id}${index}`} {...domain} />
        ));
    }, [items]);

    return <div className={CnDomainsList()}>{domainsContent}</div>;
};

const CnDomainsListItem = cn('domainsListItem');

interface IDomainsListItem extends Domain {}

export const DomainsListItem: FC<IDomainsListItem> = (domain) => {
    const { fullName, price, level, owner, hPrice } = domain;

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const priceContent = useMemo(() => {
        if (hPrice) {
            return fromDecimals(hPrice, 9);
        } else {
            return fromDecimals(price, 9);
        }
    }, [price, hPrice]);

    const buyClickHandler = useCallback(() => {
        if (!domain.owner) {
            console.log(domain.owner);
            dispatch(buyDomainActions.setDomainToBuy(domain));
            navigate('?modal=buyDomain');
        }
    }, [dispatch, domain, navigate]);

    return (
        <div className={CnDomainsListItem()}>
            <div className={CnDomainsListItem('name')}>
                {level === 1 ? '.' : ''}
                {fullName}
            </div>

            <div className={CnDomainsListItem('action')}>
                <div className={CnDomainsListItem('price')}>
                    <Icons.Venom />
                    {priceContent}
                </div>
                <div className={CnDomainsListItem('button')}>
                    <BuyButton onBuyClick={buyClickHandler} />
                </div>
            </div>
        </div>
    );
};
