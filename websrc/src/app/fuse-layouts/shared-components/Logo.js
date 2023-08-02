import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import logoUNIQ from '../../assets/images/logoUNIQ.png';

const Root = styled('div')(({ theme }) => ({
  '& > .logo-icon': {
    transition: theme.transitions.create(['width', 'height'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  '& > .badge, & > .logo-text': {
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
}));

function Logo() {
  return (
    <Root className="flex items-center">
      <img className="logo-icon w-32 h-32" src={logoUNIQ} alt="logo" />
      <Typography className="logo-text text-16 leading-none mx-12 font-medium" color="inherit">
        UNIQ CENTRO PRE UNIVERSITARIO
      </Typography>
    </Root>
  );
}

export default Logo;
