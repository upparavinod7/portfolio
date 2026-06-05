import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // 1. Validation check
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    const newMessage = {
      name: name.trim(),
      email: email.trim(),
      subject: (subject || 'No Subject').trim(),
      message: message.trim(),
      timestamp: new Date().toISOString()
    };

    // 2. Server console logging for transparency during reviews and Vercel dashboard monitoring
    console.log('📬 NEW MESSAGE RECEIVED:', newMessage);

    let emailSent = false;
    let webhookSent = false;

    // 3. Optional: Send email via Resend API (if configured in environment variables)
    if (process.env.RESEND_API_KEY) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
          },
          body: JSON.stringify({
            from: 'Portfolio Contact Form <onboarding@resend.dev>',
            to: process.env.CONTACT_EMAIL || 'upparavinod7@gmail.com',
            subject: `New Portfolio Message: ${newMessage.subject}`,
            html: `
              <h2>New Message from Portfolio Contact Form</h2>
              <p><strong>Name:</strong> ${newMessage.name}</p>
              <p><strong>Email:</strong> ${newMessage.email}</p>
              <p><strong>Subject:</strong> ${newMessage.subject}</p>
              <hr />
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${newMessage.message}</p>
            `
          })
        });

        if (resendRes.ok) {
          emailSent = true;
          console.log('✉️ Email notification sent via Resend.');
        } else {
          const errText = await resendRes.text();
          console.error('❌ Resend API returned error:', errText);
        }
      } catch (emailErr) {
        console.error('❌ Failed to send email via Resend:', emailErr);
      }
    }

    // 4. Optional: Send to webhook (Discord/Slack/etc.) if configured
    if (process.env.CONTACT_WEBHOOK_URL) {
      try {
        const webhookRes = await fetch(process.env.CONTACT_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `📬 **New Portfolio Message!**\n**From:** ${newMessage.name} (${newMessage.email})\n**Subject:** ${newMessage.subject}\n**Message:**\n>>> ${newMessage.message}`
          })
        });

        if (webhookRes.ok) {
          webhookSent = true;
          console.log('🔔 Webhook notification sent.');
        } else {
          console.error('❌ Webhook request failed with status:', webhookRes.status);
        }
      } catch (webhookErr) {
        console.error('❌ Failed to send webhook notification:', webhookErr);
      }
    }

    // 5. Try local file persistence (runs on local dev, catches/bypasses write-failures in read-only Serverless envs)
    let persistedLocally = false;
    const localFilePath = path.join(process.cwd(), 'messages.json');

    const tryPersist = async (filePath: string) => {
      try {
        let fileContent = '[]';
        try {
          fileContent = await fs.readFile(filePath, 'utf-8');
        } catch {
          // File does not exist, start with empty array
        }
        const currentMessages = JSON.parse(fileContent);
        currentMessages.push(newMessage);
        await fs.writeFile(filePath, JSON.stringify(currentMessages, null, 2), 'utf-8');
        return true;
      } catch (writeErr: any) {
        console.warn(`⚠️ Write failed for path ${filePath}:`, writeErr.message);
        return false;
      }
    };

    // First attempt to write to standard location (e.g. for local development)
    persistedLocally = await tryPersist(localFilePath);

    // If writing to the main directory fails (expected on Vercel due to read-only FS),
    // attempt to write to ephemeral /tmp directory so the server process doesn't fail.
    if (!persistedLocally) {
      const tmpFilePath = path.join('/tmp', 'messages.json');
      console.log('🔄 Attempting write to ephemeral /tmp/messages.json...');
      persistedLocally = await tryPersist(tmpFilePath);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message was received successfully.',
      details: {
        emailSent,
        webhookSent,
        persistedLocally
      }
    });

  } catch (error: any) {
    console.error('❌ Error in /api/contact:', error);
    return NextResponse.json(
      { error: error.message || 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}

