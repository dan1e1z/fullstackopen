import { ContentProps } from "../types";

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((part, index) => (
        <div key={index}>
          <h3>{part.name}</h3>
          <p>Exercises: {part.exerciseCount}</p>
          {part.kind === "basic" && <p>{part.description}</p>}
          {part.kind === "background" && (
            <p>Background material: {part.backgroundMaterial}</p>
          )}
          {part.kind === "special" && <p>{part.requirements}</p>}
        </div>
      ))}
    </div>
  );
};

export default Content;
