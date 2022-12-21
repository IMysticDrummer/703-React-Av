import {
  teewtsLoadedSuccess,
  authLogin,
  authLoginRequest,
  authLoginSuccess,
  authLoginFailure,
} from '../actions';

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

describe('authLogin', () => {
  //sólo necesitamos que ver que pasan por los dispatch adecuados
  const credentials = 'credentials';
  const action = authLogin(credentials);
  //mockeamos la función que vamos utilizar para no llamar al api
  const dispatch = jest.fn();
  const api = { auth: {} };
  const router = { navigate: jest.fn(), state: { location: {} } };

  describe('when login API resolves', () => {
    it('should follow the login flow', async () => {
      //Necesitamos simular la promesa que debe resolverse
      api.auth.login = jest.fn().mockResolvedValue();
      await action(dispatch, undefined, { api, router });
      expect(dispatch).toHaveBeenNthCalledWith(1, authLoginRequest());
      expect(api.auth.login).toHaveBeenCalledWith(credentials);
      expect(dispatch).toHaveBeenNthCalledWith(2, authLoginSuccess());
      expect(router.navigate).toHaveBeenCalledWith('/', { replace: true });
    });
  });

  describe('when login API rejects', () => {
    const error = 'error';
    it('should follow the error flow', async () => {
      api.auth.login = jest.fn().mockRejectedValue(error);
      await action(dispatch, undefined, { api });
      expect(dispatch).toHaveBeenNthCalledWith(1, authLoginRequest());
      expect(dispatch).toHaveBeenNthCalledWith(2, authLoginFailure(error));
    });
  });
});
