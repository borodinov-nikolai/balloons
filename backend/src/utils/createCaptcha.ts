import sharp from "sharp"

function createSVG(
  width: number,
  height: number,
  text: string,
  hslColor: number
) {
  let stylesSvg = ""
  let textSvg = ""

  for (let i = 0; i < text.length; i++) {
    const nearColor = `hsla(${hslColor + getRandomNearColor()}, 25%, ${
      50 + getRandomNearColor()
    }%, 1)`
    const randomWeight =
      allFontWeights[Math.floor(Math.random() * allFontWeights.length)]
    const dy = Math.floor((Math.random() * 2 - 1) * 3)
    let randomSize = Math.floor((Math.random() * 20 + 50) / text.length)

    if (randomSize > 9) randomSize = 9

    stylesSvg += `
      .title-${i} { fill: ${nearColor}; font-size: 0.${randomSize}em; font-weight: ${randomWeight};}`
    textSvg += `
      <tspan class="title-${i}" dx="-5" dy="${dy}">${text[i]}</tspan>`
  }

  return `
 <svg width="${width}" height="${height}" font-size="30px" xmlns="http://www.w3.org/2000/svg">
      <style>
        tspan {font-style: italic; margin-left: 10px; font-family: Arial,sans-serif}
        ${stylesSvg}
      </style>

      <text x="50%" y="70%" text-anchor="middle">
        ${textSvg}
      </text>
 </svg>
`
}

function getRandomNearColor(): number {
  const offset = 3 + Math.floor(Math.random() * 3),
    minus = Math.floor(Math.random() * 2 - 1) || 1

  return offset * minus
}

const allTexts = [
    "музыка",
    "скрипка",
    "баян",
    "хор",
    "бас",
    "минор",
    "мажор",
    "фагот",
    "флейта",
    "гитара",
    "диск",
    "праздник",
    "событие",
    "банкет",
    "фуршет",
    "тайминг",
    "сценарий",
    "пластинка",
    "выступление",
    "букинг",
    "артист",
    "балет",
    "музыканты",
    "менеджмент",
    "вокал",
    "ударные",
    "винил",
    "микрофон",
    "сцена",
    "звук",
    "свет",
    "экран",
    "соло",
    "альт",
  ],
  allFontWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900]

export async function createImg(width: number, height: number) {
  let base64img = "data:image/jpeg;base64,"
  const text = allTexts[Math.floor(Math.random() * allTexts.length)]
  const hslColor = Math.floor(Math.random() * 360)
  const svgText = createSVG(width, height, text, hslColor)
  const svgBuffer = Buffer.from(svgText)
  const imgData = await sharp({
    create: {
      width: width,
      height: height,
      channels: 3,
      background: `hsla(${hslColor}, 25%, 50%, 1)`,
    },
  })
    .composite([
      {
        input: svgBuffer,
        top: 0,
        left: 0,
      },
    ])
    .toFormat("jpg")
    .toBuffer()
    .then((data) => data.toString("base64"))
    .catch((e) => console.log(e))

  return { img: base64img + imgData, text }
}
