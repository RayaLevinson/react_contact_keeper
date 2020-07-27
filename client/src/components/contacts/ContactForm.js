import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  
  const { currentContact, addContact, clearCurrent, updateContact } = contactContext;

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  useEffect(() => {
    if (currentContact) {
      setContact(currentContact)
    } else {
      setContact({
        name:  '',
        email: '',
        phone: '',
        type: 'personal'
      })
    }
  }, [contactContext, currentContact]);

  const { name, email, phone, type } = contact;

  const onChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    if (!currentContact) {
      addContact(contact);
    }
    else {
      updateContact(contact);
    }
    clearAll();
    e.preventDefault();
  }

  const clearAll = () => {
    clearCurrent();
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{currentContact ? 'Edit Contact' : 'Add Contact'}</h2>
      <input 
        type="text" 
        placeholder="Name" 
        name="name" 
        value={name} 
        onChange={onChange} 
      />
      <input 
        type="text" 
        placeholder="Email" 
        name="email" 
        value={email} 
        onChange={onChange} 
      />
      <input 
        type="text" 
        placeholder="Phone" 
        name="phone" 
        value={phone} 
        onChange={onChange} 
      />
      <h5>Contact Type</h5>
      <input 
        type="radio" 
        placeholder="Type" 
        name="type" 
        value="personal"
        checked={type === 'personal'}
        onChange={onChange}      
      /> Personal{' '}
      <input 
        type="radio" 
        placeholder="Type" 
        name="type" 
        value="professional"
        checked={type === 'professional'} 
        onChange={onChange}        
      /> Professional
      <div>
        <input type="submit" value={currentContact ? 'Update Contact' : 'Add Contact'} className="btn btn-primary btn-block" />
      </div>
      { currentContact && <div>
          <button onClick={clearAll} className="btn btn-light btn-block">Clear</button>
        </div>
      }
    </form>
  )
}

export default ContactForm;
