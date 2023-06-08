import { cn } from '@bem-react/classname';
import { FC, memo } from 'react';

import './Navigation.scss';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from 'hooks';

const CnNavigation = cn('manageDomainsNavigation');

const navItems = [
    {
        to: '#zone',
        text: 'Zone option',
    },
    {
        to: '#price',
        text: "Harberger's price",
    },
    {
        to: '#royalty',
        text: 'Royalty & Settings',
    },
    // {
    //     to: '#subdomains',
    //     text: 'Subdomains',
    // },
];

export const Navigation: FC = memo(() => {
    const { hash } = useLocation();
    const domain = useAppSelector((store) => store.domainConfiguration.domain);

    return (
        <div className={CnNavigation()}>
            {navItems.map(({ to, text }) => {
                const isSelected = hash ? hash === to : to === '#zone';

                return (
                    <Link
                        key={to}
                        to={to}
                        className={CnNavigation('item', {
                            selected: isSelected,
                        })}
                    >
                        {text}
                    </Link>
                );
            })}
        </div>
    );
});
