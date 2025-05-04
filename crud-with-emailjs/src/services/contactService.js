// This is a mock service - in a real app you'd connect to a backend API
let contacts = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    message: "Hello there!",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    message: "How are you?",
  },
];

let nextId = 3;

export const getContacts = () => {
  return Promise.resolve([...contacts]);
};

export const addContact = (contact) => {
  const newContact = { ...contact, id: nextId++ };
  contacts.push(newContact);
  return Promise.resolve(newContact);
};

export const updateContact = (id, updatedContact) => {
  contacts = contacts.map((contact) =>
    contact.id === id ? { ...updatedContact, id } : contact
  );
  return Promise.resolve(updatedContact);
};

export const deleteContact = (id) => {
  contacts = contacts.filter((contact) => contact.id !== id);
  return Promise.resolve();
};
