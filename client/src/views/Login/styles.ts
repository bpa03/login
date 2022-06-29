import styled from 'styled-components';
import { Link } from 'react-router-dom';
// Assets
import formBackground from 'assets/form-background.webp';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 100%;
  
  @media only screen and (min-width: 1024px) {
    & {
      overflow: hidden;
      grid-template-columns: 50% 50%;
      min-height: 100vh;
    }
  }
`;

export const BgImage = styled.div`
  background: url(${formBackground}) no-repeat center;
  background-size: cover;
  background-clip: content-box;
  min-height: 55vh;
`;

export const FormWrapper = styled.div`
  width: 58.333%;
  max-width: 58.333%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
`;

export const FormTitle = styled.h2`
  font-size: 1.555rem;
  color: rgb(33, 37, 41);
  font-weight: 500;
  margin-bottom: 0.444rem;
`;

export const FormSlogan = styled.p`
  color: #b3b3b3;
  font-weight: 300;
`;

export const Form = styled.form`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  margin-top: 1.8rem;
`;

export const LinkWrapper = styled.div`
  text-align: center;
`;

export const Span = styled.span`
  color: #b3b3b3;
  font-weight: 300;
  font-size: 1rem;
  margin-right: 6px;
`;

export const FormLink = styled(Link)`
  font-size: 1rem;
  color: #0069D9;
  text-decoration: none;
`;
