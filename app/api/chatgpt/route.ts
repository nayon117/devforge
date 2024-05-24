import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { question } = await request.json();

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gryphe/mythomist-7b:free',
        messages: [
          {
            role: 'system',
            content: 'You are a knowlegeable assistant that provides quality information.'
          }, {
            role: 'user',
            content: `Tell me ${question}`
          }
        ]
      })
    })

    const responseData = await response.json();
    console.log(responseData)
    const reply = responseData.choices[0].message.content;

    return NextResponse.json({ reply })
  } catch (error: any) {
    return NextResponse.json({ error: error.message })
  }
}