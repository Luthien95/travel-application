const express = require("express");
const router = express();
const { Article } = require("./../database/models/article");

router.get("/", async (req, res) => {
  const articles = await Article.find().sort("title");
  res.send(articles);
});

router.post("/", async (req, res) => {
  console.log(req);
  const article = new Article({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    img: req.body.img,
  });

  const article2 = await article.save();
  res.send(article2);
});

async function createArticle() {
  const article = new Article({
    title: "Hawaii - Magic place",
    description:
      "Hawaii (/həˈwaɪ.i/ (About this soundlisten) hə-WY-ee; Hawaiian: Hawaiʻi [həˈvɐjʔi]) is a state of the United States of America located in the Pacific Ocean. It is the only U.S. state located outside North America, the only island state, and the only state in the tropics. The state encompasses nearly the entire Hawaiian archipelago, which consists of 137 volcanic islands spanning 1,500 miles (2,400 km), which are physiographically and ethnologically part of the Polynesian subregion of Oceania. The state's ocean coastline is consequently the fourth longest in the U.S, at about 750 miles (1,210 km). The eight main islands, from northwest to southeast, are Niʻihau, Kauaʻi, Oʻahu, Molokaʻi, Lānaʻi, Kahoʻolawe, Maui, and Hawaiʻi, after which the state is named; it is often called the /'Big Island/' or /'Hawaii Island/' to avoid confusion with the state or archipelago. Of the 50 U.S. states, Hawaii is the eighth-smallest geographically and the 11th-least populous, but the 13th-most densely populated. It has more than 1.4 million residents, and is among the most diverse states in the country, with the nation's only Asian American demographic majority. The state capital and largest city is Honolulu on the island of Oʻahu. Settled by Polynesians some time between 124 and 1120 AD, Hawaii was an independent nation until 1898, when it was annexed by the United States. It became the most recent state to join the union, on August 21, 1959. Hawaii's diverse natural scenery, warm tropical climate, abundance of public beaches, oceanic surroundings, active volcanoes, and clear skies on the Big Island make it a popular destination for tourists, surfers, biologists, volcanologists, and astronomers. Due to its central location in the Pacific and successive waves of labor migration, Hawaii is a unique melting pot of Southeast Asian, East Asian and North American cultures, in addition to its indigenous Hawaiian culture.",
    date: "19 - 21 September 2019",
    img:
      "https://images.unsplash.com/photo-1462400362591-9ca55235346a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1017&q=80",
  });

  const result = await article.save();
  console.log(result);
}

createArticle();
module.exports = router;