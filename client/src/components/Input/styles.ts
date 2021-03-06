import styled from 'styled-components';

interface LabelProps {
  up: boolean;
  hasError: boolean;
}

interface InputProps {
  hasError: boolean;
}

export const FormGroup = styled.div<InputProps>`
  overflow: hidden;
  border: 1px solid
    ${({ hasError }) => (hasError ? 'rgba(255, 0, 0, .4)' : '#efefef')};
  padding: 15px;
  border-bottom: none;
  position: relative;
  transition: border .3s;
`;

export const FirstFormGroup = styled(FormGroup)`
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
`;

export const LastFormGroup = styled(FormGroup)`
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  border-bottom: 1px solid ${({ hasError }) => (hasError ? 'rgba(255, 0, 0, .4)' : '#efefef')};;
`;

export const Label = styled.label<LabelProps>`
  position: absolute;
  top: 50%;
  transform: ${({ up }) => (up ? 'translateY(-190%)' : 'translateY(-50%)')};
  transition: 0.3s all ease;
  font-size: 0.667rem;
  color: ${({ hasError = false }) => (hasError ? 'rgba(255, 0, 0, .4)' : '#b3b3b3')};;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  font-size: 1.1rem;
`;
