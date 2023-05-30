import { FC, useMemo } from 'react';
import { cn } from '@bem-react/classname';
import { Button, Title } from 'components';
import { Icons } from 'assets';

import './DomainZone.scss';
import { useAppSelector } from 'hooks';
import { domainsSelectors } from 'store';
import { getFormattedAddress } from 'utils/getFormattedAddress';

const CnDomainZone = cn('domainZone');

export const DomainZone: FC = () => {
    const domains = useAppSelector(domainsSelectors.domains);

    const domainsZone = useMemo(() => {
        return domains.find((domain) => domain.level === 1);
    }, [domains]);

    if (!domainsZone) return null;

    return (
        <div className={CnDomainZone()}>
            <div className={CnDomainZone('content')}>
                <div className={CnDomainZone('row')}>
                    <div className={CnDomainZone('name')}>
                        <Title size="xxs" uppercase>
                            Domain zone
                        </Title>
                        <div className={CnDomainZone('name-title')}>
                            .{domainsZone.fullName}
                        </div>
                    </div>

                    <div className={CnDomainZone('info')}>
                        <div className={CnDomainZone('info-item')}>
                            <div className={CnDomainZone('info-item-title')}>
                                Owned by
                            </div>
                            <div className={CnDomainZone('info-item-value')}>
                                <div className={CnDomainZone('ownedBy')}>
                                    {getFormattedAddress(domainsZone.owner)}
                                </div>
                            </div>
                        </div>
                        <div className={CnDomainZone('info-item')}>
                            <div className={CnDomainZone('info-item-title')}>
                                Top offer
                            </div>
                            <div className={CnDomainZone('info-item-value')}>
                                22,400$
                            </div>
                        </div>
                    </div>
                </div>

                <div className={CnDomainZone('row')}>
                    <div className={CnDomainZone('stat')}>
                        <div className={CnDomainZone('stat-item')}>
                            <div className={CnDomainZone('stat-item-title')}>
                                Domains
                            </div>
                            <div className={CnDomainZone('stat-item-value')}>
                                1,000
                            </div>
                        </div>
                        <div className={CnDomainZone('stat-item')}>
                            <div className={CnDomainZone('stat-item-title')}>
                                Sales
                            </div>
                            <div className={CnDomainZone('stat-item-value')}>
                                5,235
                            </div>
                        </div>
                        <div className={CnDomainZone('stat-item')}>
                            <div className={CnDomainZone('stat-item-title')}>
                                Holders
                            </div>
                            <div className={CnDomainZone('stat-item-value')}>
                                461,906
                            </div>
                        </div>
                        <div className={CnDomainZone('stat-item')}>
                            <div className={CnDomainZone('stat-item-title')}>
                                Total volume
                            </div>
                            <div className={CnDomainZone('stat-item-value')}>
                                22,400$
                            </div>
                        </div>
                    </div>

                    <div className={CnDomainZone('actions')}>
                        <Button size="s">Make offer</Button>
                        <Button view="action" size="s">
                            <Icons.Venom />
                            {domainsZone.price}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
