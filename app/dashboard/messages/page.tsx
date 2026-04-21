'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MessageCircle, Send, Search } from 'lucide-react'
import { useState } from 'react'

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(1)

  const conversations = [
    {
      id: 1,
      name: 'Medical Campaign Support',
      avatar: '🏥',
      lastMessage: 'Thank you for your support!',
      time: '2 min',
      unread: true,
      online: true,
    },
    {
      id: 2,
      name: 'Item Pickup Team',
      avatar: '🚚',
      lastMessage: 'Pickup scheduled for tomorrow at 2 PM',
      time: '1 hour',
      unread: false,
      online: true,
    },
    {
      id: 3,
      name: 'Education Campaign',
      avatar: '📚',
      lastMessage: 'Your donation reached 10 students',
      time: '3 hours',
      unread: false,
      online: false,
    },
    {
      id: 4,
      name: 'Community Support Group',
      avatar: '👥',
      lastMessage: 'Join us for the next meetup!',
      time: '1 day',
      unread: false,
      online: true,
    },
  ]

  const messages = [
    {
      id: 1,
      sender: 'support',
      text: 'Hi John! Thank you for your generous donation to the medical campaign.',
      time: '10:30 AM',
      avatar: '🏥',
    },
    {
      id: 2,
      sender: 'user',
      text: 'Happy to help! Please let me know how the patient is doing.',
      time: '10:35 AM',
      avatar: '👨‍💼',
    },
    {
      id: 3,
      sender: 'support',
      text: 'The surgery was successful! The family is very grateful.',
      time: '10:40 AM',
      avatar: '🏥',
    },
    {
      id: 4,
      sender: 'user',
      text: 'That&apos;s wonderful news! This is what makes it all worthwhile.',
      time: '10:45 AM',
      avatar: '👨‍💼',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground mt-2">Stay connected with campaigns and donors</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <div className="lg:col-span-1">
          <Card className="h-full flex flex-col">
            <div className="p-4 border-b border-border">
              <Input
                placeholder="Search messages..."
                prefix={<Search className="w-4 h-4" />}
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedChat(conv.id)}
                  className={`w-full text-left p-4 border-b border-border hover:bg-muted transition-colors ${
                    selectedChat === conv.id ? 'bg-primary/10' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative text-2xl">{conv.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`font-semibold ${conv.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {conv.name}
                        </p>
                        {conv.online && (
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                      <p className="text-xs text-muted-foreground mt-1">{conv.time}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center gap-3">
              <div className="text-3xl">{conversations[selectedChat - 1].avatar}</div>
              <div>
                <p className="font-semibold text-foreground">{conversations[selectedChat - 1].name}</p>
                <p className="text-xs text-green-600">Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className="text-2xl">{msg.avatar}</div>
                  <div className={msg.sender === 'user' ? 'text-right' : ''}>
                    <div
                      className={`inline-block px-4 py-2 rounded-lg max-w-xs ${
                        msg.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="border-t border-border p-4">
              <div className="flex gap-3">
                <Input
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button size="icon" className="bg-primary hover:bg-primary/90">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
