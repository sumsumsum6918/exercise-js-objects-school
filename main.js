import { teachers } from "./data/teachers.js";
import { subjects } from "./data/subjects.js";
import { students } from "./data/students.js";
import { teknikhogskolan } from "./data/school.js";

const addStudentToSubject = (targetStudent, targetSubject) => {
  subjects.forEach((subject) => {
    if (subject.name !== targetSubject) return;

    if (subject.name === targetSubject) {
      if (subject.students.includes(targetStudent)) return;
      else {
        subject.addStudent(targetStudent);
      }
    }
  });
  return subjects;
};

const addAllStudentsToSubject = (targetSubject) => {
  subjects.forEach((subject) => {
    if (subject.name !== targetSubject) return;
    if (subject.name === targetSubject) {
      subject.students = [];
      students.forEach((student) => {
        subject.addStudent(student);
      });
    }
  });
};

const addAllStudentToSchool = () => {
  teknikhogskolan.students = [];
  students.forEach((student) => {
    teknikhogskolan.addStudent(student.name);
  });
};

console.log("Start of term");
addAllStudentToSchool();
addAllStudentsToSubject("mathematics");
addStudentToSubject("student1", "chemistry");
addStudentToSubject("student2", "chemistry");
addStudentToSubject("student3", "chemistry");
addStudentToSubject("student3", "biology");
addStudentToSubject("student4", "biology");
addStudentToSubject("student5", "biology");
addAllStudentsToSubject("mathematics");

console.log(teknikhogskolan);
console.log(subjects);

/*export const addStudent = (_this, student) => {
  _this.students.push(student);
};*/

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
