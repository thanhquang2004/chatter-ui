import ChatListItem from "./ChatListItem/ChatListItem";
import { Box, Divider, Stack } from "@mui/material";
import ChatListHeader from "./ChatListHeader/ChatListHeader";
import { useEffect, useState } from "react";
import ChatListAdd from "./ChatListAdd/ChatListAdd";
import { useGetChats } from "../../hooks/useGetChats";
import usePath from "../../hooks/usePath";
import { useMessageCreated } from "../../hooks/useMessageCreated";
import { PAGE_SIZE } from "../../constants/page-size";
import InfiniteScroll from "react-infinite-scroller";
import { useCountChats } from "../../hooks/useCountChats";

const ChatList = () => {
  const [chatListAddVisible, setChatListAddVisible] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState("");
  const { data, fetchMore } = useGetChats({ skip: 0, limit: PAGE_SIZE });
  const { path } = usePath();
  const { chatsCount, countChats } = useCountChats();

  useEffect(() => {
    countChats();
  }, [countChats]);

  useMessageCreated({ chatIds: data?.chats.map((chat) => chat._id) || [] });

  useEffect(() => {
    const pathSplit = path.split("chats/");
    if (pathSplit.length === 2) {
      setSelectedChatId(pathSplit[1]);
    }
  }, [path]);

  return (
    <>
      <ChatListAdd
        open={chatListAddVisible}
        handleClose={() => setChatListAddVisible(false)}
      />
      <Stack>
        <ChatListHeader handleAddChat={() => setChatListAddVisible(true)} />
        <Divider />
        <Box
          sx={{
            width: "100%",
            height: "80vh",
            bgcolor: "background.paper",
            maxHeight: "80vh",
            overflow: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#6b6b6b #2b2b2b",
            "&::-webkit-scrollbar": {
              width: 12,
              backgroundColor: "#F5F5F5",
            },
            "&::-webkit-scrollbar-track": {
              webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
              borderRadius: 10,
              backgroundColor: "#F5F5F5",
            },
            "&::-webkit-scrollbar-thumb": {
              borderRadius: 10,
              webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
              backgroundColor: "D62929",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
          }}
        >
          <InfiniteScroll
            pageStart={0}
            loadMore={() =>
              fetchMore({ variables: { skip: data?.chats.length } })
            }
            hasMore={
              data?.chats && chatsCount ? data.chats.length < chatsCount : false
            }
            useWindow={false}
          >
            {data?.chats &&
              [...data.chats]
                .sort((chatA, chatB) => {
                  if (!chatA.latestMessage) {
                    return -1;
                  }
                  return (
                    new Date(chatA.latestMessage?.createAt).getTime() -
                    new Date(chatB.latestMessage?.createAt).getTime()
                  );
                })
                .map((chat) => (
                  <ChatListItem
                    chat={chat}
                    selected={chat._id === selectedChatId}
                  />
                ))
                .reverse()}
          </InfiniteScroll>
        </Box>
      </Stack>
    </>
  );
};

export default ChatList;
