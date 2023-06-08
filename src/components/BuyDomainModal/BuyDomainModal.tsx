import { cn } from '@bem-react/classname';
import { Button, Counter, Input, Modal } from 'components';
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { DomainItem } from './components';
import {
    useAppDispatch,
    useAppSelector,
    useDeferredValue,
    useVenom,
} from 'hooks';
import { fetchDomainUpdateRequest } from 'api/domains';
import { Icons } from 'assets';

import './BuyDomainModal.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { buyDomainActions, buyDomainSelectors } from 'store';
import { useDispatch } from 'react-redux';
import { fromDecimals, toDecimals } from 'utils/decimals';

const domainGif = require('assets/images/domain-image.gif');

const CnBuyDomainModal = cn('buyDomainModal');

export const BuyDomainModal: FC = memo(() => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const domain = useAppSelector(buyDomainSelectors.domain);
    const price = useAppSelector(buyDomainSelectors.price);
    const feePerYear = useAppSelector(buyDomainSelectors.feePerYear);

    useEffect(() => {
        if (!domain) {
            navigate(location.pathname);
        }
    }, [domain]);

    const priceChangeCallback = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!isNaN(Number(e.target.value))) {
                dispatch(
                    buyDomainActions.setPrice(
                        toDecimals(Number(e.target.value), 9).toString(),
                    ),
                );
            }
        },
        [dispatch],
    );

    const totalPrice = useMemo(() => {
        if (!domain) return null;

        return (
            Number(fromDecimals(Number(feePerYear), 9)) +
            fromDecimals(domain?.hPrice ? domain.hPrice : domain.price, 9)
        ).toFixed(2);
    }, [feePerYear, domain]);

    const { address, connect, buyDomain } = useVenom();

    const isWalletConnected = useMemo(() => !!address, [address]);

    const buyClickCallback = useCallback(async () => {
        if (!domain) return;

        try {
            buyDomain(domain, price, totalPrice);
            // sendTransaction();
        } catch {}
    }, [buyDomain, domain, price, totalPrice]);

    const mintingPriceContent = useMemo(() => {
        if (domain?.hPrice) {
            return fromDecimals(domain.hPrice, 9);
        } else {
            return fromDecimals(domain?.price as number, 9);
        }
    }, [domain]);

    const domainInfoContent = useMemo(() => {
        if (!domain) return null;

        return (
            <div className={CnBuyDomainModal('info')}>
                <div className={CnBuyDomainModal('domain')}>
                    <div className={CnBuyDomainModal('domain-image')}>
                        <img src={domainGif} alt="Domain" />
                    </div>
                    <div className={CnBuyDomainModal('domain-name')}>
                        {domain.fullName}
                    </div>
                </div>

                <div className={CnBuyDomainModal('info-text')}>
                    Namer uses Harberger's tax to allocate names to users who
                    value them the most.
                    <br />
                    <br />A user must specify how much they value a name by
                    setting its{' '}
                    <a className={CnBuyDomainModal('info-text-popup')}>
                        Harberger's price
                        <Icons.Info />
                        <div className={CnBuyDomainModal('popup')}>
                            <div className={CnBuyDomainModal('popup-title')}>
                                What is Harberger tax?
                            </div>

                            <div className={CnBuyDomainModal('popup-text')}>
                                Harberger tax is a special tax on things people
                                own, like houses or cars. It's unique because
                                owners have to say how much they would sell
                                their things for. If someone wants to buy it,
                                they can pay that price, become the new owner,
                                and pay the tax themselves.This helps make sure
                                people use their things well and keeps the
                                prices fair.
                            </div>
                        </div>
                    </a>
                    <br />
                    <br />
                    This name can be bought anytime for that price. To make sure
                    that the users set reasonable prices, Namer charges a
                    renewal fee as 1% of the Harberger's price.
                </div>
            </div>
        );
    }, [domain]);

    const formContent = useMemo(() => {
        if (!domain) return null;

        return (
            <div className={CnBuyDomainModal('form')}>
                <div className={CnBuyDomainModal('form-item')}>
                    <div className={CnBuyDomainModal('form-item-label')}>
                        Harberger’s price
                    </div>
                    <div className={CnBuyDomainModal('form-item-descr')}>
                        Others will be able to buy your domain for this price at
                        any time. The higher value you specify, the higher your
                        annual fee will be.
                    </div>
                    <div className={CnBuyDomainModal('form-item-field')}>
                        <Input
                            view="white"
                            value={fromDecimals(Number(price), 9)}
                            onChange={priceChangeCallback}
                            icon={<Icons.Venom color="#A0A0A0" />}
                        />
                    </div>
                </div>
                <div className={CnBuyDomainModal('form-item')}>
                    <div className={CnBuyDomainModal('form-item-label')}>
                        Your payment per year
                    </div>
                    <div className={CnBuyDomainModal('form-item-descr')}>
                        You pay 1% of the price
                    </div>
                    <div className={CnBuyDomainModal('form-item-field')}>
                        <Input
                            disabled
                            view="dark"
                            value={fromDecimals(Number(feePerYear), 9)}
                            icon={<Icons.Venom color="#A0A0A0" />}
                        />
                    </div>
                </div>
                {/* <div
                        className={CnBuyDomainModal('form-item', {
                            counter: true,
                        })}
                    >
                        <div className={CnBuyDomainModal('form-item-label')}>
                            Registration year
                        </div>
                        <div className={CnBuyDomainModal('form-item-descr')}>
                            For these years you will pay
                        </div>
                        <div className={CnBuyDomainModal('form-item-field')}>
                            <Counter />
                        </div>
                    </div> */}

                <div className={CnBuyDomainModal('form-info')}>
                    <div className={CnBuyDomainModal('form-info-item')}>
                        <div
                            className={CnBuyDomainModal('form-info-item-label')}
                        >
                            Minting price
                        </div>
                        <div
                            className={CnBuyDomainModal('form-info-item-price')}
                        >
                            <Icons.Venom />
                            {mintingPriceContent}
                        </div>
                    </div>
                    <div className={CnBuyDomainModal('form-info-item')}>
                        <div
                            className={CnBuyDomainModal('form-info-item-label')}
                        >
                            Annual fee
                        </div>
                        <div
                            className={CnBuyDomainModal('form-info-item-price')}
                        >
                            <Icons.Venom />
                            {fromDecimals(Number(feePerYear), 9)}
                        </div>
                    </div>
                    <div className={CnBuyDomainModal('form-info-item')}>
                        <div
                            className={CnBuyDomainModal('form-info-item-label')}
                        >
                            Total
                        </div>
                        <div
                            className={CnBuyDomainModal(
                                'form-info-item-price',
                                {
                                    total: true,
                                },
                            )}
                        >
                            <Icons.Venom />
                            {totalPrice}
                        </div>
                    </div>
                </div>

                <div className={CnBuyDomainModal('form-action')}>
                    {isWalletConnected ? (
                        <Button
                            onClick={buyClickCallback}
                            view="action"
                            size="m"
                        >
                            Buy
                        </Button>
                    ) : (
                        <Button onClick={connect} view="action" size="m">
                            Connect wallet
                        </Button>
                    )}
                </div>
            </div>
        );
    }, [
        isWalletConnected,
        price,
        priceChangeCallback,
        totalPrice,
        domain,
        feePerYear,
        connect,
        buyClickCallback,
    ]);

    return (
        <Modal title="Buy domain name" className={CnBuyDomainModal()}>
            <div className={CnBuyDomainModal('row')}>
                {domainInfoContent}
                {formContent}
            </div>
        </Modal>
    );
});
