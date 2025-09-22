import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import FiltersSidebar from '../../components/FiltersSidebar';
import CalendarHeader from '../../components/CalendarHeader';
import Calendar from '../../components/Calendar';
import calendarEventsData from '../../data/calendar_events.json';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [currentView, setCurrentView] = useState('dayGridMonth');
  const [showFilters, setShowFilters] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    // Use the specific calendar events data that matches the HTML
    setEvents(calendarEventsData);
  }, []);

  const handleEventClick = (eventObj) => {
    console.log('Event clicked:', eventObj);
    // Handle event click - could open modal, navigate, etc.
    const event = eventObj.event;
    const extendedProps = event.extendedProps;
    
    if (extendedProps.type === 'TRAINING_SESSION') {
      console.log('Training session details:', extendedProps);
    } else if (extendedProps.type === 'GAME') {
      console.log('Game details:', extendedProps);
    }
  };

  const handleViewChange = (viewInfo) => {
    console.log('View changed:', viewInfo);
    setCurrentView(viewInfo.view.type);
  };

  const handleAddEvent = () => {
    console.log('Add event clicked');
    // Handle add event functionality
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleNavigate = (direction) => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      if (direction === 'prev') {
        calendarApi.prev();
      } else if (direction === 'next') {
        calendarApi.next();
      } else if (direction === 'today') {
        calendarApi.today();
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#ffffff',
      }}
    >
      {/* Calendar Header - Always at the top */}
      <CalendarHeader
        currentView={currentView}
        onViewChange={setCurrentView}
        onAddEvent={handleAddEvent}
        onToggleFilters={handleToggleFilters}
        showFilters={showFilters}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          minHeight: 0, // Important for flex children
        }}
      >
        {/* Left Sidebar */}
        {showFilters && (
          <Box sx={{ width: '340px', flexShrink: 0 }}>
            <FiltersSidebar onClose={() => setShowFilters(false)} />
          </Box>
        )}

        {/* Right Content Area */}
        <Box
          sx={{
            flex: 1,
            minHeight: 0, // Important for flex children
            overflow: 'hidden',
          }}
        >
          {/* Calendar Component */}
          <Box sx={{ 
            width: '100%',
            height: '100%',
            minHeight: '600px', // Set minimum height for calendar
          }}>
            <Calendar
              key={`calendar-${showFilters}`}
              ref={calendarRef}
              handleEventClick={handleEventClick}
              onViewChange={handleViewChange}
              selectedCalendarView={currentView}
              orgTimeZone="UTC"
              userLocale="en"
              events={events}
              initialDate="2025-09-01"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CalendarPage;
