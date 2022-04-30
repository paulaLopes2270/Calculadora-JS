import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";

// components
import { Display, KeyBoard } from "./components";

const CalculatorMain = styled.main`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: blue;
`;

const CalculatorContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
  border: 1px solid black;
  margin: 0 auto;
  padding: 20px;
  background: gray;
  box-sizing: border-box;
`;

export const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [values, setValues] = useState({ firstValue: "0", lastValue: "0" });
  const [operator, setOperator] = useState(false);

  const updateDisplay = useCallback(
    (newValue) => {
      if (newValue) {
        return setDisplay(newValue);
      }

      const { firstValue, lastValue } = values;

      setDisplay(operator ? `${lastValue}` : `${firstValue}`);
    },
    [operator, values]
  );
  useEffect(() => {
    updateDisplay();
  }, [updateDisplay]);

  const handleReset = () => {
    setValues({ firstValue: "0", lastValue: "0" });
    setOperator(false);
    updateDisplay();
  };
  const handleSignal = (signal) => setOperator(signal);

  const handleNumber = (number) => {
    const haveSignal = operator;
    setValues((currentValues) => {
      const updateValues = {
        ...currentValues
      };
      const targetValueToUpdate = haveSignal ? "lastValue" : "firstValue";

      const targetValueIsZero = updateValues[targetValueToUpdate] === "0";

      targetValueIsZero
        ? (updateValues[targetValueToUpdate] = number)
        : (updateValues[targetValueToUpdate] =
            updateValues[targetValueToUpdate] + number);

      return updateValues;
    });
  };

  const handleCalc = () => {
    const { firstValue, lastValue } = values;
    const operatorList = {
      "/": () => parseInt(firstValue, 10) / parseInt(lastValue, 10),
      "*": () => parseInt(firstValue, 10) * parseInt(lastValue, 10),
      "-": () => parseInt(firstValue, 10) - parseInt(lastValue, 10),
      "+": () => parseInt(firstValue, 10) + parseInt(lastValue, 10)
    };
    const total = operatorList[operator] && operatorList[operator]();
    updateDisplay(total);
  };

  const buttonsFunction = {
    on: () => {
      console.log("Ligando!");
    },
    off: () => {},
    "%": handleSignal,
    ac: handleReset,
    "1": handleNumber,
    "2": handleNumber,
    "3": handleNumber,
    "/": handleSignal,
    "4": handleNumber,
    "5": handleNumber,
    "6": handleNumber,
    "*": handleSignal,
    "7": handleNumber,
    "8": handleNumber,
    "9": handleNumber,
    "-": handleSignal,
    "0": handleNumber,
    ".": handleNumber,
    "=": handleCalc,
    "+": handleSignal
  };

  const handleButton = (button) => {
    buttonsFunction[button] && buttonsFunction[button](button);
  };

  return (
    <CalculatorMain>
      <CalculatorContainer>
        <Display total={display} signal={operator} />
        <KeyBoard handleButton={handleButton} />
      </CalculatorContainer>
    </CalculatorMain>
  );
};
