// Import SVG emoji assets
import Emoji1F600 from '../../assets/emojis/smileys-emotion/face-smiling/1F600.svg'

// Export emoji assets object
export const emojiAssets = {
  '1F600': Emoji1F600,
}

// Available emojis list
export const availableEmojis = [
  '1F600',
]

// Get random emoji asset
export const getRandomEmojiAsset = () => {
  const randomUnicode = availableEmojis[Math.floor(Math.random() * availableEmojis.length)]
  return emojiAssets[randomUnicode as keyof typeof emojiAssets] || emojiAssets['1F600']
}

// Get specific emoji asset by unicode
export const getEmojiAsset = (unicode: string) => {
  return emojiAssets[unicode as keyof typeof emojiAssets] || emojiAssets['1F600']
}
