import { NavLink, useLocation } from "react-router-dom";
import classes from "./Navbar.module.css";
import logo from "../../../images/logo.svg";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { userContext } from "../../../userContext/context";
import { useContext } from "react";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "1rem",
};
const Navbar = ({ list }) => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const { isLogin } = useContext(userContext);
    
    const scrollHandler = (servicesRef) => {
        window.scrollTo({
            top: servicesRef.current.offsetTop,
            behavior: "smooth",
        });
    };
    const { servicesRef } = useContext(userContext);

    return (
        <header>
            <nav>
                <div className={classes.left}>
                    <NavLink to="/">
                        <div className={classes.logo}>
                            <img
                                src={logo}
                                alt="not found"
                                className={classes.img}
                            />
                            <h2>Fudo</h2>
                        </div>
                    </NavLink>
                    <div className={classes.navBtn} onClick={toggleMenu}>
                        <MenuRoundedIcon
                            size="large"
                            style={{ borderRadius: "1.5rem" }}
                        />
                    </div>
                </div>
                <div className={classes.right}>
                    <ul
                        className={
                            isMenuOpen ? `${classes.right}` : `${classes.hide}`
                        }
                    >
                        {location.pathname === "/" && (
                            <li>
                                <a onClick={() => scrollHandler(servicesRef)}>
                                    Services
                                </a>
                            </li>
                        )}
                        {list.map((item) => {
                            return (
                                <li key={item.key}>
                                    <NavLink to={`/${item.to || "#"}`}>
                                        {item.title && (
                                            <p href="#">{item.title}</p>
                                        )}
                                        {item.imgfwd && item.imgfwd}
                                        {item.component && item.component}
                                    </NavLink>
                                </li>
                            );
                        })}
                        

                           {!isLogin && <li>
                                <a href="/homepage#menu" >
                                    Menu
                                </a>
                            </li>}

                        
                    </ul>
                </div>
            </nav>
        </header>
    );
};
export default Navbar;
