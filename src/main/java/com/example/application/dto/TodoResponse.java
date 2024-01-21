package com.example.application.dto;

import com.example.application.model.Todo;
import java.util.ArrayList;
import java.util.List;

public class TodoResponse {
  private List<Todo> completed = new ArrayList<>();
  private List<Todo> unCompleted = new ArrayList<>();

  public TodoResponse(List<Todo> completed, List<Todo> unCompleted) {
    this.completed = completed;
    this.unCompleted = unCompleted;
  }

  public List<Todo> getCompleted() {
    return completed;
  }

  public void setCompleted(List<Todo> completed) {
    this.completed = completed;
  }

  public List<Todo> getUnCompleted() {
    return unCompleted;
  }

  public void setUnCompleted(List<Todo> unCompleted) {
    this.unCompleted = unCompleted;
  }
}
