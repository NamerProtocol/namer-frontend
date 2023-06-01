import { cn } from '@bem-react/classname';
import { Button } from 'components';
import { useVenom } from 'hooks';
import { FC, memo, useCallback, useEffect } from 'react';

import './Wallet.scss';
import { getFormattedAddress } from 'utils/getFormattedAddress';

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
            {address ? (
                <div className={CnWallet('action')}>
                    {getFormattedAddress(address)}
                </div>
            ) : (
                <div
                    onClick={connectClickCallback}
                    className={CnWallet('action')}
                >
                    Connect
                </div>
            )}
        </div>
    );
});
