const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

const Content = ({ parts }) => {
  console.log(parts);
  return (
    <div>
      {parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
      <strong>
        total of {parts.reduce((total, part) => total + part.exercises, 0)}{" "}
        exercises
      </strong>
    </div>
  );
};

const CourseHeader = ({ text }) => {
  return <h2>{text}</h2>;
};

const Course = ({ course }) => {
  console.log(course);
  return (
    <div>
      <CourseHeader text={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
        <div>
        <h1>Web development curriculum</h1>
            <Courses courses={courses} />
        </div>
  );
};

export default App;
