import styled from "@emotion/styled";

const sharedStyles = `
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const FieldsContainerCol = styled.div`
  ${sharedStyles}
  flex-direction: column;
`;

export const FieldsContainerRow = styled.div`
  ${sharedStyles}
  flex-direction: row;
`;

export const ButtonsContainer = styled.div`
  ${sharedStyles}
  margin-top: 0;
`;