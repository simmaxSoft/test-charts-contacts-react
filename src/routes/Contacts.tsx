import React,{ useState } from "react"
import { Modal } from "../components"
import { IContact, TContactStatus } from "../store/contacts.types"
import { useAppDispatch, useAppSelector } from "../store"
import { addContact, deleteContact, editContact } from "../store/slice";


export default function Contact (){
  const dispatch = useAppDispatch();

  const [contact,setContact] = useState<IContact>({
    firstName:'',
    lastName:'',
    status:'active'
  })
  const [isOpen,setIsOpen] = useState(false)
  const [mode,setMode] = useState<'create'|'edit'>('create')

  const contacts = useAppSelector(state => state.contacts.contacts)
  
  function handleCreateContactButtonClick(){
    setMode('create')
    setIsOpen(true)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    if(mode === 'edit'){
      dispatch(editContact(contact))
    }
    else {
      dispatch(addContact({...contact,id: generateUUID()}))
    }

    setIsOpen(false)
  }

  function handleClickDeleteContact(contactId: string){
    dispatch(deleteContact(contactId));
  };

  function handleClickEditContact(contact: IContact){
    setContact(contact)
    setMode('edit')
    setIsOpen(true)
  }

  return (
  <div className='px-10 py-4'>
    <div className="flex flex-col items-center gap-4">
      <button 
        className="p-2 bg-gray-100 rounded-md hover:cursor-pointer hover:bg-gray-200"
        onClick={handleCreateContactButtonClick}>
          Create Contact
        </button>

        {contacts.length ? (
        <div className="flex flex-wrap gap-8 justify-around">
          {contacts.map((c)=>
          (<div className="w-96 border-gray-500 rounded-md border-2 space-y-2 py-2" key={c.id}> 
              <p className="text-center"><span>{c.firstName}</span> <span>{c.lastName}</span></p>
              <p className="text-center">Status: {c.status}</p>
              <p className="flex justify-around">
                <button
                  onClick={()=> handleClickEditContact(c)} 
                  className="p-2 text-xl font-semibold border-gray-50 border-2 rounded w-28 bg-yellow-300 hover:cursor-pointer hover:bg-yellow-500">
                    Edit
                  </button>
                <button 
                  className="p-2 text-xl font-semibold border-gray-50 border-2 rounded w-28 bg-red-300 hover:cursor-pointer hover:bg-red-500" 
                  onClick={()=> handleClickDeleteContact(c.id as string)}>
                    Delete
                  </button>
              </p>
            </div>)
          )}
        </div>
        ) : (
          <div> There are no contacts, to create the first one use button above </div>
        )}
    </div>

    <Modal isOpen={isOpen} onClose={()=>setIsOpen(false)} mode={mode}>
    <h3 className='text-2xl mt-4 font-bold text-center'>{mode === 'create' ? 'Create contact': 'Edit contact'}</h3>
      <form onSubmit={handleSubmit} className="w-96">
        <div className="my-4 w-full flex gap-4 items-center">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" className="border-gray-400 rounded-md border-2 px-2 flex-grow" placeholder="Joe" id="firstName" value={contact.firstName} required onChange={(e) => setContact((prev) => ({...prev, firstName: e.target.value}))} />
        </div>
        <div className="my-4 w-full flex gap-4 items-center">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" className="border-gray-400 rounded-md border-2 px-2 flex-grow" placeholder="Biden" id="lastName" value={contact.lastName} required onChange={(e) => setContact((prev) => ({...prev, lastName: e.target.value}))} />
        </div>
        <div className="my-4 w-full flex items-center gap-12">
          <span>Status:</span>
          <div className="flex flex-col gap-4">
            <label className="hover:cursor-pointer">
              <input type="radio" value="active" checked={contact.status === 'active'} onChange={(e) => setContact((prev) => ({...prev, status: e.target.value as TContactStatus}))} />
              <span className="ml-2">Active</span>
            </label>
            <label className="hover:cursor-pointer">
              <input type="radio" value="inactive" checked={contact.status === 'inactive'} onChange={(e) => setContact((prev) => ({...prev, status: e.target.value as TContactStatus}))} />
              <span className="ml-2">Inactive</span>
            </label>
          </div>
        </div>
        <button className='block mx-auto text-2xl p-2 rounded-md mt-4 bg-green-200 hover:bg-gray-200 hover:cursor-pointer'>{mode === 'create' ? 'Create' : 'Save'}</button>
      </form>
    </Modal>
   </div>
   )
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

