import { Providers } from './providers';
import { FC } from 'react';
import { Router } from 'providers';
import { BuyDomainModal } from 'components/BuyDomainModal';

import './globals.css';

export const App: FC = () => {
    return (
        <Providers>
            {/* <BuyDomainModal /> */}
            <Router />
        </Providers>
    );
};

export default App;
