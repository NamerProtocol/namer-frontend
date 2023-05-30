import { cn } from '@bem-react/classname';
import { Icons } from 'assets';
import { FC } from 'react';

import './BuyButton.scss';

const CnBuyButton = cn('buyButton');

interface IBuyButtonProps {
    onBuyClick?: () => void;
    onAddToCartClick?: () => void;
}

export const BuyButton: FC<IBuyButtonProps> = () => {
    return (
        <div className={CnBuyButton()}>
            <div className={CnBuyButton('label')}>Buy now</div>
            <div className={CnBuyButton('icon')}>
                <Icons.Cart />
            </div>
        </div>
    );
};
