import { cn } from '@bem-react/classname';
import { Icons } from 'assets';
import { FC } from 'react';

import './BuyButton.scss';

const CnBuyButton = cn('buyButton');

interface IBuyButtonProps {
    onBuyClick?: () => void;
    onAddToCartClick?: () => void;
}

export const BuyButton: FC<IBuyButtonProps> = ({
    onAddToCartClick,
    onBuyClick,
}) => {
    return (
        <div className={CnBuyButton()}>
            <div onClick={onBuyClick} className={CnBuyButton('label')}>
                Buy now
            </div>
            {/* <div onClick={onAddToCartClick} className={CnBuyButton('icon')}>
                <Icons.Cart />
            </div> */}
        </div>
    );
};
