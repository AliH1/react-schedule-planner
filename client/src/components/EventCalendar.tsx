import { useState, useCallback } from 'react'
import { Calendar, Event, dateFnsLocalizer } from 'react-big-calendar';
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import { enCA } from 'date-fns/locale/en-CA';
import { addHours } from 'date-fns/addHours';
import Modal from './Modal';

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
  userName: String;
}

export default function EventCalendar(props: EventCalendarProps) {
  const [events, setEvents] = useState<Event[]>([
    {
      title: 'test',
      start: new Date(),
      end: addHours(new Date(), 2)
    },
  ]);
  const [eventModal, setEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event>();

  const handleSelectSlot = useCallback(({ start, end }: TimeSlot) => {
      const title = window.prompt('New Event Name')
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }])
      }
    }, [setEvents]);

  const handleSelectEvent = useCallback( (event: Event) => {
    setSelectedEvent(event);
    setEventModal(true);
   }, []);

  const onEventResize: withDragAndDropProps['onEventResize'] = data => {
    const { start, end } = data;
    const eventIndex = events.findIndex((event) => data['event'] === event);
    const newEvents = events;
    newEvents[eventIndex] = {
        title: events[eventIndex].title,
        start: new Date(start),
        end: new Date(end)
    };
    setEvents(newEvents);
  }

  const onEventDrop: withDragAndDropProps['onEventDrop'] = data => {
    const { start, end } = data;
    const eventIndex = events.findIndex((event) => data['event'] === event);
    const newEvents = events;
    newEvents[eventIndex] = {
        title: events[eventIndex].title,
        start: new Date(start),
        end: new Date(end)
    };
    setEvents(newEvents);
  }

const handleEventDelete = () => {
  //TODO remove from database aswell
  const eventIndex = events.findIndex((event) => selectedEvent === event);
  const newEvents = events;
  newEvents.splice(eventIndex, 1);
  setEvents(newEvents);
  setEventModal(false);
  setSelectedEvent(undefined);
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