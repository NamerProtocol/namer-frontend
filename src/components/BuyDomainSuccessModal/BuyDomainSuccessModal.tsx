import { cn } from '@bem-react/classname';
import { FC, useCallback, useEffect } from 'react';
import { Button, Modal } from 'components';
import { Icons } from 'assets';

import './BuyDomainSuccessModal.scss';
import { useAppDispatch, useAppSelector } from 'hooks';
import { buyDomainActions, buyDomainSelectors } from 'store';
import { useLocation, useNavigate } from 'react-router-dom';

const domainGif = require('assets/images/domain-image.gif');

const CnBuyDomainSuccessModal = cn('buyDomainSuccessModal');

export const BuyDomainSuccessModal: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const domain = useAppSelector(buyDomainSelectors.domain);

    useEffect(() => {
        if (!domain) {
            navigate(location.pathname);
        }
    }, [domain, navigate]);

    const goToMyDomainsClickCallback = useCallback(() => {
        dispatch(buyDomainActions.clear());
        navigate('/account/domains');
    }, [navigate, dispatch]);

    return (
        <Modal
            title="Successful purchase!"
            className={CnBuyDomainSuccessModal()}
        >
            <div className={CnBuyDomainSuccessModal('image')}>
                <img src={domainGif} alt="Domain" />
            </div>
            <div className={CnBuyDomainSuccessModal('domain')}>
                <div className={CnBuyDomainSuccessModal('domain-name')}>
                    {domain?.level === 1
                        ? `.${domain.fullName}`
                        : domain?.fullName}
                </div>

                <div className={CnBuyDomainSuccessModal('price')}>
                    <div className={CnBuyDomainSuccessModal('price-label')}>
                        Total price
                    </div>
                    <div className={CnBuyDomainSuccessModal('price-value')}>
                        <Icons.Venom />
                        {domain?.price}
                    </div>
                </div>

                <div className={CnBuyDomainSuccessModal('action')}>
                    <Button
                        onClick={goToMyDomainsClickCallback}
                        view="action"
                        size="s"
                    >
                        Go to my domains
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
