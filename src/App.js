import { useState, useEffect } from "react";
import { create, all } from "mathjs";
import Key from "./components/Key";

function App() {
  const [output, setOutput] = useState("");
  const [solveable, setSolveable] = useState(false);
  const keys = [
    "(",
    ")",
    "%",
    "C",
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
  ];
  const math = create(all, {});

  useEffect(() => {
    setSolveable(isSolveable());
  }, [output]);

  const processInput = (key) => {
    if (key === "=" && output) {
      if (solveable) solveOutput();
    } else if (key === "C" || key === "c") {
      setOutput("");
    } else {
      setOutput(`${output}${key}`);
      fixErrorInput(key);
    }
  };

  const solveOutput = () => {
    setOutput(math.evaluate(output));
  };

  const fixErrorInput = (key) => {
    const keyElement = document.getElementById(`key${key}`);
    const keyElementClasses = keyElement.classList.value;
    const previousChar = output[output.length - 1];
    const cannotBeNextToEachOther = ["/", "*", "+"];

    if (output.length <= 0) handleFirstInput(key, keyElementClasses);
    if (previousChar === "-") handleMinusOperator(key, keyElementClasses);
    if (key === "(" || key === ")")
      handleParenthesesOperator(key, previousChar);
    if (key === "%")
      handlePercentOperator(key, previousChar, cannotBeNextToEachOther);

    if (
      cannotBeNextToEachOther.includes(key) &&
      cannotBeNextToEachOther.includes(previousChar)
    ) {
      replaceLastOutput(key);
    }
  };

  const isSolveable = () => {
    try {
      math.evaluate(output);
    } catch (err) {
      return false;
    }
    return true;
  };

  const handleFirstInput = (key, keyElementClasses) => {
    if (key === "(") {
      return;
    } else if (keyElementClasses.includes("operator") && key !== "-") {
      setOutput("");
    }
  };

  const handleMinusOperator = (key, keyElementClasses) => {
    if (keyElementClasses.includes("operator") && key !== "-") {
      replaceLastOutput(key);
    }
  };

  // TODO fix () being able to do that
  const handleParenthesesOperator = (key, previousChar) => {
    if (key === ")" && !output.includes("(")) setOutput(output);
    if (previousChar === "(") setOutput(output);
  };

  const handlePercentOperator = (
    key,
    previousChar,
    cannotBeNextToEachOther
  ) => {
    if (Number.isInteger(+previousChar)) return;
    if (cannotBeNextToEachOther.includes(previousChar)) {
      replaceLastOutput(key);
    }
  };

  const replaceLastOutput = (key) => {
    setOutput(`${output.slice(0, -1)}${key}`);
  };

  return (
    <div className='calculator-container'>
      <input type='text' id='output' value={output} readOnly />
      <div className='keys-container'>
        {keys.map((key, idx) => (
          <Key key={idx} value={key} processInput={processInput} />
        ))}
      </div>
    </div>
  );
}

export default App;
