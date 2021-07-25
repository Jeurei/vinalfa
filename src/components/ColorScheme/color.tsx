const colorConvert = (RGBcolor) => {
  const R = parseInt(RGBcolor.slice(0, 2), 16) / 255
  const G = parseInt(RGBcolor.slice(2, 4), 16) / 255
  const B = parseInt(RGBcolor.slice(4, 6), 16) / 255

  
  const min = Math.min(R, G, B)
  const max = Math.max(R, G, B)
  const diff = max - min
  
  let L = 0
  L = (max + min) / 2

  let S = 0
  S = diff === 0 ? 0 : diff / (1 - Math.abs(2 * L - 1))

  let H = 0
  if (diff === 0) H = 0
  else if (max === R) H = (G < B) ? (G - B) / diff + 6 : (G - B) / diff % 6
  else if (max === G) H = (B - R) / diff + 2
  else if (max === B) H = (R - G) / diff + 4
  H = Math.round(Math.abs(H) * 60)
  
  const HSLcolor = {
    H: parseFloat((H).toFixed(2)), 
    S: parseFloat((S * 100).toFixed(2)), 
    L: parseFloat((L * 100).toFixed(2))
  }

  return HSLcolor
}

const colorReConvert = (HSLcolor) => {
  const H = HSLcolor.H
  const S = HSLcolor.S > 100 ? 1 : (HSLcolor.S / 100)
  const L = HSLcolor.L > 95 ? .95 : (HSLcolor.L / 100)

  const C = (1 - Math.abs(2 * L - 1)) * S
  const X = C * (1 - Math.abs((H / 60) % 2 - 1))
  const M = L - C / 2

  let R: any = 0
  let G: any = 0
  let B: any = 0
  if (0 <= H && H < 60) { R = C; G = X; B = 0 }
  else if (60 <= H && H < 120) { R = X; G = C; B = 0 }
  else if (120 <= H && H < 180) { R = 0; G = C; B = X }
  else if (180 <= H && H < 240) { R = 0; G = X; B = C }
  else if (240 <= H && H < 300) { R = X; G = 0; B = C }
  else if (300 <= H && H < 360) { R = C; G = 0; B = X }

  R = Math.round((R + M) * 255).toString(16)
  G = Math.round((G + M) * 255).toString(16)
  B = Math.round((B + M) * 255).toString(16)

  if (R.length === 1) R = '0' + R
  if (G.length === 1) G = '0' + G
  if (B.length === 1) B = '0' + B

  const RGBcolor = { R, G, B }

  return RGBcolor
}

export { colorConvert, colorReConvert }