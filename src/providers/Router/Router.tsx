import { Home, OwnedDomains, SearchDomains } from 'pages';
import { FC } from 'react';
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchDomains />} />
            <Route path="/account/domains" element={<OwnedDomains />} />
        </>,
    ),
);

export const Router: FC = () => {
    return <RouterProvider router={router} />;
};
