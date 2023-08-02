import * as React from 'react';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LockOpenIcon from '@mui/icons-material/LockOpen';
// "src/assets/SporTechLogo.png"

const pages = ['Products', 'Pricing', 'Blog'];
const settings = [
  { path: '', name: 'Sing in', icon: LockOpenIcon },
  { path: '', name: 'Sing up', icon: PersonAddAltIcon },
];
const scrollProps = {
  spy: true,
  smooth: true,
  offset: -80,
  duration: 500,
  activeClass: 'active',
};

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  return (
    <header className="sticky top-0 z-20 flex h-80 w-full justify-center bg-teal-600 text-white p-4 shadow-md">
      <h1 className="text-center my-20">
        <b>UNIVERSIDAD NACIONAL INTERCULTURAL DE QUILLABAMBA</b>
      </h1>
    </header>
  );
};
export default Header;
