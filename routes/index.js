const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const language = require('../langs/index');

/* GET home page. */
/* GET users listing. */
router.get('/', function(req, res) {
  res.redirect("/en");
});


router.get('/:lang*?', function(req, res, next) {
// Check language
  let lang = req.params.lang.toLowerCase();
  let langs = '';
  if (lang === undefined) {
      lang = "en"
  }
 const end_lang = language.lang(lang);
 langs = require('../langs/'+end_lang+'.json');
 
// send client
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
  axios.get(url)
        .then(function(response) {
            //let price = parseFloat(response.data);
            const data = response.data;
            res.render('index', { title: title, curs : data, lang:langs, langg: end_lang});
            return;
        })
        .catch((err) => console.log(err));
});

module.exports = router;
