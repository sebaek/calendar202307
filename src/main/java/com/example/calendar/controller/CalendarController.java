package com.example.calendar.controller;

import com.example.calendar.domain.Todo;
import com.example.calendar.service.CalendarService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/")
public class CalendarController {


  @Autowired
  private CalendarService service;

  @GetMapping("/")
  public String home() {
    return "home";
  }

  @GetMapping("/today/{dateString}")
  @ResponseBody
  public List<Todo> today(@PathVariable String dateString) {

    return service.listByDate(dateString);
  }

  @PostMapping("/add")
  @ResponseBody
  public Todo add(Todo todo) {
    Todo added = service.add(todo);
    return added;
  }


  @DeleteMapping("/remove/{id}")
  @ResponseBody
  public void remove(@PathVariable("id") Integer id) {
    service.remove(id);
  }

  @PutMapping("/modify")
  @ResponseBody
  public void modify(@RequestBody Todo todo) {
    service.modify(todo);
  }

  @PostMapping("/done/{id}")
  @ResponseBody
  public Map<String, Boolean> toggleDone(@PathVariable Integer id) {
    return service.toggleDone(id);
  }

}
