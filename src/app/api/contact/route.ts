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

    // 2. Server console logging for transparency during reviews
    console.log('📬 NEW MESSAGE RECEIVED:', newMessage);

    // 3. Persist to a local file in the workspace
    const filePath = path.join(process.cwd(), 'messages.json');
    let messages = [];

    try {
      const data = await fs.readFile(filePath, 'utf-8');
      messages = JSON.parse(data);
    } catch (readError) {
      // File doesn't exist or is invalid JSON; start fresh
    }

    messages.push(newMessage);

    await fs.writeFile(filePath, JSON.stringify(messages, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message was received and persisted successfully.'
    });

  } catch (error: any) {
    console.error('❌ Error in /api/contact:', error);
    return NextResponse.json(
      { error: error.message || 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}
