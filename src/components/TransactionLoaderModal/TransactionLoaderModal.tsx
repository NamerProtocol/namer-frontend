import { cn } from '@bem-react/classname';
import { FC } from 'react';
import { Modal } from 'components';
import { Icons } from 'assets';

import './TransactionLoaderModal.scss';

const domainGif = require('assets/images/domain-image.gif');

const CnTransactionLoaderModal = cn('transactionLoaderModal');

export const TransactionLoaderModal: FC = () => {
    return (
        <Modal
            title="Transaction in progress"
            className={CnTransactionLoaderModal()}
        >
            <div className={CnTransactionLoaderModal('image')}>
                <img src={domainGif} alt="Domain" />
            </div>
            <div className={CnTransactionLoaderModal('loader')}>
                <Icons.Loader />
            </div>
        </Modal>
    );
};
