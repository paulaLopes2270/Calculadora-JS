import styled from "styled-components";

const DisplayContainer = styled.div`
  display: flex;
  width: 100%;
  output {
    flex: 1;
    display: flex;
    gap: 10px;
    background: white;
    padding: 10px;
    overflow: hidden;
    span {
      flex: 1 1 100%;
      text-align: right;
    }
  }
`;

export const Display = ({ total = 0, signal = "/" }) => {
  return (
    <DisplayContainer>
      <output>
        <strong>{signal}</strong>
        <span>{total}</span>
      </output>
    </DisplayContainer>
  );
};
