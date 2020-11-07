const fs = require('fs')
const csv = require('csvtojson')

const videoGamesCsvPath = __dirname + '/raw/vgsales-12-4-2019.csv'
const videoGames = []

const checkForNull = (val) => val === '' ? null : val

const run = async () => {
  const videoGamesConverted = await csv().fromFile(videoGamesCsvPath)
  const platforms = ['PS4', 'XOne', 'NS']
  videoGamesConverted.forEach((vg) => {
    if (platforms.includes(vg.Platform)) {
      let platform
      switch (vg.Platform) {
        case 'NS':
          platform = 'Nintendo Switch'
          break
        case 'PS4':
          platform = 'Playstation 4'
          break
        case 'XOne':
          platform = 'XBox One'
          break
        default:
          platform = vg.Platform
      }

      const newVg = {
        name: checkForNull(vg.Name),
        genre: checkForNull(vg.Genre),
        esrbRating: checkForNull(vg.ESRB_Rating),
        platform,
        publisher: checkForNull(vg.Publisher),
        developer: checkForNull(vg.Developer),
        criticScore: checkForNull(vg.Critic_Score),
        userScore: checkForNull(vg.User_Score),
        year: vg.Year ? checkForNull(Math.round(vg.Year)) : null,
        imgUrl: `http://vgchartz.com${vg.img_url}`
      }
      // console.log(newVg)
      videoGames.push(newVg)
    }
  })
  fs.writeFileSync(__dirname + '/video_games.json', JSON.stringify(videoGames, null, 2), 'utf-8')
}


run()
