import { FC } from 'react';
import { Router } from 'providers';
import { Provider } from 'react-redux';
import { store } from 'store';

export const Providers: FC = () => {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    );
};
