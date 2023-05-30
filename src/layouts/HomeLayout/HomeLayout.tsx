import { cn } from '@bem-react/classname';
import { HomeHeader } from 'components';
import { FC, memo } from 'react';
import bg1 from 'assets/images/bg1.svg';
import bg2 from 'assets/images/bg2.svg';

import './HomeLayout.scss';

const CnHomeLayout = cn('homeLayout');

interface IHomeLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export const HomeLayout: FC<IHomeLayoutProps> = memo(
    ({ children, className }) => {
        return (
            <div className={CnHomeLayout({}, className)}>
                <div className={CnHomeLayout('background')}>
                    <img src={bg1} alt="" width={447} height={418} />
                    <img src={bg2} alt="" width={419} height={418} />
                </div>
                <HomeHeader />
                <div className={CnHomeLayout('content')}>{children}</div>
            </div>
        );
    },
);
