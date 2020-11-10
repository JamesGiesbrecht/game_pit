const fs = require('fs')
const axios = require('axios')
const cheerio = require('cheerio')

const products = [
  {
    category: "Video Game Accessories",
    urls: [
      {
        url: "https://www.bestbuy.ca/en-ca/product/playstation-playstation-camera-3001556/10488546",
        details: {
          Platform: "PlayStation 4",
          Type: "Camera"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/playstation-move-motion-controller-2-pack/12310163",
        details: {
          Platform: "PlayStation 4",
          Type: "Controller"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/playstation-4-playstation-4-dualshock-4-wireless-controller-magma-red-3001550/10520812?icmp=Recos_5across_yr_rcntly_vwd_tms&referrer=PDP_Reco",
        details: {
          Platform: "PlayStation 4",
          Type: "Controller"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/playstation-4-dualshock-4-wireless-controller-gold/10722655?icmp=Recos_4across_cstmrs_ls_vwd&referrer=PDP_Reco",
        details: {
          Platform: "PlayStation 4",
          Type: "Controller"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/playstation-4-playstation-dualshock-4-wireless-controller-green-camo-3001545/10539443?icmp=Recos_4across_cstmrs_ls_vwd&referrer=PDP_Reco",
        details: {
          Platform: "PlayStation 4",
          Type: "Controller"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/playstation-4-dualshock-4-wireless-controller-berry-blue/12870028?icmp=Recos_4across_cstmrs_ls_vwd&referrer=PDP_Reco",
        details: {
          Platform: "PlayStation 4",
          Type: "Controller"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/playstation-4-playstation-4-dualshock-4-wireless-controller-jet-black-3001539/10487973?icmp=Recos_4across_cstmrs_ls_vwd&referrer=PDP_Reco",
        details: {
          Platform: "PlayStation 4",
          Type: "Controller"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/playstation-4-dualshock-4-wireless-controller-rose-gold/13875245?icmp=Recos_4across_cstmrs_ls_vwd&referrer=PDP_Reco",
        details: {
          Platform: "PlayStation 4",
          Type: "Controller"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/playstation-5-dualsense-wireless-controller-white/14962193",
        details: {
          Platform: "PlayStation 5",
          Type: "Controller"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/playstation-5-media-remote-control/14962277",
        details: {
          Platform: "PlayStation 5",
          Type: "Controller"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/playstation-5-hd-camera/14962278",
        details: {
          Platform: "PlayStation 5",
          Type: "Camera"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/pulse-3d-wireless-gaming-headset-for-playstation-5-3005689-white/14963233",
        details: {
          Platform: "PlayStation 5",
          Type: "Headset"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/xbox-one-wireless-controller-grey-blue/12927920",
        details: {
          Platform: "Xbox One",
          Type: "Controller"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/xbox-one-wireless-controller-phantom-magenta-special-edition/14494249",
        details: {
          Platform: "Xbox One",
          Type: "Controller"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/microsoft-xbox-one-wireless-controller-red-wl3-00027/10564180",
        details: {
          Platform: "Xbox One",
          Type: "Controller"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/microsoft-xbox-one-wireless-controller-blue-wl3-00018/10488669",
        details: {
          Platform: "Xbox One",
          Type: "Controller"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/xbox-wireless-controller-2020-carbon-black/14965240",
        details: {
          Platform: "Xbox Series",
          Type: "Controller"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/xbox-wireless-controller-2020-robot-white/14965238",
        details: {
          Platform: "Xbox Series",
          Type: "Controller"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/xbox-wireless-controller-2020-shock-blue/14965239",
        details: {
          Platform: "Xbox Series",
          Type: "Controller"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/nintendo-switch-left-and-right-joy-con-controllers-neon-purple-neon-orange/13818672",
        details: {
          Platform: "Nintendo Switch",
          Type: "Controller"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/nintendo-switch-nintendo-switch-pro-controller-hacafsska/10575065",
        details: {
          Platform: "Nintendo Switch",
          Type: "Controller"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/nintendo-switch-left-and-right-joy-con-controllers-neon-pink-neon-green/12302915",
        details: {
          Platform: "Nintendo Switch",
          Type: "Controller"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/nintendo-switch-left-and-right-joy-con-controllers-blue-neon-yellow/13818671",
        details: {
          Platform: "Nintendo Switch",
          Type: "Controller"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/nintendo-switch-nintendo-switch-left-and-right-joy-con-controllers-neon-red-neon-blue-hacajaeaa/10567481",
        details: {
          Platform: "Nintendo Switch",
          Type: "Controller"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/nintendo-switch-nintendo-switch-left-and-right-joy-con-controllers-grey-hacajaaaa/10567478",
        details: {
          Platform: "Nintendo Switch",
          Type: "Controller"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/nintendo-switch-kk-slider-animal-crossing-enhanced-wireless-controller-green-brown/14481452",
        details: {
          Platform: "Nintendo Switch",
          Type: "Controller"
        },
      },
    ]
  },
  {
    category: "Video Game Consoles",
    urls: [
      {
        url: "https://www.bestbuy.ca/en-ca/product/playstation-5-console-online-only/14962185?icmp=Recos_5across_yr_rcntly_vwd_tms&referrer=PDP_Reco",
        details: {
          "Storage Capacity": "1 TB",
          Manufacturer: "Sony",
          Colour: "White"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/nintendo-switch-lite-grey/13807347?icmp=Recos_5across_yr_rcntly_vwd_tms&referrer=PDP_Reco",
        details: {
          "Storage Capacity": "32 GB",
          Manufacturer: "Nintendo",
          Colour: "Grey"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/nintendo-switch-lite-coral/14457223?icmp=Recos_4across_cstmrs_ls_vwd&referrer=PDP_Reco",
        details: {
          "Storage Capacity": "32 GB",
          Manufacturer: "Nintendo",
          Colour: "Coral"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/nintendo-switch-lite-yellow/13807346?icmp=Recos_4across_cstmrs_ls_vwd&referrer=PDP_Reco",
        details: {
          "Storage Capacity": "32 GB",
          Manufacturer: "Nintendo",
          Colour: "Yellow"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/nintendo-switch-lite-turquoise/13807348",
        details: {
          "Storage Capacity": "32 GB",
          Manufacturer: "Nintendo",
          Colour: "Turquoise"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/nintendo-switch-console-with-neon-red-blue-joy-con/13817625",
        details: {
          "Storage Capacity": "32 GB",
          Manufacturer: "Nintendo",
          Colour: "Neon Red/Neon Blue"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/nintendo-switch-animal-crossing-new-horizons-edition/14425777",
        details: {
          "Storage Capacity": "32 GB",
          Manufacturer: "Nintendo",
          Colour: "Animal Crossing"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/playstation-4-1tb-console/12856333",
        details: {
          "Storage Capacity": "1 TB",
          Manufacturer: "Sony",
          Colour: "Black"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/playstation-4-pro-1tb-console-open-box/14575694",
        details: {
          "Storage Capacity": "1 TB",
          Manufacturer: "Sony",
          Colour: "Black"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/playstation-5-digital-edition-console-online-only/14962184",
        details: {
          "Storage Capacity": "1 TB",
          Manufacturer: "Sony",
          Colour: "White"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/xbox-one-s-1tb-console/14699638",
        details: {
          "Storage Capacity": "1 TB",
          Manufacturer: "Microsoft",
          Colour: "White"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/xbox-series-x-2020-1tb-console-online-only/14964951",
        details: {
          "Storage Capacity": "1 TB",
          Manufacturer: "Microsoft",
          Colour: "Black"
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/xbox-series-s-2020-512gb-console-online-only/14964950",
        details: {
          "Storage Capacity": "512 GB",
          Manufacturer: "Microsoft",
          Colour: "White"
        },
      },
    ]
  },
  {
    category: "Video Games",
    urls: [
      {
        url: "https://www.bestbuy.ca/en-ca/product/spider-man-miles-morales-ultimate-launch-edition-ps5/14962274",
        details: {
          Year: 2020,
          Platform: "PlayStation 5",
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/spider-man-miles-morales-launch-edition-ps5/14962272",
        details: {
          Year: 2020,
          Platform: "PlayStation 5",
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/call-of-duty-black-ops-cold-war-ps5/14899932",
        details: {
          Year: 2020,
          Platform: "PlayStation 5",
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/demon-s-souls-ps5/14962275",
        details: {
          Year: 2020,
          Platform: "PlayStation 5",
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/godfall-ps5/14965059",
        details: {
          Year: 2020,
          Platform: "PlayStation 5",
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/sackboy-a-big-adventure-ps5/14962273",
        details: {
          Year: 2020,
          Platform: "PlayStation 5",
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/assassin-s-creed-valhalla-ps5/14879249",
        details: {
          Year: 2020,
          Platform: "PlayStation 5",
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/nba-2k21-ps5/14730117",
        details: {
          Year: 2020,
          Platform: "PlayStation 5",
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/watch-dogs-legion-ps5/14879250",
        details: {
          Year: 2020,
          Platform: "PlayStation 5",
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/assassin-s-creed-valhalla-xbox-one-xbox-series-x/14605095",
        details: {
          Year: 2020,
          Platform: "Xbox Series",
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/call-of-duty-black-ops-cold-war-xbox-series-x-xbox-one/14899931",
        details: {
          Year: 2020,
          Platform: "Xbox Series",
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/cyberpunk-2077-xbox-series-x-xbox-one-with-steelbook-only-at-best-buy/12601564",
        details: {
          Year: 2020,
          Platform: "Xbox Series",
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/gears-tactics-xbox-series-x-xbox-one/14964952",
        details: {
          Year: 2020,
          Platform: "Xbox Series",
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/far-cry-6-xbox-series-x-xbox-one/14765757",
        details: {
          Year: 2020,
          Platform: "Xbox Series",
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/nba-2k21-xbox-series-x/14730123",
        details: {
          Year: 2020,
          Platform: "Xbox Series",
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/mortal-kombat-11-ultimate-xbox-series-x-xbox-one/15036610",
        details: {
          Year: 2020,
          Platform: "Xbox Series",
        },
      },
      {
        url: "https://www.bestbuy.ca/en-ca/product/yakuza-like-a-dragon-day-ichi-edition-xbox-series-x-xbox-one/14663046",
        details: {
          Year: 2020,
          Platform: "Xbox Series",
        },
      },
    ],
  },
]


const scrapeSite = async (url) => {
  const result = await axios.get(url)
  return cheerio.load(result.data)
}

const getBBPageObj = async (url) => {
  const $ = await scrapeSite(url)
  const scripts = $('script').get()
  const windowObj = scripts.find((s) => (
    s.children[0] && s.children[0].data.substring(0, 100).includes('window')
  ))
  const { data } = windowObj.children[0]
  const objectString = data.substring(data.indexOf('{'), data.length)
  let obj
  eval(`obj = ${objectString}`)
  return obj
}


const writeToJson = (obj, filename) => {
  fs.writeFileSync(__dirname + `/${filename}.json`, JSON.stringify(obj, null, 2), 'utf-8')
}

const run = async () => {
  const url = 'https://www.bestbuy.ca/en-ca/product/playstation-4-playstation-4-dualshock-4-wireless-controller-magma-red-3001550/10520812'
  const myObj = await getBBPageObj(url)
  writeToJson(myObj, 'playstation')
}

const scrapeUrls = async (urlObj) => {
  const scrapedData = []
  for (const category of urlObj) {
    for (const url of category.urls) {
      try {
        console.log(url.url)
        const product = {}
        product.category = category.category
        const page = await getBBPageObj(url.url)
        const productData = page.product.product
        product.name = productData.name
        product.description = productData.shortDescription
        product.price = productData.priceWithoutEhf
        product.image = productData.additionalImages[0]
        const details = []
        const permittedDetails = [
          "Width", "Height", "Depth", "Weight", "Material", "Colour", "Compatible Games", "Storage Capacity", "Genre", "ESRB Rating",
        ]
        productData.specs[""].forEach((detail) => {
          if (permittedDetails.includes(detail.name)) {
            details.push([detail.name, detail.value])
          }
        })
        Object.keys(url.details).forEach((key) => {
          if (!details.some((d) => d[0] === key)) {
            details.push([key, url.details[key]])
          }
        })
        product.details = details
        // console.log(product)
        scrapedData.push(product)
      } catch(err) {
        console.log(err)
        console.log(url)
      }
    }
  }
  console.log(scrapedData)
  writeToJson(scrapedData, 'bb')
}

scrapeUrls(products)
// run()

/*
product.product.name
"name": "PlayStation 4",
product.product.shortDescription
"description": "Sleek and streamlined, the PlayStation 4 Slim opens the door to a world of immersive gaming and top-tier entertainment. Enjoy blockbuster storytelling presented in stunning Full HD 1080p and an online library full of exclusive content tailor-made for the PS4. Stream movies, tap into your favourite apps, and connect with your friends to embark on epic adventures together.",
product.product.priceWithoutEhf
"price": 379.99,
FAKER
"stock_quantity": 17,
FAKER
"discount": 25,
category.name (Might need to set manually)
"category": "Video Game Consoles",
product.product.additionalImages[0]
"imgUrl": "playstation_4.jpg",
product.product.specs."".(array)
"details": [
["Manufacturer", "Sony"],
["Capacity", "1 TB"],
["Compatible Games", "PlayStation 4"],
["Colour", "Black"],
["Width", "26.5 cm"],
["Height", "28.8 cm"],
["Depth", "3.9 cm"],
["Weight", "2 kg"]
*/