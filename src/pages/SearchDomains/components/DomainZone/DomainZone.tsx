import { FC, memo, useCallback, useMemo } from 'react';
import { cn } from '@bem-react/classname';
import { Button, Title } from 'components';
import { Icons } from 'assets';
import { useAppDispatch, useAppSelector } from 'hooks';
import { buyDomainActions, domainsSelectors } from 'store';
import { getFormattedAddress } from 'utils/getFormattedAddress';

import './DomainZone.scss';
import { useNavigate } from 'react-router-dom';

const CnDomainZone = cn('domainZone');

export const DomainZone: FC = memo(() => {
    const domains = useAppSelector(domainsSelectors.domainsSearch);

    const domainZone = useMemo(
        () => (domains.zone ? domains.zone : null),
        [domains],
    );

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const buyClickHandler = useCallback(() => {
        if (!domainZone) return;

        dispatch(buyDomainActions.setDomainToBuy(domainZone));
        navigate('?modal=buyDomain');
    }, [dispatch, domainZone, navigate]);

    const domainZoneInfoContent = useMemo(() => {
        if (!domainZone) return null;

        return (
            <div className={CnDomainZone('info')}>
                {domainZone.owner && (
                    <div className={CnDomainZone('info-item')}>
                        <div className={CnDomainZone('info-item-title')}>
                            Owned by
                        </div>
                        <div className={CnDomainZone('info-item-value')}>
                            <div className={CnDomainZone('ownedBy')}>
                                {getFormattedAddress(domainZone.owner)}
                            </div>
                        </div>
                    </div>
                )}
                <div className={CnDomainZone('info-item')}>
                    <div className={CnDomainZone('info-item-title')}>
                        Top offer
                    </div>
                    <div className={CnDomainZone('info-item-value')}>
                        {Math.floor(Math.random() * 10000)}$
                    </div>
                </div>
            </div>
        );
    }, [domainZone]);

    const domainZoneStatContent = useMemo(() => {
        return (
            <div className={CnDomainZone('stat')}>
                <div className={CnDomainZone('stat-item')}>
                    <div className={CnDomainZone('stat-item-title')}>
                        Domains
                    </div>
                    <div className={CnDomainZone('stat-item-value')}>
                        {Math.floor(Math.random() * 1000)}
                    </div>
                </div>
                <div className={CnDomainZone('stat-item')}>
                    <div className={CnDomainZone('stat-item-title')}>Sales</div>
                    <div className={CnDomainZone('stat-item-value')}>
                        {Math.floor(Math.random() * 100000)}
                    </div>
                </div>
                <div className={CnDomainZone('stat-item')}>
                    <div className={CnDomainZone('stat-item-title')}>
                        Holders
                    </div>
                    <div className={CnDomainZone('stat-item-value')}>
                        {Math.floor(Math.random() * 10000)}
                    </div>
                </div>
                <div className={CnDomainZone('stat-item')}>
                    <div className={CnDomainZone('stat-item-title')}>
                        Total volume
                    </div>
                    <div className={CnDomainZone('stat-item-value')}>
                        {Math.floor(Math.random() * 10000)}$
                    </div>
                </div>
            </div>
        );
    }, []);

    if (!domainZone) return null;

    return (
        <div className={CnDomainZone()}>
            <div className={CnDomainZone('content')}>
                <div className={CnDomainZone('row')}>
                    <div className={CnDomainZone('name')}>
                        <Title size="xxs" uppercase>
                            Domain zone
                        </Title>
                        <div className={CnDomainZone('name-title')}>
                            .{domainZone.fullName}
                        </div>
                    </div>

                    {domainZoneInfoContent}
                </div>

                <div className={CnDomainZone('row')}>
                    {domainZoneStatContent}
                    <div className={CnDomainZone('actions')}>
                        {/* <Button size="s">Make offer</Button> */}
                        <Button
                            onClick={buyClickHandler}
                            view="action"
                            size="s"
                        >
                            <Icons.Venom />
                            {domainZone.price}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
});
