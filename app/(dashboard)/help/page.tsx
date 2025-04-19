import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const faqs = [
  {
    question: "What is this application?",
    answer: "This is an AI-powered chat application that uses advanced language models to provide intelligent and contextual responses. It allows you to have natural conversations, save important messages, and maintain a history of your chats."
  },
  {
    question: "How does the chat work?",
    answer: "The application uses a powerful language model to understand and respond to your messages. You can:\n1. Type your message in the chat input\n2. Send it to get an AI response\n3. Save important messages for later reference\n4. View your chat history\n5. Download conversations for offline use"
  },
  {
    question: "What is Chat History?",
    answer: "Chat History automatically saves your conversations so you can revisit them later. You can:\n- View all your past conversations\n- Expand to see the full conversation\n- Download conversations as text files\n- Delete individual chats or clear all history"
  },
  {
    question: "How do I save messages?",
    answer: "To save a message:\n1. Look for the bookmark icon next to any message\n2. Click it to save the message\n3. Access saved messages from the sidebar\n4. Download or delete saved messages as needed"
  },
  {
    question: "Can I download my conversations?",
    answer: "Yes! You can download both individual messages and entire conversations:\n- For saved messages: Use the download button on each message\n- For chat history: Use the download button on each conversation\n- Downloads are in plain text format for easy reading"
  },
  {
    question: "How do I manage my data?",
    answer: "You have full control over your data:\n- Clear all chat history at once\n- Delete individual conversations\n- Remove specific saved messages\n- All data is stored locally in your browser"
  }
]

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Help & FAQ</h1>
        <p className="text-muted-foreground">
          Learn how to use our AI chat application effectively.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Learn how to use the application effectively
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              Welcome to our AI chat application! This tool allows you to have natural conversations with an AI assistant, save important messages, and maintain a history of your chats.
            </p>
            <div className="space-y-2">
              <h3 className="font-semibold">Basic Features:</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Type your message in the chat input at the bottom of the screen</li>
                <li>Press Enter or click the send button to get a response</li>
                <li>Use the bookmark icon to save important messages</li>
                <li>Access your chat history and saved messages from the sidebar</li>
                <li>Download conversations or individual messages for offline use</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding the Features</CardTitle>
          <CardDescription>
            How to use the chat features effectively
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              The application includes several key features:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Chat Interface:</strong> A clean, modern interface for your conversations</li>
              <li><strong>Message Saving:</strong> Save important messages with one click</li>
              <li><strong>Chat History:</strong> Automatically save and review past conversations</li>
              <li><strong>Data Management:</strong> Download or delete your data as needed</li>
              <li><strong>Responsive Design:</strong> Works seamlessly on desktop and mobile devices</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>
            Common questions about using the chat application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
} 