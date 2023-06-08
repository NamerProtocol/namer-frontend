import { Address, ProviderRpcClient } from 'everscale-inpage-provider';
import { EverscaleStandaloneClient } from 'everscale-standalone-client';
import { FC, useCallback, useEffect, useState } from 'react';
import { VenomConnect } from 'thrmdy-venom-connect';
import { VenomWalletContext } from './VenomWalletProvider.constants';
import { nftContractABI } from './NftContract.abi';
import { nftItemABI } from './NftItem.abi';
import { Domain } from 'types';
import {
    fetchDomainCreateRequest,
    fetchDomainUpdateRequest,
    fetchDomainsByIdRequest,
    fetchDomainsFromContractRequest,
} from 'api/domains';
import { useLocation, useNavigate } from 'react-router-dom';
import { toDecimals } from 'utils/decimals';
import { useAppDispatch } from 'hooks';
import { domainConfigurationActions } from 'store/domainConfiguration/domainConfiguration.action';
import { useDispatch } from 'react-redux';

const initTheme = 'dark' as const;

const standaloneFallback = () =>
    EverscaleStandaloneClient.create({
        connection: {
            id: 1001,
            group: 'venom_devnet',
            type: 'jrpc',
            data: {
                endpoint: 'https://jrpc-devnet.venom.foundation/rpc',
            },
        },
    });

const initVenomConnect = async () => {
    return new VenomConnect({
        theme: initTheme,
        checkNetworkId: 1001,
        providersOptions: {
            venomwallet: {
                walletWaysToConnect: [
                    {
                        package: ProviderRpcClient,
                        packageOptions: {
                            fallback:
                                VenomConnect.getPromise(
                                    'venomwallet',
                                    'extension',
                                ) || (() => Promise.reject()),
                            forceUseFallback: true,
                        },
                        packageOptionsStandalone: {
                            fallback: standaloneFallback,
                            forceUseFallback: true,
                        },
                        id: 'extension',
                        type: 'extension',
                    },
                ],
                defaultWalletWaysToConnect: ['mobile', 'ios', 'android'],
            },
        },
    });
};

const themesList = ['light', 'dark', 'venom'];

