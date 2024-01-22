import {useEffect, useState} from "react";
import Todo from "Frontend/generated/com/example/application/model/Todo";
import {TodoEndpoint} from "Frontend/generated/endpoints";
import {TextField} from "@hilla/react-components/TextField";
import {Button} from "@hilla/react-components/Button";
import {Checkbox} from "@hilla/react-components/Checkbox";
import TodoResponse from "Frontend/generated/com/example/application/dto/TodoResponse";
import {VerticalLayout} from "@hilla/react-components/VerticalLayout";
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout";

export default function TodoView() {
  const [todoResponse, setTodoResponse] = useState<TodoResponse>(
      {completed: [], unCompleted: []}
  );
  const [task, setTask] = useState('');
  useEffect(() => {
    TodoEndpoint.findAll().then(setTodoResponse)
  }, []);

  async function addTodo() {
    const savedTodo = await TodoEndpoint.add(task)
    if (savedTodo) {
      const updatedResponse = await TodoEndpoint.findAll()
      setTodoResponse(updatedResponse)
      setTask("")
      const inputTask: HTMLElement = document.getElementById("inputTask")!;
      inputTask.focus()
    }
  }

  async function updateTodo(todo: Todo, value: boolean) {
    todo.completed = value
    const updatedTodo: Todo = await TodoEndpoint.update(todo);
    if (updatedTodo) {
      const updatedResponse = await TodoEndpoint.findAll()
      setTodoResponse(updatedResponse);
    }
  }

  return <div style={{alignItems: 'center'}}>
    <HorizontalLayout theme="margin">
      <h2>Hilla Todo Application</h2>
    </HorizontalLayout>

    <HorizontalLayout theme="margin" className="flex gap-s">
      <TextField value={task} autoFocus={true} id={"inputTask"}
                 onChange={e => {
                   setTask(e.target.value)
                 }}
      />
      <Button theme="primary" onClick={e => {
        addTodo()
      }}>Add</Button>
    </HorizontalLayout>
    <VerticalLayout theme="spacing padding margin" className='border border-error-50 rounded-m'>
      {
        (todoResponse.unCompleted as [Todo]).map(uncompleted =>
            <div key={uncompleted.id} >
              <Checkbox checked={uncompleted?.completed}
                        onCheckedChanged={e => updateTodo(uncompleted, e.detail.value)}/>
              <span>{uncompleted.task}</span>
            </div>)
      }
    </VerticalLayout>
    <VerticalLayout theme="spacing padding margin" className='border border-primary-50 rounded-m'>
      {
        (todoResponse.completed as [Todo]).map(completed =>
            <div key={completed.id}>
              <span><s>{completed.task}</s></span>
            </div>)
      }
    </VerticalLayout>

  </div>;
}