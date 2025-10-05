// Teste rápido para verificar se o emoji está sendo retornado corretamente
const { emojiService } = require('./src/services/emojiService.ts')

console.log('Testando emojiService...')
const randomEmoji = emojiService.getRandomEmoji()
console.log('Random emoji:', randomEmoji)
console.log('Emoji path type:', typeof randomEmoji.path)
console.log('Emoji path:', randomEmoji.path)
