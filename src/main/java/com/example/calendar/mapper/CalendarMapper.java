package com.example.calendar.mapper;

import com.example.calendar.domain.Todo;
import java.util.List;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface CalendarMapper {

  @Insert("""
      INSERT INTO todo (dateString, title, body)
      VALUES (#{dateString}, #{title}, #{body})
      """)
  @Options(useGeneratedKeys = true, keyProperty = "id")
  Integer insert(Todo todo);

  @Select("""
      SELECT * FROM todo WHERE id = #{id}
      """)
  Todo selectById(Integer id);

  @Select("""
      SELECT * FROM todo 
      WHERE dateString = #{dateString} 
      ORDER BY id
      """)
  List<Todo> selectByDateString(String dateString);

  @Delete("""
      DELETE FROM todo WHERE id = #{id}
      """)
  Integer deleteById(Integer id);

  @Update("""
      UPDATE todo
      SET dateString = #{dateString},
          title = #{title},
          body = #{body}
      WHERE
          id = #{id}
      """)
  Integer update(Todo todo);

  @Update("""
      UPDATE todo
      SET done = 0
      WHERE id = #{id}
      """)
  void updateDoneFalse(Integer id);

  @Update("""
      UPDATE todo
      SET done = 1
      WHERE id = #{id}
      """)
  void updateDoneTrue(Integer id);
}
