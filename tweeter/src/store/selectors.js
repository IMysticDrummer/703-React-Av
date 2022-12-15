export const getIsLogged = (state) => state.auth;

export const getTweets = (state) => state.tweets;

export const getTweet = (state, tweetId) =>
  getTweets(state).find((tweet) => tweet.id.toString() === tweetId);
