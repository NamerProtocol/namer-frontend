import { Input, PopularZones, Title } from 'components';
import { Icons } from 'assets';
import { HomeLayout } from 'layouts';
import { cn } from '@bem-react/classname';
import React, { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks';
import { domainsActions, domainsSelectors } from 'store';

import './Home.scss';
import { useNavigate } from 'react-router-dom';

const CnHome = cn('home');

export const Home: FC = () => {
    const search = useAppSelector(domainsSelectors.search);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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
                navigate('/search');
            }
        },
        [navigate, dispatch, search],
    );

    return (
        <HomeLayout>
            <div className={CnHome()}>
                <Title size="xl" className={CnHome('title')} uppercase shadow>
                    Find your domain
                </Title>
                <div className={CnHome('input')}>
                    <Input
                        onKeyDown={onKeyDown}
                        value={search}
                        onChange={searchChangeCallback}
                        inputSize="l"
                        view="search"
                        placeholder="Search"
                        icon={<Icons.Search />}
                        bordered
                    />
                </div>
            </div>

            {/* <PopularZones /> */}
        </HomeLayout>
    );
};
