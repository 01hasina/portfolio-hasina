import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== 'object') return NextResponse.json({ error: 'Invalid form submission.' }, { status: 400 });
    const { name, email, message } = body as Record<string, unknown>;
    if (typeof name !== 'string' || name.trim().length < 2 || name.length > 100 || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || typeof message !== 'string' || message.trim().length < 10 || message.length > 5000) return NextResponse.json({ error: 'Please check the name, email and message fields.' }, { status: 400 });
    if (!process.env.RESEND_API_KEY) return NextResponse.json({ error: 'The contact form is not configured yet. Please email ramisedra.hasina@gmail.com directly.' }, { status: 503 });
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({ from: 'Portfolio contact <onboarding@resend.dev>', to: process.env.CONTACT_EMAIL || 'ramisedra.hasina@gmail.com', replyTo: email, subject: `Portfolio message from ${name.trim()}`, text: `Name: ${name.trim()}\nEmail: ${email}\n\n${message.trim()}` });
    if (error) return NextResponse.json({ error: 'Message could not be sent. Please try email instead.' }, { status: 502 });
    return NextResponse.json({ message: 'Thanks for reaching out. Your message has been sent.' });
  } catch { return NextResponse.json({ error: 'Please submit a valid message.' }, { status: 400 }); }
}
