import { cn } from '@bem-react/classname';
import { Icons } from 'assets';
import { FC } from 'react';

import './BuyButton.scss';

const CnBuyButton = cn('buyButton');

interface IBuyButtonProps {
    onBuyClick?: () => void;
    onAddToCartClick?: () => void;
    yellow?: boolean;
}

export const BuyButton: FC<IBuyButtonProps> = ({
    onAddToCartClick,
    onBuyClick,
    yellow = false,
}) => {
    return (
        <div className={CnBuyButton({ yellow })}>
            <div onClick={onBuyClick} className={CnBuyButton('label')}>
                Buy now
            </div>
            <div onClick={onAddToCartClick} className={CnBuyButton('icon')}>
                <Icons.Cart />
            </div>
        </div>
    );
};
