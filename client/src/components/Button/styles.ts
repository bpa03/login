/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const ButtonField = styled.button`
  background-color: #0069D9;
  height: 54px;
  padding: 0 30px;
  width: 100%;
  border: 1px solid transparent;
  text-align: center;
  font-size: .9rem;
  color: white;
  border-radius: .2rem;
  transition: background-color .3s;

  &:hover {
    background-color: #0062cc;
    border: 1px solid #0062cc;
  }

  &[disabled] {
    opacity: .7;
  }
`;
