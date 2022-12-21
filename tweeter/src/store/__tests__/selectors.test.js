import { getTweet } from '../selectors';

describe('getTweet', () => {
  it('should return a tweet by tweetId', () => {
    const tweetId = '1';
    const tweets = [{ id: tweetId }];
    const state = { tweets: { data: tweets } };
    expect(getTweet(tweetId)(state)).toBe(tweets[0]);
  });

  it("should not return a any tweet if tweetId doesn't exist", () => {
    const tweetId = '1';
    const tweets = [];
    const state = { tweets: { data: tweets } };
    expect(getTweet(tweetId)(state)).toBe(undefined);
  });
});
