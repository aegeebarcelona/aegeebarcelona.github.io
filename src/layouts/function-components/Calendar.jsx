import React, { useEffect, useState } from 'react';
import ICAL from 'ical.js';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa'; // Importing icons

const Calendar = ({ file }) => {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    fetch(file)
      .then(response => response.text())
      .then(data => {
        const jcalData = ICAL.parse(data);
        const comp = new ICAL.Component(jcalData);
        const vevents = comp.getAllSubcomponents('vevent');
        const upcomingEvents = vevents.map(event => {
          const summary = event.getFirstPropertyValue('summary');
          const dtstart = event.getFirstPropertyValue('dtstart');
          let dtend = event.getFirstPropertyValue('dtend');
          const location = event.getFirstPropertyValue('location');
          const description = event.getFirstPropertyValue('description');

          // Set dtend to null if it's not set or if it's exactly the same as dtstart
          // With ical, if the end time is not specified, it is the same as start time
          if (!dtend || dtstart.compare(dtend) === 0) {
            dtend = null;
          }

          const now = new Date();
          if (ICAL.Time.fromJSDate(now).compare(dtstart) <= 0) {
            return {
              summary,
              dtstart: dtstart.toJSDate(),
              dtend: dtend ? dtend.toJSDate() : null,
              location,
              description
            };
          }
          return null;
        }).filter(event => event !== null);
        setEvents(upcomingEvents);
      });
  }, [file]);
  

  return (
    <div className="p-8">
      <ul className="space-y-6">
        {events.map((event, index) => (
          <li key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex flex-col lg:flex-row lg:items-start">
              {/* Top Section for Mobile: Date */}
              <div className="lg:flex-shrink-0 lg:w-32 lg:text-left flex flex-col max-lg:flex-row justify-center">
                <p className="text-center font-bold text-amber-600 max-lg:mr-2">
                  {event.dtstart.toLocaleString('en-US', { weekday: 'short' }).toUpperCase()}
                </p>
                <p className="lg:text-2xl text-center font-extrabold text-gray-800 max-lg:mr-2">
                  {event.dtstart.getDate()}
                </p>
                <p className="text-center font-medium text-gray-500">
                  {event.dtstart.toLocaleString('en-US', { month: 'short' })}
                </p>
              </div>

              {/* Middle Section: Title and Description */}
              <div className="flex-grow px-4 mt-2 lg:mt-0">
                <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 max-lg:text-center">{event.summary}</h2>
                <div className="mt-1 lg:mt-2 text-gray-600 text-sm flex max-lg:flex-col items-center">
                  <span className="flex items-center lg:mr-4">
                    <FaClock className="mr-2 text-blue-400" />
                    {event.dtstart.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                    {event.dtend && (
                      <> - {event.dtend.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</>
                    )}
                  </span>
                  {event.location && (
                    <span className="flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-red-500" />
                      {event.location}
                    </span>
                  )}
                </div>
                {event.description && (
                  <p className="text-gray-600 mt-2 text-sm max-lg:text-center">{event.description}</p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
