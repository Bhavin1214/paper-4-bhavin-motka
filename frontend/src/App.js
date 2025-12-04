import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "./component/common/ErrorBoundary";
import Loading from "./component/common/Loading";

import PrivateRoute from "./utils/PrivateRoute";
import EditBlog from "./component/pages/EditBlog";

const NotFound = lazy(() => import("./component/common/NotFound"));
const Navbar = lazy(() => import("./component/common/Navbar"));
const Home = lazy(() => import("./component/pages/Home"));
const Blogs = lazy(() => import("./component/pages/Blogs"));
const BlogDetail = lazy(() => import("./component/pages/BlogDetail"));
const CreateBlog = lazy(() => import("./component/pages/CreateBlog"));
const AuthScreen = lazy(() => import("./component/pages/AuthScreen")); 

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
        <Navbar openLogin={openLogin} openRegister={openRegister} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs openLogin={openLogin} />} />
          <Route path="/blog/:id" element={<BlogDetail />} />

          <Route
            path="/create-blog"
            element={
              <PrivateRoute openLogin={openLogin}>
                <CreateBlog />
              </PrivateRoute>
            }
          />
          <Route
            path="blogs/edit/:id"
            element={
              <PrivateRoute openLogin={openLogin}>
                <EditBlog />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>

        <AuthScreen isOpen={authOpen} type={authType} onClose={closeAuth} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;