// Test emoji mapping function
function addEmojisToKeywords(keywords) {
  const emojiMap = {
    '여행': '✈️',
    '카페': '☕',
    '맛집': '🍽️',
    '요리': '👨‍🍳',
    '영화': '🎬',
    '음악': '🎵',
    '운동': '💪',
    '헬스': '🏋️',
    '요가': '🧘',
    '독서': '📚',
    '사진': '📷',
    '그림': '🎨',
  }
  
  return keywords.map(keyword => {
    const cleanKeyword = keyword.startsWith('#') ? keyword : `#${keyword}`
    const keywordWithoutHash = keyword.replace('#', '')
    
    // Check for exact match (case sensitive for Korean)
    const emoji = emojiMap[keywordWithoutHash] || '✨'
    
    // Only add emoji if keyword doesn't already have one
    const hasEmoji = /[\u{1F300}-\u{1F6FF}]/u.test(cleanKeyword)
    if (!hasEmoji) {
      return `${cleanKeyword} ${emoji}`
    }
    return cleanKeyword
  })
}

// Test
const testKeywords = ['카페', '여행', '사진', '요가', '맛집']
console.log('Input:', testKeywords)
console.log('Output:', addEmojisToKeywords(testKeywords))