import { cn } from '@bem-react/classname';
import { FC, memo } from 'react';

import './Input.scss';

const CnInput = cn('input');

interface IInputProps
    extends React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    inputSize?: 'l' | 'm' | 's';
    view?: 'search' | 'white';
    icon?: React.ReactNode;
    bordered?: boolean;
}

export const Input: FC<IInputProps> = memo(
    ({
        inputSize = 'm',
        view = 'search',
        icon,
        className,
        bordered = false,
        ...props
    }) => {
        return (
            <div className={CnInput('', className)}>
                <input
                    {...props}
                    className={CnInput('input', {
                        size: inputSize,
                        view,
                        bordered,
                    })}
                />
                {icon && <div className={CnInput('icon')}>{icon}</div>}
            </div>
        );
    },
);
