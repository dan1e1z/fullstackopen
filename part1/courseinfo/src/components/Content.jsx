import Part from "./Part";

const Content = (props) => {
  // console.log(props);
  const content = props.content;
  return (
    <>
      <Part part={content[0].part} exercise={content[0].exercise} />
      <Part part={content[1].part} exercise={content[1].exercise} />
      <Part part={content[2].part} exercise={content[2].exercise} />
    </>
  );
};

export default Content;
