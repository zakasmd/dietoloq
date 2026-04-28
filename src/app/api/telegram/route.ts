import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      const missing = !botToken ? 'TELEGRAM_BOT_TOKEN' : 'TELEGRAM_CHAT_ID';
      console.error(`Telegram configuration error: ${missing} is missing`);
      return NextResponse.json({ error: `Server configuration error: ${missing} missing` }, { status: 500 });
    }

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Telegram API error:', data);
      return NextResponse.json({ 
        error: 'Failed to send Telegram message', 
        details: data.description || 'Unknown error' 
      }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Telegram notification error:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}
