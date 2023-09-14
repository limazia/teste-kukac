import { Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { CustomRoutes } from "@components/CustomRoutes";
import { Layout } from "@components/Layout";

import { Home } from "pages/Home";
import { Palindromes } from "pages/Palindromes";
import { Exchange } from "pages/Exchange";
import { Vehicles } from "pages/Vehicles";
import { Ceps } from "pages/Ceps";

export const Routes = () => {
  return (
    <AnimatePresence mode="wait">
      <CustomRoutes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="palindromos" element={<Palindromes />} />
          <Route path="troco" element={<Exchange />} />
          <Route path="veiculos" element={<Vehicles />} />
          <Route path="ceps" element={<Ceps />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </CustomRoutes>
    </AnimatePresence>
  );
};
