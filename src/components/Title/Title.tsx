import { cn } from '@bem-react/classname';
import { FC, memo } from 'react';

import './Title.scss';

const CnTitle = cn('title');

interface ITitleProps {
    children: string;
    view?: 'yellow' | 'black' | 'white';
    size?: 'l' | 's' | 'm' | 'xs' | 'xxs';
    className?: string;
    uppercase?: boolean;
    shadow?: boolean;
}

export const Title: FC<ITitleProps> = memo(
    ({
        children,
        size = 'l',
        className,
        uppercase = false,
        shadow = false,
        view = 'yellow',
    }) => {
        return (
            <div
                className={CnTitle(
                    { size, uppercase, shadow, view },
                    className,
                )}
            >
                {children}
            </div>
        );
    },
);
