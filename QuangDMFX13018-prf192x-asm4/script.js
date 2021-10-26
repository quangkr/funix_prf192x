// vim: set ft=javascript foldmethod=marker :

// mock data {{{
const mockData = {
  "totalArticles": 610475,
  "articles": [
    {
      "title": "STUDIU Planeta Venus nu a putut niciodată să aibă oceane, subminând și mai mult teoria că ar fi putut să găzduiască forme de viață",
      "description": "Planeta Venus nu a putut niciodată să aibă oceane, potrivit unui studiu realizat de mai mulţi oameni de ştiinţă, care au utilizat un model climatologic",
      "content": "STUDIU Planeta Venus nu a putut niciodată să aibă oceane, subminând și mai mult teoria că ar fi putut să găzduiască forme de viață\nPlaneta Venus nu a putut niciodată să aibă oceane, potrivit unui studiu realizat de mai mulţi oameni de ştiinţă, care a... [4699 chars]",
      "url": "https://www.g4media.ro/studiu-planeta-venus-nu-a-putut-niciodata-sa-aiba-oceane-subminand-si-mai-mult-teoria-ca-ar-fi-putut-sa-gazduiasca-forme-de-viata.html",
      "image": "https://cdn.g4media.ro/wp-content/uploads/2018/02/logo.png",
      "publishedAt": "2021-10-17T09:28:00Z",
      "source": {
        "name": "G4Media.ro",
        "url": "https://www.g4media.ro"
      }
    },
    {
      "title": "לקפל שכבה בפירמידה: אקויטל של קובי מימון רוצה למחוק את נפטא מהמסחר",
      "description": "ההצעה למיזוג ולמחיקת נפטא מהמסחר לא נובעת מאילוץ או מחוק הריכוזיות, וככל הנראה מושפעת מביצועים גרועים של מניית נפטא בשנים האחרונות",
      "content": "אף שאקויטל לא פירטה את השיקולים למהלך, מבט על מסכי המסחר מעניק הסבר אפשרי. מניית נפטא אמנם התאוששה ועלתה מתחילת החודש ב-21%, לאחר ההתאוששות הדרמטית במחירי הנפט בעולם. אבל במבט רב שנתי מדובר במניה צולעת במיוחד. בשלוש השנים האחרונות השיאה נפטא תשואה של... [616 chars]",
      "url": "https://www.calcalist.co.il/market/article/bk311zwksk",
      "image": "https://images1.calcalist.co.il/picserver3/crop_images/2021/08/14/B1f100LrlY/B1f100LrlY_252_32_455_257_0_large.jpg",
      "publishedAt": "2021-10-17T09:18:31Z",
      "source": {
        "name": "כלכליסט",
        "url": "https://www.calcalist.co.il"
      }
    },
    {
      "title": "Deak Ferrand: \"J’ai eu la sensation de vivre sur Dune pendant une année!\"",
      "description": "Le Genevois Deak Ferrand est en grande partie responsable du développement visuel de cette adaptation majestueuse. Il nous raconte les dessous de sa conception.",
      "content": "Le Genevois Deak Ferrand est en grande partie responsable du développement visuel de cette adaptation majestueuse. Il nous raconte les dessous de sa conception.\nNé à Genève, d’un père Suisse et d’une mère Canadienne, Deak Ferrand a travaillé en étroi... [10232 chars]",
      "url": "https://www.lematin.ch/story/jai-eu-la-sensation-de-vivre-sur-dune-pendant-une-annee-397714210160",
      "image": "https://cdn.unitycms.io/image/ocroped/1200,1200,998,640,40,2/b9XKsVVZa8o/9vLJ8gS4KW2B819d3EUys8.png",
      "publishedAt": "2021-10-17T09:16:58Z",
      "source": {
        "name": "lematin.ch",
        "url": "https://www.lematin.ch"
      }
    },
    {
      "title": "Adam Peaty’s girlfriend reacts to Strictly star’s ‘almost kiss’ with dance partner Katya Jones",
      "description": "Olympic athlete danced a steamy Argentine tango with his professional partner in week four",
      "content": "The girlfriend of Strictly Come Dancing star Adam Peaty has shared her reaction after he and dance partner Katya Jones supposedly “almost kissed” after their performance last night (Saturday 16 October).\nThe duo danced an intense Argentine tango for ... [1549 chars]",
      "url": "https://www.independent.co.uk/arts-entertainment/tv/news/adam-peaty-katya-jones-kiss-girlfriend-b1939774.html",
      "image": "https://static.independent.co.uk/2021/10/17/08/pjimage%20%284%29.jpg?width=1200&auto=webp&quality=75",
      "publishedAt": "2021-10-17T09:14:18Z",
      "source": {
        "name": "The Independent",
        "url": "https://www.independent.co.uk"
      }
    },
    {
      "title": "L’aventure The Voice est terminée pour Gjon’s Tears",
      "description": "Malgré une belle prestation, Gjon's Tears n’a pas réussi à se qualifier pour la finale de The Voice All Stars.",
      "content": "TF1 : L’aventure «The Voice» est terminée pour Gjon’s Tears\nMalgré une très belle interprétation de «Sur un prélude de Bach», le talent fribourgeois n’a pas réussi à se qualifier pour la finale de l’édition anniversaire du télécrochet.\nIl n’y aura pa... [902 chars]",
      "url": "https://www.20min.ch/fr/story/laventure-the-voice-est-terminee-pour-gjons-tears-741628901735",
      "image": "https://cdn.unitycms.io/image/ocroped/1200,1200,1000,1000,0,0/NjRGaGj7UYw/8Wjd0lT7qbrAt8_oY29GgW.png",
      "publishedAt": "2021-10-17T09:07:35Z",
      "source": {
        "name": "20 Minutes",
        "url": "https://www.20min.ch"
      }
    },
    {
      "title": "Man skjuten vid tågstation i Jordbro",
      "description": "En man ska ha skottskadats i armen efter en attack i fullt dagsljus på en tågstation i Jordbro, södra Stockholm.",
      "content": "Det var vid 10.17 som polis larmades till tågstationen i Jordbro. En man ska ha skottskadats i armen efter en skjutning vid Jordbro pendeltågsstation. Hans skador ska dock inte vara allvarliga, enligt polisen.\nEnligt tidiga vittnesuppgifter ska det r... [1041 chars]",
      "url": "https://www.svt.se/nyheter/lokalt/stockholm/man-skjuten-vid-tagstation",
      "image": "https://www.svtstatic.se/image/custom/650/27820031/1?format=auto&ratio=1.91",
      "publishedAt": "2021-10-17T08:58:43Z",
      "source": {
        "name": "Sveriges Television",
        "url": "https://www.svt.se"
      }
    },
    {
      "title": "Секрети MIUI: які програми \"вбивають\" ваш смартфон Xiaomi",
      "description": "У всього в цьому світі є дві сторони. На перший погляд, велика кількість системних додатків і процесів це добре, різні служби допомагають користувачеві, пропонують правильні дії, відстежують події, моніторять",
      "content": "Топові смартфони Xiaomi можуть похвалитися відмінними камерами, чудовими екранами та іншими вражаючими характеристиками. Але зробити вибір між ними може бути непросто, оскільки в асортименті Xiaomi чимало флагманів. Крім серії Mi у Xiaomi є ще суббре... [5351 chars]",
      "url": "https://tehnofan.com.ua/2021/10/17/sekrety-miui-yaki-prohramy-vbyvayut%CA%B9-vash-smartfon-xiaomi/",
      "image": "https://tehnofan.com.ua/wp-content/uploads/2021/10/Screenshot_8.jpg",
      "publishedAt": "2021-10-17T08:53:52Z",
      "source": {
        "name": "Технофан",
        "url": "https://tehnofan.com.ua"
      }
    },
    {
      "title": "Man skjuten i armen i Jordbro",
      "description": "En man uppges ha blivit skjuten i armen vid pendeltågsstationen i Jordbro, söder om Stockholm. En till två gärningspersoner ska ha setts springa från platsen.",
      "content": "En man uppges ha blivit skjuten i armen vid pendeltågsstationen i Jordbro, söder om Stockholm. En till två gärningspersoner ska ha setts springa från platsen.\n– En förbipasserande har hört en man som ropar på hjälp. Den mannen uppges ha skjutits i ar... [379 chars]",
      "url": "https://www.hallandsposten.se/nyheter/sverige/man-skjuten-i-armen-i-jordbro-1.57229298",
      "image": "http://www.hallandsposten.se/image/policy:1.36847645:1605003792/image.jpg?f=Wide%26w=1200%26%24p%24f%24w=834285a",
      "publishedAt": "2021-10-17T08:49:48Z",
      "source": {
        "name": "Hallandsposten",
        "url": "https://www.hallandsposten.se"
      }
    },
    {
      "title": "La FIFA se pronuncia ante la polémica con EA: “Una sola compañía no debería de acaparar todos los derechos”",
      "description": "EA está teniendo problemas para mantener su famosa franquicia de futbol y la propia FIFA nos da su explicación.",
      "content": "La franquicia de juegos de futbol más famosa está pasando por difíciles momentos para conservar su conocido nombre y parece que el dinero es lo que manda, como podéis ver aquí. La propia FIFA ha decidido hacer unas declaraciones para explicar el porq... [815 chars]",
      "url": "https://generacionxbox.com/la-fifa-se-pronuncia-ante-la-polemica-con-ea/",
      "image": "https://generacionxbox.com/wp-content/uploads/2021/07/FIFA-22-1.jpg",
      "publishedAt": "2021-10-17T08:43:57Z",
      "source": {
        "name": "Generación Xbox",
        "url": "https://generacionxbox.com"
      }
    },
    {
      "title": "Energieknappheit : Bund kann uns zum Stromsparen zwingen",
      "description": "Der Strom könnte in Zukunft schon bald knapp werden. Als äusserste Massnahme kann der Bund den Strom rationieren. Firmen haben bereits entsprechende Post aus Bern erhalten.",
      "content": "Energieknappheit : Bund kann uns zum Stromsparen zwingen\nDer Strom könnte in Zukunft schon bald knapp werden. Als äusserste Massnahme kann der Bund den Strom rationieren. Firmen haben bereits entsprechende Post aus Bern erhalten.\n1 / 3 Der Strom könn... [3221 chars]",
      "url": "https://www.20min.ch/story/bund-kann-uns-zum-stromsparen-zwingen-574454424122",
      "image": "https://cdn.unitycms.io/image/ocroped/1200,1200,1000,1000,0,0/bSXnv_xzz8A/CEB-9Q7E4wq9K1_BYPyZHm.jpg",
      "publishedAt": "2021-10-17T08:40:44Z",
      "source": {
        "name": "20 Minuten",
        "url": "https://www.20min.ch"
      }
    }
  ]
};
//}}}

