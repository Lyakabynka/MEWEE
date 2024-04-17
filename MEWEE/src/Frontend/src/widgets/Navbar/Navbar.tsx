import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { EnumUserRole, useAuthStore } from "../../entities";
import { Link, useNavigate } from "react-router-dom";
import { NavbarPlanItIcon } from "./NavbarPlanItIcon";
import Person from "@mui/icons-material/Person";
// import './Navbar.module.scss'

interface INavItem {
  pathName: string;
  path: string;
}

export function Navbar() {
  const { role, isLoggedIn } = useAuthStore();

  const [mainNavItems, setMainNavItems] = useState<INavItem[]>([]);
  const [profileNavItems, setProfileNavItems] = useState<INavItem[]>([
    { pathName: "Profile", path: "/user/profile" },
    { pathName: "Logout", path: "/logout" },
  ]);

  const updateRoleNavbarItems = () => {
    switch (role) {
      case EnumUserRole.user:
        setMainNavItems([
          { path: "/plans", pathName: "Plans" },
          { path: "/plan-groups", pathName: "Groups" },
        ]);
        break;
      default:
        setMainNavItems([
          { path: "/auth/login", pathName: "Login" },
          { path: "/auth/register", pathName: "Register" },
        ]);
        break;
    }
  };

  useEffect(() => {
    updateRoleNavbarItems();
  }, []);

  useEffect(() => {
    updateRoleNavbarItems();
  }, [role, isLoggedIn]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {isLoggedIn && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{
                    color: "primary.contrastText",
                    margin: 0,
                  }}
                >
                  <Person fontSize="large" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {profileNavItems.map((item) => (
                  <MenuItem key={item.pathName} onClick={handleCloseUserMenu}>
                    <Link
                      style={{
                        textAlign: "center",
                        color: "inherit",
                        textDecoration: "none",
                      }}
                      to={item.path}
                    >
                      {item.pathName}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
