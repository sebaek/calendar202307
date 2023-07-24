package com.example.calendar.service;

import com.example.calendar.domain.Todo;
import com.example.calendar.mapper.CalendarMapper;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = Exception.class)
public class CalendarService {


  @Autowired
  private CalendarMapper mapper;

  public Todo add(Todo todo) {
    mapper.insert(todo);

    Todo todo1 = mapper.selectById(todo.getId());

    return todo1;
  }

  public List<Todo> listByDate(String dateString) {

    return mapper.selectByDateString(dateString);
  }


  public void remove(Integer id) {

    mapper.deleteById(id);
  }

  public void modify(Todo todo) {
    mapper.update(todo);
  }

  public Map<String, Boolean> toggleDone(Integer id) {
    Todo todo = mapper.selectById(id);

    if (todo.getDone()) {
      mapper.updateDoneFalse(id);
    } else {
      mapper.updateDoneTrue(id);
    }

    return Map.of("result", !todo.getDone());
  }
}
