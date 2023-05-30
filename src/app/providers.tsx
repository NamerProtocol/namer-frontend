import { FC } from 'react';
import { VenomWalletProvider } from 'providers';
import { Provider } from 'react-redux';
import { store } from 'store';

export const Providers: FC<{ children: any }> = ({ children }) => {
    return (
        <Provider store={store}>
            <VenomWalletProvider>{children}</VenomWalletProvider>
        </Provider>
    );
};
