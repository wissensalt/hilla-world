import { createBrowserRouter, RouteObject } from 'react-router-dom';
import TodoView from "Frontend/views/TodoView";

export const routes = [
  {
    path: '/', element: <TodoView />
  },
] as RouteObject[];

export default createBrowserRouter(routes);
