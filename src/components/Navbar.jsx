import React from "react";
import Logo from "../assets/crown.svg?react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";

const Navbar = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="navbar bg-soft-yellow">
      <div className="flex-1">
        <Logo className="text-deep-red" />
      </div>
      <div className="flex gap-x-2">
        <Link to={"/"} className="btn ecommerce-btn">
          Product Category
        </Link>
        <Link to={"/shop-item"} className="btn ecommerce-btn">
          Shop
        </Link>
        <button
          className="btn ecommerce-btn"
          disabled={!cartItems.length}
          onClick={() => navigate("/cart")}
        >
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="badge badge-sm indicator-item">
              {cartItems?.length}
            </span>
          </div>
        </button>
        <button
          className="btn ecommerce-btn"
          onClick={() => navigate("/login")}
        >
          <FontAwesomeIcon icon={faUser} />
          <span>{isAuthenticated ? "Yash Govani" : "Login"}</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
