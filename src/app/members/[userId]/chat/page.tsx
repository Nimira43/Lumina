import ChatForm from './ChatForm'

export default function ChatPage() {
  return (
    <div className='flex flex-col h-full'>
      <div className='flex-1 overflow-y-auto'>
        Messages Placeholder
      </div>
      <ChatForm />
    </div>
  )
}