import { cn } from '@bem-react/classname';
import { FC, memo, useCallback, useMemo } from 'react';
import { Button, Input, Title } from 'components';
import { Icons } from 'assets';
import { useAppDispatch, useAppSelector } from 'hooks';
import { domainConfigurationActions } from 'store/domainConfiguration/domainConfiguration.action';
import { FetchStatus } from 'types';

import './PriceForm.scss';
import { fromDecimals, toDecimals } from 'utils/decimals';

const CnPriceForm = cn('priceForm');

export const PriceForm: FC = memo(() => {
    const dispatch = useAppDispatch();
    const domain = useAppSelector((store) => store.domainConfiguration.domain);
    const fetchStatus = useAppSelector(
        (store) => store.domainConfiguration.fetchStatus,
    );
    const isSubmitDisabled = useMemo(
        () => fetchStatus === FetchStatus.FETCHING,
        [fetchStatus],
    );
    const configuration = useAppSelector(
        (store) => store.domainConfiguration.configuration,
    );

    const priceChangeCallback = useCallback(
        (key: string) => {
            return (e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(
                    domainConfigurationActions.updateDomain({
                        key,
                        value: toDecimals(Number(e.target.value), 9),
                    }),
                );
            };
        },
        [dispatch],
    );

    const submitClickCallback = useCallback(() => {
        dispatch(domainConfigurationActions.fetchUpdateDomain({}));
    }, [dispatch]);

    return (
        <div className={CnPriceForm()}>
            <Title view="black" size="xs">
                Harberger price
            </Title>
            <div className={CnPriceForm('item')}>
                <div className={CnPriceForm('item-label')}>Price</div>
                <div className={CnPriceForm('item-sublabel')}>
                    Others will be able to buy your domain for this price at any
                    time. The higher value you specify, the higher your annual
                    fee will be.
                </div>
                <div className={CnPriceForm('item-field')}>
                    <Input
                        disabled
                        value={fromDecimals(domain.price, 9)}
                        view="white"
                        bordered
                        placeholder="2000"
                        icon={<Icons.Venom color="#A0A0A0" />}
                    />
                </div>
            </div>

            <div className={CnPriceForm('item')}>
                <div className={CnPriceForm('item-label')}>
                    Your painment per year
                </div>
                <div className={CnPriceForm('item-sublabel')}>
                    You pay 1% of the cost
                </div>
                <div className={CnPriceForm('item-field')}>
                    <Input
                        value={configuration['pricePerYear']}
                        disabled
                        view="gray"
                        placeholder={String(
                            fromDecimals(domain.price, 9) * 0.01,
                        )}
                        icon={<Icons.Venom color="#A0A0A0" />}
                    />
                </div>
            </div>

            <div className={CnPriceForm('action')}>
                <Button
                    onClick={submitClickCallback}
                    disabled={isSubmitDisabled}
                    view="dark"
                >
                    Save
                </Button>
            </div>
        </div>
    );
});
