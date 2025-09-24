import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Box } from '@mui/material';
import FiltersSidebar from '../../components/FiltersSidebar';
import CalendarHeader from '../../components/CalendarHeader';
import Calendar from '../../components/Calendar';
import EventTooltip from '../../components/EventTooltip';
import AddEventSidebar from '../../components/AddEventSidebar';
import calendarEventsData from '../../data/calendar_events.json';
import athletesData from '../../data/athletes.json';
import staffData from '../../data/users_staff.json';

const CalendarPage = () => {
  // Eventos base (todos) y eventos filtrados
  const [allEvents, setAllEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentView, setCurrentView] = useState('dayGridMonth');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddEventSidebar, setShowAddEventSidebar] = useState(false);
  const [tooltip, setTooltip] = useState({ show: false, event: null, position: { x: 0, y: 0 } });
  const [currentDate, setCurrentDate] = useState(new Date('2025-09-01'));
  const calendarRef = useRef(null);

  // Conteo de filtros activos para el header
  const [activeFilters, setActiveFilters] = useState({
    squads: 0,
    types: 0,
    attendees: 0,
    location: 0,
    games: 0,
  });

  // Estado de filtros seleccionados
  const [filters, setFilters] = useState({
    squads: [],
    types: [],
    locations: [],
  });

  useEffect(() => {
    // Cargar eventos base y eliminar url para evitar navegación
    const eventsWithoutUrls = calendarEventsData.map(event => {
      const { url, ...rest } = event;
      return rest;
    });
    setAllEvents(eventsWithoutUrls);
    setEvents(eventsWithoutUrls);
  }, []);

  // Opciones disponibles derivadas de todos los eventos
  const availableOptions = useMemo(() => {
    const squads = new Set();
    const types = new Set();
    const locations = new Set();
    allEvents.forEach(ev => {
      const squad = ev?.extendedProps?.squad;
      if (squad) squads.add(squad);
      const type = ev?.extendedProps?.eventType;
      if (type) types.add(type);
      const location = ev?.extendedProps?.location;
      if (location) locations.add(location);
    });
    return {
      squads: Array.from(squads).sort(),
      types: Array.from(types).sort(),
      locations: Array.from(locations).sort(),
    };
  }, [allEvents]);

  // Inicializar filtros cuando haya opciones
  useEffect(() => {
    if (availableOptions.squads.length && filters.squads.length === 0) {
      setFilters({
        squads: availableOptions.squads,
        types: availableOptions.types,
        locations: availableOptions.locations,
      });
      setActiveFilters(prev => ({
        ...prev,
        squads: availableOptions.squads.length,
        types: availableOptions.types.length,
        location: availableOptions.locations.length,
      }));
    }
  }, [availableOptions, filters.squads.length]);

  // Aplicar filtrado
  useEffect(() => {
    if (!allEvents.length) return;
    const filtered = allEvents.filter(ev => {
      const squad = ev?.extendedProps?.squad;
      const type = ev?.extendedProps?.eventType;
      const location = ev?.extendedProps?.location;
      const squadOk = !filters.squads.length || filters.squads.includes(squad);
      const typeOk = !filters.types.length || filters.types.includes(type);
      const locationOk = !filters.locations.length || filters.locations.includes(location);
      return squadOk && typeOk && locationOk;
    });
    setEvents(filtered);
  }, [allEvents, filters]);

  // Helper function to calculate optimal tooltip position
  const calculateTooltipPosition = (eventRect, containerRect, tooltipWidth = 400, tooltipHeight = 200) => {
    const padding = 10;
    
    // Calculate position relative to the calendar container
    const eventLeft = eventRect.left - containerRect.left;
    const eventTop = eventRect.top - containerRect.top;
    const eventRight = eventLeft + eventRect.width;
    const eventBottom = eventTop + eventRect.height;
    const eventCenterX = eventLeft + (eventRect.width / 2);
    const eventCenterY = eventTop + (eventRect.height / 2);
    
    // Calculate available space in each direction
    const spaceRight = containerRect.width - eventRight - padding;
    const spaceLeft = eventLeft - padding;
    const spaceBelow = containerRect.height - eventBottom - padding;
    const spaceAbove = eventTop - padding;
    
    let x, y, positionType = '';
    
    // Determine best position based on available space
    if (spaceRight >= tooltipWidth) {
      // Position to the right (preferred)
      x = eventRight;
      y = eventCenterY - (tooltipHeight / 2);
      positionType = 'right';
    } else if (spaceLeft >= tooltipWidth) {
      // Position to the left
      x = eventLeft - tooltipWidth;
      y = eventCenterY - (tooltipHeight / 2);
      positionType = 'left';
    } else if (spaceBelow >= tooltipHeight) {
      // Position below
      x = eventCenterX - (tooltipWidth / 2);
      y = eventBottom;
      positionType = 'below';
    } else if (spaceAbove >= tooltipHeight) {
      // Position above
      x = eventCenterX - (tooltipWidth / 2);
      y = eventTop - tooltipHeight;
      positionType = 'above';
    } else {
      // Fallback: position to the right and adjust if needed
      x = eventRight;
      y = eventCenterY - (tooltipHeight / 2);
      positionType = 'right (fallback)';
    }
    
    // Ensure tooltip stays within container bounds
    x = Math.max(padding, Math.min(x, containerRect.width - tooltipWidth - padding));
    y = Math.max(padding, Math.min(y, containerRect.height - tooltipHeight - padding));
    
    return { x, y, positionType };
  };

  const handleEventClick = (eventObj) => {
    console.log('Event clicked:', eventObj);
    
    // Prevent default navigation behavior
    eventObj.jsEvent.preventDefault();
    eventObj.jsEvent.stopPropagation();
    
    const event = eventObj.event;
    const jsEvent = eventObj.jsEvent;
    
    console.log('Event data:', event);
    console.log('Event URL:', event.url);
    
    // Close any existing tooltip first
    setTooltip({ show: false, event: null, position: { x: 0, y: 0 } });
    
    // Use setTimeout to ensure DOM is updated and we get accurate positioning
    setTimeout(() => {
      // Get click position for tooltip placement
      const eventRect = jsEvent.target.getBoundingClientRect();
      
      // Get the calendar container's position to calculate relative positioning
      const calendarContainer = document.querySelector('.calendar');
      if (!calendarContainer) {
        console.error('Calendar container not found');
        return;
      }
      
      const containerRect = calendarContainer.getBoundingClientRect();
      
      // Calculate optimal tooltip position
      const { x, y, positionType } = calculateTooltipPosition(eventRect, containerRect);
      const position = { x, y };
      
      console.log('Setting tooltip with position:', position);
      console.log('Position type:', positionType);
      console.log('Container rect:', containerRect);
      console.log('Event rect:', eventRect);
      console.log('Event ID:', event.id);
      console.log('Event title:', event.title);
      
      setTooltip({
        show: true,
        event: event,
        position: position
      });
    }, 0);
    
    // Return false to prevent default behavior
    return false;
  };

  const handleViewChange = (viewInfo) => {
    console.log('View changed:', viewInfo);
    setCurrentView(viewInfo.view.type);
  };

  const handleAddEvent = () => {
    console.log('Add event clicked - opening sidebar');
    setShowAddEventSidebar(true);
  };

  const handleSaveEvent = (newEvent) => {
    console.log('Saving new event:', newEvent);
    setEvents(prevEvents => [...prevEvents, newEvent]);
    setShowAddEventSidebar(false);
  };

  const handleCloseAddEventSidebar = () => {
    setShowAddEventSidebar(false);
  };

  const handleEditEvent = (eventData) => {
    console.log('Edit event:', eventData);
    // TODO: Open edit modal or navigate to edit page
    alert(`Edit event: ${eventData.title}`);
  };

  const handleDeleteEvent = (eventData) => {
    console.log('Delete event:', eventData);
    // TODO: Show confirmation dialog and delete event
    if (window.confirm(`Are you sure you want to delete "${eventData.title}"?`)) {
      // Remove event from state
      setEvents(prevEvents => prevEvents.filter(e => e.id !== eventData.id));
    }
  };

  const handleMoreDetails = (eventData) => {
    console.log('More details for event:', eventData);
    // TODO: Open details modal or navigate to details page
    alert(`More details for: ${eventData.title}\nSquad: ${eventData.extendedProps?.squad}\nLocation: ${eventData.extendedProps?.location}`);
  };

  const handleDuplicateEvent = (eventData) => {
    console.log('Duplicate event:', eventData);
    // TODO: Implement duplicate functionality
    handleCloseTooltip();
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
      // Update current date state when navigating
      setCurrentDate(calendarApi.getDate());
    }
  };

  const handleDateChange = (newDate) => {
    console.log('Date changed in Calendar page:', newDate);
    setCurrentDate(newDate);
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      console.log('Navigating calendar to:', newDate);
      calendarApi.gotoDate(newDate);
    }
  };

  const handleCloseTooltip = () => {
    setTooltip({ show: false, event: null, position: { x: 0, y: 0 } });
  };

  // Calculate total active filter count
  const getTotalActiveFilterCount = () => {
    return Object.values(activeFilters).reduce((total, count) => total + count, 0);
  };

  // Recibir filtros actualizados desde sidebar
  const handleFiltersChange = (updated) => {
    setFilters(updated);
    setActiveFilters(prev => ({
      ...prev,
      squads: updated.squads.length,
      types: updated.types.length,
      location: updated.locations.length,
    }));
  };

  // Handle click outside to close tooltip
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltip.show && !event.target.closest('.event-tooltip')) {
        handleCloseTooltip();
      }
    };

    if (tooltip.show) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [tooltip.show]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#ffffff',
        position: 'relative', // For tooltip positioning
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
        currentDate={currentDate}
        onDateChange={handleDateChange}
        activeFilterCount={getTotalActiveFilterCount()}
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
            <FiltersSidebar
              onClose={() => setShowFilters(false)}
              selectedFilters={filters}
              availableOptions={availableOptions}
              onFiltersChange={handleFiltersChange}
            />
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
              initialDate={currentDate.toISOString().split('T')[0]}
              onEditEvent={handleEditEvent}
              onDeleteEvent={handleDeleteEvent}
              onMoreDetails={handleMoreDetails}
            />
          </Box>
        </Box>
      </Box>

      {/* Event Tooltip */}
      {tooltip.show && (
        <EventTooltip
          key={tooltip.event?.id || 'tooltip'}
          event={tooltip.event}
          position={tooltip.position}
          onClose={handleCloseTooltip}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
          onMoreDetails={handleMoreDetails}
          onDuplicate={handleDuplicateEvent}
        />
      )}

      {/* Add Event Sidebar */}
      {console.log('Sidebar state:', showAddEventSidebar)}
      <AddEventSidebar
        open={showAddEventSidebar}
        onClose={handleCloseAddEventSidebar}
        onSave={handleSaveEvent}
        athletes={athletesData}
        staff={staffData}
      />
    </Box>
  );
};

export default CalendarPage;
