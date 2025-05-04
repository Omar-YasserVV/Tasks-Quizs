import { useState, useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
} from "./services/contactService";
import { sendEmail } from "./services/emailService";

function App() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const data = await getContacts();
    setContacts(data);
  };

  const handleAddContact = async (contactData) => {
    if (editingContact) {
      await updateContact(editingContact.id, contactData);
    } else {
      await addContact(contactData);
    }
    setEditingContact(null);
    setShowForm(false);
    fetchContacts();
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleDeleteContact = async (id) => {
    await deleteContact(id);
    fetchContacts();
  };

  const handleSendEmail = async (contact) => {
    try {
      await sendEmail({
        to_name: contact.name,
        to_email: contact.email,
        message: contact.message,
        from_name: "Your App Name",
      });
      alert("Email sent successfully!");
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send email. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
    setShowForm(false);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Contact Manager
        </Typography>

        {!showForm ? (
          <Button
            variant="contained"
            onClick={() => setShowForm(true)}
            sx={{ mb: 3 }}
          >
            Add Contact
          </Button>
        ) : (
          <ContactForm
            contact={editingContact}
            onSubmit={handleAddContact}
            onCancel={handleCancelEdit}
          />
        )}

        <ContactList
          contacts={contacts}
          onEdit={handleEditContact}
          onDelete={handleDeleteContact}
          onSendEmail={handleSendEmail}
        />
      </Box>
    </Container>
  );
}

export default App;
