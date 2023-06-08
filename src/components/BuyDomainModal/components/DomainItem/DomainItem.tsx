import { cn } from '@bem-react/classname';
import { FC, memo } from 'react';
import { Domain } from 'types';

import './DomainItem.scss';
import { Icons } from 'assets';
import { fromDecimals } from 'utils/decimals';

const CnDomainItem = cn('domainItem');

interface IDomainItem extends Domain {}

export const DomainItem: FC<IDomainItem> = memo(({ fullName, price }) => {
    return (
        <div className={CnDomainItem()}>
            <div className={CnDomainItem('left')}>
                <div className={CnDomainItem('icon')}>
                    <Icons.Namer />
                </div>
                <div className={CnDomainItem('name')}>{fullName}</div>
            </div>
            <div className={CnDomainItem('price')}>
                <Icons.Venom />
                {fromDecimals(price, 9)}
            </div>
        </div>
    );
});
