import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import ListPage from "./pages/list";
import DetailPage from "./pages/detail";
import CheckoutPage from "./pages/checkout";
import { Provider } from "react-redux";
import store from './store'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <ListPage/>
            },
            {
                path: 'detail/:id',
                element: <DetailPage/>
            },
            {
                index: 'checkout',
                element: <CheckoutPage/>
            },
        ]
    }
])

const MateriRedux = () => {
    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    );
}

export default MateriRedux;