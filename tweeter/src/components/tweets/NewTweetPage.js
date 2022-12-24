import Page from '../layout/Page';
import Photo from '../common/Photo';
import Textarea from '../common/Textarea';
import Button from '../common/Button';

import './NewTweetPage.css';
import { useEffect, useRef, useState } from 'react';
//import { createTweet } from './service';
//import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { tweetCreate } from '../../store/actions';
//import { applyMiddleware } from 'redux';
import { getUi } from '../../store/selectors';

const MAX_CHARACTERS = 280;
const MIN_CHARACTERS = 5;

const NewTweetPage = () => {
  const [content, setContent] = useState('');
  //No necesario si redireccionamos desde la acción
  //const navigate = useNavigate();
  const textareaRef = useRef();
  const rendersRef = useRef(0);
  const dispatch = useDispatch();
  const { isLoading } = useSelector(getUi);

  rendersRef.current++;
  console.log(rendersRef.current);

  useEffect(() => {
    // console.log(textareaRef);
    textareaRef.current.focus();
  }, []);

  const handleChange = (event) => setContent(event.target.value);

  //LA cabecera cambia si hacemos redirección desde la acción
  //const handleSubmit = async (event) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    //Esto ya no hace falta si redirigimos desde la acción
    // try {
    //   //const createdTweet = await createTweet({ content });
    //   //necesitamos el await porque sino, nos devolverá una promesa en vez del tweet
    //   //Con la navegación desde redux ya no hace falta
    //   //const { id } = await dispatch(tweetCreate({ content }));
    //   //const createdTweet = await applyMiddleware.tweets.getTweetDetail(id);
    //   const createdTweet = await dispatch(tweetCreate({ content }));

    //   navigate(`/tweets/${createdTweet.id}`);
    // } catch (error) {
    //   if (error.status === 401) {
    //     navigate('/login');
    //   }
    // }

    dispatch(tweetCreate({ content }));
  };

  const characters = `${content.length} / ${MAX_CHARACTERS}`;
  const buttonEnabled = content.length >= MIN_CHARACTERS && !isLoading;

  return (
    <Page title='What are you thinking...'>
      <div className='newTweetPage bordered'>
        <div className='left'>
          <Photo />
        </div>
        <div className='right'>
          <form onSubmit={handleSubmit}>
            <Textarea
              className='newTweetPage-textarea'
              placeholder="Hey! What's up!"
              maxLength={MAX_CHARACTERS}
              value={content}
              onChange={handleChange}
              autofocus
              ref={textareaRef}
            />
            <div className='newTweetPage-footer'>
              <span className='newTweetPage-characters'>{characters}</span>
              <Button
                type='submit'
                className='newTweetPage-submit'
                variant='primary'
                disabled={!buttonEnabled}>
                Let's go!
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Page>
  );
};

export default NewTweetPage;
