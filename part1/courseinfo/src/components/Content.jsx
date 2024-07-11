const Content = (props) => {
  // console.log(props);
  const content = props.content;
  return (
    <>
      <p>
        {content[0].part}
        {content[0].exercise}
      </p>
      <p>
        {content[1].part}
        {content[1].exercise}
      </p>
      <p>
        {content[2].part}
        {content[2].exercise}
      </p>
    </>
  );
};

export default Content;
