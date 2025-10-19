import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { MainLayout } from "@app/layouts/MainLayout";
import { NestingPage } from "@pages/NestingPage/NestingPage";

export const App = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<NestingPage />} />
        </Route>
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};
