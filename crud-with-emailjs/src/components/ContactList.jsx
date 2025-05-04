import { useState } from "react";
import { List, Typography, Box } from "@mui/material";
import ContactItem from "./ContactItem";

const ContactList = ({ contacts, onEdit, onDelete, onSendEmail }) => {
  if (contacts.length === 0) {
    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="body1">
          No contacts found. Add one to get started!
        </Typography>
      </Box>
    );
  }

  return (
    <List sx={{ width: "100%", mt: 2 }}>
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onEdit={onEdit}
          onDelete={onDelete}
          onSendEmail={onSendEmail}
        />
      ))}
    </List>
  );
};

export default ContactList;
