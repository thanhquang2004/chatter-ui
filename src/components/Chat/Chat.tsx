import { useLocation, useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/useGetChat";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SendICon from "@mui/icons-material/Send";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useEffect, useRef, useState } from "react";
import { useGetMessages } from "../../hooks/useGetMessages";
// import { useMessageCreated } from "../../hooks/useMessageCreated";
import { Message } from "../../gql/graphql";
import { PAGE_SIZE } from "../../constants/page-size";
import { useCountMessages } from "../../hooks/useCountMessages";
import InfiniteScroll from "react-infinite-scroller";

const Chat = () => {
  const params = useParams();
  const [message, setMessage] = useState("");
  const chatId = params._id!;
  const { data } = useGetChat({ _id: chatId });
  const [createMessage] = useCreateMessage();
  const { data: existingMessages, fetchMore } = useGetMessages({
    chatId,
    skip: 0,
    limit: PAGE_SIZE,
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const divRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const { messagesCount, countMessages } = useCountMessages(chatId);

  useEffect(() => {
    countMessages();
  }, [countMessages]);

  // const { data: lastestMessage } = useMessageCreated({chatIds: data.});

  const scrollToBottom = () => divRef.current?.scrollIntoView();

  useEffect(() => {
    if (existingMessages) {
      setMessages(existingMessages.messages);
    }
  }, [existingMessages]);

  // useEffect(() => {
  //   const existingLastestMessage = messages[messages.length - 1]?._id;
  //   if (
  //     lastestMessage?.messageCreated &&
  //     existingLastestMessage !== lastestMessage.messageCreated._id
  //   ) {
  //     setMessages([...messages, lastestMessage.messageCreated]);
  //   }
  // }, [lastestMessage, messages]);

  useEffect(() => {
    if (
      existingMessages?.messages &&
      existingMessages.messages.length <= PAGE_SIZE
    ) {
      setMessage("");
      scrollToBottom();
    }
  }, [location.pathname, existingMessages]);

  const handleCreateMessage = async () => {
    await createMessage({
      variables: {
        createMessageInput: {
          chatId: chatId,
          content: message,
        },
      },
    });
    setMessage("");
    scrollToBottom();
  };

  return (
    <Stack sx={{ height: "100%", justifyContent: "space-between" }}>
      <h1>{data?.chat.name}</h1>
      <Box
        sx={{
          height: "100%",
          maxHeight: "70vh",
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
          isReverse={true}
          loadMore={() =>
            fetchMore({
              variables: { skip: existingMessages?.messages.length },
            })
          }
          hasMore={
            existingMessages && messagesCount
              ? existingMessages.messages.length < messagesCount
              : false
          }
          useWindow={false}
        >
          {[...messages]
            .sort(
              (messageA, messageB) =>
                new Date(messageA.createAt).getTime() -
                new Date(messageB.createAt).getTime()
            )
            .map((message) => (
              <Grid container alignItems="center" marginBottom="1rem">
                <Grid item xs={2} lg={1}>
                  <Avatar
                    src={message.user.imageUrl}
                    sx={{ width: 45, height: 45 }}
                  />
                </Grid>
                <Grid item xs={10} lg={11}>
                  <Stack>
                    <Paper sx={{ width: "fit-content", maxWidth: "80%" }}>
                      <Typography sx={{ padding: "0.9rem" }}>
                        {message.content}
                      </Typography>
                    </Paper>
                    <Typography
                      variant="caption"
                      sx={{ marginLeft: "0.25rem" }}
                    >
                      {new Date(message.createAt).toLocaleTimeString()} -{" "}
                      {new Date(message.createAt).toLocaleDateString()}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            ))}
        </InfiniteScroll>
        <div ref={divRef}></div>
      </Box>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          justifySelf: "flex-end",
          alignItems: "center",
          width: "100%",
          borderRadius: "10px",
          margin: "0.5rem 0",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, width: "100%" }}
          placeholder="Aa"
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          value={message}
          onKeyDown={async (event) => {
            if (event.key === "Enter") {
              await handleCreateMessage();
            }
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          onClick={() => {
            handleCreateMessage();
          }}
          color="primary"
          sx={{ p: "10px" }}
        >
          <SendICon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;
