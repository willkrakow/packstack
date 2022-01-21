import { Button } from "antd";
import styled from "styled-components";
import { Box } from "styles/common";

export const ProfileBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;
  padding: 0;
  padding-left: 0.5rem;
`;

export const ProfileAttribute = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid ${props => props.theme.color.$GrayBorder};
`

export const EditButton = styled(Button)`
    border-color: ${props => props.theme.color.$Green};
    color: ${props => props.theme.color.$Green};
`

export const FormSubmitButton = styled(Button)`
&:disabled {
    background-color: ${props => props.theme.color.$GrayBorder};
    border-color: ${props => props.theme.color.$GrayBorder};
    color: ${props => props.theme.color.$LightGray};
}
`