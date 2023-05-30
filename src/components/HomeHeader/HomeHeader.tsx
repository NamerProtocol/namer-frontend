import { cn } from '@bem-react/classname';
import { FC, memo } from 'react';
import { Wallet } from 'components';
import { Icons } from 'assets';

import './HomeHeader.scss';

const CnHomeHeader = cn('homeHeader');

export const HomeHeader: FC = memo(() => {
    return (
        <div className={CnHomeHeader()}>
            <Icons.Logo />

            <div className={CnHomeHeader('action')}>
                <Wallet />
            </div>
        </div>
    );
});
