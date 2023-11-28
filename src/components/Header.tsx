import Button from "./Button";

const Header = ({ title, onAdd, showAdd }: any) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        onClick={onAdd}
        color={showAdd ? "red" : "green"}
        text={showAdd ? "Close" : "Add Task"}
      />
    </header>
  );
};

// Css in tsx
// const headingStyle = {
//   color: "red",
//   backgroundColor: "white",
//   postion:"abslout"
// };
export default Header;
