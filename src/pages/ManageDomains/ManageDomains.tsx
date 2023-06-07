import { cn } from '@bem-react/classname';
import { FC, memo, useEffect, useMemo } from 'react';
import { PageLayout } from 'layouts';
import { MainInformationForm, Navigation } from './components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BackButton } from 'components';
import { manageDomainItems } from './ManageDomains.constants';
import { useAppDispatch, useAppSelector } from 'hooks';
import { domainConfigurationActions } from 'store/domainConfiguration/domainConfiguration.action';

import './ManageDomains.scss';

const CnManageDomains = cn('manageDomains');

export const ManageDomains: FC = memo(() => {
    const { hash } = useLocation();
    const { id: domainId } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const domain = useAppSelector((store) => store.domainConfiguration.domain);

    const formContent = useMemo(() => {
        const content = manageDomainItems[hash] ?? <MainInformationForm />;

        return content;
    }, [hash]);

    useEffect(() => {
        if (!domain || domain.id !== domainId) {
            dispatch(
                domainConfigurationActions.fetchDomainById(domainId as string),
            );
        }
        // if (!domain) {
        //     navigate('/account/domains');
        // }
    }, [domain, domainId, navigate, dispatch]);

    return (
        <PageLayout className={CnManageDomains()}>
            <BackButton />

            <div className={CnManageDomains('content')}>
                <div className={CnManageDomains('navigation')}>
                    <Navigation />
                </div>
                {!domain ? null : (
                    <div className={CnManageDomains('form')}>{formContent}</div>
                )}
            </div>
        </PageLayout>
    );
});
