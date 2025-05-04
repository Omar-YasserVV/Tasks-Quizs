import { useState } from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { Delete, Edit, Email } from "@mui/icons-material";

const ContactItem = ({ contact, onEdit, onDelete, onSendEmail }) => {
  return (
    <ListItem divider>
      <ListItemText
        primary={contact.name}
        secondary={
          <>
            <Typography component="span" variant="body2" color="text.primary">
              {contact.email}
            </Typography>
            <br />
            {contact.message}
          </>
        }
      />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="email"
          onClick={() => onSendEmail(contact)}
        >
          <Email />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="edit"
          onClick={() => onEdit(contact)}
        >
          <Edit />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => onDelete(contact.id)}
        >
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ContactItem;
