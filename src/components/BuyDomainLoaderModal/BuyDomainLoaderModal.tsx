import { cn } from '@bem-react/classname';
import { FC, useEffect } from 'react';
import { Modal } from 'components';
import { Icons } from 'assets';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { buyDomainSelectors } from 'store';

import './BuyDomainLoaderModal.scss';

const domainGif = require('assets/images/domain-image.gif');

const CnBuyDomainLoaderModal = cn('buyDomainLoaderModal');

export const BuyDomainLoaderModal: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const domain = useAppSelector(buyDomainSelectors.domain);

    useEffect(() => {
        if (!domain) {
            navigate(location.pathname);
        }
    }, [domain, navigate]);

    return (
        <Modal title="Buy domain name" className={CnBuyDomainLoaderModal()}>
            <div className={CnBuyDomainLoaderModal('image')}>
                <img src={domainGif} alt="Domain" />
            </div>
            <div className={CnBuyDomainLoaderModal('loader')}>
                <Icons.Loader />
            </div>
        </Modal>
    );
};
