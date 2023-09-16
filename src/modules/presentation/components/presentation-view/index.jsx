/* eslint-disable react/no-array-index-key */
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'modules/common/components';
import { selectLoader } from 'modules/business-info/selectors';
import { Avatar, Grid, IconButton, TextField, Typography } from '@mui/material';
import { SendSharp } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { blue } from '@mui/material/colors';
import { useParams } from 'react-router-dom';
import { presentationActions } from 'modules/presentation/slice';
import { selectIsInvalidHashId } from 'modules/presentation/selectors';
import InvalidHashID from '../not-found';

const PresentationView = () => {
  const { hashId } = useParams();
  const dispatch = useDispatch();
  //
  const loading = useSelector(selectLoader);
  const isInvalidHashId =  useSelector(selectIsInvalidHashId);
  const [msg, setMsg] = useState('');
  const [chatState, setChatState] = useState([
    {
      message: 'Do you want to see the presentation? Reply yes or y',
      role: 'system',
    },
  ]);
  //
  useEffect(() => {
    dispatch(presentationActions.getPresentation({ hashId }));
  }, [hashId]);
  //
  // checks user input and append system message or send api request
  useEffect(() => {
    setTimeout(() => {
      if (chatState?.length > 1 && chatState.length % 2 === 0) {
        if (
          chatState[chatState.length - 1].message.toLowerCase() === 'yes' ||
          chatState[chatState.length - 1].message.toLowerCase() === 'y'
        ) {
          // post api request
        } else {
          setChatState([
            ...chatState,
            {
              message: 'Sorry the only answer i can interpreter is yes or y ',
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
    if(msg){
      setChatState([
        ...chatState,
        {
          message: msg,
          role: 'user',
        },
      ]);
      setMsg('');
    }
  };
  //
  return isInvalidHashId  ? <InvalidHashID /> : (
    <Loader loading={loading}>
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
      </Grid>
      <form style={{ width: '100%', position: 'fixed' }}>
        <Grid container flexDirection="row" sx={{ mt: 4 }}>
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
          <Grid container item xs={1} justifyContent="left">
            <IconButton type="submit" onClick={sendChatMessageObj} disabled={msg===''}>
              <SendSharp fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </form>
    </Loader>
  );
};
//
export default PresentationView;
