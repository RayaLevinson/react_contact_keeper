import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import configClientSubFolder from '../../config/configClientSubFolder';

import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,    
  CLEAR_CURRENT,  
  UPDATE_CONTACT, 
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR
} from '../types';

const ContactState = props => {

  const currBaseURL = configClientSubFolder.baseUrl;

  const initialState = {
    contacts: null,
    currentContact: null,
    filteredContacts: null,
    error: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState)

  // Get Contacts
  const getContacts = async () => {
    try {
      const res = await axios.get(`${currBaseURL}/api/contacts`);
      dispatch({
        type: GET_CONTACTS,
        payload: res.data
      }) 
    } catch (err) {
      dispatch({ 
        type: CONTACT_ERROR,
        payload: err
      })
    }
  }

  // Add Contact
  const addContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post(`${currBaseURL}/api/contacts`, contact, config);
      dispatch({
        type: ADD_CONTACT,
        payload: res.data
      }) 
    } catch (err) {
      dispatch({ 
        type: CONTACT_ERROR,
        payload: err
        // payload: err.response.msg
      })
    }
  }

  // Delete Contact
  const deleteContact = async (contactId) => {
    try {
      await axios.delete(`${currBaseURL}/api/contacts/${contactId}`);

      dispatch({
        type: DELETE_CONTACT,
        payload: contactId
      }) 
    } catch (err) {
      dispatch({ 
        type: CONTACT_ERROR,
        payload: err
        // payload: err.response.msg
      })
    }
  }

  // Update contact
  const updateContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }    
    try {
      const res = await axios.put(`${currBaseURL}/api/contacts/${contact._id}`, contact, config);

      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data
      })
    } catch (err) {
      dispatch({ 
        type: CONTACT_ERROR,
        payload: err
        // payload: err.response.msg
      })
    }
  }  

  // Clear Contacts
  const clearContacts = () => {
    dispatch({
      type: CLEAR_CONTACTS
    }) 
  }  

  // Set Current Contact
  const setCurrent = contact => {
    dispatch({
      type: SET_CURRENT,
      payload: contact
    }) 
  }

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    }) 
  }

  // Filter Contacts
  const filterContacts = text => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text
    })
  }  

  // Clear Filter
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    })
  } 

  /* 
  // Add Contact
  const addContact = contact => {
    contact.id = uuidv4();
     dispatch({
      type: ADD_CONTACT,
      payload: contact
    }) 
  } 
  */

  /*
  // Delete Contact
  const deleteContact = (contactId) => {
    dispatch({
      type: DELETE_CONTACT,
      payload: contactId
    }) 
  }
  */

  /* 
  // Update contact
  const updateContact = contact => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact
    })
  }  
  */

  return(
    <ContactContext.Provider
      value = {{
        contacts: state.contacts,
        currentContact: state.currentContact,
        filteredContacts: state.filteredContacts,
        error: state.error,
        getContacts,
        addContact,
        updateContact,
        deleteContact,
        clearContacts,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState;