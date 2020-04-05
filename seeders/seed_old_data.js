const R = require('ramda');
const DateFns = require('date-fns');
const data = require('./sheikh_alamoud_database.json');
const uuid = require('uuidv4').default;

const daysObject = {
  0: 'friday',
  1: 'saturday',
  2: 'sunday',
  3: 'monday',
  4: 'tuesday',
  5: 'wednesday',
  6: 'thursday'
}

const parseDuration = duration => {
  if (duration == null) {
    return null;
  }
  const splitted = duration.split(':');
  const hours = splitted[0]
  const minutes = splitted[1]

  return ((hours * 60) + minutes);
}

const mappedInstructors = R.map(({
  InstructorId: id,
  InstructorName: name,
  InstructorDescription: description,
  InstructorVisible: visible,
  InstructorStatus: status,
  InstructorsOrder: order
}) => ({
  id: parseInt(id),
  uid: uuid(),
  name,
  description,
  visible: visible === '0' ? false : true,
  status: status === '0' ? 'past' : 'current',
  order: order === null ? null : parseInt(order),
  createdAt: new Date(),
  updatedAt: new Date()
}));

const mappedSciences = R.map(({
  ScienceId: id,
  ScienceName: name,
  ScienceParent: parent_id
}) => ({
  id: parseInt(id),
  uid: uuid(),
  name,
  parent_id: parent_id === null ? null : parseInt(parent_id),
  parent_uid: 'd66b0d21-4d41-4045-8468-b221a7df56ed',
  createdAt: new Date(),
  updatedAt: new Date()
}));

const mappedLocations = R.map(({
  LocationId: id,
  LocationName: name,
  LocationCoordinates: coordinates,
  LocationVisible: visible
}) => ({
  id: parseInt(id),
  uid: uuid(),
  name,
  coordinates,
  visible: visible === "0" ? false : true,
  createdAt: new Date(),
  updatedAt: new Date()
}));

const mappedSystems = R.map(({
  SystemId: id,
  SystemName: name,
  SystemDescription: description,
  SystemVisible: visible
}) => ({
  id: parseInt(id),
  uid: uuid(),
  name,
  description,
  visible: visible === "0" ? false : true,
  createdAt: new Date(),
  updatedAt: new Date()
}));

const mappedCourses = R.map(({
  CourseId: id,
  CourseName: name,
  CourseDescription: description,
  CourseWeekDay: week_day,
  CourseStartTime: start_time,
  CourseEndTime: end_time,
  CourseSystem: system_id,
  CourseLocation: location_id,
  NoLectures: no_lectures,
  SoundcloudUrl: soundcloud_url,
  YoutubeUrl: youtube_url,
  GoogleUrl: google_url,
  CourseBook: book,
  CourseCost: cost,
  CourseStartDate: start_date,
  CourseEndDate: end_date,
  PaymeUrl: payment_url,
  CourseDuration: duration_in_minutes
}) => ({
  id: parseInt(id),
  uid: uuid(),
  name,
  description,
  days: [daysObject[week_day]],
  start_time: start_time ? DateFns.parse(start_time, 'HH:mm:ss', new Date()) : null,
  end_time: end_time ? DateFns.parse(end_time, 'HH:mm:ss', new Date()) : null,
  system_id,
  location_id,
  no_lectures,
  soundcloud_url,
  youtube_url,
  google_url,
  book,
  cost,
  start_date: start_date ? DateFns.parseISO(start_date) : null,
  end_date: end_date ? DateFns.parseISO(end_date) : null,
  payment_url,
  duration_in_minutes: parseDuration(duration_in_minutes),
  createdAt: new Date(),
  updatedAt: new Date()
}));

const filterInstructor = data => R.filter(R.propIs(String, 'CourseInstructor'), data)
const filterScience = data => R.filter(R.propIs(String, 'CourseScience'), data)
const mappedInstructables = R.map(({
  CourseId: session_id,
  CourseInstructor: instructor_id
}) => ({
  uid: uuid(),
  session_id: parseInt(session_id),
  instructor_id: parseInt(instructor_id),
  createdAt: new Date(),
  updatedAt: new Date()
}));

const mappedSessionScience = R.map(({
  CourseId: session_id,
  CourseScience: science_id
}) => ({
  uid: uuid(),
  session_id: parseInt(session_id),
  science_id: parseInt(science_id),
  createdAt: new Date(),
  updatedAt: new Date()
}));

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('Instructors', mappedInstructors(data["Instructors"]), {});
    await queryInterface.bulkInsert('Sciences', mappedSciences(data["Science"]), {});
    await queryInterface.bulkInsert('Locations', mappedLocations(data["Locations"]), {});
    await queryInterface.bulkInsert('Systems', mappedSystems(data["Systems"]), {});
    await queryInterface.bulkInsert('Sessions', mappedCourses(data["Courses"]), {});
    await queryInterface.bulkInsert('Instructables', mappedInstructables(filterInstructor(data["Courses"])), {});
    await queryInterface.bulkInsert('SessionSciences', mappedSessionScience(filterScience(data["Courses"])), {});

    await queryInterface.sequelize.query(`ALTER SEQUENCE "Sessions_id_seq" RESTART WITH 1010;`);
    await queryInterface.sequelize.query(`ALTER SEQUENCE "SessionSciences_id_seq" RESTART WITH 1010;`);
    await queryInterface.sequelize.query(`ALTER SEQUENCE "instructables_id_seq" RESTART WITH 1010;`);
    await queryInterface.sequelize.query(`ALTER SEQUENCE "Systems_id_seq" RESTART WITH 100;`);
    await queryInterface.sequelize.query(`ALTER SEQUENCE "Locations_id_seq" RESTART WITH 100;`);
    return queryInterface.sequelize.query(`ALTER SEQUENCE "Sciences_id_seq" RESTART WITH 100;`);
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('sessions', null, {});
  }
};