//{{{
function renderData(data) {
  const articlesList = document.querySelector('section.articles-list')

  articlesList.innerHTML = '';
  data.forEach(function(article) {
    const articleTemplate = document.getElementById('template-article-piece')
      .content
      .firstElementChild
      .cloneNode(true);

    const articleImg = articleTemplate.querySelector('.article-piece-img');
    const articleImgLink = articleTemplate.querySelector('.article-piece-img-link');
    const articleTitleLink = articleTemplate.querySelector('.article-piece-title-link');
    const articleTime = articleTemplate.querySelector('.article-piece-time');
    const articleSummary = articleTemplate.querySelector('.article-piece-summary');

    articleImg.src = article.image;
    articleTitleLink.textContent = article.title;
    articleTime.textContent = new Date(article.publishedAt)
      .toLocaleString('vi-VN',
        {
          dateStyle: 'full',
          timeStyle: 'medium',
          hour12: true,
        });
    articleSummary.textContent = article.content
      .split(' ')
      .slice(0, -2)
      .join(' ');
    articleImgLink.href = article.url;
    articleTitleLink.href = article.url;

    articlesList.appendChild(articleTemplate);
  });

}
//}}}

// event listeners {{{
document.getElementById('navbar-search-submit').addEventListener('click', (e) => {
  e.preventDefault();
  console.log('search button clicked!');
});

document.getElementById('navbar-filter-toggle').addEventListener('click', () => {
  document.querySelector('.navbar-filter-form').classList.toggle('opened');
})

//}}}
