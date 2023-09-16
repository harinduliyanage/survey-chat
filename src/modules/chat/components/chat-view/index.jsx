/* eslint-disable react/no-array-index-key */
import { useSelector } from 'react-redux';
import { Loader } from 'modules/common/components';
import { selectLoader } from 'modules/business-info/selectors';
import { Avatar, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import { SendSharp } from '@mui/icons-material';
import { useState } from 'react';
import { blue } from '@mui/material/colors';
import { useLocation } from 'react-router-dom';

const ChatView = () => {
  const location = useLocation();
  const loading = useSelector(selectLoader);
  const [msg, setMsg] = useState('');
  const [chatState, setChatState] = useState([]);

  // set user chat messages in chat array
  const sendChatMessageObj = async (event) => {
    event.preventDefault();
    setChatState([
      ...chatState,
      {
        message: msg,
        role: 'user',
      },
    ]);
    setMsg('');
  };
  //
  return (
    <Loader loading={loading}>
      <Grid sx={{ backgroundColor: 'darkblue', borderRadius: 5, py: 4, mb: 2 }}>
        <Paper sx={{ backgroundColor: 'darkblue', ml: 4, alignItems:"center" }} >
          <Typography color="white" variant="h6">
            Chat survey ID: {location.pathname.split("/")?.[2]}
          </Typography>
        </Paper>
      </Grid>
      <Grid
        sx={{
          backgroundColor: '#f5f5f5',
          borderRadius: 5,
          boxShadow: 9,
          p: 3,
        }}
      >
        <Grid sx={{ width: '100%', height: '75vh', overflowY: 'scroll', mx: 1 }}>
          {chatState?.map((item, index) => (
            <Grid
              key={index}
              container
              flexDirection="row"
              item
              xs={6}
              width="fit-content"
              style={{
                padding: 5,
                borderRadius: 10,
                marginTop: 5,
                backgroundColor: item.role === 'system' ? '#2e384a' : '#e0e0e0',
                marginLeft: item.role === 'user' ? 'auto' : 0,
                marginRight: item.role === 'system' ? 'auto' : 0,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ bgcolor: blue[500] }} variant="circular">
                {item.role === 'user' ? 'U' : 'B'}
              </Avatar>
              <Typography
                fontSize={16}
                sx={{ color: item.role === 'system' ? 'white' : 'black', mx: 3 }}
              >
                {item.message}
              </Typography>
            </Grid>
          ))}
        </Grid>

        <Grid container flexDirection="row">
          <Grid item xs={11}>
            <TextField
              fullWidth
              type="text"
              placeholder="Type a message.."
              InputProps={{ sx: { borderRadius: 5, backgroundColor: '#e0e0e0', fontSize: 16 } }}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
          </Grid>
          <Grid container item xs={1} justifyContent="center">
            <IconButton type="submit" onClick={sendChatMessageObj}>
              <SendSharp fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Loader>
  );
};
//
export default ChatView;
