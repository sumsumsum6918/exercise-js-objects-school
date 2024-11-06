import { teachers } from "./data/teachers.js";
import { subjects } from "./data/subjects.js";
import { students } from "./data/students.js";
import { teknikhogskolan } from "./data/school.js";

const callDetails = () => {
  console.log("School details");
  console.log(teknikhogskolan);
  console.log("Subjects details");
  console.log(subjects);
  console.log("Students details");
  console.log(students);
  console.log("Teachers details");
  console.log(teachers);
};

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
        subject.addStudent(student.name);
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

const removeTeacherFromSubject = (targetTeacher, targetSubject) => {
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

const studentQuit = (targetName) => {
  const indexInSchool = teknikhogskolan.students.indexOf(targetName);
  teknikhogskolan.students.splice(indexInSchool, 1);

  const index = students.findIndex((object) => object.name === targetName);
  const correspondSubjects = students[index].subjects;

  if (index > -1) students.splice(index, 1);

  correspondSubjects.forEach((removingSubject) => {
    subjects.forEach((subject) => {
      if (removingSubject !== subject.name) return;
      if (removingSubject === subject.name) {
        const index = subject.students.indexOf(targetName);
        if (index > -1) subject.students.splice(index, 1);
      }
    });
  });
};

const teacherQuit = (targetName) => {
  const indexInSchool = teknikhogskolan.teachers.indexOf(targetName);
  teknikhogskolan.teachers.splice(indexInSchool, 1);

  const index = teachers.findIndex((object) => object.name === targetName);
  const correspondSubjects = teachers[index].subjects;

  if (index > -1) teachers.splice(index, 1);

  correspondSubjects.forEach((removingSubject) => {
    subjects.forEach((subject) => {
      if (removingSubject !== subject.name) return;
      if (removingSubject === subject.name) {
        const index = subject.teachers.indexOf(targetName);
        if (index > -1) subject.teachers.splice(index, 1);
      }
    });
  });
};

//#region calling functions
const startOfTermDetails = () => {
  console.log("===== Start of term =====");
  startingdetails();
  callDetails();
};
const firstWeekOfTermDetails = () => {
  console.log(
    "===== Beginning of term: Students change their choice of subjects ====="
  );
  startingdetails();
  changes1();
  callDetails();
};
const duringTermTime = () => {
  console.log("===== During term time: Student or teacher quit school =====");
  startingdetails();
  changes1();
  changes2();
  callDetails();
};
const startingdetails = () => {
  registerAllStudentsToSchool();
  registerAllTeachersToSchool();
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
};
const changes1 = () => {
  removeStudentFromSubject("student1", "chemistry");
  removeStudentFromSubject("student3", "biology");
  removeTeacherFromSubject("teacher1", "chemistry");
};
const changes2 = () => {
  studentQuit("student5");
  teacherQuit("teacher1");
};
//#endregion

/* Since the objects are later modified,
the console reflects the updated version of objects
even if the changes was applied after the console.log call
it is that only one function from below is call at one time.
Better attempt i believe would be to create new object with .map() when we modify something
but since the exercise insisted on having functions in the objects,
I have chosen to aviod the console problem with the method suggested.
*/
//startOfTermDetails();
//firstWeekOfTermDetails();
//duringTermTime();

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
