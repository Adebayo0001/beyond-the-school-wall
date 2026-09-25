/**
 * Calendar utilities for Beyond the School Wall booking events
 */

export interface CalendarEventDetails {
  title: string;
  description: string;
  location?: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"
  durationMinutes?: number;
}

/**
 * Parses date ("YYYY-MM-DD") and time ("10:00 AM") in West Africa Time (WAT, UTC+1)
 * Returns start and end Date objects in UTC.
 */
export function parseDateTimeWAT(dateStr: string, timeStr: string, durationMinutes = 30): { start: Date; end: Date } {
  // Parse timeStr like "10:00 AM" or "2:00 PM" or "12:00 PM"
  const timeMatch = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  let hours = 10;
  let minutes = 0;

  if (timeMatch) {
    hours = parseInt(timeMatch[1], 10);
    minutes = parseInt(timeMatch[2], 10);
    const meridian = timeMatch[3].toUpperCase();
    if (meridian === 'PM' && hours < 12) hours += 12;
    if (meridian === 'AM' && hours === 12) hours = 0;
  }

  // Parse YYYY-MM-DD
  const [year, month, day] = dateStr.split('-').map(Number);

  // WAT is UTC+1. So UTC hour = hours - 1
  const utcHours = hours - 1;
  const start = new Date(Date.UTC(year, month - 1, day, utcHours, minutes, 0));
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

  return { start, end };
}

function formatDateToICS(d: Date): string {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/**
 * Generates direct Google Calendar Add URL
 */
export function getGoogleCalendarUrl(event: CalendarEventDetails): string {
  const { start, end } = parseDateTimeWAT(event.date, event.time, event.durationMinutes || 30);
  const startStr = formatDateToICS(start);
  const endStr = formatDateToICS(end);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${startStr}/${endStr}`,
    details: event.description,
    location: event.location || 'Google Meet / Online',
    ctz: 'Africa/Lagos'
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generates direct Outlook.com / Office365 Calendar URL
 */
export function getOutlookCalendarUrl(event: CalendarEventDetails): string {
  const { start, end } = parseDateTimeWAT(event.date, event.time, event.durationMinutes || 30);
  
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: event.title,
    body: event.description,
    location: event.location || 'Google Meet / Online',
    startdt: start.toISOString(),
    enddt: end.toISOString()
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

/**
 * Generates standard RFC 5545 iCalendar (.ics) string
 */
export function generateIcsContent(event: CalendarEventDetails): string {
  const { start, end } = parseDateTimeWAT(event.date, event.time, event.durationMinutes || 30);
  const now = formatDateToICS(new Date());
  const startStr = formatDateToICS(start);
  const endStr = formatDateToICS(end);
  const uid = `btsw-${Date.now()}-${Math.random().toString(36).substring(2, 9)}@beyondtheschoolwall.com`;

  // Escape special chars in text
  const cleanSummary = event.title.replace(/[,;]/g, '\\$&');
  const cleanDescription = event.description.replace(/\n/g, '\\n').replace(/[,;]/g, '\\$&');
  const cleanLocation = (event.location || 'Google Meet / Online').replace(/[,;]/g, '\\$&');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Beyond the School Wall//Booking System//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${startStr}`,
    `DTEND:${endStr}`,
    `SUMMARY:${cleanSummary}`,
    `DESCRIPTION:${cleanDescription}`,
    `LOCATION:${cleanLocation}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT15M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Beyond the School Wall Strategy Call',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}

/**
 * Initiates browser download of .ics file
 */
export function downloadIcsFile(event: CalendarEventDetails, filename = 'BTSW-Strategy-Call.ics') {
  const icsData = generateIcsContent(event);
  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
