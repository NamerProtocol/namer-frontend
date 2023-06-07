import { cn } from '@bem-react/classname';
import { FC, memo, useCallback } from 'react';
import { Button, Input, Wallet } from 'components';
import { Icons } from 'assets';

import './PageHeader.scss';
import { useAppDispatch, useAppSelector } from 'hooks';
import { domainsActions, domainsSelectors } from 'store';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const CnPageHeader = cn('pageHeader');

export const PageHeader: FC = memo(() => {
    const search = useAppSelector(domainsSelectors.search);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const searchChangeCallback = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(domainsActions.setSearch(e.target.value));
        },
        [dispatch],
    );

    const onKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                dispatch(domainsActions.fetchDomainsByKeyword(search));
                if (location.pathname !== '/search') {
                    navigate('/search');
                }
            }
        },
        [navigate, dispatch, search, location],
    );

    return (
        <div className={CnPageHeader()}>
            <div className={CnPageHeader('content')}>
                <div className={CnPageHeader('left')}>
                    <Link to="/">
                        <Icons.Logo className={CnPageHeader('logo')} />
                    </Link>

                    <div className={CnPageHeader('search')}>
                        <Input
                            onKeyDown={onKeyDown}
                            value={search}
                            onChange={searchChangeCallback}
                            placeholder="Search"
                            view="white"
                        />
                        <div className={CnPageHeader('search-action')}>
                            <Icons.Search />
                        </div>
                    </div>
                </div>

                <div className={CnPageHeader('action')}>
                    <Link to="/account/domains">My domains</Link>
                    <Wallet />
                </div>
            </div>
        </div>
    );
});
