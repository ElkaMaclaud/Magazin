import React, { FormEvent, useEffect, useState, useRef, FC } from 'react';
import { io, Socket } from 'socket.io-client';
import style from "./style/Chat.module.css";
import { Button, CardPageFlex } from '../../UI_Component';
import { useAppSelector } from '../../store/reduxHooks';
import { useLocation } from 'react-router-dom';
import { IChat } from '../../type/userType';

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
    const [messages, setMessages] = useState<(Message | string)[]>([]);
    const [inputValue, setInputValue] = useState('');
    const socketRef = useRef<Socket | null>(null);
    const messagesRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        setChatId(data.user?.chats[0]?._id)
    }, [data.user.chats])

    useEffect(() => {
        socketRef.current = io(process.env.REACT_APP_API_URL, {
            withCredentials: true,
            extraHeaders: {
                Authorization: `Bearer ${token}`
            },
            query: { chatId }
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

        socket.on("chat message", (msg: string) => {
            console.log("Получено сообщение:", msg);
            setMessages((prevMessages) => [...prevMessages, msg]);
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
                        <ul className={style.chatList}>
                            {data.user.chats.map((chat) => {
                                return (<li key={chat._id}
                                    className={chat._id === chatId ? style.chatNameActive : style.chatName}
                                    onClick={() => setChatId(chat._id)}>{chat.title}</li>)
                            })}
                        </ul>
                    </div>
                    <div className={style.chatMessagesWrapper}>
                        <div ref={messagesRef} className={style.chatMessages}>
                            <ul>
                                {messages.map((msg) => {
                                    if (typeof msg === "object") {
                                        return (
                                            <li key={msg._id} className={style.message}>
                                                {msg.content}
                                            </li>
                                        );
                                    }
                                    return <li key={Math.random().toString(36).substring(2, 15)}
                                        className={style.message}>{msg}</li>;
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