// API client for interacting with Cloudflare Functions

export interface ProfileData {
  name: string;
  age: string;
  instagram: string;
  mbti?: string;
  keywords: string[];
  intro: string;
}

export interface GenerateProfileRequest {
  name: string;
  age: string;
  instagram?: string;
  mbti?: string;
  keywords: string;
}

export interface GenerateProfileResponse {
  success: boolean;
  profileId?: string;
  profile?: ProfileData;
  error?: string;
}

const API_BASE = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8788';

export async function generateProfile(data: GenerateProfileRequest): Promise<GenerateProfileResponse> {
  try {
    const response = await fetch(`${API_BASE}/api/generate-profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error generating profile:', error);
    return {
      success: false,
      error: 'Failed to generate profile'
    };
  }
}

export async function getProfile(profileId: string): Promise<ProfileData | null> {
  try {
    const response = await fetch(`${API_BASE}/api/get-profile/${profileId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    return result.profile;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

export async function generateCardImage(profile: ProfileData): Promise<{ success: boolean }> {
  try {
    const response = await fetch(`${API_BASE}/api/generate-card`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ profile }),
    });

    if (!response.ok) {
      return { success: false };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error generating card image:', error);
    return { success: false };
  }
}