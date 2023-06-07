import { Home, ManageDomains, OwnedDomains, SearchDomains } from 'pages';
import { Modal, VenomWalletProvider } from 'providers';
import { FC } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

export const Router: FC = () => {
    return (
        <BrowserRouter>
            <VenomWalletProvider>
                <Modal />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<SearchDomains />} />
                    <Route path="/account/domains" element={<OwnedDomains />} />
                    <Route
                        path="/domains/:id/manage"
                        element={<ManageDomains />}
                    />
                </Routes>
            </VenomWalletProvider>
        </BrowserRouter>
    );
};
