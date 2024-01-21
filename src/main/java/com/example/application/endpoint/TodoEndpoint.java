package com.example.application.endpoint;

import com.example.application.dto.TodoResponse;
import com.example.application.model.Todo;
import com.example.application.repository.TodoRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import java.util.List;

@Endpoint
@AnonymousAllowed
public class TodoEndpoint {

  private final TodoRepository todoRepository;

  public TodoEndpoint(TodoRepository todoRepository) {
    this.todoRepository = todoRepository;
  }

  public TodoResponse findAll() {
    final List<Todo> todos = todoRepository.findAll();
    final List<Todo> completedTodos = todos.stream().filter(Todo::isCompleted).toList();
    final List<Todo> unCompletedTodos = todos.stream().filter(it -> !it.isCompleted()).toList();

    return new TodoResponse(completedTodos, unCompletedTodos);
  }

  public Todo add(String task) {
    final Todo todo = new Todo(null, task, false);

    return todoRepository.save(todo);
  }

  public Todo update(Todo todo) {
    return todoRepository.save(todo);
  }

  public boolean delete(Todo todo) {
    todoRepository.delete(todo);

    return true;
  }
}
