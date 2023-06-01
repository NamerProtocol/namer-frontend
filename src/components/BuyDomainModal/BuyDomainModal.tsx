import { cn } from '@bem-react/classname';
import { Button, Modal } from 'components';
import { FC, memo, useCallback, useMemo, useState } from 'react';
import { DomainItem } from './components';
import { useVenom } from 'hooks';
import { fetchDomainUpdateRequest } from 'api/domains';
import { Icons } from 'assets';

import './BuyDomainModal.scss';

const domainGif = require('assets/images/domain-image.gif');

const domain = {
    id: 'fdceb7be-ddb4-46f4-96c5-4f45b45e4385',
    name: 'zk',
    parentId: '69d80d63-5296-4c96-b57b-9beff3596655',
    price: 1000,
    fullName: 'zk.namer',
    owner: '0:e4ebfd16bdabda32339f5a45c3ab7b8c0339d9867f226ec9bfb97f9c73fa05f3',
    level: 2,
    linkedAddresses: [],
    subDomains: [],
    subPrice: 10,
};

const CnBuyDomainModal = cn('buyDomainModal');

export const BuyDomainModal: FC = memo(() => {
    const [loader, setLoader] = useState(false);
    const { address, connect, disconnect } = useVenom();

    const isWalletConnected = useMemo(() => !!address, [address]);

    const buyClickCallback = useCallback(async () => {
        setLoader(true);

        await fetchDomainUpdateRequest({
            id: domain.id,
            owner: address,
        });
    }, [address]);

    return (
        <Modal title="Buy now" className={CnBuyDomainModal()}>
            <div className={CnBuyDomainModal('domain')}>
                <div className={CnBuyDomainModal('domain-image')}>
                    <img src={domainGif} alt="Domain" />
                </div>
                <div className={CnBuyDomainModal('domain-content')}>
                    <div className={CnBuyDomainModal('domain-name')}>
                        {domain.fullName}
                    </div>
                    <div className={CnBuyDomainModal('domain-price')}>
                        <div className={CnBuyDomainModal('domain-price-label')}>
                            Total price
                        </div>
                        <div className={CnBuyDomainModal('domain-price-value')}>
                            <Icons.Venom />
                            {domain.price}
                        </div>
                    </div>
                    <div className={CnBuyDomainModal('domain-action')}>
                        {!isWalletConnected ? (
                            <Button onClick={connect} size="s" view="action">
                                Connect wallet
                            </Button>
                        ) : (
                            <Button onClick={disconnect} size="s" view="action">
                                Buy
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            {/* <div className={CnBuyDomainModal('domains')}>
                <div className={CnBuyDomainModal('label')}>
                    <div>Domain</div>
                    <div>Total price</div>
                </div>
                <DomainItem {...domain} />
            </div> */}

            {/* <div className={CnBuyDomainModal('action')}>
                {!isWalletConnected ? (
                    <Button onClick={connect} size="s" view="action">
                        Connect wallet
                    </Button>
                ) : (
                    <Button onClick={disconnect} size="s" view="action">
                        Buy
                    </Button>
                )}
            </div> */}
        </Modal>
    );
});
