import { useState } from 'react';
import { Popover, ListItemText, IconButton, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import styled from "@emotion/styled";

const NotificationItem = styled.div`
    display: flex;
    gap: 10px;
    padding: 5px;
    align-items: center;
    max-width: 400px;
    cursor: pointer;
    &:hover{
        background-color: #A5A2FF36;
    }
    &:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }
  .notification-text {
    white-space: nowrap; 
    overflow: hidden;  
    text-overflow: ellipsis; 
  }
`
const NotificationContainer = styled.div`
    max-height: 400px;
    height: 400px;
    overflow-y: auto;
`

const NotificationList = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const notifications = [
        { id: 1, message: "New message from Alice", read: false },
        { id: 2, message: "Your meeting starts in 10 minutes issjkgskjsg", read: false },
        { id: 3, message: "New comment on your post", read: false },
        { id: 4, message: "New comment on your post", read: false },
        { id: 5, message: "11 New comment on your post", read: false },
        { id: 6, message: "12 New comment on your post", read: false },
        { id: 7, message: "13 New comment on your post", read: false },
        { id: 8, message: "14 New comment on your post", read: true },
        { id: 9, message: "15 New comment on your post", read: true },
    ];

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'notification-popover' : undefined;

    return (
        <div>
            {/* Notification Button with Badge */}
            <IconButton color="inherit" onClick={handleClick}>
                <Badge badgeContent={notifications.length} color="primary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>


            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <NotificationContainer>
                    {notifications.length === 0 ? (
                        <NotificationItem>
                            <ListItemText primary="No new notifications" />
                        </NotificationItem>
                    ) : (
                        notifications.map((notification) => (
                            <NotificationItem key={notification.id}>
                                <IconButton>
                                    {notification.read ? <MarkEmailReadIcon /> : <MarkEmailUnreadIcon />}
                                </IconButton>
                                <ListItemText  primary={<div className="notification-text">{notification.message}</div>} />
                            </NotificationItem>
                        ))
                    )}
                </NotificationContainer>
            </Popover>
        </div>
    );
};

export default NotificationList;
