package com.newproject.demo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "students1")
public class Student {
    @Id
    private String id;
    private String name;
    private String marks;

    public String getId(){
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMarks() {
        return marks;
    }

    public void setMarks(String marks) {
        this.marks = marks;
    }

    public String toString(){
        return "Student=> id : "+id+ "Name: "+ name + " marks: "+marks;
    }
    
}
