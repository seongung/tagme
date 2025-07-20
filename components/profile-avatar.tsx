"use client"

import { useMemo } from "react"
import { createAvatar } from "@dicebear/core"
import { 
  personas, 
  micah, 
  notionists, 
  adventurerNeutral,
  lorelei,
  avataaars,
  bigSmile
} from "@dicebear/collection"

interface ProfileAvatarProps {
  name: string
  age: string
  mbti?: string
  keywords: string[]
  size?: number
  className?: string
}

export function ProfileAvatar({ 
  name, 
  age, 
  mbti, 
  keywords, 
  size = 128,
  className = ""
}: ProfileAvatarProps) {
  const avatarSvg = useMemo(() => {
    // Select style based on age
    const ageNum = parseInt(age)
    let selectedStyle
    
    if (ageNum >= 20 && ageNum <= 25) {
      selectedStyle = bigSmile // Playful and trendy
    } else if (ageNum >= 26 && ageNum <= 30) {
      selectedStyle = personas // Professional but friendly
    } else if (ageNum >= 31 && ageNum <= 40) {
      selectedStyle = lorelei // Sophisticated and elegant
    } else {
      selectedStyle = notionists // Timeless and refined
    }

    // Generate color scheme based on MBTI
    let backgroundColor: string[] = ["b6e3f4", "c0aede", "ffd5dc", "ffdfbf", "d1f4e0"]
    let primaryColor: string[] = []
    
    if (mbti) {
      const mbtiUpper = mbti.toUpperCase()
      
      // Extrovert vs Introvert colors
      if (mbtiUpper.startsWith('E')) {
        // Warm, bright colors for extroverts
        backgroundColor = ["ffb3ba", "ffdfb9", "ffffba", "ffb3ff", "baffc9"]
        primaryColor = ["ff6b6b", "ff9f43", "ffd93d", "ff6bff", "6bffb3"]
      } else {
        // Cool, calm colors for introverts
        backgroundColor = ["b3d9ff", "d9b3ff", "b3ffff", "e6ccff", "ccf2ff"]
        primaryColor = ["4d94ff", "9966ff", "00cccc", "b366ff", "0099cc"]
      }
      
      // Feeling vs Thinking adjustments
      if (mbtiUpper.includes('F')) {
        // Softer, pastel tones for Feeling types
        backgroundColor = backgroundColor.map(color => {
          // Add more white to make pastel
          return color
        })
      }
    }

    // Add keyword-based accessories or modifications
    const hasTravel = keywords.some(k => k.includes('여행'))
    const hasCafe = keywords.some(k => k.includes('카페') || k.includes('커피'))
    const hasMusic = keywords.some(k => k.includes('음악'))
    const hasPets = keywords.some(k => k.includes('반려동물') || k.includes('강아지') || k.includes('고양이'))

    // Create avatar with customizations
    const avatar = createAvatar(selectedStyle, {
      seed: name,
      size: size,
      backgroundColor: backgroundColor,
      // Style-specific options
      ...(selectedStyle === personas && {
        body: hasTravel ? ["squared"] : ["rounded"],
        clothingColor: primaryColor.length > 0 ? primaryColor : undefined,
      }),
      ...(selectedStyle === bigSmile && {
        accessory: hasMusic ? ["catEars", "glasses", "sailormoonCrown"] : ["none"],
        hairColor: ["000000", "2c1b18", "71635a", "b7a69e", "d6c4c2", "cabfb1"],
      }),
      ...(selectedStyle === lorelei && {
        freckles: Math.random() > 0.7 ? ["variant01", "variant02"] : ["none"],
        beard: ["none"], // Clean look
      }),
    })

    return avatar.toDataUri()
  }, [name, age, mbti, keywords, size])

  return (
    <img 
      src={avatarSvg} 
      alt={`${name}의 아바타`}
      width={size}
      height={size}
      className={`rounded-full ${className}`}
    />
  )
}