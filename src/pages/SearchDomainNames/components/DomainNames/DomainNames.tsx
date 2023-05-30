import { FC, useMemo } from 'react';
import { cn } from '@bem-react/classname';
import { Domain } from 'types';
import { BuyButton } from 'components';
import { Icons } from 'assets';
import { useAppSelector } from 'hooks';
import { domainsSelectors } from 'store';

import './DomainNames.scss';

const CnDomainNames = cn('domainNames');

export const DomainNames: FC = () => {
    const domains = useAppSelector(domainsSelectors.domains);

    const domainsContent = useMemo(() => {
        return domains
            .filter((domain) => domain.level !== 1)
            .map((domain) => <DomainNamesItem key={domain.id} {...domain} />);
    }, [domains]);

    return <div className={CnDomainNames()}>{domainsContent}</div>;
};

const CnDomainNamesItem = cn('domainNamesItem');

interface IDomainNamesItem extends Domain {}

export const DomainNamesItem: FC<IDomainNamesItem> = ({ fullName, price }) => {
    return (
        <div className={CnDomainNamesItem()}>
            <div className={CnDomainNamesItem('name')}>{fullName}</div>

            <div className={CnDomainNamesItem('action')}>
                <div className={CnDomainNamesItem('price')}>
                    <Icons.Venom />
                    {price}
                </div>
                <div className={CnDomainNamesItem('button')}>
                    <BuyButton />
                </div>
            </div>
        </div>
    );
};
