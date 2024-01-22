import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter } from 'react-router-dom';
import TodoView from "Frontend/views/TodoView";
export const routes = [
    {
        path: '/', element: _jsx(TodoView, {})
    },
];
export default createBrowserRouter(routes);
//# sourceMappingURL=routes.js.map