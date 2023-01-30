import React, { useRef, useContext, useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../ContextProvider/Context';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import AddEventModal from './AddEventModal';
import axios from 'axios';
import moment from 'moment';

const Appointment = () => {

  const [data, setData] = useState(false);

  const { logindata, setLoginData } = useContext(LoginContext);
  //console.log(logindata.ValidUserOne.email);
   //useNavigate는 양식이 제출되거나 특정 event가 발생할 때,  url을 조작할 수 있는 interface를 제공합니다.
  const history = useNavigate();

  const AppointmentValid = async () => {
    let token = sessionStorage.getItem("usersdatatoken");

    const res = await fetch("/validuser", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    });
      //가져온 response data를 json화 하여 data에 저장합니다.
      const data = await res.json();
      //console.log(data.ValidUserOne.role);

      if(data.status === 401 || !data){
        // => localStorage의 usersdatatoken을 가져와 확인하기 떄문에 만약 그것을 지우면 에러가 됨. 
        history("*");
      } else {
        setLoginData(data)
            history("/appointment");
      }
  }

  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]);

  const calendarRef = useRef(null)
  const onEventAdded = (event) => {

    let calendarApi = calendarRef.current.getApi()
    calendarApi.addEvent({
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      title: event.title
    })

  }

  useEffect(() => {
    setTimeout(() => {
      AppointmentValid();
        setData(true)
    }, )
}, [])

async function handleEventAdd(data) {
  await axios.post("/api/calendar/create-event", data.event);
}

async function handleDatesSet(data) {
  const response = await axios.get("/api/calendar/get-events?start="+moment(data.start).toISOString()+"&end="+moment(data.end).toISOString())
  setEvents(response.data);
}

  return (
    <section>
        <button onClick={() => setModalOpen(true)}>Add Appoinment</button>
        <div style={{position: "relative", zIndex: 0}}>
        <FullCalendar
        ref={calendarRef}
        events={events}
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        eventAdd={event => handleEventAdd(event)}
        datesSet={(date) => handleDatesSet(date)}
        //weekends={false}
        headerToolbar={{
          start: "today prev next",
          end: "dayGridMonth dayGridWeek dayGridDay",
        }}
        views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
      />
</div>
      <AddEventModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onEventAdded={event => onEventAdded(event)} />
    </section>
  )
}

export default Appointment
