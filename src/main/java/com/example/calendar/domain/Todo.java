package com.example.calendar.domain;

import lombok.Data;

@Data
public class Todo {

  private Integer id;

  private String dateString;
  private String title;
  private String body;

  private Boolean done;
}
