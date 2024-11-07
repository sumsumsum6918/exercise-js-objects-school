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
  const subjectObject = subjects.find(
    (subject) => subject.name === targetSubject
  );
  if (!subjectObject.students.includes(targetStudent))
    subjectObject.addStudent(targetStudent);

  const studentObject = students.find(
    (student) => student.name === targetStudent
  );
  if (!studentObject.subjects.includes(targetSubject))
    studentObject.enlistToSubject(targetSubject);
};

const enrollAllStudentsToSubject = (targetSubject) => {
  const subjectObject = subjects.find(
    (subject) => subject.name === targetSubject
  );
  subjectObject.students = students.map((student) => student.name);

  students.forEach((student) => {
    //enroll the subject to students details
    if (!student.subjects.includes(targetSubject))
      student.enlistToSubject(targetSubject);
  });
};

const registerAllStudentsToSchool = () => {
  teknikhogskolan.students = [];
  students.forEach((student) => {
    teknikhogskolan.addStudent(student);
  });
};

const registerAllTeachersToSchool = () => {
  teknikhogskolan.teachers = [];
  teachers.forEach((teacher) => {
    teknikhogskolan.addTeacher(teacher);
  });
};

const asignToTeach = (targetTeacher, targetSubject) => {
  const subjectObject = subjects.find(
    (subject) => subject.name === targetSubject
  );
  if (!subjectObject.teachers.includes(targetTeacher))
    subjectObject.addTeacher(targetTeacher);

  const teacherObject = teachers.find(
    (teacher) => teacher.name === targetTeacher
  );
  if (!teacherObject.subjects.includes(targetSubject))
    teacherObject.addSubject(targetSubject);
};

const removeStudentFromSubject = (targetStudent, targetSubject) => {
  const subjectObject = subjects.find(
    (subject) => subject.name === targetSubject
  );
  const studentIndex = subjectObject.students.indexOf(targetStudent);
  if (studentIndex > -1) subjectObject.students.splice(studentIndex, 1);

  const studentObject = students.find(
    (student) => student.name === targetStudent
  );
  const subjectIndex = studentObject.subjects.indexOf(targetSubject);
  if (subjectIndex > -1) studentObject.subjects.splice(subjectIndex, 1);
};

const removeTeacherFromSubject = (targetTeacher, targetSubject) => {
  const subjectObject = subjects.find(
    (subject) => subject.name === targetSubject
  );
  const teacherIndex = subjectObject.teachers.indexOf(targetTeacher);
  if (teacherIndex > -1) subjectObject.teachers.splice(teacherIndex, 1);

  const teacherObject = teachers.find(
    (teacher) => teacher.name === targetTeacher
  );
  const subjectIndex = teacherObject.subjects.indexOf(targetSubject);
  if (subjectIndex > -1) teacherObject.subjects.splice(subjectIndex, 1);
};

const personQuit = (people, category) => (targetName) => {
  const index = people.findIndex(
    (personObject) => personObject.name === targetName
  );

  const correspondingSubjects = people[index].subjects;

  if (index > -1) people.splice(index, 1);

  teknikhogskolan[category] = people;

  correspondingSubjects.forEach((targetSubject) => {
    const subjectObject = subjects.find(
      (subject) => subject.name === targetSubject
    );
    const index = subjectObject[category].indexOf(targetName);
    if (index > -1) subjectObject[category].splice(index, 1);
  });
};
const studentQuit = personQuit(students, "students");
const teacherQuit = personQuit(teachers, "teachers");

const displayEachCategory = (category) => {
  const display = [];
  teknikhogskolan[category].forEach((person) => {
    for (const key in person) {
      display.push(person[key]);
    }
  });
  return display;
};

const displayAllSubjectsOfStudent = (targetStudent) => {
  const studentObject = students.find(
    (student) => student.name === targetStudent
  );
  return studentObject.subjects;
};

const displayAllStudentsOfSubject = (targetSubject) => {
  const subjectObject = subjects.find(
    (subject) => subject.name === targetSubject
  );
  return subjectObject.students;
};

const inputExamResults = (targetSubject, targetStudent, targetGrade) => {
  const studentObject = students.find(
    (student) => student.name === targetStudent
  );
  const studentGradesObject = {};

  studentGradesObject.subject = targetSubject;
  studentGradesObject.grade = targetGrade;

  studentObject.grades.push(studentGradesObject);

  const subjectObject = subjects.find(
    (subject) => subject.name === targetSubject
  );

  const subjectGradesObject = {};

  subjectGradesObject.student = targetStudent;
  subjectGradesObject.grade = targetGrade;

  subjectObject.grades.push(subjectGradesObject);
};

const newStudent = (studentName, studentAge, studentGender) => {
  const newStudentObject = {};

  newStudentObject.name = studentName;
  newStudentObject.age = studentAge;
  newStudentObject.gender = studentGender;
  newStudentObject.subjects = [];
  newStudentObject.enlistToSubject = function (subject) {
    this.subjects.push(subject);
  };
  newStudentObject.grades = [];

  students.push(newStudentObject);
};

const newTeacher = (teacherName) => {
  const newTecherObject = {};

  newTecherObject.name = teacherName;
  newTecherObject.subjects = [];
  newTecherObject.addSubject = function (subject) {
    this.subjects.push(subject);
  };
  teachers.push(newTecherObject);
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
const afterMidTerm = () => {
  console.log(
    "===== After Mid-term: Student gets grades from each subject ====="
  );
  startingdetails();
  changes1();
  changes2();
  changes3();
  callDetails();
};

const startingdetails = () => {
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
};
const changes1 = () => {
  removeStudentFromSubject("student1", "chemistry");
  removeStudentFromSubject("student3", "biology");
  removeTeacherFromSubject("teacher1", "chemistry");
};
const changes2 = () => {
  studentQuit("student5");
  teacherQuit("teacher1");
  asignToTeach("teacher2", "mathematics");
};
const changes3 = () => {
  inputExamResults("mathematics", "student1", "A");
  inputExamResults("mathematics", "student2", "B");
  inputExamResults("mathematics", "student3", "A");
  inputExamResults("mathematics", "student4", "A");
  inputExamResults("chemistry", "student2", "C");
  inputExamResults("chemistry", "student3", "A");
  inputExamResults("biology", "student4", "B");

  newStudent("student6", 17, "M");
  newStudent("student7", 23, "M");

  enrollStudentToSubject("student6", "mathematics");
  enrollStudentToSubject("student6", "biology");
  enrollStudentToSubject("student7", "mathematics");
  enrollStudentToSubject("student7", "biology");
  enrollStudentToSubject("student7", "chemistry");

  newTeacher("teacher3");
  asignToTeach("teacher3", "mathematics");
};
//#endregion

//startOfTermDetails();
//firstWeekOfTermDetails();
//duringTermTime();
afterMidTerm();

//console.log(displayEachCategory("students"));
//console.log(displayAllSubjectsOfStudent("student2"));

/*export const addStudent = (_this, student) => {
  _this.students.push(student);
};

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
