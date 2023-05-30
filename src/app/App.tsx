import { Providers } from './providers';
import { FC } from 'react';
import { Router } from 'providers';

import './globals.css';

export const App: FC = () => {
    return (
        <Providers>
            <Router />
        </Providers>
    );
};

export default App;
