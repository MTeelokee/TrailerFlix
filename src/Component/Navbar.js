import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Logo from "../Asset/trailerflix.png"
import Movies from "../Asset/movies.png"
import Tv from "../Asset/tv.png"
import Mevine from "../Asset/Mevine.jpg"
import Elyes from "../Asset/Elyes.jpg"
import { useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";

const NavBar = () => {
  const navigate = useNavigate();
  const [user,setUser] = useContext(UserContext)
  const search = (e) => {
    e.preventDefault();
    e.target.value.length > 0
      ? 
      navigate(`/home/search/${e.target.value}`)
      : navigate("/home/movie");
  };

  const clear = () => {
    const query= document.querySelector(".form__field")
    query.value = "";
  }
 useEffect(()=>{if(!user.name){navigate("/")}},[user.name]) 
  return (
    <>
    <div className="navBar">
    <div>
    <NavLink  activeclassname="active" to="/home/movie" onClick={()=> clear()}  >
      <img src={Logo} width={"250px"} style={{marginTop : "30px"}} alt="logo"/>
      </NavLink> 
        
      </div>
      <div className="link">
    
        <NavLink  activeclassname="active navbarlink" to="/home/movie" onClick={()=> clear()}> <img src={Movies} alt="" /> </NavLink>
        -
{/*     <NavLink  activeClassName="active" to="/anime" onClick={()=> clear()} style={{textDecoration : "none", color:"white"}} ><img src={Anime} alt="" /></NavLink> */}
        
        <NavLink  activeclassname="active" to="/home/series" onClick={()=> clear()}><img src={Tv} alt="" /></NavLink>
      </div>
      
      <div className="iconeName">
      <div className="form__group field">
        <input
          placeholder="Search films"
          className="form__field"
          type="input"
          onChange={(e) => search(e)}
        />
        <label className="form__label">Search films</label>
      </div>
      <div className="iconeDetail">
        <img src={user.img === 1 ? Mevine : Elyes} alt={user.name} width={"30px"} onClick={() => navigate("/")}/>
        <p style={{fontSize : "10px"}}>{user.name}</p>
      </div>
      </div>
      
    </div>
    <Outlet/>
    </>
  );
};

export default NavBar;
