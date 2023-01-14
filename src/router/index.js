import About from "../pages/About";
import Posts from "../pages/Posts";
import PostsSinglePage from "../pages/PostsSinglePage";
import NotFound from "../pages/NotFound";

export const routes = [
  { path: "/about", element: About, exact: false },
  { path: "/posts", element: Posts, exact: true },
  { path: "/posts/:id", element: PostsSinglePage, exact: true },
  { path: "*", element: NotFound, exact: false },
];
