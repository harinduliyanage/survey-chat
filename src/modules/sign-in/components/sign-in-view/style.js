import { styled } from '@mui/material/styles';
import { PRIMARY_COLOR, PAGE_BACKGROUND_COLOR } from 'modules/common/constants/style';

export const PageStruct = styled('div')({
  backgroundColor: PAGE_BACKGROUND_COLOR,
  width: '100%',
  height: '100%',
  position: 'absolute',
  display: 'flex',
});
//
export const BodySection = styled('div')({
  width: '50%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});
//
export const ContentSection = styled('div')({
  width: '50%',
});
//
export const ColorSection = styled('div')({
  width: '50%',
  height: '100%',
  backgroundColor: PRIMARY_COLOR,
});
