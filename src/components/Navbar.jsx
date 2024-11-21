import {
  faCartShopping,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/crown.svg?react";
import { logoutHandler } from "../store/auth-slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated, loggedInUser } = useSelector((state) => state.auth);

  const onLogoutClickHandler = () => {
    dispatch(logoutHandler());
  };

  return (
    <div className="navbar bg-soft-yellow">
      <div className="flex-1">
        <Logo className="text-deep-red" />
      </div>
      <div className="flex gap-x-2">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? "btn ecommerce-btn-active" : "btn ecommerce-btn"
          }
        >
          Product Category
        </NavLink>
        <NavLink
          to={"/shop-item"}
          className={({ isActive }) =>
            isActive ? "btn ecommerce-btn-active" : "btn ecommerce-btn"
          }
        >
          Shop
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "btn ecommerce-btn-active" : "btn ecommerce-btn"
          }
          to={"/cart"}
        >
          <div className="indicator">
            <FontAwesomeIcon
              icon={faCartShopping}
              fill="none"
              className="h-5 w-5"
            />
            <span className="badge badge-sm indicator-item">
              {cartItems?.length}
            </span>
          </div>
        </NavLink>

        {isAuthenticated ? (
          <button className="btn ecommerce-btn" onClick={onLogoutClickHandler}>
            <span>{loggedInUser.displayName}</span>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
        ) : (
          <NavLink
            className={({ isActive }) =>
              isActive ? "btn ecommerce-btn-active" : "btn ecommerce-btn"
            }
            to={"/login"}
          >
            <FontAwesomeIcon icon={faUser} />
            <span>Login</span>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
