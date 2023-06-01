import { cn } from '@bem-react/classname';
import { FC, memo } from 'react';

import './Modal.scss';
import { Title } from 'components';
import { Icons } from 'assets';

const CnModal = cn('modal');

interface IModalProps {
    title?: string;
    children?: React.ReactNode;
    className?: string;
}

export const Modal: FC<IModalProps> = memo(
    ({ title = '', children, className }) => {
        return (
            <div className={CnModal('wrapper')}>
                <div className={CnModal('', className)}>
                    <div className={CnModal('close')}>
                        <Icons.Close />
                    </div>
                    <Title size="xs" view="white">
                        {title}
                    </Title>

                    <div className={CnModal('content')}>{children}</div>
                </div>
            </div>
        );
    },
);