export const VenomWalletProvider: FC<any> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const [venomConnect, setVenomConnect] = useState<VenomConnect | null>(null);
    const [venomProvider, setVenomProvider] = useState<any>();
    const [venomStandalone, setVenomStandalone] = useState<any>();
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState('');
    const [theme, setTheme] = useState<string>(initTheme);
    const [info, setInfo] = useState('');
    const [standaloneMethodsIsFetching, setStandaloneMethodsIsFetching] =
        useState(false);

    const getTheme = () =>
        venomConnect?.getInfo()?.themeConfig?.name?.toString?.() || '...';

    const onToggleThemeButtonClick = async () => {
        const currentTheme = getTheme();

        const lastIndex = themesList.length - 1;

        const currentThemeIndex = themesList.findIndex(
            (item) => item === currentTheme,
        );

        const theme =
            currentThemeIndex >= lastIndex || !~currentThemeIndex || !~lastIndex
                ? themesList[0]
                : themesList[currentThemeIndex + 1];

        await venomConnect?.updateTheme(theme as any);

        setTheme(getTheme());
    };

    const getAddress = async (provider: any) => {
        const providerState = await provider?.getProviderState?.();

        const address =
            providerState?.permissions.accountInteraction?.address.toString();

        return address;
    };

    const getBalance = async (provider: any, _address: string) => {
        try {
            const providerBalance = await provider?.getBalance?.(_address);

            return providerBalance;
        } catch (error) {
            return undefined;
        }
    };

    const checkAuth = useCallback(async (_venomConnect: any) => {
        const auth = await _venomConnect?.checkAuth();
        if (auth) await getAddress(_venomConnect);
    }, []);

    const initVenomConnectCallback = useCallback(async () => {
        const initedVenomConnect = await initVenomConnect();
        setVenomConnect(initedVenomConnect);

        const standalone = await initedVenomConnect?.getStandalone();
        setVenomStandalone(standalone);

        await checkAuth(initedVenomConnect);
    }, [checkAuth]);

    useEffect(() => {
        initVenomConnectCallback();
    }, []);

    const connect = async () => {
        venomConnect?.connect();
    };

    const disconnect = async () => {
        venomProvider?.disconnect();
    };

    const check = useCallback(async (_provider: any) => {
        const _address = _provider ? await getAddress(_provider) : undefined;
        const _balance =
            _provider && _address
                ? await getBalance(_provider, _address)
                : undefined;

        setAddress(_address);
        setBalance(_balance);

        if (_provider && _address)
            setTimeout(() => {
                check(_provider);
            }, 10000);
    }, []);

    const onConnect = async (provider: any) => {
        setVenomProvider(provider);

        check(provider);
    };

    const sendTransaction = async () => {
        try {
            if (!venomProvider) return;
            // TokenWallet address was passed here from somewhere (from NftAuction component)
            const tokenWalletContract = new venomProvider.Contract(
                nftContractABI,
                new Address(
                    '0:b171f92b348dfebff0098e58e43cfe36ee054092e5d79157c0b0fef1903d89a5',
                ),
            );
            console.log(tokenWalletContract);
            // Just a common call of smart contract, nothing special and pretty easy
            // The only one difference - usage of .send() function
            // When we use send(), firstly we call our venom wallet (logged user's wallet) and then venom wallet will call our target contract internally (by sendTransaction method)
            // So you need to call send() when you own callee internally (by wallet address)
            await tokenWalletContract.methods
                .mint()
                .send({ from: address, amount: String(1 * 10 ** 9) });
            // .send({ from: new Address(address), amount: getValueForSend(1), bounce: true });
        } catch (e) {
            console.error(e);
        }
    };

    const getNftCodeHash = async (): Promise<string> => {
        const collectionAddress = new Address(
            '0:b171f92b348dfebff0098e58e43cfe36ee054092e5d79157c0b0fef1903d89a5',
        );

        const contract = new venomProvider.Contract(
            nftContractABI,
            collectionAddress,
        );

        const { codeHash } = await contract.methods
            .nftCodeHash({ answerId: 0 } as never)
            .call({ responsible: true });
        const nftCodeHash = BigInt(codeHash).toString(16);

        const addresses = await venomStandalone?.getAccountsByCodeHash({
            codeHash: nftCodeHash,
        });

        console.log(addresses);

        if (addresses.accounts) {
            for (let acc of addresses.accounts) {
                const nftItemContract = new venomProvider.Contract(
                    nftItemABI,
                    acc,
                );
                console.log(nftItemContract);
                // calling getJson function of NFT contract
                const getJsonAnswer = (await nftItemContract.methods
                    .getInfo({ answerId: 0 } as never)
                    .call()) as { json: string };
                const json = JSON.parse(getJsonAnswer.json ?? '{}') as any;
                console.log(json, 'JSON');
            }
        }
        return addresses?.accounts;
    };

    const buyDomain = useCallback(
        async (domain: Domain, price: string, totalPrice: string) => {
            try {
                navigate('?modal=buyDomainLoader');

                if (!venomProvider) return;

                const nftMinterContract = new venomProvider.Contract(
                    nftContractABI,
                    new Address(
                        '0:01a2164e2b66a4b3eefc23f831d778fb0a7018148d1938d99c874588fd7a1965',
                    ),
                );

                // await tokenWalletContract.methods.mint().send({
                //     from: address,
                //     amount: String(Number(totalPrice) * 10 ** 9),
                // });

                const parentDomain = await fetchDomainsByIdRequest(
                    domain.parentId,
                );

                await nftMinterContract.methods
                    .mintNft({
                        root: parentDomain.address,
                        name: domain.name,
                        hPrice: String(price),
                        json: `{ "name": "${
                            domain.level === 1
                                ? `.${domain.fullName}`
                                : domain.fullName
                        }" }`,
                    })
                    .send({
                        from: address,
                        amount: String(toDecimals(Number(totalPrice) + 3, 9)),
                    });
                // .send({ from: new Address(address), amount: getValueForSend(1), bounce: true });
                await fetchDomainsFromContractRequest();
                // if (domain.id) {
                //     await fetchDomainUpdateRequest({
                //         id: domain.id,
                //         owner: address,
                //         price: Number(price),
                //     });
                // } else {
                //     await fetchDomainCreateRequest({
                //         price: Number(price),
                //         parentId: domain.parentId
                //             ? domain.parentId
                //             : '383ab958-5225-4f4e-9fa1-1a037a25b163',
                //         owner: address,
                //         name: domain.name,
                //     });
                // }

                navigate('?modal=buyDomainSuccess');
            } catch (err) {
                console.log(err);
                navigate('?modal=buyDomain');
            } finally {
            }
        },
        [address, navigate, venomProvider],
    );

    const updateSubDomainsPrice = useCallback(
        async (domainAddress: string, price: string, domainId: string) => {
            try {
                navigate('?modal=transactionLoader');

                if (!venomProvider) return;

                const nftMinterContract = new venomProvider.Contract(
                    nftContractABI,
                    new Address(
                        '0:01a2164e2b66a4b3eefc23f831d778fb0a7018148d1938d99c874588fd7a1965',
                    ),
                );

                const totalPrice = toDecimals(Number(price), 9);

                await nftMinterContract.methods
                    .setSubDomainPrice({
                        domain: domainAddress,
                        price: totalPrice,
                    })
                    .send({
                        from: address,
                        amount: String(toDecimals(2, 9)),
                    });

                await fetchDomainsFromContractRequest();

                dispatch(domainConfigurationActions.fetchDomainById(domainId));
            } catch (err) {
            } finally {
                navigate(location.pathname);
            }
        },
        [address, navigate, venomProvider, location, dispatch],
    );

    useEffect(() => {
        const off = venomConnect?.on('connect', onConnect);

        return () => {
            off?.();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [venomConnect]);

    return (
        <VenomWalletContext.Provider
            value={{
                connect,
                disconnect,
                address,
                balance,
                sendTransaction,
                getNftCodeHash,
                buyDomain,
                updateSubDomainsPrice,
            }}
        >
            {children}
        </VenomWalletContext.Provider>
    );
};
