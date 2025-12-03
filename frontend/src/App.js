import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "./component/common/ErrorBoundary";
import Loading from "./component/common/Loading";
import AuthScreen from "./component/pages/AuthScreen";

const NotFound = lazy(() => import("./component/common/NotFound"));
const Navbar = lazy(() => import("./component/common/Navbar"));
const Home = lazy(() => import("./component/pages/Home"))

const App = () => {
  const [authOpen, setAuthOpen] = React.useState(false);
  const [authType, setAuthType] = React.useState("login");

  const openLogin = () => {
    setAuthType("login");
    setAuthOpen(true);
  };

  const openRegister = () => {
    setAuthType("register");
    setAuthOpen(true);
  };

  const closeAuth = () => setAuthOpen(false);

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <Navbar openLogin={openLogin} openRegister={openRegister}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <AuthScreen
          isOpen={authOpen}
          type={authType}
          onClose={closeAuth}
        />
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
