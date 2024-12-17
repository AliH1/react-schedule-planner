import { useState, useCallback, useEffect } from 'react'
import { Calendar, Event, dateFnsLocalizer } from 'react-big-calendar';
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import { enCA } from 'date-fns/locale/en-CA';
import { subHours } from 'date-fns';
import Modal from './Modal';
import {deleteEvent, createEvent, getUserEvents, updateEvent} from '../api';

const locales = {
  'en-CA': enCA,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const DnDCalendar = withDragAndDrop(Calendar)

type TimeSlot = {
  start: Date;
  end: Date;
}

type EventCalendarProps = {
  userName: string;
}

export default function EventCalendar({userName}: EventCalendarProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventModal, setEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event>();

  useEffect(() => {
    const fetchUserEvents = async() => {
      const submit = await getUserEvents(userName);
      if(submit.message === 'events retrieved'){
        const eventArray = submit.events;
        const newEvents: Event[] = [];
        for(let i = 0; i < eventArray.length; i++){
          const start = new Date(eventArray[i].start_time);
          const end = new Date(eventArray[i].end_time);
          const title = eventArray[i].title;
          //the dates we get from postgresql are in utc so you need to subtract 5 hours to convert for local est
          const event: Event = {
            start: subHours(start, 5),
            end: subHours(end, 5),
            title: title
          }
          newEvents.push(event);
        }
        setEvents(newEvents);
      }
    }
    if(userName !== 'Guest'){
      fetchUserEvents();
    }
    else{
      setEvents([]);
    }
  }, [userName]);

  const handleSelectSlot = async ({ start, end }: TimeSlot) => {
      const title = window.prompt('New Event Name')
      if (title) {
        //api request for create event
        if(userName !== 'Guest'){
          const username = userName;
          const submit = await createEvent({title, start, end, username});
          if(submit.message === 'Event created successfully'){
            setEvents((prev) => [...prev, { start, end, title }]);
          }
        }
        else{
          setEvents((prev) => [...prev, { start, end, title }]);
        }
      }
    };

  const handleSelectEvent = useCallback( (event: Event) => {
    setSelectedEvent(event);
    setEventModal(true);
   }, []);

  const onEventResize: withDragAndDropProps['onEventResize'] = async data => {
    const { start, end } = data;
    const eventIndex = events.findIndex((event) => data['event'] === event);
    //api for event update
    if(userName !== 'Guest'){
      const title = events[eventIndex].title?.toString();
      const start_time = events[eventIndex].start;
      const end_time = events[eventIndex].end;
      const username = userName;
      const newStart = new Date(start);
      const newEnd = new Date(end);
      const submit = await updateEvent({title, start_time, end_time, username, newStart, newEnd});
      if(submit.message === 'Event Time updated successfully'){
        const newEvents = [...events];
        newEvents[eventIndex] = {
            title: events[eventIndex].title,
            start: newStart,
            end: newEnd
        };
        setEvents(newEvents);
      }
    }
    else{
      const newEvents = [...events];
      newEvents[eventIndex] = {
          title: events[eventIndex].title,
          start: new Date(start),
          end: new Date(end)
        };
      setEvents(newEvents);
    }
  }

  const onEventDrop: withDragAndDropProps['onEventDrop'] = async data => {
    const { start, end } = data;
    const eventIndex = events.findIndex((event) => data['event'] === event);
    //api for event update
    if(userName !== 'Guest'){
      const title = events[eventIndex].title?.toString();
      const start_time = events[eventIndex].start;
      const end_time = events[eventIndex].end;
      const username = userName;
      const newStart = new Date(start);
      const newEnd = new Date(end);
      const submit = await updateEvent({title, start_time, end_time, username, newStart, newEnd});
      if(submit.message === 'Event Time updated successfully'){
        const newEvents = [...events];
        newEvents[eventIndex] = {
            title: events[eventIndex].title,
            start: newStart,
            end: newEnd
        };
        setEvents(newEvents);
      }
    }
    else{
      const newEvents = [...events];
      newEvents[eventIndex] = {
          title: events[eventIndex].title,
          start: new Date(start),
          end: new Date(end)
        };
      setEvents(newEvents);
    }
  }

const handleEventDelete = async() => {
  if(selectedEvent === undefined){
    return;
  }
  const eventIndex = events.findIndex((event) => JSON.stringify(selectedEvent) === JSON.stringify(event));
  const newEvents = [...events];
  if(userName !== 'Guest'){
    const title = selectedEvent.title?.toString();
    const start = selectedEvent.start;
    const end = selectedEvent.end;
    const username = userName;
    const submit = await deleteEvent({title, start, end, username});
    if(submit.message == 'Event Deleted successfully'){
      newEvents.splice(eventIndex, 1);
      setEvents(newEvents);
      setEventModal(false);
      setSelectedEvent(undefined);
    }
  }
  else{
    newEvents.splice(eventIndex, 1);
    setEvents(newEvents);
    setEventModal(false);
    setSelectedEvent(undefined);
  }

}

  return (
    <>
      <Modal openModal={eventModal} closeModal={() => setEventModal(false)}>
        <div className='event-info'>
          <h2>{selectedEvent?.title}</h2>
          <p>{'Scheduled Start time: ' + selectedEvent?.start?.toString()}</p>
          <p>{'Scheduled End time: ' + selectedEvent?.end?.toString()}</p>
          <button onClick={handleEventDelete} className='delete-event'>Delete From Schedule</button>
        </div>
      </Modal>
      <DnDCalendar
        dayLayoutAlgorithm='no-overlap'
        defaultView='week'
        events={events}
        localizer={localizer}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        resizable
        style={{ height: '100vh' }}
      />
    </>
  )
}