import { teewtsLoadedSuccess } from '../actions';

describe('tweetsLoadedSuccss', () => {
  test('should return a "TWEETS_LOADED_SUCCESS" action', () => {
    const tweets = 'tweets';
    const expectedAction = {
      type: 'TWEETS_LOADED_SUCCESS',
      payload: tweets,
    };

    const action = teewtsLoadedSuccess(tweets);

    expect(action).toEqual(expectedAction);
  });
});
