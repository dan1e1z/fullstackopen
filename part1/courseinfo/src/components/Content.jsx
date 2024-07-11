import Part from "./Part";

const Content = (props) => {
  // console.log(props);
  const parts = props.parts;
  return (
    <>
      <Part part={parts[0].part} exercise={parts[0].exercise} />
      <Part part={parts[1].part} exercise={parts[1].exercise} />
      <Part part={parts[2].part} exercise={parts[2].exercise} />
    </>
  );
};

export default Content;
