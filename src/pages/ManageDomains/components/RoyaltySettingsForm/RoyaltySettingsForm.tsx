import { cn } from '@bem-react/classname';
import { FC, memo, useCallback, useMemo } from 'react';
import { Button, Input, Title } from 'components';
import { Icons } from 'assets';
import { useAppDispatch, useAppSelector } from 'hooks';
import { domainConfigurationActions } from 'store/domainConfiguration/domainConfiguration.action';
import { FetchStatus } from 'types';

import './RoyaltySettingsForm.scss';

const CnRoyaltySettingsForm = cn('royaltySettingsForm');

const baseValue: any = {
    '1': '',
    '2': '',
    '3': '',
    '4': '',
    '5': '',
    '6+': '',
};

export const RoyaltySettingsForm: FC = memo(() => {
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

    const domainConfigurationChangeCallback = useCallback(
        (key: string) => {
            return (e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(
                    domainConfigurationActions.updateConfiguration({
                        key,
                        value: e.target.value,
                    }),
                );
            };
        },
        [dispatch],
    );

    const subDomainsChangeCallback = useCallback(
        (key: string) => {
            const changeFunc =
                domainConfigurationChangeCallback('subDomainsPrice');

            return (e: React.ChangeEvent<HTMLInputElement>) => {
                let currValue = JSON.parse(
                    JSON.stringify(configuration['subDomainsPrice']),
                );

                if (!isNaN(Number(e.target.value))) {
                    if (!currValue) {
                        currValue = {};
                    }

                    currValue[key] = e.target.value;

                    changeFunc({
                        target: { value: currValue },
                    } as any);
                }
            };
        },
        [configuration, domainConfigurationChangeCallback],
    );

    const subDomainsFormContent = useMemo(() => {
        return Object.keys(baseValue).map((key) => {
            const value = configuration['subDomainsPrice']
                ? configuration['subDomainsPrice'][key]
                    ? configuration['subDomainsPrice'][key]
                    : ''
                : '';

            return (
                <div className={CnRoyaltySettingsForm('item')}>
                    <div className={CnRoyaltySettingsForm('item-header')}>
                        <div className={CnRoyaltySettingsForm('item-label')}>
                            {key} symbol
                        </div>
                    </div>
                    <div className={CnRoyaltySettingsForm('item-field')}>
                        <Input
                            value={value}
                            onChange={subDomainsChangeCallback(key)}
                            view="white"
                            bordered
                            placeholder="2000"
                            icon={<Icons.Venom color="#A0A0A0" />}
                        />
                    </div>
                </div>
            );
        });
    }, [configuration, subDomainsChangeCallback]);

    const submitClickCallback = useCallback(() => {
        dispatch(domainConfigurationActions.fetchUpdateDomain({}));
    }, [dispatch]);

    return (
        <div className={CnRoyaltySettingsForm()}>
            <Title view="black" size="xs">
                Royalty & Settings
            </Title>
            <div className={CnRoyaltySettingsForm('item')}>
                <div className={CnRoyaltySettingsForm('item-header')}>
                    <div className={CnRoyaltySettingsForm('item-label')}>
                        Royalty fee
                    </div>
                    <div className={CnRoyaltySettingsForm('item-sublabel')}>
                        Fee from sales of domains within your zone in the
                        secondary market
                    </div>
                </div>
                <div className={CnRoyaltySettingsForm('item-field')}>
                    <Input
                        value={configuration['royalyiFee']}
                        onChange={domainConfigurationChangeCallback(
                            'royaltyFee',
                        )}
                        view="white"
                        bordered
                        placeholder="2000"
                        icon={<Icons.Venom color="#A0A0A0" />}
                    />
                </div>
            </div>
            <Title view="black" size="xs">
                Set a price for domains in your zone
            </Title>
            {subDomainsFormContent}
            <div className={CnRoyaltySettingsForm('action')}>
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
