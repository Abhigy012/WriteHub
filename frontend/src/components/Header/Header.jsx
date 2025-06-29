import React from "react";
import { Container, Logo } from "../index";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";

function Header({ user, onLogout }) {
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !user,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !user,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: !!user,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: !!user,
    },
  ];

  return (
    <header className="bg-[#1f2937] text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Container>
        <nav className="flex items-center">
          <div className="mr-4">
            <Link to="/" className="transition-opacity duration-200 hover:opacity-80">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex items-center ml-auto space-x-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <Link
                    to={item.slug}
                    className="inline-block px-6 py-2 duration-200 rounded-full text-[#e2e8f0] hover:text-[#6366f1] hover:bg-[#374151] transition-all"
                  >
                    {item.name}
                  </Link>
                </li>
              ) : null
            )}
            {user && (
              <li>
                <LogoutBtn onLogout={onLogout} />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;