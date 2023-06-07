import { cn } from '@bem-react/classname';
import { FC, memo, useCallback } from 'react';

import './Modal.scss';
import { Title } from 'components';
import { Icons } from 'assets';
import { useLocation, useNavigate } from 'react-router-dom';

const CnModal = cn('modal');

interface IModalProps {
    title?: string;
    children?: React.ReactNode;
    className?: string;
}

export const Modal: FC<IModalProps> = memo(
    ({ title = '', children, className }) => {
        const location = useLocation();
        const navigate = useNavigate();

        const closeModal = useCallback(() => {
            navigate(location.pathname);
        }, [navigate, location]);

        return (
            <div className={CnModal('', className)}>
                <div onClick={closeModal} className={CnModal('close')}>
                    <Icons.Close />
                </div>
                <Title size="xs" view="white">
                    {title}
                </Title>

                <div className={CnModal('content')}>{children}</div>
            </div>
        );
    },
);
