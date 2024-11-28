import { courseName } from "../types";

interface HeaderProps {
  courseName: courseName;
}

const Header = ({ courseName }: HeaderProps) => {
  return <div>{courseName.name}</div>;
};

export default Header;
