import { Home, SearchDomainNames } from 'pages';
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
            <Route path="/search" element={<SearchDomainNames />} />
        </>,
    ),
);

export const Router: FC = () => {
    return <RouterProvider router={router} />;
};
