const superagent = require('superagent');

export default (req, res) => {
  return superagent
    .post('https://api.travis-ci.org/repo/kitspace%2Fkitspace/requests')
    .set({
      'Travis-API-Version': '3',
      Authorization: `token ${process.env.TRAVIS_API_KEY}`,
    })
    .send({
      request: {
        branch: 'master',
      },
    })
    .then(r => res.send(r.body))
    .catch(e => {
      console.error(e);
    })
};
