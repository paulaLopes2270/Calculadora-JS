import styled from "styled-components";

const KeyBoardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Button = styled.button`
  flex: 1 1 22%;
  height: 50px;
  :last-child {
    flex: 0 1 22%;
  }
`;

export const KeyBoard = ({ handleButton = (value) => console.log(value) }) => {
  const buttonsList = [
    "on",
    "off",
    "%",
    "ac",
    "1",
    "2",
    "3",
    "/",
    "4",
    "5",
    "6",
    "*",
    "7",
    "8",
    "9",
    "-",
    "0",
    ".",
    "=",
    "+"
  ];

  return (
    <KeyBoardContainer>
      {buttonsList.map((currentButton) => (
        <Button
          type="button"
          key={`button-${currentButton}`}
          onClick={() => handleButton(currentButton)}
        >
          {currentButton}
        </Button>
      ))}
    </KeyBoardContainer>
  );
};
