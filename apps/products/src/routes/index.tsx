import { useRoutes } from "react-router-dom";
import ProductsListPage from "../pages/ProductsListPage";

const routes = [
  {
    path: "/",
    element: <ProductsListPage />,
  },
];

export function ProductsRoutes() {
  return useRoutes(routes);
}

export { routes };