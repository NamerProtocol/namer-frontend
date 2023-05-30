import { cn } from '@bem-react/classname';
import { FC, memo } from 'react';

import './Button.scss';

const CnButton = cn('button');

interface IButtonProps
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    view?: 'white' | 'dark' | 'action';
    size?: 'm' | 's';
    icon?: React.ReactNode;
}

export const Button: FC<IButtonProps> = memo(
    ({ view = 'white', size = 'm', icon, children, ...props }) => {
        return (
            <button {...props} className={CnButton({ view, size })}>
                {children}
                {icon && <div className={CnButton('icon')}>{icon}</div>}
            </button>
        );
    },
);
