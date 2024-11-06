import { teachers } from "./data/teachers.js";
import { subjects } from "./data/subjects.js";
import { students } from "./data/students.js";
import { teknikhogskolan } from "./data/school.js";

const enrollStudentToSubject = (targetStudent, targetSubject) => {
  subjects.forEach((subject) => {
    if (subject.name !== targetSubject) return; //early return for other subjects

    if (subject.name === targetSubject) {
      if (!subject.students.includes(targetStudent)) {
        subject.addStudent(targetStudent);
      }

      students.forEach((student) => {
        if (student.name !== targetStudent) return; //early return for other students
        if (
          student.name === targetStudent &&
          !student.subjects.includes(targetSubject)
        ) {
          student.enlistToSubject(targetSubject);
        }
      });
    }
  });
};

const enrollAllStudentsToSubject = (targetSubject) => {
  subjects.forEach((subject) => {
    if (subject.name !== targetSubject) return; //early return for other subjects

    if (subject.name === targetSubject) {
      subject.students = []; //reset array to prevent doubling values and double calling same function
      students.forEach((student) => {
        subject.addStudent(student);
      });

      students.forEach((student) => {
        //enroll the subject to students details
        if (!student.subjects.includes(targetSubject))
          student.enlistToSubject(targetSubject);
      });
    }
  });
};

const registerAllStudentsToSchool = () => {
  teknikhogskolan.students = [];
  students.forEach((student) => {
    teknikhogskolan.addStudent(student.name);
  });
};

const registerAllTeachersToSchool = () => {
  teknikhogskolan.teachers = [];
  teachers.forEach((teacher) => {
    teknikhogskolan.addTeacher(teacher.name);
  });
};

const asignToTeach = (targetTeacher, targetSubject) => {
  subjects.forEach((subject) => {
    if (subject.name !== targetSubject) return; //early return for other subjects

    if (subject.name === targetSubject) {
      if (!subject.teachers.includes(targetTeacher)) {
        subject.addTeacher(targetTeacher);
      }

      teachers.forEach((teacher) => {
        if (teacher.name !== targetTeacher) return; //early return for other teachers
        if (
          teacher.name === targetTeacher &&
          !teacher.subjects.includes(targetSubject)
        ) {
          teacher.addSubject(targetSubject);
        }
      });
    }
  });
};

const removeStudentFromSubject = (targetStudent, targetSubject) => {
  subjects.forEach((subject) => {
    if (subject.name !== targetSubject) return; //early return for other subjects

    if (subject.name === targetSubject) {
      const index = subject.students.indexOf(targetStudent);
      if (index > -1) subject.students.splice(index, 1);
    }

    students.forEach((student) => {
      if (student.name !== targetStudent) return; //early return for other students

      if (student.name === targetStudent) {
        const index = student.subjects.indexOf(targetSubject);
        if (index > -1) student.subjects.splice(index, 1);
      }
    });
  });
};

const removeTeahcerFromSubject = (targetTeacher, targetSubject) => {
  subjects.forEach((subject) => {
    if (subject.name !== targetSubject) return; //early return for other subjects

    if (subject.name === targetSubject) {
      const index = subject.teachers.indexOf(targetTeacher);
      if (index > -1) subject.teachers.splice(index, 1);
    }

    teachers.forEach((teacher) => {
      if (teacher.name !== targetTeacher) return; //early return for other teachers

      if (teacher.name === targetTeacher) {
        const index = teacher.subjects.indexOf(targetSubject);
        if (index > -1) teacher.subjects.splice(index, 1);
      }
    });
  });
};

console.log("===== Start of term =====");
//#region start of term
registerAllStudentsToSchool();
registerAllTeachersToSchool();
enrollAllStudentsToSubject("mathematics");
enrollAllStudentsToSubject("mathematics");
enrollStudentToSubject("student1", "chemistry");
enrollStudentToSubject("student1", "chemistry");
enrollStudentToSubject("student2", "chemistry");
enrollStudentToSubject("student3", "chemistry");
enrollStudentToSubject("student3", "biology");
enrollStudentToSubject("student4", "biology");
enrollStudentToSubject("student5", "biology");
asignToTeach("teacher1", "mathematics");
asignToTeach("teacher1", "chemistry");
asignToTeach("teacher2", "biology");
asignToTeach("teacher2", "chemistry");

console.log("School details");
console.log(teknikhogskolan);
console.log("Subjects details");
console.log(subjects);
console.log("Students details");
console.log(students);
console.log("Teachers details");
console.log(teachers);
//#endregion

console.log(
  "===== Beginning of term: Students change their choice of subjects ====="
);
removeStudentFromSubject("student1", "chemistry");
removeStudentFromSubject("student3", "biology");
removeTeahcerFromSubject("teacher1", "chemistry");

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
