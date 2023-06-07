import { cn } from '@bem-react/classname';
import { FC, memo, useCallback, useMemo } from 'react';
import { Button, Input, Title } from 'components';
import { Icons } from 'assets';
import { useAppDispatch, useAppSelector } from 'hooks';
import { domainConfigurationActions } from 'store/domainConfiguration/domainConfiguration.action';
import { FetchStatus } from 'types';

import './SubdomainsForm.scss';
import { useNavigate } from 'react-router-dom';

const CnSubdomainsForm = cn('subdomainsForm');

export const SubdomainsForm: FC = memo(() => {
    const dispatch = useAppDispatch();
    const domain = useAppSelector((store) => store.domainConfiguration.domain);
    const navigate = useNavigate();

    const itemClickCallback = useCallback(
        (id: string) => {
            return () => {
                navigate(`/domains/${id}/manage#zone`);
            };
        },
        [navigate],
    );

    return (
        <div className={CnSubdomainsForm()}>
            <Title view="black" size="xs">
                You own
            </Title>
            {domain.subDomains.map((item: any) => {
                return (
                    <div key={item.id} className={CnSubdomainsForm('item')}>
                        <div className={CnSubdomainsForm('item-label')}>
                            {item.fullName}
                        </div>
                        <div className={CnSubdomainsForm('item-right')}>
                            <div className={CnSubdomainsForm('item-price')}>
                                <Icons.Venom color="#A0A0A0" />
                                {item.price}
                            </div>

                            <Button
                                onClick={itemClickCallback(item.id)}
                                view="bordered"
                                size="s"
                            >
                                Manage
                            </Button>
                        </div>
                    </div>
                );
            })}

            {/* <div className={CnSubdomainsForm('action')}>
                <Button
                    onClick={submitClickCallback}
                    disabled={isSubmitDisabled}
                    view="dark"
                >
                    Save
                </Button>
            </div> */}
        </div>
    );
});
