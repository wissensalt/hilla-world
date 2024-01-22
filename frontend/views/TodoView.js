import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { TodoEndpoint } from "Frontend/generated/endpoints";
import { TextField } from "@hilla/react-components/TextField";
import { Button } from "@hilla/react-components/Button";
import { Checkbox } from "@hilla/react-components/Checkbox";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout";
import { HorizontalLayout } from "@hilla/react-components/HorizontalLayout";
export default function TodoView() {
    const [todoResponse, setTodoResponse] = useState({ completed: [], unCompleted: [] });
    const [task, setTask] = useState('');
    useEffect(() => {
        TodoEndpoint.findAll().then(setTodoResponse);
    }, []);
    async function addTodo() {
        const savedTodo = await TodoEndpoint.add(task);
        if (savedTodo) {
            const updatedResponse = await TodoEndpoint.findAll();
            setTodoResponse(updatedResponse);
            setTask("");
            const inputTask = document.getElementById("inputTask");
            inputTask.focus();
        }
    }
    async function updateTodo(todo, value) {
        todo.completed = value;
        const updatedTodo = await TodoEndpoint.update(todo);
        if (updatedTodo) {
            const updatedResponse = await TodoEndpoint.findAll();
            setTodoResponse(updatedResponse);
        }
    }
    return _jsxs("div", { style: { alignItems: 'center' }, children: [_jsx(HorizontalLayout, { theme: "margin", children: _jsx("h2", { children: "Hilla Todo Application" }) }), _jsxs(HorizontalLayout, { theme: "margin", className: "flex gap-s", children: [_jsx(TextField, { value: task, autoFocus: true, id: "inputTask", onChange: e => {
                            setTask(e.target.value);
                        } }), _jsx(Button, { theme: "primary", onClick: e => {
                            addTodo();
                        }, children: "Add" })] }), _jsx(VerticalLayout, { theme: "spacing padding margin", className: 'border border-error-50 rounded-m', children: todoResponse.unCompleted.map(uncompleted => _jsxs("div", { children: [_jsx(Checkbox, { checked: uncompleted?.completed, onCheckedChanged: e => updateTodo(uncompleted, e.detail.value) }), _jsx("span", { children: uncompleted.task })] }, uncompleted.id)) }), _jsx(VerticalLayout, { theme: "spacing padding margin", className: 'border border-primary-50 rounded-m', children: todoResponse.completed.map(completed => _jsx("div", { children: _jsx("span", { children: _jsx("s", { children: completed.task }) }) }, completed.id)) })] });
}
//# sourceMappingURL=TodoView.js.map