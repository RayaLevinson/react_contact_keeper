import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const text = useRef('');

  const { filterContacts, clearFilter, filteredContacts } = contactContext;

  useEffect(() => {
    if (filteredContacts === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {    
    if (text.current.value !== '') {
      filterContacts(e.target.value);
    }
    else {
      clearFilter();
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <input ref={text} type="text" onChange={onChange} placeholder="Filter Contacts..."/>
    </form>
  )
}

export default ContactFilter;
