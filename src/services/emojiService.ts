import { 
  EMOJI_SMILEYS_EMOTION_FACE_SMILING_CODE_1F600,
  EMOJI_OBJECTS_BOOK_PAPER_CODE_1F4D6,
  EMOJI_SYMBOLS_MATH_CODE_2795,
  EMOJI_SYMBOLS_MATH_CODE_2796,
  EMOJI_SYMBOLS_ALPHANUM_CODE_1F522,
  EMOJI_FOOD_DRINK_FOOD_FRUIT_CODE_1F34E,
  EMOJI_OBJECTS_OFFICE_CODE_2702,
  EMOJI_SMILEYS_EMOTION_EMOTION_CODE_1F4A4,
  EMOJI_ACTIVITIES_EVENT_CODE_1F389,
  EMOJI_SMILEYS_EMOTION_EMOTION_CODE_1F4AF
} from '@assets/svgs'

// Available emoji components
const availableEmojis = [
  EMOJI_SMILEYS_EMOTION_FACE_SMILING_CODE_1F600,
  EMOJI_OBJECTS_BOOK_PAPER_CODE_1F4D6,
  EMOJI_SYMBOLS_MATH_CODE_2795,
  EMOJI_SYMBOLS_MATH_CODE_2796,
  EMOJI_SYMBOLS_ALPHANUM_CODE_1F522,
  EMOJI_FOOD_DRINK_FOOD_FRUIT_CODE_1F34E,
  EMOJI_OBJECTS_OFFICE_CODE_2702,
  EMOJI_SMILEYS_EMOTION_EMOTION_CODE_1F4A4,
  EMOJI_ACTIVITIES_EVENT_CODE_1F389,
  EMOJI_SMILEYS_EMOTION_EMOTION_CODE_1F4AF
]

export class EmojiService {
  /**
   * Get a random emoji component
   */
  public getRandomEmoji() {
    const randomIndex = Math.floor(Math.random() * availableEmojis.length)
    return availableEmojis[randomIndex]
  }

  /**
   * Get a specific emoji by name
   */
  public getEmojiByName(name: string) {
    const emojiMap: Record<string, any> = {
      'smile': EMOJI_SMILEYS_EMOTION_FACE_SMILING_CODE_1F600,
      'book': EMOJI_OBJECTS_BOOK_PAPER_CODE_1F4D6,
      'plus': EMOJI_SYMBOLS_MATH_CODE_2795,
      'minus': EMOJI_SYMBOLS_MATH_CODE_2796,
      'numbers': EMOJI_SYMBOLS_ALPHANUM_CODE_1F522,
      'apple': EMOJI_FOOD_DRINK_FOOD_FRUIT_CODE_1F34E,
      'pencil': EMOJI_OBJECTS_OFFICE_CODE_2702,
      'thinking': EMOJI_SMILEYS_EMOTION_EMOTION_CODE_1F4A4,
      'party': EMOJI_ACTIVITIES_EVENT_CODE_1F389,
      'hundred': EMOJI_SMILEYS_EMOTION_EMOTION_CODE_1F4AF
    }
    
    return emojiMap[name] || this.getRandomEmoji()
  }

  /**
   * Get emoji based on content context
   */
  public getEmojiByContext(content: string) {
    const lowerContent = content.toLowerCase()
    
    if (lowerContent.includes('matemática') || lowerContent.includes('números') || lowerContent.includes('cálculo')) {
      return EMOJI_SYMBOLS_ALPHANUM_CODE_1F522
    }
    if (lowerContent.includes('adição') || lowerContent.includes('mais') || lowerContent.includes('somar')) {
      return EMOJI_SYMBOLS_MATH_CODE_2795
    }
    if (lowerContent.includes('subtração') || lowerContent.includes('menos') || lowerContent.includes('subtrair')) {
      return EMOJI_SYMBOLS_MATH_CODE_2796
    }
    if (lowerContent.includes('exercício') || lowerContent.includes('prática') || lowerContent.includes('escrever')) {
      return EMOJI_OBJECTS_OFFICE_CODE_2702
    }
    if (lowerContent.includes('maçã') || lowerContent.includes('fruta') || lowerContent.includes('exemplo')) {
      return EMOJI_FOOD_DRINK_FOOD_FRUIT_CODE_1F34E
    }
    if (lowerContent.includes('pensar') || lowerContent.includes('pensando') || lowerContent.includes('resposta')) {
      return EMOJI_SMILEYS_EMOTION_EMOTION_CODE_1F4A4
    }
    if (lowerContent.includes('parabéns') || lowerContent.includes('bem') || lowerContent.includes('sucesso')) {
      return EMOJI_ACTIVITIES_EVENT_CODE_1F389
    }
    if (lowerContent.includes('aprender') || lowerContent.includes('estudar') || lowerContent.includes('conhecimento')) {
      return EMOJI_OBJECTS_BOOK_PAPER_CODE_1F4D6
    }
    if (lowerContent.includes('objetivo') || lowerContent.includes('alcançado') || lowerContent.includes('concluído')) {
      return EMOJI_SMILEYS_EMOTION_EMOTION_CODE_1F4AF
    }
    
    // Default to smile
    return EMOJI_SMILEYS_EMOTION_FACE_SMILING_CODE_1F600
  }
}

export const emojiService = new EmojiService()
