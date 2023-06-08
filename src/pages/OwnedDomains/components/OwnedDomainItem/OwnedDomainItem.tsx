import { FC, useCallback } from 'react';
import { cn } from '@bem-react/classname';
import { Domain } from 'types';
import { Icons } from 'assets';
import moment from 'moment';
import { Button } from 'components';
import { useNavigate } from 'react-router-dom';

import './OwnedDomainItem.scss';
import { fromDecimals } from 'utils/decimals';

const CnOwnedDomainItem = cn('ownedDomainItem');

export const OwnedDomainItem: FC<Domain> = ({
    fullName,
    price,
    id,
    hPrice,
}) => {
    const navigate = useNavigate();

    const clickCallback = useCallback(() => {
        navigate(`/domains/${id}/manage`);
    }, [navigate, id]);

    return (
        <div className={CnOwnedDomainItem()}>
            <div className={CnOwnedDomainItem('left')}>
                <div className={CnOwnedDomainItem('name')}>{fullName}</div>
                {/* <div className={CnOwnedDomainItem('expire')}>
                    <div className={CnOwnedDomainItem('expire-label')}>
                        Expires on
                    </div>
                    <div className={CnOwnedDomainItem('expire-date')}>
                        {moment().format('YYYY/MM/DD HH:mm')}
                    </div>
                </div> */}
            </div>
            <div className={CnOwnedDomainItem('right')}>
                <div className={CnOwnedDomainItem('price')}>
                    <Icons.Venom />
                    {fromDecimals(hPrice, 9)}
                </div>

                <Button onClick={clickCallback} view="bordered" size="s">
                    Manage
                </Button>
            </div>
        </div>
    );
};
