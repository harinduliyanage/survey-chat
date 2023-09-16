/* eslint-disable react/no-array-index-key */
import { useSelector } from 'react-redux';
import { Loader } from 'modules/common/components';
import { selectLoader } from 'modules/business-info/selectors';
import { Avatar, Grid, IconButton, TextField, Typography } from '@mui/material';
import { SendSharp } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { blue } from '@mui/material/colors';

const BusinessInfoView = () => {
  const loading = useSelector(selectLoader);
  const [msg, setMsg] = useState('');
  const [chatState, setChatState] = useState([
    {
      message: 'Please provide your business name',
      role: 'system',
    },
  ]);

  useEffect(() => {
    setTimeout(() => {
      if (chatState?.length > 1 && chatState.length % 2 === 0) {
        if (chatState.length === 2) {
          setChatState([
            ...chatState,
            {
              message: 'Cool. Can you give me a description of your business? ',
              role: 'system',
            },
          ]);
        }
        if (chatState.length === 4) {
          setChatState([
            ...chatState,
            {
              message: 'Please provide your survey name ',
              role: 'system',
            },
          ]);
        }
        if (chatState.length === 6) {
          setChatState([
            ...chatState,
            {
              message: 'Great! Can you give me your survey description? ',
              role: 'system',
            },
          ]);
        }
      }
    }, 2000);
  }, [chatState?.length]);
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
      <Grid
        sx={{
          backgroundColor: '#f5f5f5',
          borderRadius: 5,
          boxShadow: 9,
          p: 3,
        }}
      >
        <Grid sx={{ width: '100%', height: '80vh', overflowY: 'scroll', mx: 1 }}>
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
export default BusinessInfoView;
