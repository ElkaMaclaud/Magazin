import React, { FormEvent, useEffect, useState, useRef, FC } from 'react';
import { io, Socket } from 'socket.io-client';
import style from "./style/Chat.module.css";
import { Button, CardPageFlex } from '../../UI_Component';
import { useAppDispatch, useAppSelector } from '../../store/reduxHooks';
import { useLocation } from 'react-router-dom';
import { IChat } from '../../type/userType';
import { GET_ALL_CHATS, UPDATE_CHATS } from '../../store/slice';

interface Message {
    _id: string;
    content: string;
    senderId: string;
    timestamp?: Date;
}
const Chat = () => {
    const location = useLocation();
    const chat = location.state as IChat;
    const { token, data } = useAppSelector(state => state.page);
    const [chatId, setChatId] = useState(chat?._id || data.user?.chats[0]?._id)
    const [chats, setChats] = useState(data.user.chats)
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const dispatch = useAppDispatch()
    const chatListRef = useRef<HTMLUListElement>(null);
    const socketRef = useRef<Socket | null>(null);
    const messagesRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        dispatch(GET_ALL_CHATS())
    }, [])

    useEffect(() => {
        if (!chat) {
            setChatId(data.user?.chats[0]?._id)
            setChats(data.user.chats)
        }
    }, [data.user.chats])

    useEffect(() => {
        if (chatListRef.current) {
            // const activeChatElement = chatListRef.current.querySelector(`li[data-chat-id="${chatId}"]`);
            const listItems = chatListRef.current.children;
            const activeChatElement = Array.from(listItems).find(
                (item) => item.getAttribute('data-chat-id') === chatId
            );
            if (activeChatElement) {
                activeChatElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    }, [chatId]);


    useEffect(() => {
        socketRef.current = io(process.env.REACT_APP_API_URL, {
            transports: ['polling', 'websocket'],
            withCredentials: true,
            extraHeaders: {
                Authorization: `Bearer ${token}`
            },
            query: { chatId }
        });

        socketRef.current.on("connect_error", (err) => {
            console.log("Ошибка подключения к сокету:", err);
        });

        const socket = socketRef.current;

        socket.on("connect", () => {
            console.log("Сокет подключен:", socket.id);
            socket.emit("join room", chatId);
        });

        socket.on("previous messages", (previousMessages: Message[]) => {
            console.log("Получены предыдущие сообщения:", previousMessages);
            setMessages(previousMessages);
        });

        socket.on("chat message", (msg: Message) => {
            console.log("Получено сообщение:", msg);
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        socket.on("new chat", (newChat: IChat) => {
            console.log("Получен новый чат:", newChat);
            dispatch(UPDATE_CHATS(newChat))
        });

        return () => {
            socket.disconnect();
        };
    }, [token, data, chatId]);

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollBy(0, messagesRef.current.scrollHeight);
            // messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputValue.trim() && socketRef.current) {
            socketRef.current.emit("chat message", inputValue);
            setInputValue('');
        }
    };

    return (
        <div>
            <CardPageFlex>
                <div className={style.wrapper}>
                    <div className={style.chatListWrapper}>
                        <ul className={style.chatList} ref={chatListRef}>
                            {chats.map((chat) => {
                                return (
                                    <li key={chat._id}
                                        data-chat-id={chat._id}
                                        className={chat._id === chatId ? style.chatNameActive : style.chatName}
                                        onClick={() => setChatId(chat._id)}>
                                        {chat.participants.find(i => i.userId === data.user._id)?.title}
                                    </li>)
                            })}
                        </ul>
                    </div>
                    <div className={style.chatMessagesWrapper}>
                        <div ref={messagesRef} className={style.chatMessages}>
                            <ul>
                                {messages.map((msg) => {
                                    return (
                                        <li key={msg._id}
                                            className={msg.senderId === data.user._id ? style.userMessage : style.message}>
                                            {msg.content}
                                        </li>
                                    );

                                })}
                            </ul>
                        </div>
                        <form onSubmit={sendMessage} className={style.chatForm}>
                            <input
                                type="text"
                                placeholder="Введите сообщение"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <Button type="submit">Отправить</Button>
                        </form>
                    </div>
                </div>
            </CardPageFlex>
        </div>
    );
};

export default Chat;