import { useState, useEffect } from 'react'
import Resources from './components/Resources'
import Modal from './components/Modal'
import BookResource from "./components/BookResource"

const App = () => {
  const title='Resources'
  const [selectedId, setSelectedId] = useState(0)
  const [showResourceBookingModal, setShowResourceBookingModal] = useState(false)
  const [bookingTitle, setBookingTitle] = useState('')
  const [resources, setResources] = useState([])

  const openResourceBookingModal = (id) => {
    setSelectedId(id);
    setShowResourceBookingModal(true);
  }

  const makeReservation = (dateFrom, dateTo, quantity) => {
    closeModal();
    
    var insertRes = async () => {
      var result = await insertReservation(dateFrom, dateTo, quantity) 
      if(result.isSuccess){
        alert("Successfully booked!")
      }
      else{
        alert(result.message)
      }
    }
    insertRes()
  }

  const cancelBooking = () => {
    closeModal();
  }

  const closeModal = () => {
    setShowResourceBookingModal(false);
    setSelectedId(0);
  }

  const fetchResources = async () => {
    const response = await fetch('https://localhost:5001/Resources/getAll')
    const data = await response.json()
    return data
  }

  const insertReservation = async (dateFrom, dateTo, quantity) => {
    const res = await fetch(`https://localhost:5001/Bookings/bookResource`, {
            method: 'POST',
            headers: {
              'Content-type' : 'application/json'
            },
            body: JSON.stringify({dateFrom, dateTo, bookedQuantity : parseInt(quantity), resourceId : selectedId})
    })
    
    const data = await res.json()
    return data
  } 

  useEffect(() => {
    if(selectedId === 0){
      return setBookingTitle("");
    }

    return setBookingTitle('Booking ' + resources.find(r => r.id === selectedId).name);
  }, [selectedId, resources])

  useEffect(() => {
    const getResources = async () => {
        await fetchResources()
          .then((resourcesFromServer) => setResources(resourcesFromServer))
          .catch(e => {
            alert('Problem when loading the resources: ' + e.message);
          })
    }
    getResources()
  }, [])


  return (
    <div className="container">
      <h1>{title}</h1>
      <Resources resources={resources} onBookHere={openResourceBookingModal}/>
      <Modal show={showResourceBookingModal} cancel={cancelBooking} 
              children={<BookResource onBook={makeReservation} isShown={showResourceBookingModal}></BookResource>} 
              title={bookingTitle} />
    </div>
  );
}

export default App;
