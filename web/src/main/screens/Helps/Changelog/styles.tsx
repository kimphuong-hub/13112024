import { TypographyProps, styled } from '@mui/material';
import FontAwesomeIcon from '~/base/components/Icon/FontAwesome';
import Typography, { TypographySecondary } from '~/base/components/Material/Typography';

export const TypographyTitleStyled = styled(Typography)(() => ({
  fontSize: 20,
  fontWeight: 'bold'
}));

export const TypographyTimerStyled = styled((props: TypographyProps) => {
  const { children, ...restProps } = props;
  return (
    <TypographySecondary {...restProps}>
      <FontAwesomeIcon icon='fa-solid fa-clock' size={10} style={{ marginRight: 5 }} />
      {children}
    </TypographySecondary>
  );
})(() => ({
  fontSize: 11,
  fontWeight: 'bold'
}));
