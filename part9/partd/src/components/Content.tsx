import { courseParts } from "../types";

interface ContentProps {
  courseParts: courseParts;  
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((part, index) => (
        <p key={index}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
