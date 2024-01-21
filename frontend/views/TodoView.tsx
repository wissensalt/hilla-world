import {useEffect, useState} from "react";
import Todo from "Frontend/generated/com/example/application/model/Todo";
import {TodoEndpoint} from "Frontend/generated/endpoints";
import {TextField} from "@hilla/react-components/TextField";
import {Button} from "@hilla/react-components/Button";
import {Checkbox} from "@hilla/react-components/Checkbox";
import TodoResponse from "Frontend/generated/com/example/application/dto/TodoResponse";

export default function TodoView() {
  const [todoResponse, setTodoResponse] = useState<TodoResponse>(
      {completed: [], unCompleted: []}
  );
  const [task, setTask] = useState('');
  const [message, setMessage] = useState('');
  useEffect(() => {
    TodoEndpoint.findAll().then(setTodoResponse)
  }, []);

  async function addTodo() {
    console.log("ADDED TASK ", task)
    const savedTodo = await TodoEndpoint.add(task)
    if (savedTodo) {
      todoResponse.unCompleted = [...todoResponse.unCompleted as [], savedTodo]
      console.log(todoResponse)
      setTodoResponse(todoResponse)
      // setTask("")
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

  return <div className="p-m">
    <h2>Hilla Todo Application</h2>

    <div className="flex gap-s">
      <TextField value={task}
                 // onChange={e => {
                 //   setTask(e.target.value)
                 //   console.log("ONCHANGE", e.target.value)
                 //   console.log("ONCHANGE", task)
                 // }}
                 onKeyDown={(event) => {
                   if (event.key === 'Enter') {
                     const value: string = (event.target as HTMLInputElement).value;
                     setTask(value)
                     console.log("TASK", task)
                     console.log("VALUE: ", value)
                     addTodo()
                   }
                 }}
      />
      <Button theme="primary" onClick={addTodo}>Add</Button>
    </div>

    <h5 className="p-m">Uncompleted Tasks</h5>
    {
      (todoResponse.unCompleted as [Todo]).map(uncompleted =>
          <div key={uncompleted.id}>
            <Checkbox checked={uncompleted?.completed}
                      onCheckedChanged={e => updateTodo(uncompleted, e.detail.value)}/>
            <span>{uncompleted.task}</span>
          </div>)
    }

    <h5 className="p-m">Completed Tasks</h5>
    {
      (todoResponse.completed as [Todo]).map(completed =>
          <div key={completed.id}>
            <span>{completed.task}</span>
          </div>)
    }

    {/*<div>*/}
    {/*  <TextField value={message} onKeyDown={(event) => {*/}
    {/*    if (event.key === 'Enter'){*/}
    {/*      setMessage((event.target as HTMLInputElement).value)*/}
    {/*    }*/}
    {/*  }}></TextField>*/}
      <h2>Message: {task}</h2>
    {/*</div>*/}

  </div>;
}