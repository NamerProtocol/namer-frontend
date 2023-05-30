import { cn } from '@bem-react/classname';
import { FC, memo } from 'react';

import './PopularZones.scss';
import { Button, Title } from 'components';
import { Icons } from '../../assets';

const CnPopularZones = cn('popularZones');

interface IPopularZonesProps {
    className?: string;
}

export const PopularZones: FC<IPopularZonesProps> = memo(({ className }) => {
    return (
        <div className={CnPopularZones({}, className)}>
            <div className={CnPopularZones('title')}>
                <Title size="s">Most popular zones</Title>

                <Button view="dark" size="s">
                    View more <Icons.ArrowRight />
                </Button>
            </div>
            <div className={CnPopularZones('content')}>
                <PopularZonesItem />
                <PopularZonesItem />
                <PopularZonesItem />
                <PopularZonesItem />
                <PopularZonesItem />
                <PopularZonesItem />
                <PopularZonesItem />
                <PopularZonesItem />
                <PopularZonesItem />
            </div>
        </div>
    );
});

interface IPopularZonesItemProps {}

const CnPopularZonesItem = cn('popularZonesItem');

export const PopularZonesItem: FC<IPopularZonesItemProps> = memo(({}) => {
    return (
        <div className={CnPopularZonesItem({})}>
            <div className={CnPopularZonesItem('title')}>.namer</div>
            <div className={CnPopularZonesItem('info')}>
                <div className={CnPopularZonesItem('info-item')}>
                    <div className={CnPopularZonesItem('info-label')}>
                        Domains
                    </div>
                    <div className={CnPopularZonesItem('info-value')}>
                        1,000
                    </div>
                </div>
                <div className={CnPopularZonesItem('info-item')}>
                    <div className={CnPopularZonesItem('info-label')}>
                        Volume
                    </div>
                    <div className={CnPopularZonesItem('info-value')}>
                        22,400$
                    </div>
                </div>
                <div className={CnPopularZonesItem('info-item')}>
                    <div className={CnPopularZonesItem('info-label')}>
                        Sales
                    </div>
                    <div className={CnPopularZonesItem('info-value')}>
                        5,235
                    </div>
                </div>
                <div className={CnPopularZonesItem('info-item')}>
                    <div className={CnPopularZonesItem('info-label')}>
                        Holders
                    </div>
                    <div className={CnPopularZonesItem('info-value')}>
                        461,906
                    </div>
                </div>
            </div>
        </div>
    );
});
