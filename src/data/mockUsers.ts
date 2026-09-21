export interface CommunityUser {
  id: string;
  name: string;
  username: string; // @handle
  role: string;
  theologicalFocus: string;
  bio: string;
  joinedDate: string;
  followersCount: number;
  followingCount: number;
  streak: number;
  versesExplored: number;
  isVerified?: boolean;
  tags: string[];
  favoriteVerse: {
    reference: string;
    text: string;
    note: string;
  };
}

// All mock community users purged. Live users are populated from Supabase public.profiles table.
export const MOCK_COMMUNITY_USERS: CommunityUser[] = [];
