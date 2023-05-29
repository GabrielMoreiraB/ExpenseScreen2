import { Avatar, Icon, IconButton } from "@mui/material";
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IUser, signOutEndpoint} from "./backend";
import Box from "@mui/material/Box";

interface IUserMenu {
    onSignOut: () => void;
    user: IUser;
}

const UserMenu = (props: IUserMenu) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    
  };

  const closePubli = ()=> {
    
    /* signOutEndpoint() */
  }

    return ( 
        <div>
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
            <Avatar>
              <Icon>person</Icon>
            </Avatar>
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
            <Box padding="16px" textAlign="center" border='1px solid rgb(224,224,224'>
                <div>User 1</div>
                <div>{props.user.email}</div>
            </Box>
          <MenuItem onClick={props.onSignOut}>Sair</MenuItem>

        </Menu>
      </div>

        
     );
}
 
export default UserMenu;