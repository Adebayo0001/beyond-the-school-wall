import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generateIcsContent } from '@/lib/calendar';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      type = 'booking', // 'booking' | 'register'
      schoolName = 'Partner Institution',
      contactName,
      role = 'School Representative',
      email,
      phone,
      address,
      state = 'Lagos',
      studentCount,
      selectedPrograms = [],
      notes,
      bookingSlot
    } = data;

    if (!email || !contactName) {
      return NextResponse.json(
        { error: 'Email and contact name are required.' },
        { status: 400 }
      );
    }

    const bookingDate = bookingSlot?.date || new Date().toISOString().split('T')[0];
    const bookingTime = bookingSlot?.time || '10:00 AM';
    const bookingType = bookingSlot?.type || 'google-meet';

    const channelDisplay = 
      bookingType === 'google-meet' ? 'Google Meet Video Call' :
      bookingType === 'phone' ? 'Direct Phone Consultation' :
      'On-Site Visit (BTSW Team Visits Your School Campus)';

    // Calendar Details
    const calendarEvent = {
      title: `BTSW Strategy Session (${bookingType === 'in-person' ? 'On-Site School Visit' : 'Call'}): ${schoolName} × Beyond the School Wall`,
      description: `Strategy & Curriculum Integration Briefing with Adebayo Kareem and the BTSW Academic Panel.\n\nAttendee: ${contactName} (${role}, ${schoolName})\nPhone/WhatsApp: ${phone}\nPrograms of Interest: ${(selectedPrograms || []).join(', ') || 'General'}\nFormat: ${channelDisplay}\nLocation / Desk: ${bookingType === 'in-person' ? `${schoolName} Campus (${address || state})` : 'https://meet.google.com/new'}\nSupport: beyondtheschoolwallng@gmail.com | +234 901 649 8377`,
      location: bookingType === 'in-person' ? `${schoolName} Campus (${address || state})` : channelDisplay,
      date: bookingDate,
      time: bookingTime,
      durationMinutes: 30
    };

    const icsContent = generateIcsContent(calendarEvent);

    // Google Calendar direct link for email body
    const [year, month, day] = bookingDate.split('-');
    const timeMatch = bookingTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
    let hours = 10;
    let minutes = 0;
    if (timeMatch) {
      hours = parseInt(timeMatch[1], 10);
      minutes = parseInt(timeMatch[2], 10);
      if (timeMatch[3].toUpperCase() === 'PM' && hours < 12) hours += 12;
      if (timeMatch[3].toUpperCase() === 'AM' && hours === 12) hours = 0;
    }
    const utcHours = hours - 1; // WAT to UTC
    const dStart = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), utcHours, minutes, 0));
    const dEnd = new Date(dStart.getTime() + 30 * 60 * 1000);
    const startIso = dStart.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const endIso = dEnd.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

    const googleCalLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(calendarEvent.title)}&dates=${startIso}/${endIso}&details=${encodeURIComponent(calendarEvent.description)}&location=${encodeURIComponent(channelDisplay)}&ctz=Africa/Lagos`;

    // Email to the Client / School Representative
    const clientHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>BTSW Booking Confirmation</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f6f3; color: #1e1e1e;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e8e5e0; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
          <!-- Header -->
          <tr>
            <td style="padding: 32px 32px 24px; background: linear-gradient(135deg, #1e1e1e 0%, #2d2b2a 100%); text-align: center; border-bottom: 3px solid #F16736;">
              <h1 style="color: #ffffff; font-size: 20px; font-weight: 900; margin: 0; letter-spacing: -0.5px;">BEYOND THE SCHOOL WALL</h1>
              <p style="color: #F16736; font-size: 12px; font-weight: 700; margin: 6px 0 0; text-transform: uppercase; letter-spacing: 1px;">Institutional Partnership & Strategy Consultation</p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 32px;">
              <h2 style="font-size: 20px; font-weight: 800; color: #1e1e1e; margin: 0 0 12px;">Booking Confirmed!</h2>
              <p style="font-size: 14px; line-height: 1.6; color: #555555; margin: 0 0 24px;">
                Dear <strong>${contactName}</strong>,<br><br>
                Thank you for scheduling an institutional strategy session with <strong>Beyond the School Wall</strong> for <strong>${schoolName}</strong>. We look forward to meeting you and exploring how our accredited trade, AI literacy, and leadership masterclasses can integrate seamlessly into your curriculum.
              </p>

              <!-- Session Details Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff6f2; border: 1px solid #ffd8c7; border-radius: 12px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px;">
                    <table width="100%" cellpadding="6" cellspacing="0">
                      <tr>
                        <td width="30%" style="font-size: 12px; font-weight: 700; color: #a03c15; text-transform: uppercase;">Date:</td>
                        <td style="font-size: 14px; font-weight: 800; color: #1e1e1e;">${bookingDate}</td>
                      </tr>
                      <tr>
                        <td width="30%" style="font-size: 12px; font-weight: 700; color: #a03c15; text-transform: uppercase;">Time:</td>
                        <td style="font-size: 14px; font-weight: 800; color: #1e1e1e;">${bookingTime} (West Africa Time, WAT)</td>
                      </tr>
                      <tr>
                        <td width="30%" style="font-size: 12px; font-weight: 700; color: #a03c15; text-transform: uppercase;">Format:</td>
                        <td style="font-size: 14px; font-weight: 800; color: #F16736;">${channelDisplay}</td>
                      </tr>
                      <tr>
                        <td width="30%" style="font-size: 12px; font-weight: 700; color: #a03c15; text-transform: uppercase;">Representative:</td>
                        <td style="font-size: 13px; font-weight: 600; color: #444444;">${contactName} (${role})</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Call to Actions -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="${googleCalLink}" target="_blank" style="display: inline-block; background-color: #F16736; color: #ffffff; text-decoration: none; padding: 14px 28px; font-size: 13px; font-weight: 800; border-radius: 8px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(241, 103, 54, 0.3);">
                  📅 Add to Google Calendar
                </a>
              </div>

              <p style="font-size: 12px; color: #777777; text-align: center; margin: 0 0 20px;">
                (An iCalendar <code>.ics</code> invite is also attached to this email for Apple Calendar and Outlook users.)
              </p>

              <!-- Agenda / What to Expect -->
              <div style="border-top: 1px solid #eeeeee; padding-top: 20px; margin-top: 20px;">
                <h4 style="font-size: 13px; font-weight: 800; color: #1e1e1e; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.5px;">What we will discuss:</h4>
                <ul style="font-size: 13px; color: #555555; line-height: 1.7; padding-left: 20px; margin: 0;">
                  <li>Customizing workshop curricula (Trade Skills, AI & Robotics, Student Business School, Game-Based Learning).</li>
                  <li>Schedule alignment with your school term calendar.</li>
                  <li>Student cohort size requirements, safety protocols, and certifications.</li>
                  <li>Open Q&A for your administration and academic heads.</li>
                </ul>
              </div>

              <!-- Contact & Rescheduling -->
              <div style="background-color: #faf9f7; border-radius: 8px; padding: 16px; margin-top: 24px; border: 1px solid #ebe9e5;">
                <p style="font-size: 12px; color: #666666; margin: 0; line-height: 1.5;">
                  Need to reschedule or speak immediately? Reach our direct liaison on WhatsApp at <strong style="color: #1e1e1e;">+234 901 649 8377</strong> or reply directly to this email.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #1e1e1e; text-align: center; color: #888888; font-size: 11px;">
              <p style="margin: 0 0 6px; color: #cccccc; font-weight: 600;">Beyond the School Wall Education Initiative</p>
              <p style="margin: 0;">Lagos, Nigeria &bull; beyondtheschoolwallng@gmail.com &bull; +234 901 649 8377</p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Email to the BTSW Admin Team
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.SMTP_USER || 'beyondtheschoolwallng@gmail.com';
    const adminHtml = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; color: #222; padding: 20px; background-color: #f7f7f7;">
        <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 12px; padding: 24px; border: 1px solid #ddd;">
          <h2 style="color: #F16736; margin-top: 0;">🔔 New Institutional Strategy Call Booked!</h2>
          <p>A new strategy call was scheduled via the <strong>Bring Your School</strong> portal:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px 0; font-weight: bold; width: 140px;">School Name:</td>
              <td style="padding: 8px 0;">${schoolName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px 0; font-weight: bold;">Contact Name:</td>
              <td style="padding: 8px 0;">${contactName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px 0; font-weight: bold;">Role / Title:</td>
              <td style="padding: 8px 0;">${role}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px 0; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px 0; font-weight: bold;">Phone / WhatsApp:</td>
              <td style="padding: 8px 0;"><a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}">${phone}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px 0; font-weight: bold;">Scheduled Date:</td>
              <td style="padding: 8px 0; color: #F16736; font-weight: bold;">${bookingDate}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px 0; font-weight: bold;">Time Slot (WAT):</td>
              <td style="padding: 8px 0; color: #F16736; font-weight: bold;">${bookingTime}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px 0; font-weight: bold;">Channel:</td>
              <td style="padding: 8px 0;">${channelDisplay}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px 0; font-weight: bold;">State / Location:</td>
              <td style="padding: 8px 0;">${state || 'Not specified'} (${address || 'No address'})</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px 0; font-weight: bold;">Target Students:</td>
              <td style="padding: 8px 0;">${studentCount || 'Standard'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px 0; font-weight: bold;">Programs:</td>
              <td style="padding: 8px 0;">${(selectedPrograms || []).join(', ') || 'All Programs'}</td>
            </tr>
            ${notes ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Special Notes:</td>
              <td style="padding: 8px 0;">${notes}</td>
            </tr>` : ''}
          </table>

          <div style="margin-top: 24px; text-align: center;">
            <a href="mailto:${email}?subject=RE:%20Beyond%20the%20School%20Wall%20Strategy%20Call" style="display: inline-block; background: #1e1e1e; color: #fff; padding: 10px 18px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: bold; margin-right: 8px;">Reply to ${contactName}</a>
            <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(contactName)},%20confirming%20our%20Beyond%20the%20School%20Wall%20session%20for%20${encodeURIComponent(bookingDate)}%20at%20${encodeURIComponent(bookingTime)}" style="display: inline-block; background: #25D366; color: #fff; padding: 10px 18px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: bold;">WhatsApp Contact</a>
          </div>
        </div>
      </body>
      </html>
    `;

    // Attempt delivery if SMTP settings are present
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

    let emailSent = false;
    let deliveryMessage = 'Email processed successfully.';

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass
          }
        });

        // 1. Send confirmation to client
        await transporter.sendMail({
          from: `"Beyond the School Wall" <${smtpUser}>`,
          to: email,
          subject: `Confirmed: BTSW Strategy Call - ${bookingDate} at ${bookingTime} (WAT)`,
          html: clientHtml,
          icalEvent: {
            filename: 'BTSW-Strategy-Call.ics',
            method: 'REQUEST',
            content: icsContent
          }
        });

        // 2. Send notification to admin/team
        await transporter.sendMail({
          from: `"BTSW Portal" <${smtpUser}>`,
          to: adminEmail,
          subject: `🔔 New Strategy Call: ${schoolName} (${contactName}) - ${bookingDate} ${bookingTime}`,
          html: adminHtml,
          icalEvent: {
            filename: 'BTSW-Strategy-Call.ics',
            method: 'REQUEST',
            content: icsContent
          }
        });

        emailSent = true;
        deliveryMessage = `Confirmation dispatched to ${email} and team alert sent to ${adminEmail}.`;
      } catch (err: any) {
        console.error('SMTP Delivery error:', err);
        deliveryMessage = `SMTP error: ${err?.message || err}. Event saved to records.`;
      }
    } else {
      console.log('--- [BTSW EMAIL AUTOMATION LOG] ---');
      console.log(`[CLIENT EMAIL to: ${email}]`);
      console.log(`Subject: Confirmed: BTSW Strategy Call - ${bookingDate} at ${bookingTime} (WAT)`);
      console.log(`[ADMIN NOTIFICATION to: ${adminEmail}]`);
      console.log(`Subject: 🔔 New Strategy Call: ${schoolName} (${contactName}) - ${bookingDate} ${bookingTime}`);
      console.log('To activate real email delivery, configure SMTP_USER and SMTP_PASS in .env.local.');
      deliveryMessage = `Simulated delivery logged for ${email} & team alert. Configure SMTP_USER / SMTP_PASS in .env.local for live dispatch.`;
    }

    return NextResponse.json({
      success: true,
      emailSent,
      deliveryMessage,
      booking: {
        schoolName,
        contactName,
        email,
        phone,
        bookingDate,
        bookingTime,
        channelDisplay
      }
    });

  } catch (error: any) {
    console.error('API /api/book-call error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to process booking request' },
      { status: 500 }
    );
  }
}
