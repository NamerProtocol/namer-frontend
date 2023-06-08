import { FC, memo, useCallback, useMemo } from 'react';
import { cn } from '@bem-react/classname';
import { Button, BuyButton, Title } from 'components';
import { Icons } from 'assets';
import { useAppDispatch, useAppSelector } from 'hooks';
import { buyDomainActions, domainsSelectors } from 'store';
import { getFormattedAddress } from 'utils/getFormattedAddress';
import { useNavigate } from 'react-router-dom';

import './DomainZone.scss';
import { truncateNumbers } from 'utils/truncateNumbers';
import { fromDecimals } from 'utils/decimals';

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

    const isOwnerExist = useMemo(() => !!domainZone?.owner, [domainZone]);

    const domainZoneInfoContent = useMemo(() => {
        return (
            <div className={CnDomainZone('name-owner')}>
                {domainZone?.owner ? (
                    <>Owned by {getFormattedAddress(domainZone?.owner)}</>
                ) : (
                    <>Not registered</>
                )}
            </div>
        );
    }, [domainZone]);

    const domainZoneStatContent = useMemo(() => {
        if (!isOwnerExist) return <div></div>;

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
    }, [isOwnerExist]);

    if (!domainZone) return null;

    return (
        <div className={CnDomainZone()}>
            <div className={CnDomainZone('sphere')}>
                <Icons.Sphere />
            </div>
            <div className={CnDomainZone('content')}>
                <div className={CnDomainZone('row', { isOwnerExist })}>
                    <div className={CnDomainZone('name')}>
                        <div className={CnDomainZone('name-title')}>
                            .{domainZone.fullName}
                        </div>
                        <div className={CnDomainZone('name-owner')}>
                            {domainZoneInfoContent}
                        </div>
                    </div>
                    {!isOwnerExist && (
                        <div className={CnDomainZone('price')}>
                            {/* <Button size="s">Make offer</Button> */}
                            <div className={CnDomainZone('price-text')}>
                                <Icons.Venom />
                                {truncateNumbers(
                                    String(fromDecimals(domainZone.price, 9)),
                                )}
                            </div>
                            <BuyButton yellow onBuyClick={buyClickHandler} />
                        </div>
                    )}
                </div>

                <div className={CnDomainZone('row')}>
                    {domainZoneStatContent}
                    {isOwnerExist && (
                        <div className={CnDomainZone('price')}>
                            {/* <Button size="s">Make offer</Button> */}
                            <div className={CnDomainZone('price-text')}>
                                <Icons.Venom />
                                {domainZone.address
                                    ? truncateNumbers(
                                          String(
                                              fromDecimals(
                                                  domainZone.hPrice,
                                                  9,
                                              ),
                                          ),
                                      )
                                    : truncateNumbers(
                                          String(
                                              fromDecimals(domainZone.price, 9),
                                          ),
                                      )}
                            </div>
                            <BuyButton yellow onBuyClick={buyClickHandler} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});
