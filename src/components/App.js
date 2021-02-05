import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import s from './App.module.css';

export default function App() {
  return (
    <div className={s.container}>
      <h1 className={s.container_header}>Phonebook</h1>
      <ContactForm />
      <h2 className={s.contacts_header}>Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
}
