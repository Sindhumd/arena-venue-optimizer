let events = [];

export const addEvents = async (newEvents) => {
  events.push(...newEvents);
};

export const getAllEvents = async () => {
  return events;
};