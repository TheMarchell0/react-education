import About from "../pages/About";
import Posts from "../pages/Posts";
import PostsSinglePage from "../pages/PostsSinglePage";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";

export const privateRoutes = [
  { path: "/about", element: About, exact: false },
  { path: "/posts", element: Posts, exact: true },
  { path: "/posts/:id", element: PostsSinglePage, exact: true },
  { path: "*", element: NotFound, exact: false },
];

export const publicRoutes = [{ path: "/login", element: Login, exact: false }];
