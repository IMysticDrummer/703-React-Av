//import { useEffect, useRef, useState } from 'react';
import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Page from '../layout/Page';
//Cambios en importaciones para tratr el tweetdetail con Redux
//import { getTweetDetail } from './service';
import { getTweet } from '../../store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { tweetLoad } from '../../store/actions';

const TweetPage = (props) => {
  //const [tweet, setTweet] = useState(null);
  const { tweetId } = useParams();
  const navigate = useNavigate();
  const unmounteRef = useRef(false);

  const dispatch = useDispatch();

  //Uso de redux para tratar los tweets
  //const tweet = useSelector((state) => getTweet(state, tweetId));
  //Cambio para usar la nueva función getTweet para aislar el parámetro de estado
  const tweet = useSelector(getTweet(tweetId));

  useEffect(() => {
    dispatch(tweetLoad(tweetId)).catch((error) => {
      if (error.status === 404) {
        navigate('404');
      }
    });
    // getTweetDetail(tweetId)
    //   .then((tweet) => {
    //     console.log('have response');
    //     // if (unmounteRef.current) {
    //     //   console.log('do nothing');
    //     //   return;
    //     // }
    //     console.log('set state');
    //     setTweet(tweet);
    //   })
    //   .catch((error) => {
    //     if (error.status === 404) {
    //       navigate('404');
    //     }
    //   });
  }, [dispatch, tweetId, navigate]);

  useEffect(() => {
    return () => {
      unmounteRef.current = true;
    };
  }, []);

  return (
    <Page
      title='Tweet detail'
      {...props}>
      <div>{JSON.stringify(tweet)}</div>
    </Page>
  );
};

export default TweetPage;
