let events = []; // temporary (OK for assignment)

export const createEvent = async (event) => {
  const newEvent = { id: events.length + 1, ...event };
  events.push(newEvent);
  return newEvent;
};

export const getAllEvents = async () => {
  return events;
};