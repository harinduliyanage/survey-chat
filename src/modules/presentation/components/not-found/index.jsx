import { Typography } from '@mui/material';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  padding: ${(props) => props.theme.spacing(6)};
  text-align: center;
  background: transparent;

  ${(props) => props.theme.breakpoints.up('md')} {
    padding: ${(props) => props.theme.spacing(10)};
  }
`;
//
const InvalidHashID = () => (
    <Wrapper>
        <Typography component="h2" variant="h5" align="center" gutterBottom>
            Invalid hash received.
        </Typography>
        <Typography component="h2" variant="body1" align="center" gutterBottom>
            We apologize for the inconvenience, but it seems that the hash you provided is not recognized by our system. To successfully access or participate in the survey, please make sure to use a valid and correctly formatted hash.
        </Typography>
    </Wrapper>
)
//
export default InvalidHashID;