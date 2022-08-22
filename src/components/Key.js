const Key = ({ value, processInput }) => {
  const applyClassNames = () => {
    let classes = ["btn"];

    Number.isInteger(+value) || value === "."
      ? classes.push("num")
      : classes.push("operator");

    if (value === "=") {
      classes.push("equal");
    }

    return classes.join(" ");
  };

  return (
    <button
      id={`key${value}`}
      className={applyClassNames()}
      onClick={() => processInput(value)}
    >
      {value}
    </button>
  );
};

export default Key;
