import Prompt from '@models/prompt'
import { connectToDB } from '@utils/database'

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json()

  //   This is serverless function/Lambda function
  // It means it is going to die after doing its job
  try {
    await connectToDB()

    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    })

    await newPrompt.save() // save it to DB

    return new Response(JSON.stringify(newPrompt), { status: 201 })
  } catch (error) {
    console.log('Prompt New Route Error: ', error)
    return new Response('Failed to create a new prompt', { status: 500 })
  }
}
