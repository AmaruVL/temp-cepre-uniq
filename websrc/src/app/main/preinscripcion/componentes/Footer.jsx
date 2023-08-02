import HomeIcon from '@mui/icons-material/Home';
import { Tooltip } from '@mui/material';
import Logo from '../../../assets/images/logoUNIQ.png';

function Footer() {
  return (
    <footer className="z-20 mt-5 grid grid-rows-3 items-center justify-items-center gap-2 rounded-t-3xl border-1 border-black-100 bg-teal-600 text-white p-4 shadow-md sm:grid-cols-3 sm:grid-rows-1 md:mt-10">
      <div className="my-2">
        <img src={Logo} alt="logo" className="h-full cursor-pointer" width="60" height="60" />
      </div>
      <div>Universidad Nacional Intercultural de Quillabamba © {new Date().getFullYear()}</div>
      <div className="flex gap-6">
        <Tooltip title="UNIQ">
          <a
            href="https://www.uniq.edu.pe/"
            target="_blank"
            aria-label="Github"
            rel="noopener noreferrer"
          >
            <HomeIcon className="text-3xl" />
          </a>
        </Tooltip>
      </div>
    </footer>
  );
}

export default Footer;
