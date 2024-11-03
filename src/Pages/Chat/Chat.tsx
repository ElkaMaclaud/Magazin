import React, { FormEvent, useEffect, useState, useRef, FC } from 'react';
import { io, Socket } from 'socket.io-client';
import style from "./style/Chat.module.css";
import { Button, CardPageFlex } from '../../UI_Component';
import { useAppSelector } from '../../store/reduxHooks';
import { useLocation } from 'react-router-dom';

interface Message {
    _id: string;
    content: string;
    senderId: string;
    timestamp?: Date;
}
interface LocationState {
    salesmant: string; 
}

const Chat: FC<{ chatid?: string }> = ({ chatid }) => {
    const { token, data } = useAppSelector(state => state.page);
    const [chatId, setChatId] = useState(chatid || data.user.chats[0])
    const [messages, setMessages] = useState<(Message | string)[]>([]);
    const [inputValue, setInputValue] = useState('');
    const socketRef = useRef<Socket | null>(null);
    const messagesRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();
    const { salesmant } = location.state as LocationState || {}; 

    console.log("////////////////////", salesmant)

    useEffect(() => {
        socketRef.current = io("http://localhost:3000", {
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
                                return (<li key={chat}
                                    className={chat === chatId ? style.chatNameActive : style.chatName}
                                    onClick={() => setChatId(chat)}>{chat}</li>)
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