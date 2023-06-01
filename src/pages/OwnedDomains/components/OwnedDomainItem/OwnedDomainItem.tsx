import { FC } from 'react';
import { cn } from '@bem-react/classname';
import { Domain } from 'types';
import { Icons } from 'assets';
import moment from 'moment';

import './OwnedDomainItem.scss';
import { Button } from 'components';

const CnOwnedDomainItem = cn('ownedDomainItem');

export const OwnedDomainItem: FC<Domain> = ({ fullName, price }) => {
    return (
        <div className={CnOwnedDomainItem()}>
            <div className={CnOwnedDomainItem('left')}>
                <div className={CnOwnedDomainItem('name')}>{fullName}</div>
                <div className={CnOwnedDomainItem('expire')}>
                    <div className={CnOwnedDomainItem('expire-label')}>
                        Expires on
                    </div>
                    <div className={CnOwnedDomainItem('expire-date')}>
                        {moment().format('YYYY/MM/DD HH:mm')}
                    </div>
                </div>
            </div>
            <div className={CnOwnedDomainItem('right')}>
                <div className={CnOwnedDomainItem('price')}>
                    <Icons.Venom />
                    {price}
                </div>

                <Button view="bordered" size="s">
                    Manage
                </Button>
            </div>
        </div>
    );
};
