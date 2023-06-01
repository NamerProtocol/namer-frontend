import { cn } from '@bem-react/classname';
import { FC, memo } from 'react';
import { PageHeader } from 'components';

import './PageLayout.scss';

const CnPageLayout = cn('pageLayout');

interface IPageLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export const PageLayout: FC<IPageLayoutProps> = memo(
    ({ children, className }) => {
        return (
            <div className={CnPageLayout({}, className)}>
                <PageHeader />
                <div className={CnPageLayout('content')}>{children}</div>
            </div>
        );
    },
);
