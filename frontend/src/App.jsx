import { useState } from 'react'
import ContactForm from './components/ContactForm'

import ContactList from './components/ContactList'
import './App.css'

function App() {

  const [contacts, setContacts] = useState([]);

  return (
    <>
      <div className="p-8 max-w-[1440px] mx-auto md:grid grid-cols-3 gap-[70px] bg-blue-200">
        <div className='col-span-1 space-y-4'>
          <h1 className="text-3xl font-bold mb-5 text-blue-950">
            Contact Management
          </h1>
          <ContactForm setContacts={setContacts} contacts={contacts} />
        </div>
        <div className='col-span-2'>
          <ContactList setContacts={setContacts} contacts={contacts} />
        </div>
      </div>
    </>
  )
}

export default App
