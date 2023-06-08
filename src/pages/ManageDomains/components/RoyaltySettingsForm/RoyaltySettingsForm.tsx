import { cn } from '@bem-react/classname';
import { FC, memo, useCallback, useMemo, useState } from 'react';
import { Button, Input, Title } from 'components';
import { Icons } from 'assets';
import { useAppDispatch, useAppSelector, useVenom } from 'hooks';
import { domainConfigurationActions } from 'store/domainConfiguration/domainConfiguration.action';
import { FetchStatus } from 'types';

import './RoyaltySettingsForm.scss';
import { fromDecimals } from 'utils/decimals';

const CnRoyaltySettingsForm = cn('royaltySettingsForm');

const baseValue: any = {
    '1': 'symbol',
    '2': 'symbols',
    '3': 'symbols',
    '4': 'symbols',
    '5': 'symbols',
    '6+': 'symbols',
};

export const RoyaltySettingsForm: FC = memo(() => {
    const dispatch = useAppDispatch();
    const { updateSubDomainsPrice } = useVenom();
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
    const [subdomainPrice, setSubdomainPrice] = useState<string>(
        fromDecimals(domain.subPrice, 9).toString(),
    );

    const subdomainPriceChangeCallback = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!isNaN(Number(e.target.value))) {
                setSubdomainPrice(e.target.value);
            }
        },
        [],
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
            const label = baseValue[key];

            const value = configuration['subDomainsPrice']
                ? configuration['subDomainsPrice'][key]
                    ? configuration['subDomainsPrice'][key]
                    : ''
                : '';

            return (
                <div className={CnRoyaltySettingsForm('item')}>
                    <div className={CnRoyaltySettingsForm('item-header')}>
                        <div className={CnRoyaltySettingsForm('item-label')}>
                            {key} {label}
                        </div>
                    </div>
                    <div className={CnRoyaltySettingsForm('item-field')}>
                        <Input
                            value={value}
                            onChange={subDomainsChangeCallback(key)}
                            view="white"
                            bordered
                            placeholder={'Enter price'}
                            icon={<Icons.Venom color="#A0A0A0" />}
                        />
                    </div>
                </div>
            );
        });
    }, [configuration, subDomainsChangeCallback]);

    const submitClickCallback = useCallback(() => {
        updateSubDomainsPrice(domain.address, subdomainPrice, domain.id);
        // dispatch(domainConfigurationActions.fetchUpdateDomain({}));
    }, [domain, subdomainPrice, updateSubDomainsPrice]);

    return (
        <div className={CnRoyaltySettingsForm()}>
            {/* <Title view="black" size="xs">
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
            </div> */}
            <Title view="black" size="xs">
                Set a price for domains in your zone
            </Title>
            <div className={CnRoyaltySettingsForm('item')}>
                <div className={CnRoyaltySettingsForm('item-header')}>
                    <div className={CnRoyaltySettingsForm('item-label')}>
                        Minting price
                    </div>
                </div>
                <div className={CnRoyaltySettingsForm('item-field')}>
                    <Input
                        value={subdomainPrice}
                        onChange={subdomainPriceChangeCallback}
                        view="white"
                        bordered
                        placeholder={'Enter price'}
                        icon={<Icons.Venom color="#A0A0A0" />}
                    />
                </div>
            </div>
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
