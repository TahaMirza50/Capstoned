import styles from "./ChatRoomList.module.css";
import ChatRoomListItem from "../ChatRoomListItem/ChatRoomListItem";

export default function ChatRoomList(props){
    return (
        <div className={`${styles.chatListContainer} w-full h-full`}>

            <div className={`${styles.chatList} flex flex-col items-center justify-start w-full`}>

                <ChatRoomListItem>
                    Item 1
                </ChatRoomListItem>

                <ChatRoomListItem>
                    Item2
                </ChatRoomListItem>

                <ChatRoomListItem>
                    Item 3
                </ChatRoomListItem>

            </div>

        </div>
    );
}