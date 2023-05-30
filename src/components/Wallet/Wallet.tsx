import { cn } from '@bem-react/classname';
import { Button } from 'components';
import { useVenom } from 'hooks';
import { FC, memo, useCallback, useEffect } from 'react';

import './Wallet.scss';

const CnWallet = cn('wallet');

export const Wallet: FC = memo(() => {
    const { address, connect, disconnect, sendTransaction, getNftCodeHash } =
        useVenom();

    const connectClickCallback = useCallback(() => {
        connect();
    }, [connect]);

    const sendTransactionClickCallback = useCallback(() => {
        sendTransaction();
        // getNftCodeHash();
    }, [sendTransaction, getNftCodeHash]);

    return (
        <div className={CnWallet()}>
            {/* {address ? (
                <Button onClick={sendTransactionClickCallback}>
                    Send Transaction
                </Button>
            ) : (
                <Button onClick={connectClickCallback}>Connect</Button>
            )} */}

            <div onClick={connectClickCallback} className={CnWallet('action')}>
                Connect
            </div>
        </div>
    );
});
