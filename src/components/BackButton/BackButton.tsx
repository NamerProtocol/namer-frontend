import { cn } from '@bem-react/classname';
import { FC, memo, useCallback } from 'react';

import './BackButton.scss';
import { Icons } from 'assets';
import { useNavigate } from 'react-router-dom';

const CnBackButton = cn('backButton');

export const BackButton: FC = memo(() => {
    const navigate = useNavigate();

    const clickCallback = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <div onClick={clickCallback} className={CnBackButton()}>
            <Icons.ArrowLeft />
            Back
        </div>
    );
});
