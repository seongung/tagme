// Emoji mapping for common Korean interests/keywords
export function getEmojiForKeyword(keyword: string): string {
  const lowerKeyword = keyword.toLowerCase().replace('#', '')
  
  const emojiMap: { [key: string]: string } = {
    // Travel & Places
    '여행': '✈️',
    'travel': '✈️',
    '해외여행': '🌍',
    '국내여행': '🚗',
    '캠핑': '🏕️',
    'camping': '🏕️',
    '등산': '⛰️',
    'hiking': '⛰️',
    '바다': '🌊',
    'beach': '🏖️',
    '산': '🏔️',
    
    // Food & Drinks
    '맛집': '🍽️',
    '요리': '👨‍🍳',
    'cooking': '👨‍🍳',
    '카페': '☕',
    'cafe': '☕',
    'coffee': '☕',
    '커피': '☕',
    '와인': '🍷',
    'wine': '🍷',
    '맥주': '🍺',
    'beer': '🍺',
    '디저트': '🍰',
    'dessert': '🍰',
    '베이킹': '🧁',
    'baking': '🧁',
    
    // Entertainment
    '영화': '🎬',
    'movie': '🎬',
    '음악': '🎵',
    'music': '🎵',
    '노래': '🎤',
    'singing': '🎤',
    '콘서트': '🎫',
    'concert': '🎫',
    '드라마': '📺',
    'drama': '📺',
    '넷플릭스': '📺',
    'netflix': '📺',
    '게임': '🎮',
    'game': '🎮',
    'gaming': '🎮',
    
    // Sports & Fitness
    '운동': '💪',
    'workout': '💪',
    'fitness': '💪',
    '헬스': '🏋️',
    'gym': '🏋️',
    '요가': '🧘',
    'yoga': '🧘',
    '필라테스': '🤸',
    'pilates': '🤸',
    '러닝': '🏃',
    'running': '🏃',
    '수영': '🏊',
    'swimming': '🏊',
    '테니스': '🎾',
    'tennis': '🎾',
    '골프': '⛳',
    'golf': '⛳',
    '축구': '⚽',
    'soccer': '⚽',
    'football': '⚽',
    '농구': '🏀',
    'basketball': '🏀',
    '야구': '⚾',
    'baseball': '⚾',
    
    // Hobbies & Activities
    '독서': '📚',
    'reading': '📚',
    '책': '📖',
    'book': '📖',
    '사진': '📷',
    'photo': '📷',
    'photography': '📷',
    '그림': '🎨',
    'art': '🎨',
    'painting': '🎨',
    '드로잉': '✏️',
    'drawing': '✏️',
    '글쓰기': '✍️',
    'writing': '✍️',
    '춤': '💃',
    'dance': '💃',
    'dancing': '💃',
    
    // Pets & Animals
    '강아지': '🐕',
    'dog': '🐕',
    '고양이': '🐈',
    'cat': '🐈',
    '반려동물': '🐾',
    'pet': '🐾',
    '동물': '🦁',
    'animal': '🦁',
    
    // Nature & Lifestyle
    '자연': '🌿',
    'nature': '🌿',
    '꽃': '🌸',
    'flower': '🌸',
    '식물': '🌱',
    'plant': '🌱',
    '정원': '🌻',
    'garden': '🌻',
    
    // Fashion & Beauty
    '패션': '👗',
    'fashion': '👗',
    '뷰티': '💄',
    'beauty': '💄',
    '쇼핑': '🛍️',
    'shopping': '🛍️',
    
    // Technology
    '개발': '💻',
    'coding': '💻',
    'programming': '💻',
    '기술': '🔧',
    'tech': '🔧',
    'technology': '🔧',
    
    // Others
    '드라이브': '🚗',
    'drive': '🚗',
    '전시회': '🖼️',
    'exhibition': '🖼️',
    '미술관': '🏛️',
    'museum': '🏛️',
    '공연': '🎭',
    'performance': '🎭',
    '뮤지컬': '🎭',
    'musical': '🎭',
    '봉사': '🤝',
    'volunteer': '🤝',
    '명상': '🧘‍♀️',
    'meditation': '🧘‍♀️',
    '와인바': '🍷',
    'winebar': '🍷',
    '브런치': '🥐',
    'brunch': '🥐',
    '자전거': '🚴',
    'bicycle': '🚴',
    'cycling': '🚴',
  }
  
  // Check for exact match first
  if (emojiMap[lowerKeyword]) {
    return emojiMap[lowerKeyword]
  }
  
  // Check for partial matches
  for (const [key, emoji] of Object.entries(emojiMap)) {
    if (lowerKeyword.includes(key) || key.includes(lowerKeyword)) {
      return emoji
    }
  }
  
  // Default emoji for unmatched keywords
  return '✨'
}

// Function to add emojis to keywords array
export function addEmojisToKeywords(keywords: string[]): string[] {
  return keywords.map(keyword => {
    const cleanKeyword = keyword.startsWith('#') ? keyword : `#${keyword}`
    const keywordWithoutHash = keyword.replace('#', '')
    const emoji = getEmojiForKeyword(keywordWithoutHash)
    
    // Only add emoji if it's not the default one or if the keyword doesn't already have an emoji
    if (emoji !== '✨' && !containsEmoji(cleanKeyword)) {
      return `${cleanKeyword} ${emoji}`
    }
    return cleanKeyword
  })
}

// Helper function to check if a string contains emoji
function containsEmoji(str: string): boolean {
  const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u
  return emojiRegex.test(str)
}