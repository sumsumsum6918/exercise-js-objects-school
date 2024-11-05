export const teknikhogskolan = {
  name: "teknikhögskolan",
  address: "kalkstensvägen 3",
  postcode: "22478",
  city: "lund",
  students: [],
  addStudent: function (student) {
    this.students.push(student);
  },
  teachers: [],
  addTeacher: function (teacher) {
    this.teachers.push(teacher);
  },
};
