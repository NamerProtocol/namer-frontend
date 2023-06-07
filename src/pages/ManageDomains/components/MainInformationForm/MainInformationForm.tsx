import { cn } from '@bem-react/classname';
import React, { FC, memo, useCallback, useMemo } from 'react';
import { Button, Input, Title } from 'components';
import { useAppDispatch, useAppSelector } from 'hooks';
import { domainConfigurationActions } from 'store/domainConfiguration/domainConfiguration.action';
import { FetchStatus } from 'types';

import './MainInformationForm.scss';

const CnMainInformationForm = cn('mainInformationForm');

export const MainInformationForm: FC = memo(() => {
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

    const submitClickCallback = useCallback(() => {
        dispatch(domainConfigurationActions.fetchUpdateDomain({}));
    }, [dispatch]);

    return (
        <div className={CnMainInformationForm()}>
            <Title view="black" size="xs">
                Main information
            </Title>

            <div className={CnMainInformationForm('avatar')}>
                <div className={CnMainInformationForm('avatar-image')}>
                    <svg
                        width="180"
                        height="180"
                        viewBox="0 0 180 180"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g filter="url(#filter0_d_825_21215)">
                            <g clip-path="url(#clip0_825_21215)">
                                <mask
                                    id="mask0_825_21215"
                                    style={{ maskType: 'alpha' }}
                                    maskUnits="userSpaceOnUse"
                                    x="20"
                                    y="20"
                                    width="140"
                                    height="140"
                                >
                                    <path
                                        d="M160 20H20V160H160V20Z"
                                        fill="white"
                                    />
                                </mask>
                                <g mask="url(#mask0_825_21215)">
                                    <path
                                        d="M160 20H20V160H160V20Z"
                                        fill="#121212"
                                    />
                                    <g filter="url(#filter1_f_825_21215)">
                                        <path
                                            d="M155.568 123.922L198.597 95.089L220.94 45.7046L62.4565 -25.9999L23.2998 60.5456L46.9847 90.6984L126.678 75.5087L155.568 123.922Z"
                                            fill="#700082"
                                        />
                                    </g>
                                    <g filter="url(#filter2_f_825_21215)">
                                        <path
                                            d="M96.8824 50.0351L19.7972 38.7627L-35.4614 121.635L54.3258 249.889L167.379 158.42L127.215 119.832L105.885 174.613L17.9602 167.782L96.881 50.0331L96.8824 50.0351Z"
                                            fill="#F4FF7A"
                                        />
                                    </g>
                                </g>
                                <g filter="url(#filter3_b_825_21215)">
                                    <rect
                                        x="70"
                                        y="108"
                                        width="40"
                                        height="40"
                                        rx="20"
                                        fill="white"
                                        fill-opacity="0.8"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M93.3924 120.998C93.8711 120.519 94.5204 120.25 95.1974 120.25C95.8744 120.25 96.5236 120.519 97.0024 120.998C97.4811 121.476 97.75 122.126 97.75 122.803C97.75 123.48 97.4811 124.129 97.0024 124.608L86.9295 134.681C86.8333 134.777 86.7129 134.845 86.581 134.878L83.1819 135.728C82.9263 135.792 82.656 135.717 82.4697 135.53C82.2834 135.344 82.2085 135.074 82.2724 134.818L83.1222 131.419C83.1552 131.287 83.2233 131.167 83.3195 131.071L93.3924 120.998ZM94.453 122.058C94.6504 121.861 94.9182 121.75 95.1974 121.75C95.4765 121.75 95.7443 121.861 95.9417 122.058C96.1391 122.256 96.25 122.523 96.25 122.803C96.25 123.082 96.1391 123.35 95.9417 123.547L93.963 125.526C93.9114 125.414 93.8506 125.297 93.7791 125.178C93.5233 124.753 93.1167 124.289 92.5064 124.005L94.453 122.058ZM91.3896 125.122L84.527 131.984L84.0308 133.969L86.0157 133.473L92.7796 126.709C92.772 126.682 92.7657 126.655 92.7609 126.627L91.3896 125.122Z"
                                        fill="#171C34"
                                    />
                                </g>
                            </g>
                            <rect
                                x="22"
                                y="22"
                                width="136"
                                height="136"
                                rx="68"
                                stroke="white"
                                stroke-width="4"
                                shape-rendering="crispEdges"
                            />
                        </g>
                        <defs>
                            <filter
                                id="filter0_d_825_21215"
                                x="0"
                                y="0"
                                width="180"
                                height="180"
                                filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB"
                            >
                                <feFlood
                                    flood-opacity="0"
                                    result="BackgroundImageFix"
                                />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset />
                                <feGaussianBlur stdDeviation="10" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                                />
                                <feBlend
                                    mode="normal"
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_825_21215"
                                />
                                <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="effect1_dropShadow_825_21215"
                                    result="shape"
                                />
                            </filter>
                            <filter
                                id="filter1_f_825_21215"
                                x="3.69977"
                                y="-45.6"
                                width="236.84"
                                height="189.123"
                                filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB"
                            >
                                <feFlood
                                    flood-opacity="0"
                                    result="BackgroundImageFix"
                                />
                                <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="BackgroundImageFix"
                                    result="shape"
                                />
                                <feGaussianBlur
                                    stdDeviation="9.8"
                                    result="effect1_foregroundBlur_825_21215"
                                />
                            </filter>
                            <filter
                                id="filter2_f_825_21215"
                                x="-61.4615"
                                y="12.7627"
                                width="254.841"
                                height="263.126"
                                filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB"
                            >
                                <feFlood
                                    flood-opacity="0"
                                    result="BackgroundImageFix"
                                />
                                <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="BackgroundImageFix"
                                    result="shape"
                                />
                                <feGaussianBlur
                                    stdDeviation="13"
                                    result="effect1_foregroundBlur_825_21215"
                                />
                            </filter>
                            <filter
                                id="filter3_b_825_21215"
                                x="66"
                                y="104"
                                width="48"
                                height="48"
                                filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB"
                            >
                                <feFlood
                                    flood-opacity="0"
                                    result="BackgroundImageFix"
                                />
                                <feGaussianBlur
                                    in="BackgroundImageFix"
                                    stdDeviation="2"
                                />
                                <feComposite
                                    in2="SourceAlpha"
                                    operator="in"
                                    result="effect1_backgroundBlur_825_21215"
                                />
                                <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="effect1_backgroundBlur_825_21215"
                                    result="shape"
                                />
                            </filter>
                            <clipPath id="clip0_825_21215">
                                <rect
                                    x="20"
                                    y="20"
                                    width="140"
                                    height="140"
                                    rx="70"
                                    fill="white"
                                />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <div className={CnMainInformationForm('avatar-form')}>
                    <div className={CnMainInformationForm('avatar-info')}>
                        We recommend a Profile Image of at least 300x300. You
                        may set your NFTs as a Profile Image.
                    </div>
                    <div className={CnMainInformationForm('avatar-action')}>
                        <Button size="s" view="dark">
                            {' '}
                            Upload photo
                        </Button>
                    </div>
                </div>
            </div>

            <div className={CnMainInformationForm('item')}>
                <div className={CnMainInformationForm('item-label')}>
                    Zone Name
                </div>
                <div className={CnMainInformationForm('item-field')}>
                    <Input
                        disabled
                        value={domain.fullName}
                        view="white"
                        bordered
                        placeholder="Enter zone bio"
                    />
                </div>
            </div>

            <div className={CnMainInformationForm('item')}>
                <div className={CnMainInformationForm('item-label')}>
                    Zone bio
                </div>
                <div className={CnMainInformationForm('item-field')}>
                    <Input
                        onChange={domainConfigurationChangeCallback('zoneBio')}
                        value={configuration['zoneBio']}
                        view="white"
                        bordered
                        placeholder="Enter zone bio"
                    />
                </div>
            </div>

            <Title view="black" size="xs">
                Websites and social links
            </Title>

            <div className={CnMainInformationForm('item')}>
                <div className={CnMainInformationForm('item-label')}>
                    Instagram
                </div>
                <div className={CnMainInformationForm('item-field')}>
                    <Input
                        value={configuration['instagram']}
                        onChange={domainConfigurationChangeCallback(
                            'instagram',
                        )}
                        view="white"
                        bordered
                        placeholder=""
                    />
                </div>
            </div>

            <div className={CnMainInformationForm('item')}>
                <div className={CnMainInformationForm('item-label')}>
                    Twitter
                </div>
                <div className={CnMainInformationForm('item-field')}>
                    <Input
                        value={configuration['twitter']}
                        onChange={domainConfigurationChangeCallback('twitter')}
                        view="white"
                        bordered
                        placeholder=""
                    />
                </div>
            </div>

            <div className={CnMainInformationForm('item')}>
                <div className={CnMainInformationForm('item-label')}>
                    Telegram
                </div>
                <div className={CnMainInformationForm('item-field')}>
                    <Input
                        value={configuration['telegram']}
                        onChange={domainConfigurationChangeCallback('telegram')}
                        view="white"
                        bordered
                        placeholder=""
                    />
                </div>
            </div>

            <div className={CnMainInformationForm('action')}>
                <Button
                    disabled={isSubmitDisabled}
                    onClick={submitClickCallback}
                    view="dark"
                >
                    Save
                </Button>
            </div>
        </div>
    );
});
