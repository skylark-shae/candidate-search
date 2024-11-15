import { Link } from "react-router-dom";

const Nav = () => {
  const selected = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.className = 'nav-link nav-item';
    });
    const target = event.currentTarget;
    target.className = 'nav-link nav-item active';
  }
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <div className="nav">
      <Link onClick={selected} className="nav-link nav-item " to={'/'} >Home</Link>
      <Link onClick={selected} className="nav-link nav-item " to={'/SavedCandidates'} >Potential Candidates</Link>
    </div>
  )
};

export default Nav;
