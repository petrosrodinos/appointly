"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { MessageCircle, Send, Loader2, Bot } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PhoneNumber } from "@/components/ui/phone-number";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ChatLoading } from "@/app/[uuid]/components/chat/components/chat-loading";
import { useCreateMessageLanding, useGetMessagesLanding } from "@/features/chat/hooks/use-chat";
import { contactFormSchema, type ContactFormType } from "@/features/chat/validation-schemas/contact-form.schema";
import { Account } from "@/features/account/interfaces/account.interfaces";
import { ChatMessage, ChatMessageTypes, ConfirmationMessageChannels } from "@/features/chat/interfaces/chat.interfaces";
import { useClientStore } from "@/stores";
import { useWebsocket, useWebsocketEvent } from "@/features/websocket/hooks/use-websocket";
import { WEBSOCKET_EVENTS } from "@/features/websocket/interfaces/websocket.constants";
import type { ChatMessagePayload, ChatTypingPayload } from "@/features/websocket/interfaces/websocket.interfaces";
import { TypingIndicator } from "@/app/[uuid]/components/chat/components/typing-indicator";

interface ChatBubbleProps {
  provider: Account;
}

export const ChatBubble = ({ provider }: ChatBubbleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [showSpeakToProviderPrompt, setShowSpeakToProviderPrompt] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [selectedSpeakToProvider, setSelectedSpeakToProvider] = useState<boolean | null>(null);
  const [realtimeMessages, setRealtimeMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { mutate: sendMessage, isPending } = useCreateMessageLanding();
  const { client, setClient, chat_uuid, setChatUuid } = useClientStore((state) => state);

  const { uuid } = provider;

  const {
    data: messagesData,
    refetch: refetchMessages,
    isLoading: isLoadingMessages,
  } = useGetMessagesLanding({
    provider_uuid: uuid,
    client_uuid: client?.uuid || "",
    include_messages: true,
    enabled: isOpen,
  });

  const chatUuid = messagesData?.uuid ||chat_uuid || null;
  const { emit, isConnected } = useWebsocket(isOpen ? client?.uuid || null : null);

  useEffect(() => {

    if (!chatUuid || !isConnected) return;

    emit(WEBSOCKET_EVENTS.CHAT.JOIN, { chat_uuid: chatUuid });

    // return () => {
    //   emit(WEBSOCKET_EVENTS.CHAT.LEAVE, { chat_uuid: chatUuid });
    // };
  }, [chatUuid, isConnected, emit]);

  useWebsocketEvent<ChatMessagePayload>(
    WEBSOCKET_EVENTS.CHAT.MESSAGE_RECEIVED,
    (payload) => {
      if (payload.chat_uuid !== chatUuid) return;
      if (payload.sender_uuid === client?.uuid) return;
      if (payload.sender_uuid === provider.uuid) {
        setIsTyping(false);
      }
      if (payload.message) {
        setRealtimeMessages(prev => {
          const exists = prev.some(m => m.uuid === payload.message_uuid);
          if (exists) return prev;
          return [...prev, payload.message as ChatMessage];
        });
      }
    },
    [chatUuid, client?.uuid]
  );

  useWebsocketEvent<ChatTypingPayload>(
    WEBSOCKET_EVENTS.CHAT.TYPING_RECEIVED,
    (payload) => {
      if (payload.chat_uuid !== chatUuid) return;
      if (payload.account_uuid !== provider.uuid) return;
      setIsTyping(true);
    },
    [chatUuid, provider.uuid]
  );

  useWebsocketEvent<ChatTypingPayload>(
    WEBSOCKET_EVENTS.CHAT.STOP_TYPING_RECEIVED,
    (payload) => {
      if (payload.chat_uuid !== chatUuid) return;
      if (payload.account_uuid !== provider.uuid) return;
      setIsTyping(false);
    },
    [chatUuid, provider.uuid]
  );

  useEffect(() => {
    if (chatUuid) {
      setRealtimeMessages([]);
      setIsTyping(false);
    }
  }, [chatUuid]);

  useEffect(() => {
    if (!isOpen) return;
    if (messagesData?.uuid && messagesData.uuid !== chat_uuid) {
      setChatUuid(messagesData.uuid);
      return;
    }
    if (!messagesData?.uuid && chat_uuid) {
      setChatUuid(null);
    }
  }, [isOpen, messagesData?.uuid, chat_uuid, setChatUuid]);

  const messages = useMemo(() => {
    const baseMessages = messagesData?.messages ? [...messagesData.messages].reverse() : [];
    const existingUuids = new Set(baseMessages.map(m => m.uuid));
    const newRealtimeMessages = realtimeMessages.filter(m => !existingUuids.has(m.uuid));
    return [...baseMessages, ...newRealtimeMessages];
  }, [messagesData?.messages, realtimeMessages]);

  useEffect(() => {
    if (!isOpen) return;
    const container = messagesContainerRef.current;
    if (container) {
      requestAnimationFrame(() => {
        container.scrollTop = container.scrollHeight;
      });
      return;
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isTyping, showSpeakToProviderPrompt]);

    useEffect(() => {
      checkShowSpeakToProviderPrompt();
    }, [messages,messagesData?.messages, realtimeMessages]);

  const checkShowSpeakToProviderPrompt = useCallback(() => {
    if (messages.length > 0 && !showSpeakToProviderPrompt && !messageSent) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.type === ChatMessageTypes.AUTO_RESPONSE) {
        setShowSpeakToProviderPrompt(true);
      }
    }
  }, []);

  const form = useForm<ContactFormType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      first_name: client?.first_name || "",
      last_name: client?.last_name || "",
      email: client?.email || "",
      phone: client?.phone || "",
      content: "",
      confirmation_message_channel: ConfirmationMessageChannels.EMAIL,
      phone_country_code: client?.phone_country_code || "+30",
    },
  });

  const onSubmit = (data: ContactFormType) => {
    const payload: any = {
      provider_uuid: uuid,
      content: data.content,
      human_chat_request: false,
    };

    if (client?.uuid) {
      payload.client_uuid = client.uuid;
    } else {
      payload.first_name = data.first_name;
      payload.last_name = data.last_name;
      payload.email = data.email;
      payload.phone = data.phone;
      payload.phone_country_code = data.phone_country_code;
    }

    sendMessage(payload, {
      onSuccess: (response) => {
        setClient(response.client);
        setShowSpeakToProviderPrompt(!response.human_chat_request);
        form.reset({
          first_name: response.client?.first_name || "",
          last_name: response.client?.last_name || "",
          email: response.client?.email || "",
          phone: response.client?.phone || "",
          content: "",
          confirmation_message_channel: ConfirmationMessageChannels.EMAIL,
          phone_country_code: response.client?.phone_country_code || "+30",
        });
      },
    });
  };


  const handleSendNewMessage = () => {
    if (!newMessage.trim() || !client?.uuid) return;

    const payload: any = {
      provider_uuid: uuid,
      client_uuid: client.uuid,
      content: newMessage,
      human_chat_request: false,
      phone_country_code: client?.phone_country_code || "+30",
    };

    sendMessage(payload, {
      onSuccess: (response) => {
        setShowSpeakToProviderPrompt(!response.human_chat_request);
        setNewMessage("");
        refetchMessages();
      },
    });
  };

  const handleSpeakToProvider = () => {
    const payload: any = {
      provider_uuid: uuid,
      client_uuid: client?.uuid,
      content: `I would like to speak to ${provider.title} directly.`,
      phone_country_code: client?.phone_country_code || "+30",
      human_chat_request: true,
    };

    sendMessage(payload, {
      onSuccess: () => {
        setMessageSent(true);
        setShowSpeakToProviderPrompt(false);
        refetchMessages();
      },
    });
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setMessageSent(false);
      setShowSpeakToProviderPrompt(false);
      setNewMessage("");
      setSelectedSpeakToProvider(null);
      setRealtimeMessages([]);
      setIsTyping(false);
      setChatUuid(null);
    }
  };

  const hasMessages = messages.length > 0;
  const showProviderIndicator = useMemo(() => {
    if (!hasMessages) return false;
    const lastMessage = messages[messages.length - 1];
    return lastMessage?.sender_uuid === provider.uuid && lastMessage?.type !== ChatMessageTypes.AUTO_RESPONSE;
  }, [hasMessages, messages, provider.uuid]);

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button size="icon" className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform z-50">
          <span className="relative">
            <MessageCircle className="h-6 w-6" />
            {showProviderIndicator && (
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 ring-2 ring-background" />
            )}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 pt-6 pb-4">
          <SheetTitle>{hasMessages ? `${provider?.title}` : "Send us a message"}</SheetTitle>
          <SheetDescription>{hasMessages ? "Continue our conversation" : "Fill out the form below and we'll get back to you as soon as possible."}</SheetDescription>
        </SheetHeader>

        {isLoadingMessages && client?.uuid && <ChatLoading />}

        {hasMessages && (
          <div className="flex-1 flex flex-col min-h-0">
            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto space-y-4 px-6 py-4 min-h-0">
              {messages.map((message: ChatMessage) => {
                const isClientMessage = message.sender_uuid === client?.uuid;
                const isProviderMessage = message.sender_uuid === provider.uuid;
                return (
                  <div key={message.uuid} className={`flex ${isClientMessage ? "justify-end" : "justify-start"} items-end gap-2`}>
                    {isProviderMessage && (
                      <div className="flex-shrink-0">
                        {message.type === ChatMessageTypes.AUTO_RESPONSE ? (
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Bot className="h-5 w-5 text-primary" />
                          </div>
                        ) : (
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={message.sender?.logo?.url} alt={provider.title} />
                            <AvatarFallback className="text-xs">
                              {provider.first_name[0]}
                              {provider.last_name[0]}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    )}
                    <div className={`max-w-[80%] rounded-lg p-3 ${isClientMessage ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                      {message.type === ChatMessageTypes.AUTO_RESPONSE ? (
                        <div className="text-sm prose prose-sm dark:prose-invert max-w-none">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-sm">{message.content}</p>
                      )}
                    </div>
                  </div>
                );
              })}
              {isTyping && (
                <div className="flex justify-start items-end gap-2">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                    <TypingIndicator />
                  </div>
                </div>
              )}
              {showSpeakToProviderPrompt && !isTyping && !isLoadingMessages &&  (
                <div className="border-t pt-4 space-y-3">
                  <p className="text-sm font-medium">Do you want to speak to {provider.title} directly?</p>
                  <div className="flex gap-2">
                    <Button disabled={isPending} onClick={() => handleSpeakToProvider()} size="sm" variant={selectedSpeakToProvider === true ? "default" : "outline"}>
                      Yes
                    </Button>
                  </div>
                </div>
              )}
         
              <div ref={messagesEndRef} />
            </div>
            {client?.uuid && (
              <div className="border-t px-6 py-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendNewMessage();
                      }
                    }}
                  />
                  <Button onClick={handleSendNewMessage} disabled={isPending || !newMessage.trim()} size="icon">
                    {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {!hasMessages && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-6 py-4 overflow-y-auto">
              {!client?.uuid && (
                <>
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your first name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <PhoneNumber placeholder="Enter your phone number" value={field.value} onValueChange={field.onChange} countryCode={form.watch("phone_country_code")} onCountryCodeChange={(code) => form.setValue("phone_country_code", code)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              {!isLoadingMessages && (
                <>
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us how we can help you..." className="min-h-[120px] resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </>
              )}
            </form>
          </Form>
        )}
      </SheetContent>
    </Sheet>
  );
};
