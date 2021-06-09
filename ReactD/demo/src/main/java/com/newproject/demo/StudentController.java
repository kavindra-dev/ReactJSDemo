package com.newproject.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/student")
@CrossOrigin
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/getAll")
    public List<Student> GetStudents(){
        return studentRepository.findAll();
    }

    @GetMapping("/{id}")
    public Student GetStudents(@PathVariable String id) {
        return studentRepository.findById(id).orElse(null);
    }

    @PostMapping(value = "/")
    public Student postMethodName(@RequestBody Student student){
        return studentRepository.save(student);
    }

    @PutMapping("/")
    public Student PutMapping(@RequestBody final Student newStudent){
        final Student oldStudent = studentRepository.findById(newStudent.getId()).orElse(null);
        oldStudent.setName(newStudent.getName());
        oldStudent.setMarks(newStudent.getMarks());
        studentRepository.save(oldStudent);
        return oldStudent;
    }

    @DeleteMapping("{id}")
    public String DeleteStudent(@PathVariable String id){
        studentRepository.deleteById(id);
        return id;
    }

    
}
