import {
  faCartShopping,
  faCrown,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { logoutHandler } from "../store/auth-slice";
import { resetUserOrder } from "../store/order-slice";
import { successToast } from "../services/toast-service";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated, loggedInUser } = useSelector((state) => state.auth);

  const onLogoutClickHandler = () => {
    dispatch(logoutHandler());
    dispatch(resetUserOrder());
    successToast("Successfully logged out");
    if (location.pathname?.includes("orders")) {
      navigate("/");
    }
  };

  return (
    <div className="navbar bg-soft-yellow">
      <div className="flex-1">
        <Link
          to="/"
          className="btn bg-dark-brown border-none text-pale-lavender hover:bg-pale-lavender hover:text-dark-brown"
        >
          <FontAwesomeIcon icon={faCrown} />
          <span>Crown Clothing</span>
        </Link>
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
        {isAuthenticated && (
          <NavLink
            to={"/orders"}
            className={({ isActive }) =>
              isActive ? "btn ecommerce-btn-active" : "btn ecommerce-btn"
            }
          >
            Orders
          </NavLink>
        )}
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
