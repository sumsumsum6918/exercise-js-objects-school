import { teachers } from "./data/teachers.js";
import { subjects } from "./data/subjects.js";
import { students } from "./data/students.js";

/*
const addSubjectToTeacher = (addSubject, targetTeacher) => {
  let matchingSubject = "";
  subjects.forEach((subject) => {
    if (addSubject !== subject.name) return;
    else if (addSubject === subject.name) matchingSubject = addSubject;
  });

  let matchingTeacher = "";
  teachers.forEach((teacher) => {
    if (targetTeacher !== teacher.name) return;
    else if (targetTeacher === teacher.name) {
      matchingTeacher = targetTeacher;
    }

    if (matchingSubject && matchingTeacher) {
      teacher.subject = addSubject;
    }
  });
  console.log(teachers);
};

addSubjectToTeacher("mathematics", "teacher2");

const addStudentToSubjects = (addStudent, targetSubject) => {
  let matchingStudent = "";
  students.forEach((student) => {
    if (addStudent !== student.name) return;
    else if (addStudent === student.name) matchingStudent = addStudent;
  });

  let matchingSubject = "";
  subjects.forEach((subject) => {
    if (targetSubject !== subject.name) return;
    else if (targetSubject === subject.name) {
      matchingSubject = targetSubject;
    }

    if (matchingStudent && matchingSubject) {
      subject.students = addStudent;
    }
  });
  console.log(subjects);
};

addStudentToSubjects("student1", "mathematics");*/

const addStudentToSubject = (addStudent, targetSubject) => {
  subjects.forEach((subject) => {
    if (subject.name !== targetSubject) return;
    if (subject.name === targetSubject) {
      subject.addStudent(addStudent);
    }
  });
  return subjects;
};
console.log(addStudentToSubject("student1", "mathematics"));
