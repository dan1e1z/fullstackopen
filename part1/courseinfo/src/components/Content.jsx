import Part from "./Part";

const Content = (props) => {
  // console.log(props);
  const parts = props.course.parts;
  return (
    <>
      <Part part={parts[0]} exercise={parts[0]} />
      <Part part={parts[1]} exercise={parts[1]} />
      <Part part={parts[2]} exercise={parts[2]} />
    </>
  );
};

export default Content;
