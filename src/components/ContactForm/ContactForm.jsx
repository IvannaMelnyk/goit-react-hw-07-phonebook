import { useState } from 'react';
import shortid from 'shortid';
import s from './ContactForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import contactsOperations from 'redux/phonebook-operations';
import { getContacts } from 'redux/phonebook-selectors';
import { useForm } from 'react-hook-form';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contactNameId = shortid.generate();
  const contactNumberId = shortid.generate();
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleFormSubmit = data => {
    // e.preventDefault();
    console.log(data.name);
    if (data.name === '') {
      alert(`Please enter all data`);
      return;
    }

    if (data.number === '') {
      alert(`Please enter phone number`);
      return;
    }

    if (contacts.find(contact => contact.name === data.name)) {
      alert(`${data.name} is already in contacts.`);
      reset();
      return;
    }
    dispatch(contactsOperations.addContact(data.name, data.number));
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <label className={s.label} htmlFor={contactNameId}>
        Name
        <input
          className={s.input}
          type="text"
          name="name"
          placeholder="Сontact name"
          value={name}
          onChange={handleChange}
          id={contactNameId}
          ref={register}
        />
      </label>
      <label className={s.label} htmlFor={contactNumberId}>
        Number
        <input
          className={s.input}
          type="text"
          name="number"
          placeholder="Сontact number"
          value={number}
          onChange={handleChange}
          id={contactNumberId}
          ref={register}
        />
      </label>

      <button className={s.button} type="submit">
        Add contact
      </button>
    </form>
  );
}
