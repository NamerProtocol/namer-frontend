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
                dispatch(buyDomainActions.setPrice(e.target.value));
            }
        },
        [dispatch],
    );

    const totalPrice = useMemo(() => {
        if (!domain) return null;

        return (Number(feePerYear) + domain.price).toFixed(2);
    }, [feePerYear, domain]);

    const { address, connect, disconnect, buyDomain, sendTransaction } =
        useVenom();

    const isWalletConnected = useMemo(() => !!address, [address]);

    const buyClickCallback = useCallback(async () => {
        if (!domain) return;

        try {
            buyDomain(domain, price, totalPrice);
            // sendTransaction();
        } catch {}
    }, [buyDomain, domain, price, totalPrice]);

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
                    Yahoo! You want to buy a domain name. First we need to know:
                    how much does it cost you? How much does it worth for you?
                    <br />
                    <br />
                    Your name can be bought anytime for this price. Also this
                    price would be used to calculate annual renewal fee.
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
                        Price
                    </div>
                    <div className={CnBuyDomainModal('form-item-descr')}>
                        Enter how much do you estimate the cost of a domain. For
                        this price other buyers will be able to buy your domain
                    </div>
                    <div className={CnBuyDomainModal('form-item-field')}>
                        <Input
                            view="white"
                            value={price}
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
                            value={feePerYear}
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
                            {domain.price}
                        </div>
                    </div>
                    <div className={CnBuyDomainModal('form-info-item')}>
                        <div
                            className={CnBuyDomainModal('form-info-item-label')}
                        >
                            Fee for 1 year
                        </div>
                        <div
                            className={CnBuyDomainModal('form-info-item-price')}
                        >
                            <Icons.Venom />
                            {feePerYear}
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
