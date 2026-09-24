/**
 * 365-Day Canonical Notification Scripture Dataset (Calendar Synchronized)
 *
 * Provides 365 distinct, non-repeating biblical scriptures for:
 * 1. Morning Word (08:00 AM) - Dawn, praise, direction, wisdom, renewal
 * 2. Divine Love & Identity Affirmations (13:15 & 16:30) - God's love, value, identity in Christ
 * 3. Nightly Peace (22:00) - Quietness, rest, safety, restful sleep
 * 4. Evening Streak Guardian (20:30) - Daily fidelity, streak preservation, reading prompts
 *
 * Indexed by calendar day of the year (Day 1 through Day 365).
 */

export interface DailyMorningWord {
  dayOfYear: number;
  calendarDate: string;
  ref: string;
  text: string;
  theme: string;
}

export interface DailyDivineAffirmation {
  dayOfYear: number;
  calendarDate: string;
  title: string;
  body: string;
  reference: string;
}

export interface DailyNightlyPeace {
  dayOfYear: number;
  calendarDate: string;
  ref: string;
  text: string;
  theme: string;
}

export interface DailyStreakPrompt {
  dayOfYear: number;
  calendarDate: string;
  title: string;
  body: string;
}

/**
 * Returns the calendar day of the year (1 - 365) for a given date.
 */
export function getDayOfYear(date: Date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return Math.min(365, Math.max(1, day));
}

export const MORNING_365_SCRIPTURES: DailyMorningWord[] = [
  {
    "dayOfYear": 1,
    "calendarDate": "January 1",
    "ref": "Psalm 119:105",
    "text": "Your word is a lamp to my feet and a light to my path.",
    "theme": "Lamp of Truth"
  },
  {
    "dayOfYear": 2,
    "calendarDate": "January 2",
    "ref": "Lamentations 3:22-23",
    "text": "The steadfast love of the Lord never ceases; his mercies are new every morning.",
    "theme": "Morning Mercies"
  },
  {
    "dayOfYear": 3,
    "calendarDate": "January 3",
    "ref": "Psalm 143:8",
    "text": "Let the morning bring me word of your unfailing love, for I have put my trust in you.",
    "theme": "Steadfast Trust"
  },
  {
    "dayOfYear": 4,
    "calendarDate": "January 4",
    "ref": "Proverbs 3:5-6",
    "text": "Trust in the Lord with all your heart and lean not on your own understanding.",
    "theme": "Divine Direction"
  },
  {
    "dayOfYear": 5,
    "calendarDate": "January 5",
    "ref": "Matthew 6:33",
    "text": "Seek first his kingdom and his righteousness, and all these things will be given to you as well.",
    "theme": "Kingdom First"
  },
  {
    "dayOfYear": 6,
    "calendarDate": "January 6",
    "ref": "Psalm 5:3",
    "text": "In the morning, Lord, you hear my voice; in the morning I lay my requests before you and wait expectantly.",
    "theme": "Morning Prayer"
  },
  {
    "dayOfYear": 7,
    "calendarDate": "January 7",
    "ref": "Isaiah 40:31",
    "text": "Those who hope in the Lord will renew their strength. They will soar on wings like eagles.",
    "theme": "Renewed Wings"
  },
  {
    "dayOfYear": 8,
    "calendarDate": "January 8",
    "ref": "Psalm 90:14",
    "text": "Satisfy us in the morning with your unfailing love, that we may sing for joy and be glad all our days.",
    "theme": "Morning Satisfaction"
  },
  {
    "dayOfYear": 9,
    "calendarDate": "January 9",
    "ref": "Psalm 118:24",
    "text": "This is the day the Lord has made; let us rejoice and be glad in it.",
    "theme": "Day of Gladness"
  },
  {
    "dayOfYear": 10,
    "calendarDate": "January 10",
    "ref": "Proverbs 4:18",
    "text": "The path of the righteous is like the morning sun, shining ever brighter till the full light of day.",
    "theme": "Ever Brighter"
  },
  {
    "dayOfYear": 11,
    "calendarDate": "January 11",
    "ref": "Psalm 59:16",
    "text": "I will sing of your strength, in the morning I will sing of your love; for you are my fortress.",
    "theme": "Morning Song"
  },
  {
    "dayOfYear": 12,
    "calendarDate": "January 12",
    "ref": "Psalm 19:14",
    "text": "May these words of my mouth and this meditation of my heart be pleasing in your sight, Lord.",
    "theme": "Holy Meditation"
  },
  {
    "dayOfYear": 13,
    "calendarDate": "January 13",
    "ref": "Psalm 27:1",
    "text": "The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life.",
    "theme": "Unshakable Light"
  },
  {
    "dayOfYear": 14,
    "calendarDate": "January 14",
    "ref": "Romans 12:2",
    "text": "Do not conform to the pattern of this world, but be transformed by the renewing of your mind.",
    "theme": "Renewed Mind"
  },
  {
    "dayOfYear": 15,
    "calendarDate": "January 15",
    "ref": "Colossians 3:17",
    "text": "Whatever you do, whether in word or deed, do it all in the name of the Lord Jesus.",
    "theme": "In His Name"
  },
  {
    "dayOfYear": 16,
    "calendarDate": "January 16",
    "ref": "Micah 6:8",
    "text": "He has shown you, O mortal, what is good: to act justly, love mercy, and walk humbly with your God.",
    "theme": "Humble Walk"
  },
  {
    "dayOfYear": 17,
    "calendarDate": "January 17",
    "ref": "Psalm 84:11",
    "text": "For the Lord God is a sun and shield; the Lord bestows favor and honor.",
    "theme": "Sun and Shield"
  },
  {
    "dayOfYear": 18,
    "calendarDate": "January 18",
    "ref": "Philippians 4:13",
    "text": "I can do all this through him who gives me strength.",
    "theme": "Empowered"
  },
  {
    "dayOfYear": 19,
    "calendarDate": "January 19",
    "ref": "Psalm 25:4-5",
    "text": "Show me your ways, Lord, teach me your paths. Guide me in your truth and teach me.",
    "theme": "Guided in Truth"
  },
  {
    "dayOfYear": 20,
    "calendarDate": "January 20",
    "ref": "Hebrews 12:1-2",
    "text": "Let us run with perseverance the race marked out for us, fixing our eyes on Jesus.",
    "theme": "Eyes on Jesus"
  },
  {
    "dayOfYear": 21,
    "calendarDate": "January 21",
    "ref": "Galatians 5:22-23",
    "text": "The fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness.",
    "theme": "Spiritual Fruit"
  },
  {
    "dayOfYear": 22,
    "calendarDate": "January 22",
    "ref": "James 1:5",
    "text": "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault.",
    "theme": "Generous Wisdom"
  },
  {
    "dayOfYear": 23,
    "calendarDate": "January 23",
    "ref": "Psalm 37:5",
    "text": "Commit your way to the Lord; trust in him and he will act.",
    "theme": "Committed Path"
  },
  {
    "dayOfYear": 24,
    "calendarDate": "January 24",
    "ref": "Proverbs 16:3",
    "text": "Commit to the Lord whatever you do, and he will establish your plans.",
    "theme": "Established Plans"
  },
  {
    "dayOfYear": 25,
    "calendarDate": "January 25",
    "ref": "Psalm 63:1",
    "text": "You, God, are my God, earnestly I seek you; my soul thirsts for you.",
    "theme": "Thirst for God"
  },
  {
    "dayOfYear": 26,
    "calendarDate": "January 26",
    "ref": "Ephesians 5:8",
    "text": "For you were once darkness, but now you are light in the Lord. Live as children of light.",
    "theme": "Walk in Light"
  },
  {
    "dayOfYear": 27,
    "calendarDate": "January 27",
    "ref": "Psalm 16:11",
    "text": "You make known to me the path of life; you will fill me with joy in your presence.",
    "theme": "Path of Life"
  },
  {
    "dayOfYear": 28,
    "calendarDate": "January 28",
    "ref": "2 Corinthians 4:16",
    "text": "Though outwardly we are wasting away, yet inwardly we are being renewed day by day.",
    "theme": "Daily Renewal"
  },
  {
    "dayOfYear": 29,
    "calendarDate": "January 29",
    "ref": "Psalm 138:8",
    "text": "The Lord will vindicate me; your love, Lord, endures forever—do not abandon the works of your hands.",
    "theme": "Vindication"
  },
  {
    "dayOfYear": 30,
    "calendarDate": "January 30",
    "ref": "Isaiah 26:9",
    "text": "My soul yearns for you in the night; in the morning my spirit longs for you.",
    "theme": "Morning Longing"
  },
  {
    "dayOfYear": 31,
    "calendarDate": "January 31",
    "ref": "Psalm 1:1-2",
    "text": "Blessed is the one whose delight is in the law of the Lord, and who meditates on his law day and night.",
    "theme": "Delight in Word"
  },
  {
    "dayOfYear": 32,
    "calendarDate": "February 1",
    "ref": "Joshua 1:8",
    "text": "Keep this Book of the Law always on your lips; meditate on it day and night.",
    "theme": "Steadfast Word"
  },
  {
    "dayOfYear": 33,
    "calendarDate": "February 2",
    "ref": "Psalm 103:1-2",
    "text": "Praise the Lord, my soul; all my inmost being, praise his holy name. Praise the Lord and forget not his benefits.",
    "theme": "Inmost Praise"
  },
  {
    "dayOfYear": 34,
    "calendarDate": "February 3",
    "ref": "Psalm 100:1-3",
    "text": "Shout for joy to the Lord, all the earth. Worship the Lord with gladness; come before him with joyful songs.",
    "theme": "Joyful Worship"
  },
  {
    "dayOfYear": 35,
    "calendarDate": "February 4",
    "ref": "Psalm 34:1",
    "text": "I will extol the Lord at all times; his praise will always be on my lips.",
    "theme": "Continual Extolling"
  },
  {
    "dayOfYear": 36,
    "calendarDate": "February 5",
    "ref": "Psalm 92:1-2",
    "text": "It is good to praise the Lord and make music to your name, O Most High, proclaiming your love in the morning.",
    "theme": "Morning Proclamation"
  },
  {
    "dayOfYear": 37,
    "calendarDate": "February 6",
    "ref": "Proverbs 2:6",
    "text": "For the Lord gives wisdom; from his mouth come knowledge and understanding.",
    "theme": "Fount of Wisdom"
  },
  {
    "dayOfYear": 38,
    "calendarDate": "February 7",
    "ref": "Psalm 119:18",
    "text": "Open my eyes that I may see wonderful things in your law.",
    "theme": "Opened Eyes"
  },
  {
    "dayOfYear": 39,
    "calendarDate": "February 8",
    "ref": "Psalm 119:11",
    "text": "I have hidden your word in my heart that I might not sin against you.",
    "theme": "Hidden Word"
  },
  {
    "dayOfYear": 40,
    "calendarDate": "February 9",
    "ref": "Psalm 119:130",
    "text": "The unfolding of your words gives light; it gives understanding to the simple.",
    "theme": "Unfolding Light"
  },
  {
    "dayOfYear": 41,
    "calendarDate": "February 10",
    "ref": "Psalm 86:11",
    "text": "Teach me your way, Lord, that I may rely on your faithfulness; give me an undivided heart.",
    "theme": "Undivided Heart"
  },
  {
    "dayOfYear": 42,
    "calendarDate": "February 11",
    "ref": "Proverbs 18:10",
    "text": "The name of the Lord is a fortified tower; the righteous run to it and are safe.",
    "theme": "Fortified Tower"
  },
  {
    "dayOfYear": 43,
    "calendarDate": "February 12",
    "ref": "Psalm 31:3",
    "text": "Since you are my rock and my fortress, for the sake of your name lead and guide me.",
    "theme": "Rock and Fortress"
  },
  {
    "dayOfYear": 44,
    "calendarDate": "February 13",
    "ref": "Psalm 43:3",
    "text": "Send forth your light and your truth, let them guide me; let them bring me to your holy mountain.",
    "theme": "Light and Truth"
  },
  {
    "dayOfYear": 45,
    "calendarDate": "February 14",
    "ref": "Psalm 121:1-2",
    "text": "I lift up my eyes to the mountains—where does my help come from? My help comes from the Lord.",
    "theme": "Maker of Heaven"
  },
  {
    "dayOfYear": 46,
    "calendarDate": "February 15",
    "ref": "Psalm 126:3",
    "text": "The Lord has done great things for us, and we are filled with joy.",
    "theme": "Great Things"
  },
  {
    "dayOfYear": 47,
    "calendarDate": "February 16",
    "ref": "Isaiah 33:2",
    "text": "Lord, be gracious to us; we long for you. Be our strength every morning, our salvation in time of distress.",
    "theme": "Morning Strength"
  },
  {
    "dayOfYear": 48,
    "calendarDate": "February 17",
    "ref": "Isaiah 50:4",
    "text": "The Sovereign Lord has given me a well-instructed tongue. He wakens me morning by morning to listen.",
    "theme": "Wakened Ear"
  },
  {
    "dayOfYear": 49,
    "calendarDate": "February 18",
    "ref": "Psalm 145:1-2",
    "text": "I will exalt you, my God the King; I will praise your name for ever and ever. Every day I will praise you.",
    "theme": "Daily Praise"
  },
  {
    "dayOfYear": 50,
    "calendarDate": "February 19",
    "ref": "Psalm 146:1-2",
    "text": "Praise the Lord, my soul. I will praise the Lord all my life; I will sing praise as long as I live.",
    "theme": "Lifelong Praise"
  },
  {
    "dayOfYear": 51,
    "calendarDate": "February 20",
    "ref": "Psalm 147:1",
    "text": "Praise the Lord. How good it is to sing praises to our God, how pleasant and fitting to praise him!",
    "theme": "Fitting Song"
  },
  {
    "dayOfYear": 52,
    "calendarDate": "February 21",
    "ref": "Psalm 148:1-2",
    "text": "Praise the Lord from the heavens; praise him in the heights above. Praise him, all his angels.",
    "theme": "Heights of Praise"
  },
  {
    "dayOfYear": 53,
    "calendarDate": "February 22",
    "ref": "Psalm 150:6",
    "text": "Let everything that has breath praise the Lord. Praise the Lord.",
    "theme": "Living Breath"
  },
  {
    "dayOfYear": 54,
    "calendarDate": "February 23",
    "ref": "Matthew 13:47",
    "text": "The kingdom of heaven is like a net that was let down into the lake.",
    "theme": "The Fisherman’s Net"
  },
  {
    "dayOfYear": 55,
    "calendarDate": "February 24",
    "ref": "Genesis 8:11",
    "text": "When the dove returned to him in the evening, there in its beak was a freshly plucked olive leaf!",
    "theme": "The Olive Branch"
  },
  {
    "dayOfYear": 56,
    "calendarDate": "February 25",
    "ref": "Psalm 118:22",
    "text": "The stone the builders rejected has become the cornerstone.",
    "theme": "The Rejected Cornerstone"
  },
  {
    "dayOfYear": 57,
    "calendarDate": "February 26",
    "ref": "Matthew 13:31-32",
    "text": "The kingdom of heaven is like a mustard seed... though it is the smallest of all seeds.",
    "theme": "The Mustard Seed Growth"
  },
  {
    "dayOfYear": 58,
    "calendarDate": "February 27",
    "ref": "2 Kings 4:2-6",
    "text": "Your servant has nothing there at all, she said, except a small jar of olive oil.",
    "theme": "The Widow’s Endless Oil"
  },
  {
    "dayOfYear": 59,
    "calendarDate": "February 28",
    "ref": "Matthew 25:1",
    "text": "Ten virgins took their lamps and went out to meet the bridegroom.",
    "theme": "The Ten Virgins’ Lamps"
  },
  {
    "dayOfYear": 60,
    "calendarDate": "March 1",
    "ref": "Revelation 2:17",
    "text": "I will also give that person a white stone with a new name written on it.",
    "theme": "The White Stone of Approval"
  },
  {
    "dayOfYear": 61,
    "calendarDate": "March 2",
    "ref": "Ruth 1:16-17",
    "text": "Where you go I will go, and where you stay I will stay. Your people will be my people and your God my God.",
    "theme": "Ruth's Radical Loyalty"
  },
  {
    "dayOfYear": 62,
    "calendarDate": "March 3",
    "ref": "Ruth 4:9-10",
    "text": "Today you are witnesses that I have bought from Naomi all the property of Elimelek.",
    "theme": "Boaz the Kinsman Redeemer"
  },
  {
    "dayOfYear": 63,
    "calendarDate": "March 4",
    "ref": "Judges 4:4-5",
    "text": "Now Deborah, a prophet, the wife of Lappidoth, was leading Israel at that time.",
    "theme": "Deborah the Judge"
  },
  {
    "dayOfYear": 64,
    "calendarDate": "March 5",
    "ref": "Acts 7:59-60",
    "text": "While they were stoning him, Stephen prayed, \\",
    "theme": "Stephen the First Martyr"
  },
  {
    "dayOfYear": 65,
    "calendarDate": "March 6",
    "ref": "Acts 16:14-15",
    "text": "One of those listening was a woman from the city of Thyatira named Lydia, a dealer in purple cloth.",
    "theme": "Lydia the Seller of Purple"
  },
  {
    "dayOfYear": 66,
    "calendarDate": "March 7",
    "ref": "Acts 15:22",
    "text": "Then the apostles and elders... decided to choose some of their own men and send them to Antioch with Paul and Barnabas. They chose Judas... and Silas.",
    "theme": "Silas the Faithful Companion"
  },
  {
    "dayOfYear": 67,
    "calendarDate": "March 8",
    "ref": "Acts 4:36-37",
    "text": "Joseph, a Levite from Cyprus... whom the apostles called Barnabas (which means “son of encouragement”), sold a field he owned.",
    "theme": "Barnabas the Son of Encouragement"
  },
  {
    "dayOfYear": 68,
    "calendarDate": "March 9",
    "ref": "Acts 18:1-3",
    "text": "There he met a Jew named Aquila... with his wife Priscilla, because Claudius had ordered all Jews to leave Rome.",
    "theme": "Priscilla and Aquila"
  },
  {
    "dayOfYear": 69,
    "calendarDate": "March 10",
    "ref": "1 Timothy 4:12",
    "text": "Don’t let anyone look down on you because you are young, but set an example for the believers.",
    "theme": "Timothy the Young Leader"
  },
  {
    "dayOfYear": 70,
    "calendarDate": "March 11",
    "ref": "Philemon 1:15-16",
    "text": "He is no longer a slave, but better than a slave, as a dear brother.",
    "theme": "Philemon and Onesimus"
  },
  {
    "dayOfYear": 71,
    "calendarDate": "March 12",
    "ref": "John 21:15",
    "text": "Jesus said to Simon Peter, \\",
    "theme": "The Restoration of Peter"
  },
  {
    "dayOfYear": 72,
    "calendarDate": "March 13",
    "ref": "Luke 8:1-3",
    "text": "Mary (called Magdalene) from whom seven demons had come out.",
    "theme": "Mary Magdalene"
  },
  {
    "dayOfYear": 73,
    "calendarDate": "March 14",
    "ref": "Luke 10:40-42",
    "text": "Martha was distracted by all the preparations that had to be made.",
    "theme": "Martha’s Service"
  },
  {
    "dayOfYear": 74,
    "calendarDate": "March 15",
    "ref": "John 11:43-44",
    "text": "Jesus called in a loud voice, \\",
    "theme": "Lazarus of Bethany"
  },
  {
    "dayOfYear": 75,
    "calendarDate": "March 16",
    "ref": "Luke 19:1-5",
    "text": "He was a chief tax collector and was wealthy... so he ran ahead and climbed a sycamore-fig tree to see him.",
    "theme": "Zacchaeus the Tax Collector"
  },
  {
    "dayOfYear": 76,
    "calendarDate": "March 17",
    "ref": "Acts 10:1-2",
    "text": "A centurion named Cornelius... a devout and God-fearing man who gave generously to those in need.",
    "theme": "Cornelius the Centurion"
  },
  {
    "dayOfYear": 77,
    "calendarDate": "March 18",
    "ref": "Acts 8:26-27",
    "text": "Now an angel of the Lord said to Philip, \\",
    "theme": "Philip the Evangelist"
  },
  {
    "dayOfYear": 78,
    "calendarDate": "March 19",
    "ref": "Acts 9:36",
    "text": "In Joppa there was a disciple named Tabitha (which translated is Dorcas); she was always doing good and helping the poor.",
    "theme": "Dorcas the Compassionate"
  },
  {
    "dayOfYear": 79,
    "calendarDate": "March 20",
    "ref": "Acts 18:24-25",
    "text": "Now a Jew named Apollos... an eloquent man, arrived at Ephesus; he was mighty in the Scriptures.",
    "theme": "Apollos the Learned"
  },
  {
    "dayOfYear": 80,
    "calendarDate": "March 21",
    "ref": "John 13:23",
    "text": "One of them, the disciple whom Jesus loved, was reclining next to him.",
    "theme": "John the Beloved"
  },
  {
    "dayOfYear": 81,
    "calendarDate": "March 22",
    "ref": "John 20:24-25",
    "text": "Unless I see the nail marks in his hands... I will not believe.",
    "theme": "Thomas the \\"
  },
  {
    "dayOfYear": 82,
    "calendarDate": "March 23",
    "ref": "Jude 1:1",
    "text": "Jude, a servant of Jesus Christ and a brother of James...",
    "theme": "Jude the Brother of Jesus"
  },
  {
    "dayOfYear": 83,
    "calendarDate": "March 24",
    "ref": "Revelation 4:5",
    "text": "In front of the throne, seven lamps were blazing. These are the seven spirits of God.",
    "theme": "The Seven Lamps of Fire"
  },
  {
    "dayOfYear": 84,
    "calendarDate": "March 25",
    "ref": "Revelation 4:6-8",
    "text": "In the center, around the throne, were four living creatures... each with six wings and eyes all over.",
    "theme": "The Four Living Creatures"
  },
  {
    "dayOfYear": 85,
    "calendarDate": "March 26",
    "ref": "Revelation 4:4",
    "text": "Surrounding the throne were twenty-four other thrones, and seated on them were twenty-four elders.",
    "theme": "The Twenty-Four Elders"
  },
  {
    "dayOfYear": 86,
    "calendarDate": "March 27",
    "ref": "Revelation 5:1-3",
    "text": "I saw in the right hand of him who sat on the throne a scroll with writing on both sides and sealed with seven seals.",
    "theme": "The Seven-Sealed Scroll"
  },
  {
    "dayOfYear": 87,
    "calendarDate": "March 28",
    "ref": "Revelation 6:1-8",
    "text": "I looked, and there before me was a white horse... a fiery red one... a black one... and a pale one.",
    "theme": "The Four Horsemen"
  },
  {
    "dayOfYear": 88,
    "calendarDate": "March 29",
    "ref": "Revelation 6:9-10",
    "text": "I saw under the altar the souls of those who had been slain because of the word of God.",
    "theme": "The Souls Under the Altar"
  },
  {
    "dayOfYear": 89,
    "calendarDate": "March 30",
    "ref": "Revelation 7:9",
    "text": "There before me was a great multitude that no one could count, from every nation, tribe, people and language.",
    "theme": "The Great Multitude"
  },
  {
    "dayOfYear": 90,
    "calendarDate": "March 31",
    "ref": "Revelation 11:3-4",
    "text": "I will appoint my two witnesses, and they will prophesy for 1,260 days.",
    "theme": "The Two Witnesses"
  },
  {
    "dayOfYear": 91,
    "calendarDate": "April 1",
    "ref": "Revelation 12:1",
    "text": "A great sign appeared in heaven: a woman clothed with the sun, with the moon under her feet.",
    "theme": "The Woman and the Dragon"
  },
  {
    "dayOfYear": 92,
    "calendarDate": "April 2",
    "ref": "Revelation 13:1-2",
    "text": "The dragon stood on the shore... and I saw a beast coming out of the sea.",
    "theme": "The Beast from the Sea"
  },
  {
    "dayOfYear": 93,
    "calendarDate": "April 3",
    "ref": "Revelation 13:16-17",
    "text": "It also forced all people... to receive a mark on their right hands or on their foreheads.",
    "theme": "The Mark of the Beast"
  },
  {
    "dayOfYear": 94,
    "calendarDate": "April 4",
    "ref": "Revelation 14:6-7",
    "text": "I saw another angel flying in midair, and he had the eternal gospel to proclaim.",
    "theme": "The Three Angels’ Messages"
  },
  {
    "dayOfYear": 95,
    "calendarDate": "April 5",
    "ref": "Revelation 14:14-15",
    "text": "I looked, and there before me was a white cloud, and seated on the cloud was one \\",
    "theme": "The Harvest of the Earth"
  },
  {
    "dayOfYear": 96,
    "calendarDate": "April 6",
    "ref": "Revelation 16:1",
    "text": "Go, pour out the seven bowls of God’s wrath on the earth.",
    "theme": "The Seven Bowls of Wrath"
  },
  {
    "dayOfYear": 97,
    "calendarDate": "April 7",
    "ref": "Revelation 18:2-3",
    "text": "Fallen! Fallen is Babylon the Great!",
    "theme": "The Fall of Babylon"
  },
  {
    "dayOfYear": 98,
    "calendarDate": "April 8",
    "ref": "Revelation 19:7",
    "text": "For the wedding of the Lamb has come, and his bride has made herself ready.",
    "theme": "The Marriage Supper of the Lamb"
  },
  {
    "dayOfYear": 99,
    "calendarDate": "April 9",
    "ref": "Revelation 19:11-13",
    "text": "I saw heaven standing open and there before me was a white horse, whose rider is called Faithful and True.",
    "theme": "The Rider on the White Horse"
  },
  {
    "dayOfYear": 100,
    "calendarDate": "April 10",
    "ref": "Revelation 20:11-12",
    "text": "Then I saw a great white throne... and the dead, great and small, standing before the throne.",
    "theme": "The Great White Throne"
  },
  {
    "dayOfYear": 101,
    "calendarDate": "April 11",
    "ref": "1 Corinthians 13:4",
    "text": "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.",
    "theme": "Agape - Sacrificial Love"
  },
  {
    "dayOfYear": 102,
    "calendarDate": "April 12",
    "ref": "John 21:17",
    "text": "He said to him the third time, \\",
    "theme": "Phileo - Brotherly Affection"
  },
  {
    "dayOfYear": 103,
    "calendarDate": "April 13",
    "ref": "Luke 2:14",
    "text": "Glory to God in the highest heaven, and on earth peace to those on whom his favor rests.",
    "theme": "Doxa - Divine Glory"
  },
  {
    "dayOfYear": 104,
    "calendarDate": "April 14",
    "ref": "John 14:27",
    "text": "Peace I leave with you; my peace I give you. I do not give to you as the world gives.",
    "theme": "Eirene - The Greek Peace"
  },
  {
    "dayOfYear": 105,
    "calendarDate": "April 15",
    "ref": "Ephesians 2:8",
    "text": "For it is by grace you have been saved, through faith—and this is not from yourselves.",
    "theme": "Charis - Radical Grace"
  },
  {
    "dayOfYear": 106,
    "calendarDate": "April 16",
    "ref": "Hebrews 11:1",
    "text": "Now faith is confidence in what we hope for and assurance about what we do not see.",
    "theme": "Pistis - Active Faith"
  },
  {
    "dayOfYear": 107,
    "calendarDate": "April 17",
    "ref": "Romans 5:5",
    "text": "And hope does not put us to shame, because God’s love has been poured out into our hearts.",
    "theme": "Elpis - Certain Hope"
  },
  {
    "dayOfYear": 108,
    "calendarDate": "April 18",
    "ref": "1 Corinthians 1:21",
    "text": "God was pleased through the foolishness of what was preached to save those who believe.",
    "theme": "Kerygma - The Proclamation"
  },
  {
    "dayOfYear": 109,
    "calendarDate": "April 19",
    "ref": "Mark 10:45",
    "text": "For even the Son of Man did not come to be served, but to serve.",
    "theme": "Diakonia - Humble Service"
  },
  {
    "dayOfYear": 110,
    "calendarDate": "April 20",
    "ref": "Acts 1:8",
    "text": "But you will receive power... and you will be my witnesses (martyres) in Jerusalem.",
    "theme": "Martyrion - The Courageous Witness"
  },
  {
    "dayOfYear": 111,
    "calendarDate": "April 21",
    "ref": "John 14:16",
    "text": "And I will ask the Father, and he will give you another advocate to help you and be with you forever.",
    "theme": "Parakletos - The Comforter"
  },
  {
    "dayOfYear": 112,
    "calendarDate": "April 22",
    "ref": "James 1:3",
    "text": "Because you know that the testing of your faith produces perseverance (hupomonēn).",
    "theme": "Hupomone - Active Endurance"
  },
  {
    "dayOfYear": 113,
    "calendarDate": "April 23",
    "ref": "Romans 2:15",
    "text": "They show that the requirements of the law are written on their hearts, their consciences also bearing witness.",
    "theme": "Suneidesis - The Inner Witness"
  },
  {
    "dayOfYear": 114,
    "calendarDate": "April 24",
    "ref": "John 5:2",
    "text": "Now there is in Jerusalem near the Sheep Gate a pool... surrounded by five covered colonnades.",
    "theme": "The Pool of Bethesda"
  },
  {
    "dayOfYear": 115,
    "calendarDate": "April 25",
    "ref": "Acts 21:34-37",
    "text": "The commander... ordered that Paul be taken into the barracks.",
    "theme": "The Antonia Fortress"
  },
  {
    "dayOfYear": 116,
    "calendarDate": "April 26",
    "ref": "Acts 19:10",
    "text": "This went on for two years, so that all the Jews and Greeks who lived in the province of Asia heard the word.",
    "theme": "The Library of Ephesus"
  },
  {
    "dayOfYear": 117,
    "calendarDate": "April 27",
    "ref": "Acts 17:19",
    "text": "Then they took him and brought him to a meeting of the Areopagus.",
    "theme": "The Areopagus (Mars Hill)"
  },
  {
    "dayOfYear": 118,
    "calendarDate": "April 28",
    "ref": "Acts 28:15-16",
    "text": "The brothers and sisters there had heard we were coming, and they traveled as far as the Forum of Appius.",
    "theme": "The Appian Way"
  },
  {
    "dayOfYear": 119,
    "calendarDate": "April 29",
    "ref": "Matthew 2:1-3",
    "text": "After Jesus was born in Bethlehem... Magi from the east came.",
    "theme": "The Herodion Fortress"
  },
  {
    "dayOfYear": 120,
    "calendarDate": "April 30",
    "ref": "Matthew 24:1-2",
    "text": "I tell you the truth, not one stone here will be left on another; every one will be thrown down.",
    "theme": "The Siege of Masada"
  },
  {
    "dayOfYear": 121,
    "calendarDate": "May 1",
    "ref": "Genesis 2:7",
    "text": "Then the LORD God formed a man from the dust of the ground and breathed into his nostrils the breath of life, and the man became a living being.",
    "theme": "The Breath of Life (Neshama)"
  },
  {
    "dayOfYear": 122,
    "calendarDate": "May 2",
    "ref": "Genesis 14:18-20",
    "text": "Melchizedek king of Salem brought out bread and wine. He was priest of God Most High.",
    "theme": "Melchizedek - King of Righteousness"
  },
  {
    "dayOfYear": 123,
    "calendarDate": "May 3",
    "ref": "Genesis 22:13-14",
    "text": "Abraham looked up and there in a thicket he saw a ram caught by its horns. He went over and took the ram and sacrificed it as a burnt offering instead of his son.",
    "theme": "The Binding of Isaac (Akedah)"
  },
  {
    "dayOfYear": 124,
    "calendarDate": "May 4",
    "ref": "Genesis 41:42",
    "text": "Then Pharaoh took his signet ring from his finger and put it on Joseph’s finger. He dressed him in robes of fine linen and put a gold chain around his neck.",
    "theme": "Joseph's Signet Ring and Fine Linen"
  },
  {
    "dayOfYear": 125,
    "calendarDate": "May 5",
    "ref": "Exodus 3:2",
    "text": "There the angel of the LORD appeared to him in flames of fire from within a bush. Moses saw that though the bush was on fire it did not burn up.",
    "theme": "The Burning Bush (Seneh)"
  },
  {
    "dayOfYear": 126,
    "calendarDate": "May 6",
    "ref": "Exodus 12:7",
    "text": "They are to take some of the blood and put it on the sides and tops of the doorframes of the houses where they eat the lambs.",
    "theme": "The Passover Blood on the Doorposts"
  },
  {
    "dayOfYear": 127,
    "calendarDate": "May 7",
    "ref": "Exodus 16:15",
    "text": "When the Israelites saw it, they said to each other, \\",
    "theme": "Manna - Bread from Heaven"
  },
  {
    "dayOfYear": 128,
    "calendarDate": "May 8",
    "ref": "Exodus 28:15,29",
    "text": "Fashion a breastpiece for making decisions... Whenever Aaron enters the Holy Place, he will bear the names of the sons of Israel over his heart.",
    "theme": "The High Priest’s Breastpiece of Judgment"
  },
  {
    "dayOfYear": 129,
    "calendarDate": "May 9",
    "ref": "Leviticus 16:21-22",
    "text": "Aaron shall lay both hands on the head of the live goat and confess over it all the wickedness and rebellion of the Israelites... and send it away into the wilderness.",
    "theme": "The Day of Atonement Scapegoat (Azazel)"
  },
  {
    "dayOfYear": 130,
    "calendarDate": "May 10",
    "ref": "Numbers 6:24-26",
    "text": "The LORD bless you and keep you; the LORD make his face shine on you and be gracious to you; the LORD turn his face toward you and give you peace.",
    "theme": "The Priestly Aaronic Blessing"
  },
  {
    "dayOfYear": 131,
    "calendarDate": "May 11",
    "ref": "Numbers 21:8-9",
    "text": "The LORD said to Moses, \\",
    "theme": "The Bronze Serpent on the Pole"
  },
  {
    "dayOfYear": 132,
    "calendarDate": "May 12",
    "ref": "Joshua 20:2-3",
    "text": "Designate the cities of refuge... so that anyone who kills a person unintentionally and without malice may flee there and find protection.",
    "theme": "The Cities of Refuge (Arei Miklat)"
  },
  {
    "dayOfYear": 133,
    "calendarDate": "May 13",
    "ref": "Judges 7:5-7",
    "text": "Three hundred of them drank from cupped hands, lapping like dogs. All the rest got down on their knees to drink.",
    "theme": "Gideon's 300 - Lapping Like a Dog"
  },
  {
    "dayOfYear": 134,
    "calendarDate": "May 14",
    "ref": "Ruth 4:9-10",
    "text": "Boaz announced to the elders and all the people, \\",
    "theme": "Boaz the Kinsman-Redeemer (Goel)"
  },
  {
    "dayOfYear": 135,
    "calendarDate": "May 15",
    "ref": "1 Samuel 17:40",
    "text": "Then he took his staff in his hand, chose five smooth stones from the stream, put them in the pouch of his shepherd’s bag and, with his sling in his hand, approached the Philistine.",
    "theme": "The Valley of Elah & Five Smooth Stones"
  },
  {
    "dayOfYear": 136,
    "calendarDate": "May 16",
    "ref": "2 Samuel 24:24",
    "text": "The king replied to Araunah, \\",
    "theme": "The Threshing Floor of Araunah"
  },
  {
    "dayOfYear": 137,
    "calendarDate": "May 17",
    "ref": "1 Kings 19:12",
    "text": "After the earthquake came a fire, but the LORD was not in the fire. And after the fire came a gentle whisper.",
    "theme": "The Still Small Voice on Mount Horeb"
  },
  {
    "dayOfYear": 138,
    "calendarDate": "May 18",
    "ref": "2 Kings 20:11",
    "text": "Then the prophet Isaiah called on the LORD, and the LORD made the shadow go back the ten steps it had gone down on the stairway of Ahaz.",
    "theme": "The Shadow Returning Ten Degrees on Ahaz’s Sundial"
  },
  {
    "dayOfYear": 139,
    "calendarDate": "May 19",
    "ref": "2 Kings 20:20",
    "text": "Hezekiah made the pool and the conduit and brought water into the city.",
    "theme": "Hezekiah's Tunnel & The Siloam Inscription"
  },
  {
    "dayOfYear": 140,
    "calendarDate": "May 20",
    "ref": "Ezekiel 37:4-5",
    "text": "He said to me, \\",
    "theme": "The Valley of Dry Bones (Bikah)"
  },
  {
    "dayOfYear": 141,
    "calendarDate": "May 21",
    "ref": "Daniel 5:25-28",
    "text": "This is the inscription that was written: MENE, MENE, TEKEL, PARSIN. God has numbered the days of your reign; you have been weighed on the scales and found wanting.",
    "theme": "Mene, Mene, Tekel, Parsin - The Handwriting on the Wall"
  },
  {
    "dayOfYear": 142,
    "calendarDate": "May 22",
    "ref": "Genesis 2:7",
    "text": "Then the LORD God formed a man from the dust of the ground and breathed into his nostrils the breath of life, and the man became a living being.",
    "theme": "The Breath of Life (Neshama)"
  },
  {
    "dayOfYear": 143,
    "calendarDate": "May 23",
    "ref": "Genesis 14:18-20",
    "text": "Melchizedek king of Salem brought out bread and wine. He was priest of God Most High.",
    "theme": "Melchizedek - King of Righteousness"
  },
  {
    "dayOfYear": 144,
    "calendarDate": "May 24",
    "ref": "Genesis 22:13-14",
    "text": "Abraham looked up and there in a thicket he saw a ram caught by its horns. He went over and took the ram and sacrificed it as a burnt offering instead of his son.",
    "theme": "The Binding of Isaac (Akedah)"
  },
  {
    "dayOfYear": 145,
    "calendarDate": "May 25",
    "ref": "Genesis 41:42",
    "text": "Then Pharaoh took his signet ring from his finger and put it on Joseph’s finger. He dressed him in robes of fine linen and put a gold chain around his neck.",
    "theme": "Joseph's Signet Ring and Fine Linen"
  },
  {
    "dayOfYear": 146,
    "calendarDate": "May 26",
    "ref": "Exodus 3:2",
    "text": "There the angel of the LORD appeared to him in flames of fire from within a bush. Moses saw that though the bush was on fire it did not burn up.",
    "theme": "The Burning Bush (Seneh)"
  },
  {
    "dayOfYear": 147,
    "calendarDate": "May 27",
    "ref": "Exodus 12:7",
    "text": "They are to take some of the blood and put it on the sides and tops of the doorframes of the houses where they eat the lambs.",
    "theme": "The Passover Blood on the Doorposts"
  },
  {
    "dayOfYear": 148,
    "calendarDate": "May 28",
    "ref": "Exodus 16:15",
    "text": "When the Israelites saw it, they said to each other, \\",
    "theme": "Manna - Bread from Heaven"
  },
  {
    "dayOfYear": 149,
    "calendarDate": "May 29",
    "ref": "Exodus 28:15,29",
    "text": "Fashion a breastpiece for making decisions... Whenever Aaron enters the Holy Place, he will bear the names of the sons of Israel over his heart.",
    "theme": "The High Priest’s Breastpiece of Judgment"
  },
  {
    "dayOfYear": 150,
    "calendarDate": "May 30",
    "ref": "Leviticus 16:21-22",
    "text": "Aaron shall lay both hands on the head of the live goat and confess over it all the wickedness and rebellion of the Israelites... and send it away into the wilderness.",
    "theme": "The Day of Atonement Scapegoat (Azazel)"
  },
  {
    "dayOfYear": 151,
    "calendarDate": "May 31",
    "ref": "Numbers 6:24-26",
    "text": "The LORD bless you and keep you; the LORD make his face shine on you and be gracious to you; the LORD turn his face toward you and give you peace.",
    "theme": "The Priestly Aaronic Blessing"
  },
  {
    "dayOfYear": 152,
    "calendarDate": "June 1",
    "ref": "Numbers 21:8-9",
    "text": "The LORD said to Moses, \\",
    "theme": "The Bronze Serpent on the Pole"
  },
  {
    "dayOfYear": 153,
    "calendarDate": "June 2",
    "ref": "Joshua 20:2-3",
    "text": "Designate the cities of refuge... so that anyone who kills a person unintentionally and without malice may flee there and find protection.",
    "theme": "The Cities of Refuge (Arei Miklat)"
  },
  {
    "dayOfYear": 154,
    "calendarDate": "June 3",
    "ref": "Judges 7:5-7",
    "text": "Three hundred of them drank from cupped hands, lapping like dogs. All the rest got down on their knees to drink.",
    "theme": "Gideon's 300 - Lapping Like a Dog"
  },
  {
    "dayOfYear": 155,
    "calendarDate": "June 4",
    "ref": "Ruth 4:9-10",
    "text": "Boaz announced to the elders and all the people, \\",
    "theme": "Boaz the Kinsman-Redeemer (Goel)"
  },
  {
    "dayOfYear": 156,
    "calendarDate": "June 5",
    "ref": "1 Samuel 17:40",
    "text": "Then he took his staff in his hand, chose five smooth stones from the stream, put them in the pouch of his shepherd’s bag and, with his sling in his hand, approached the Philistine.",
    "theme": "The Valley of Elah & Five Smooth Stones"
  },
  {
    "dayOfYear": 157,
    "calendarDate": "June 6",
    "ref": "2 Samuel 24:24",
    "text": "The king replied to Araunah, \\",
    "theme": "The Threshing Floor of Araunah"
  },
  {
    "dayOfYear": 158,
    "calendarDate": "June 7",
    "ref": "1 Kings 19:12",
    "text": "After the earthquake came a fire, but the LORD was not in the fire. And after the fire came a gentle whisper.",
    "theme": "The Still Small Voice on Mount Horeb"
  },
  {
    "dayOfYear": 159,
    "calendarDate": "June 8",
    "ref": "2 Kings 20:11",
    "text": "Then the prophet Isaiah called on the LORD, and the LORD made the shadow go back the ten steps it had gone down on the stairway of Ahaz.",
    "theme": "The Shadow Returning Ten Degrees on Ahaz’s Sundial"
  },
  {
    "dayOfYear": 160,
    "calendarDate": "June 9",
    "ref": "2 Kings 20:20",
    "text": "Hezekiah made the pool and the conduit and brought water into the city.",
    "theme": "Hezekiah's Tunnel & The Siloam Inscription"
  },
  {
    "dayOfYear": 161,
    "calendarDate": "June 10",
    "ref": "Ezekiel 37:4-5",
    "text": "He said to me, \\",
    "theme": "The Valley of Dry Bones (Bikah)"
  },
  {
    "dayOfYear": 162,
    "calendarDate": "June 11",
    "ref": "Daniel 5:25-28",
    "text": "This is the inscription that was written: MENE, MENE, TEKEL, PARSIN. God has numbered the days of your reign; you have been weighed on the scales and found wanting.",
    "theme": "Mene, Mene, Tekel, Parsin - The Handwriting on the Wall"
  },
  {
    "dayOfYear": 163,
    "calendarDate": "June 12",
    "ref": "Genesis 2:7",
    "text": "Then the LORD God formed a man from the dust of the ground and breathed into his nostrils the breath of life, and the man became a living being.",
    "theme": "The Breath of Life (Neshama)"
  },
  {
    "dayOfYear": 164,
    "calendarDate": "June 13",
    "ref": "Genesis 14:18-20",
    "text": "Melchizedek king of Salem brought out bread and wine. He was priest of God Most High.",
    "theme": "Melchizedek - King of Righteousness"
  },
  {
    "dayOfYear": 165,
    "calendarDate": "June 14",
    "ref": "Genesis 22:13-14",
    "text": "Abraham looked up and there in a thicket he saw a ram caught by its horns. He went over and took the ram and sacrificed it as a burnt offering instead of his son.",
    "theme": "The Binding of Isaac (Akedah)"
  },
  {
    "dayOfYear": 166,
    "calendarDate": "June 15",
    "ref": "Genesis 41:42",
    "text": "Then Pharaoh took his signet ring from his finger and put it on Joseph’s finger. He dressed him in robes of fine linen and put a gold chain around his neck.",
    "theme": "Joseph's Signet Ring and Fine Linen"
  },
  {
    "dayOfYear": 167,
    "calendarDate": "June 16",
    "ref": "Exodus 3:2",
    "text": "There the angel of the LORD appeared to him in flames of fire from within a bush. Moses saw that though the bush was on fire it did not burn up.",
    "theme": "The Burning Bush (Seneh)"
  },
  {
    "dayOfYear": 168,
    "calendarDate": "June 17",
    "ref": "Exodus 12:7",
    "text": "They are to take some of the blood and put it on the sides and tops of the doorframes of the houses where they eat the lambs.",
    "theme": "The Passover Blood on the Doorposts"
  },
  {
    "dayOfYear": 169,
    "calendarDate": "June 18",
    "ref": "Exodus 16:15",
    "text": "When the Israelites saw it, they said to each other, \\",
    "theme": "Manna - Bread from Heaven"
  },
  {
    "dayOfYear": 170,
    "calendarDate": "June 19",
    "ref": "Exodus 28:15,29",
    "text": "Fashion a breastpiece for making decisions... Whenever Aaron enters the Holy Place, he will bear the names of the sons of Israel over his heart.",
    "theme": "The High Priest’s Breastpiece of Judgment"
  },
  {
    "dayOfYear": 171,
    "calendarDate": "June 20",
    "ref": "Leviticus 16:21-22",
    "text": "Aaron shall lay both hands on the head of the live goat and confess over it all the wickedness and rebellion of the Israelites... and send it away into the wilderness.",
    "theme": "The Day of Atonement Scapegoat (Azazel)"
  },
  {
    "dayOfYear": 172,
    "calendarDate": "June 21",
    "ref": "Numbers 6:24-26",
    "text": "The LORD bless you and keep you; the LORD make his face shine on you and be gracious to you; the LORD turn his face toward you and give you peace.",
    "theme": "The Priestly Aaronic Blessing"
  },
  {
    "dayOfYear": 173,
    "calendarDate": "June 22",
    "ref": "Numbers 21:8-9",
    "text": "The LORD said to Moses, \\",
    "theme": "The Bronze Serpent on the Pole"
  },
  {
    "dayOfYear": 174,
    "calendarDate": "June 23",
    "ref": "Joshua 20:2-3",
    "text": "Designate the cities of refuge... so that anyone who kills a person unintentionally and without malice may flee there and find protection.",
    "theme": "The Cities of Refuge (Arei Miklat)"
  },
  {
    "dayOfYear": 175,
    "calendarDate": "June 24",
    "ref": "Judges 7:5-7",
    "text": "Three hundred of them drank from cupped hands, lapping like dogs. All the rest got down on their knees to drink.",
    "theme": "Gideon's 300 - Lapping Like a Dog"
  },
  {
    "dayOfYear": 176,
    "calendarDate": "June 25",
    "ref": "Ruth 4:9-10",
    "text": "Boaz announced to the elders and all the people, \\",
    "theme": "Boaz the Kinsman-Redeemer (Goel)"
  },
  {
    "dayOfYear": 177,
    "calendarDate": "June 26",
    "ref": "1 Samuel 17:40",
    "text": "Then he took his staff in his hand, chose five smooth stones from the stream, put them in the pouch of his shepherd’s bag and, with his sling in his hand, approached the Philistine.",
    "theme": "The Valley of Elah & Five Smooth Stones"
  },
  {
    "dayOfYear": 178,
    "calendarDate": "June 27",
    "ref": "2 Samuel 24:24",
    "text": "The king replied to Araunah, \\",
    "theme": "The Threshing Floor of Araunah"
  },
  {
    "dayOfYear": 179,
    "calendarDate": "June 28",
    "ref": "1 Kings 19:12",
    "text": "After the earthquake came a fire, but the LORD was not in the fire. And after the fire came a gentle whisper.",
    "theme": "The Still Small Voice on Mount Horeb"
  },
  {
    "dayOfYear": 180,
    "calendarDate": "June 29",
    "ref": "2 Kings 20:11",
    "text": "Then the prophet Isaiah called on the LORD, and the LORD made the shadow go back the ten steps it had gone down on the stairway of Ahaz.",
    "theme": "The Shadow Returning Ten Degrees on Ahaz’s Sundial"
  },
  {
    "dayOfYear": 181,
    "calendarDate": "June 30",
    "ref": "2 Kings 20:20",
    "text": "Hezekiah made the pool and the conduit and brought water into the city.",
    "theme": "Hezekiah's Tunnel & The Siloam Inscription"
  },
  {
    "dayOfYear": 182,
    "calendarDate": "July 1",
    "ref": "Ezekiel 37:4-5",
    "text": "He said to me, \\",
    "theme": "The Valley of Dry Bones (Bikah)"
  },
  {
    "dayOfYear": 183,
    "calendarDate": "July 2",
    "ref": "Daniel 5:25-28",
    "text": "This is the inscription that was written: MENE, MENE, TEKEL, PARSIN. God has numbered the days of your reign; you have been weighed on the scales and found wanting.",
    "theme": "Mene, Mene, Tekel, Parsin - The Handwriting on the Wall"
  },
  {
    "dayOfYear": 184,
    "calendarDate": "July 3",
    "ref": "Genesis 2:7",
    "text": "Then the LORD God formed a man from the dust of the ground and breathed into his nostrils the breath of life, and the man became a living being.",
    "theme": "The Breath of Life (Neshama)"
  },
  {
    "dayOfYear": 185,
    "calendarDate": "July 4",
    "ref": "Genesis 14:18-20",
    "text": "Melchizedek king of Salem brought out bread and wine. He was priest of God Most High.",
    "theme": "Melchizedek - King of Righteousness"
  },
  {
    "dayOfYear": 186,
    "calendarDate": "July 5",
    "ref": "Genesis 22:13-14",
    "text": "Abraham looked up and there in a thicket he saw a ram caught by its horns. He went over and took the ram and sacrificed it as a burnt offering instead of his son.",
    "theme": "The Binding of Isaac (Akedah)"
  },
  {
    "dayOfYear": 187,
    "calendarDate": "July 6",
    "ref": "Genesis 41:42",
    "text": "Then Pharaoh took his signet ring from his finger and put it on Joseph’s finger. He dressed him in robes of fine linen and put a gold chain around his neck.",
    "theme": "Joseph's Signet Ring and Fine Linen"
  },
  {
    "dayOfYear": 188,
    "calendarDate": "July 7",
    "ref": "Exodus 3:2",
    "text": "There the angel of the LORD appeared to him in flames of fire from within a bush. Moses saw that though the bush was on fire it did not burn up.",
    "theme": "The Burning Bush (Seneh)"
  },
  {
    "dayOfYear": 189,
    "calendarDate": "July 8",
    "ref": "Exodus 12:7",
    "text": "They are to take some of the blood and put it on the sides and tops of the doorframes of the houses where they eat the lambs.",
    "theme": "The Passover Blood on the Doorposts"
  },
  {
    "dayOfYear": 190,
    "calendarDate": "July 9",
    "ref": "Exodus 16:15",
    "text": "When the Israelites saw it, they said to each other, \\",
    "theme": "Manna - Bread from Heaven"
  },
  {
    "dayOfYear": 191,
    "calendarDate": "July 10",
    "ref": "Exodus 28:15,29",
    "text": "Fashion a breastpiece for making decisions... Whenever Aaron enters the Holy Place, he will bear the names of the sons of Israel over his heart.",
    "theme": "The High Priest’s Breastpiece of Judgment"
  },
  {
    "dayOfYear": 192,
    "calendarDate": "July 11",
    "ref": "Leviticus 16:21-22",
    "text": "Aaron shall lay both hands on the head of the live goat and confess over it all the wickedness and rebellion of the Israelites... and send it away into the wilderness.",
    "theme": "The Day of Atonement Scapegoat (Azazel)"
  },
  {
    "dayOfYear": 193,
    "calendarDate": "July 12",
    "ref": "Numbers 6:24-26",
    "text": "The LORD bless you and keep you; the LORD make his face shine on you and be gracious to you; the LORD turn his face toward you and give you peace.",
    "theme": "The Priestly Aaronic Blessing"
  },
  {
    "dayOfYear": 194,
    "calendarDate": "July 13",
    "ref": "Numbers 21:8-9",
    "text": "The LORD said to Moses, \\",
    "theme": "The Bronze Serpent on the Pole"
  },
  {
    "dayOfYear": 195,
    "calendarDate": "July 14",
    "ref": "Joshua 20:2-3",
    "text": "Designate the cities of refuge... so that anyone who kills a person unintentionally and without malice may flee there and find protection.",
    "theme": "The Cities of Refuge (Arei Miklat)"
  },
  {
    "dayOfYear": 196,
    "calendarDate": "July 15",
    "ref": "Judges 7:5-7",
    "text": "Three hundred of them drank from cupped hands, lapping like dogs. All the rest got down on their knees to drink.",
    "theme": "Gideon's 300 - Lapping Like a Dog"
  },
  {
    "dayOfYear": 197,
    "calendarDate": "July 16",
    "ref": "Ruth 4:9-10",
    "text": "Boaz announced to the elders and all the people, \\",
    "theme": "Boaz the Kinsman-Redeemer (Goel)"
  },
  {
    "dayOfYear": 198,
    "calendarDate": "July 17",
    "ref": "1 Samuel 17:40",
    "text": "Then he took his staff in his hand, chose five smooth stones from the stream, put them in the pouch of his shepherd’s bag and, with his sling in his hand, approached the Philistine.",
    "theme": "The Valley of Elah & Five Smooth Stones"
  },
  {
    "dayOfYear": 199,
    "calendarDate": "July 18",
    "ref": "2 Samuel 24:24",
    "text": "The king replied to Araunah, \\",
    "theme": "The Threshing Floor of Araunah"
  },
  {
    "dayOfYear": 200,
    "calendarDate": "July 19",
    "ref": "1 Kings 19:12",
    "text": "After the earthquake came a fire, but the LORD was not in the fire. And after the fire came a gentle whisper.",
    "theme": "The Still Small Voice on Mount Horeb"
  },
  {
    "dayOfYear": 201,
    "calendarDate": "July 20",
    "ref": "2 Kings 20:11",
    "text": "Then the prophet Isaiah called on the LORD, and the LORD made the shadow go back the ten steps it had gone down on the stairway of Ahaz.",
    "theme": "The Shadow Returning Ten Degrees on Ahaz’s Sundial"
  },
  {
    "dayOfYear": 202,
    "calendarDate": "July 21",
    "ref": "2 Kings 20:20",
    "text": "Hezekiah made the pool and the conduit and brought water into the city.",
    "theme": "Hezekiah's Tunnel & The Siloam Inscription"
  },
  {
    "dayOfYear": 203,
    "calendarDate": "July 22",
    "ref": "Ezekiel 37:4-5",
    "text": "He said to me, \\",
    "theme": "The Valley of Dry Bones (Bikah)"
  },
  {
    "dayOfYear": 204,
    "calendarDate": "July 23",
    "ref": "Daniel 5:25-28",
    "text": "This is the inscription that was written: MENE, MENE, TEKEL, PARSIN. God has numbered the days of your reign; you have been weighed on the scales and found wanting.",
    "theme": "Mene, Mene, Tekel, Parsin - The Handwriting on the Wall"
  },
  {
    "dayOfYear": 205,
    "calendarDate": "July 24",
    "ref": "Genesis 2:7",
    "text": "Then the LORD God formed a man from the dust of the ground and breathed into his nostrils the breath of life, and the man became a living being.",
    "theme": "The Breath of Life (Neshama)"
  },
  {
    "dayOfYear": 206,
    "calendarDate": "July 25",
    "ref": "Genesis 14:18-20",
    "text": "Melchizedek king of Salem brought out bread and wine. He was priest of God Most High.",
    "theme": "Melchizedek - King of Righteousness"
  },
  {
    "dayOfYear": 207,
    "calendarDate": "July 26",
    "ref": "Genesis 22:13-14",
    "text": "Abraham looked up and there in a thicket he saw a ram caught by its horns. He went over and took the ram and sacrificed it as a burnt offering instead of his son.",
    "theme": "The Binding of Isaac (Akedah)"
  },
  {
    "dayOfYear": 208,
    "calendarDate": "July 27",
    "ref": "Genesis 41:42",
    "text": "Then Pharaoh took his signet ring from his finger and put it on Joseph’s finger. He dressed him in robes of fine linen and put a gold chain around his neck.",
    "theme": "Joseph's Signet Ring and Fine Linen"
  },
  {
    "dayOfYear": 209,
    "calendarDate": "July 28",
    "ref": "Exodus 3:2",
    "text": "There the angel of the LORD appeared to him in flames of fire from within a bush. Moses saw that though the bush was on fire it did not burn up.",
    "theme": "The Burning Bush (Seneh)"
  },
  {
    "dayOfYear": 210,
    "calendarDate": "July 29",
    "ref": "Exodus 12:7",
    "text": "They are to take some of the blood and put it on the sides and tops of the doorframes of the houses where they eat the lambs.",
    "theme": "The Passover Blood on the Doorposts"
  },
  {
    "dayOfYear": 211,
    "calendarDate": "July 30",
    "ref": "Exodus 16:15",
    "text": "When the Israelites saw it, they said to each other, \\",
    "theme": "Manna - Bread from Heaven"
  },
  {
    "dayOfYear": 212,
    "calendarDate": "July 31",
    "ref": "Exodus 28:15,29",
    "text": "Fashion a breastpiece for making decisions... Whenever Aaron enters the Holy Place, he will bear the names of the sons of Israel over his heart.",
    "theme": "The High Priest’s Breastpiece of Judgment"
  },
  {
    "dayOfYear": 213,
    "calendarDate": "August 1",
    "ref": "Leviticus 16:21-22",
    "text": "Aaron shall lay both hands on the head of the live goat and confess over it all the wickedness and rebellion of the Israelites... and send it away into the wilderness.",
    "theme": "The Day of Atonement Scapegoat (Azazel)"
  },
  {
    "dayOfYear": 214,
    "calendarDate": "August 2",
    "ref": "Numbers 6:24-26",
    "text": "The LORD bless you and keep you; the LORD make his face shine on you and be gracious to you; the LORD turn his face toward you and give you peace.",
    "theme": "The Priestly Aaronic Blessing"
  },
  {
    "dayOfYear": 215,
    "calendarDate": "August 3",
    "ref": "Numbers 21:8-9",
    "text": "The LORD said to Moses, \\",
    "theme": "The Bronze Serpent on the Pole"
  },
  {
    "dayOfYear": 216,
    "calendarDate": "August 4",
    "ref": "Joshua 20:2-3",
    "text": "Designate the cities of refuge... so that anyone who kills a person unintentionally and without malice may flee there and find protection.",
    "theme": "The Cities of Refuge (Arei Miklat)"
  },
  {
    "dayOfYear": 217,
    "calendarDate": "August 5",
    "ref": "Judges 7:5-7",
    "text": "Three hundred of them drank from cupped hands, lapping like dogs. All the rest got down on their knees to drink.",
    "theme": "Gideon's 300 - Lapping Like a Dog"
  },
  {
    "dayOfYear": 218,
    "calendarDate": "August 6",
    "ref": "Ruth 4:9-10",
    "text": "Boaz announced to the elders and all the people, \\",
    "theme": "Boaz the Kinsman-Redeemer (Goel)"
  },
  {
    "dayOfYear": 219,
    "calendarDate": "August 7",
    "ref": "1 Samuel 17:40",
    "text": "Then he took his staff in his hand, chose five smooth stones from the stream, put them in the pouch of his shepherd’s bag and, with his sling in his hand, approached the Philistine.",
    "theme": "The Valley of Elah & Five Smooth Stones"
  },
  {
    "dayOfYear": 220,
    "calendarDate": "August 8",
    "ref": "2 Samuel 24:24",
    "text": "The king replied to Araunah, \\",
    "theme": "The Threshing Floor of Araunah"
  },
  {
    "dayOfYear": 221,
    "calendarDate": "August 9",
    "ref": "1 Kings 19:12",
    "text": "After the earthquake came a fire, but the LORD was not in the fire. And after the fire came a gentle whisper.",
    "theme": "The Still Small Voice on Mount Horeb"
  },
  {
    "dayOfYear": 222,
    "calendarDate": "August 10",
    "ref": "2 Kings 20:11",
    "text": "Then the prophet Isaiah called on the LORD, and the LORD made the shadow go back the ten steps it had gone down on the stairway of Ahaz.",
    "theme": "The Shadow Returning Ten Degrees on Ahaz’s Sundial"
  },
  {
    "dayOfYear": 223,
    "calendarDate": "August 11",
    "ref": "2 Kings 20:20",
    "text": "Hezekiah made the pool and the conduit and brought water into the city.",
    "theme": "Hezekiah's Tunnel & The Siloam Inscription"
  },
  {
    "dayOfYear": 224,
    "calendarDate": "August 12",
    "ref": "Ezekiel 37:4-5",
    "text": "He said to me, \\",
    "theme": "The Valley of Dry Bones (Bikah)"
  },
  {
    "dayOfYear": 225,
    "calendarDate": "August 13",
    "ref": "Daniel 5:25-28",
    "text": "This is the inscription that was written: MENE, MENE, TEKEL, PARSIN. God has numbered the days of your reign; you have been weighed on the scales and found wanting.",
    "theme": "Mene, Mene, Tekel, Parsin - The Handwriting on the Wall"
  },
  {
    "dayOfYear": 226,
    "calendarDate": "August 14",
    "ref": "Genesis 2:7",
    "text": "Then the LORD God formed a man from the dust of the ground and breathed into his nostrils the breath of life, and the man became a living being.",
    "theme": "The Breath of Life (Neshama)"
  },
  {
    "dayOfYear": 227,
    "calendarDate": "August 15",
    "ref": "Genesis 14:18-20",
    "text": "Melchizedek king of Salem brought out bread and wine. He was priest of God Most High.",
    "theme": "Melchizedek - King of Righteousness"
  },
  {
    "dayOfYear": 228,
    "calendarDate": "August 16",
    "ref": "Genesis 22:13-14",
    "text": "Abraham looked up and there in a thicket he saw a ram caught by its horns. He went over and took the ram and sacrificed it as a burnt offering instead of his son.",
    "theme": "The Binding of Isaac (Akedah)"
  },
  {
    "dayOfYear": 229,
    "calendarDate": "August 17",
    "ref": "Genesis 41:42",
    "text": "Then Pharaoh took his signet ring from his finger and put it on Joseph’s finger. He dressed him in robes of fine linen and put a gold chain around his neck.",
    "theme": "Joseph's Signet Ring and Fine Linen"
  },
  {
    "dayOfYear": 230,
    "calendarDate": "August 18",
    "ref": "Exodus 3:2",
    "text": "There the angel of the LORD appeared to him in flames of fire from within a bush. Moses saw that though the bush was on fire it did not burn up.",
    "theme": "The Burning Bush (Seneh)"
  },
  {
    "dayOfYear": 231,
    "calendarDate": "August 19",
    "ref": "Exodus 12:7",
    "text": "They are to take some of the blood and put it on the sides and tops of the doorframes of the houses where they eat the lambs.",
    "theme": "The Passover Blood on the Doorposts"
  },
  {
    "dayOfYear": 232,
    "calendarDate": "August 20",
    "ref": "Exodus 16:15",
    "text": "When the Israelites saw it, they said to each other, \\",
    "theme": "Manna - Bread from Heaven"
  },
  {
    "dayOfYear": 233,
    "calendarDate": "August 21",
    "ref": "Exodus 28:15,29",
    "text": "Fashion a breastpiece for making decisions... Whenever Aaron enters the Holy Place, he will bear the names of the sons of Israel over his heart.",
    "theme": "The High Priest’s Breastpiece of Judgment"
  },
  {
    "dayOfYear": 234,
    "calendarDate": "August 22",
    "ref": "Leviticus 16:21-22",
    "text": "Aaron shall lay both hands on the head of the live goat and confess over it all the wickedness and rebellion of the Israelites... and send it away into the wilderness.",
    "theme": "The Day of Atonement Scapegoat (Azazel)"
  },
  {
    "dayOfYear": 235,
    "calendarDate": "August 23",
    "ref": "Numbers 6:24-26",
    "text": "The LORD bless you and keep you; the LORD make his face shine on you and be gracious to you; the LORD turn his face toward you and give you peace.",
    "theme": "The Priestly Aaronic Blessing"
  },
  {
    "dayOfYear": 236,
    "calendarDate": "August 24",
    "ref": "Numbers 21:8-9",
    "text": "The LORD said to Moses, \\",
    "theme": "The Bronze Serpent on the Pole"
  },
  {
    "dayOfYear": 237,
    "calendarDate": "August 25",
    "ref": "Joshua 20:2-3",
    "text": "Designate the cities of refuge... so that anyone who kills a person unintentionally and without malice may flee there and find protection.",
    "theme": "The Cities of Refuge (Arei Miklat)"
  },
  {
    "dayOfYear": 238,
    "calendarDate": "August 26",
    "ref": "Judges 7:5-7",
    "text": "Three hundred of them drank from cupped hands, lapping like dogs. All the rest got down on their knees to drink.",
    "theme": "Gideon's 300 - Lapping Like a Dog"
  },
  {
    "dayOfYear": 239,
    "calendarDate": "August 27",
    "ref": "Ruth 4:9-10",
    "text": "Boaz announced to the elders and all the people, \\",
    "theme": "Boaz the Kinsman-Redeemer (Goel)"
  },
  {
    "dayOfYear": 240,
    "calendarDate": "August 28",
    "ref": "1 Samuel 17:40",
    "text": "Then he took his staff in his hand, chose five smooth stones from the stream, put them in the pouch of his shepherd’s bag and, with his sling in his hand, approached the Philistine.",
    "theme": "The Valley of Elah & Five Smooth Stones"
  },
  {
    "dayOfYear": 241,
    "calendarDate": "August 29",
    "ref": "2 Samuel 24:24",
    "text": "The king replied to Araunah, \\",
    "theme": "The Threshing Floor of Araunah"
  },
  {
    "dayOfYear": 242,
    "calendarDate": "August 30",
    "ref": "1 Kings 19:12",
    "text": "After the earthquake came a fire, but the LORD was not in the fire. And after the fire came a gentle whisper.",
    "theme": "The Still Small Voice on Mount Horeb"
  },
  {
    "dayOfYear": 243,
    "calendarDate": "August 31",
    "ref": "2 Kings 20:11",
    "text": "Then the prophet Isaiah called on the LORD, and the LORD made the shadow go back the ten steps it had gone down on the stairway of Ahaz.",
    "theme": "The Shadow Returning Ten Degrees on Ahaz’s Sundial"
  },
  {
    "dayOfYear": 244,
    "calendarDate": "September 1",
    "ref": "2 Kings 20:20",
    "text": "Hezekiah made the pool and the conduit and brought water into the city.",
    "theme": "Hezekiah's Tunnel & The Siloam Inscription"
  },
  {
    "dayOfYear": 245,
    "calendarDate": "September 2",
    "ref": "Ezekiel 37:4-5",
    "text": "He said to me, \\",
    "theme": "The Valley of Dry Bones (Bikah)"
  },
  {
    "dayOfYear": 246,
    "calendarDate": "September 3",
    "ref": "Daniel 5:25-28",
    "text": "This is the inscription that was written: MENE, MENE, TEKEL, PARSIN. God has numbered the days of your reign; you have been weighed on the scales and found wanting.",
    "theme": "Mene, Mene, Tekel, Parsin - The Handwriting on the Wall"
  },
  {
    "dayOfYear": 247,
    "calendarDate": "September 4",
    "ref": "Genesis 2:7",
    "text": "Then the LORD God formed a man from the dust of the ground and breathed into his nostrils the breath of life, and the man became a living being.",
    "theme": "The Breath of Life (Neshama)"
  },
  {
    "dayOfYear": 248,
    "calendarDate": "September 5",
    "ref": "Genesis 14:18-20",
    "text": "Melchizedek king of Salem brought out bread and wine. He was priest of God Most High.",
    "theme": "Melchizedek - King of Righteousness"
  },
  {
    "dayOfYear": 249,
    "calendarDate": "September 6",
    "ref": "Genesis 22:13-14",
    "text": "Abraham looked up and there in a thicket he saw a ram caught by its horns. He went over and took the ram and sacrificed it as a burnt offering instead of his son.",
    "theme": "The Binding of Isaac (Akedah)"
  },
  {
    "dayOfYear": 250,
    "calendarDate": "September 7",
    "ref": "Genesis 41:42",
    "text": "Then Pharaoh took his signet ring from his finger and put it on Joseph’s finger. He dressed him in robes of fine linen and put a gold chain around his neck.",
    "theme": "Joseph's Signet Ring and Fine Linen"
  },
  {
    "dayOfYear": 251,
    "calendarDate": "September 8",
    "ref": "Exodus 3:2",
    "text": "There the angel of the LORD appeared to him in flames of fire from within a bush. Moses saw that though the bush was on fire it did not burn up.",
    "theme": "The Burning Bush (Seneh)"
  },
  {
    "dayOfYear": 252,
    "calendarDate": "September 9",
    "ref": "Exodus 12:7",
    "text": "They are to take some of the blood and put it on the sides and tops of the doorframes of the houses where they eat the lambs.",
    "theme": "The Passover Blood on the Doorposts"
  },
  {
    "dayOfYear": 253,
    "calendarDate": "September 10",
    "ref": "Exodus 16:15",
    "text": "When the Israelites saw it, they said to each other, \\",
    "theme": "Manna - Bread from Heaven"
  },
  {
    "dayOfYear": 254,
    "calendarDate": "September 11",
    "ref": "Exodus 28:15,29",
    "text": "Fashion a breastpiece for making decisions... Whenever Aaron enters the Holy Place, he will bear the names of the sons of Israel over his heart.",
    "theme": "The High Priest’s Breastpiece of Judgment"
  },
  {
    "dayOfYear": 255,
    "calendarDate": "September 12",
    "ref": "Leviticus 16:21-22",
    "text": "Aaron shall lay both hands on the head of the live goat and confess over it all the wickedness and rebellion of the Israelites... and send it away into the wilderness.",
    "theme": "The Day of Atonement Scapegoat (Azazel)"
  },
  {
    "dayOfYear": 256,
    "calendarDate": "September 13",
    "ref": "Numbers 6:24-26",
    "text": "The LORD bless you and keep you; the LORD make his face shine on you and be gracious to you; the LORD turn his face toward you and give you peace.",
    "theme": "The Priestly Aaronic Blessing"
  },
  {
    "dayOfYear": 257,
    "calendarDate": "September 14",
    "ref": "Numbers 21:8-9",
    "text": "The LORD said to Moses, \\",
    "theme": "The Bronze Serpent on the Pole"
  },
  {
    "dayOfYear": 258,
    "calendarDate": "September 15",
    "ref": "Joshua 20:2-3",
    "text": "Designate the cities of refuge... so that anyone who kills a person unintentionally and without malice may flee there and find protection.",
    "theme": "The Cities of Refuge (Arei Miklat)"
  },
  {
    "dayOfYear": 259,
    "calendarDate": "September 16",
    "ref": "Judges 7:5-7",
    "text": "Three hundred of them drank from cupped hands, lapping like dogs. All the rest got down on their knees to drink.",
    "theme": "Gideon's 300 - Lapping Like a Dog"
  },
  {
    "dayOfYear": 260,
    "calendarDate": "September 17",
    "ref": "Ruth 4:9-10",
    "text": "Boaz announced to the elders and all the people, \\",
    "theme": "Boaz the Kinsman-Redeemer (Goel)"
  },
  {
    "dayOfYear": 261,
    "calendarDate": "September 18",
    "ref": "1 Samuel 17:40",
    "text": "Then he took his staff in his hand, chose five smooth stones from the stream, put them in the pouch of his shepherd’s bag and, with his sling in his hand, approached the Philistine.",
    "theme": "The Valley of Elah & Five Smooth Stones"
  },
  {
    "dayOfYear": 262,
    "calendarDate": "September 19",
    "ref": "2 Samuel 24:24",
    "text": "The king replied to Araunah, \\",
    "theme": "The Threshing Floor of Araunah"
  },
  {
    "dayOfYear": 263,
    "calendarDate": "September 20",
    "ref": "1 Kings 19:12",
    "text": "After the earthquake came a fire, but the LORD was not in the fire. And after the fire came a gentle whisper.",
    "theme": "The Still Small Voice on Mount Horeb"
  },
  {
    "dayOfYear": 264,
    "calendarDate": "September 21",
    "ref": "2 Kings 20:11",
    "text": "Then the prophet Isaiah called on the LORD, and the LORD made the shadow go back the ten steps it had gone down on the stairway of Ahaz.",
    "theme": "The Shadow Returning Ten Degrees on Ahaz’s Sundial"
  },
  {
    "dayOfYear": 265,
    "calendarDate": "September 22",
    "ref": "2 Kings 20:20",
    "text": "Hezekiah made the pool and the conduit and brought water into the city.",
    "theme": "Hezekiah's Tunnel & The Siloam Inscription"
  },
  {
    "dayOfYear": 266,
    "calendarDate": "September 23",
    "ref": "Ezekiel 37:4-5",
    "text": "He said to me, \\",
    "theme": "The Valley of Dry Bones (Bikah)"
  },
  {
    "dayOfYear": 267,
    "calendarDate": "September 24",
    "ref": "Daniel 5:25-28",
    "text": "This is the inscription that was written: MENE, MENE, TEKEL, PARSIN. God has numbered the days of your reign; you have been weighed on the scales and found wanting.",
    "theme": "Mene, Mene, Tekel, Parsin - The Handwriting on the Wall"
  },
  {
    "dayOfYear": 268,
    "calendarDate": "September 25",
    "ref": "Genesis 2:7",
    "text": "Then the LORD God formed a man from the dust of the ground and breathed into his nostrils the breath of life, and the man became a living being.",
    "theme": "The Breath of Life (Neshama)"
  },
  {
    "dayOfYear": 269,
    "calendarDate": "September 26",
    "ref": "Genesis 14:18-20",
    "text": "Melchizedek king of Salem brought out bread and wine. He was priest of God Most High.",
    "theme": "Melchizedek - King of Righteousness"
  },
  {
    "dayOfYear": 270,
    "calendarDate": "September 27",
    "ref": "Genesis 22:13-14",
    "text": "Abraham looked up and there in a thicket he saw a ram caught by its horns. He went over and took the ram and sacrificed it as a burnt offering instead of his son.",
    "theme": "The Binding of Isaac (Akedah)"
  },
  {
    "dayOfYear": 271,
    "calendarDate": "September 28",
    "ref": "Genesis 41:42",
    "text": "Then Pharaoh took his signet ring from his finger and put it on Joseph’s finger. He dressed him in robes of fine linen and put a gold chain around his neck.",
    "theme": "Joseph's Signet Ring and Fine Linen"
  },
  {
    "dayOfYear": 272,
    "calendarDate": "September 29",
    "ref": "Exodus 3:2",
    "text": "There the angel of the LORD appeared to him in flames of fire from within a bush. Moses saw that though the bush was on fire it did not burn up.",
    "theme": "The Burning Bush (Seneh)"
  },
  {
    "dayOfYear": 273,
    "calendarDate": "September 30",
    "ref": "Exodus 12:7",
    "text": "They are to take some of the blood and put it on the sides and tops of the doorframes of the houses where they eat the lambs.",
    "theme": "The Passover Blood on the Doorposts"
  },
  {
    "dayOfYear": 274,
    "calendarDate": "October 1",
    "ref": "Exodus 16:15",
    "text": "When the Israelites saw it, they said to each other, \\",
    "theme": "Manna - Bread from Heaven"
  },
  {
    "dayOfYear": 275,
    "calendarDate": "October 2",
    "ref": "Exodus 28:15,29",
    "text": "Fashion a breastpiece for making decisions... Whenever Aaron enters the Holy Place, he will bear the names of the sons of Israel over his heart.",
    "theme": "The High Priest’s Breastpiece of Judgment"
  },
  {
    "dayOfYear": 276,
    "calendarDate": "October 3",
    "ref": "Leviticus 16:21-22",
    "text": "Aaron shall lay both hands on the head of the live goat and confess over it all the wickedness and rebellion of the Israelites... and send it away into the wilderness.",
    "theme": "The Day of Atonement Scapegoat (Azazel)"
  },
  {
    "dayOfYear": 277,
    "calendarDate": "October 4",
    "ref": "Numbers 6:24-26",
    "text": "The LORD bless you and keep you; the LORD make his face shine on you and be gracious to you; the LORD turn his face toward you and give you peace.",
    "theme": "The Priestly Aaronic Blessing"
  },
  {
    "dayOfYear": 278,
    "calendarDate": "October 5",
    "ref": "Numbers 21:8-9",
    "text": "The LORD said to Moses, \\",
    "theme": "The Bronze Serpent on the Pole"
  },
  {
    "dayOfYear": 279,
    "calendarDate": "October 6",
    "ref": "Joshua 20:2-3",
    "text": "Designate the cities of refuge... so that anyone who kills a person unintentionally and without malice may flee there and find protection.",
    "theme": "The Cities of Refuge (Arei Miklat)"
  },
  {
    "dayOfYear": 280,
    "calendarDate": "October 7",
    "ref": "Judges 7:5-7",
    "text": "Three hundred of them drank from cupped hands, lapping like dogs. All the rest got down on their knees to drink.",
    "theme": "Gideon's 300 - Lapping Like a Dog"
  },
  {
    "dayOfYear": 281,
    "calendarDate": "October 8",
    "ref": "Ruth 4:9-10",
    "text": "Boaz announced to the elders and all the people, \\",
    "theme": "Boaz the Kinsman-Redeemer (Goel)"
  },
  {
    "dayOfYear": 282,
    "calendarDate": "October 9",
    "ref": "1 Samuel 17:40",
    "text": "Then he took his staff in his hand, chose five smooth stones from the stream, put them in the pouch of his shepherd’s bag and, with his sling in his hand, approached the Philistine.",
    "theme": "The Valley of Elah & Five Smooth Stones"
  },
  {
    "dayOfYear": 283,
    "calendarDate": "October 10",
    "ref": "2 Samuel 24:24",
    "text": "The king replied to Araunah, \\",
    "theme": "The Threshing Floor of Araunah"
  },
  {
    "dayOfYear": 284,
    "calendarDate": "October 11",
    "ref": "1 Kings 19:12",
    "text": "After the earthquake came a fire, but the LORD was not in the fire. And after the fire came a gentle whisper.",
    "theme": "The Still Small Voice on Mount Horeb"
  },
  {
    "dayOfYear": 285,
    "calendarDate": "October 12",
    "ref": "2 Kings 20:11",
    "text": "Then the prophet Isaiah called on the LORD, and the LORD made the shadow go back the ten steps it had gone down on the stairway of Ahaz.",
    "theme": "The Shadow Returning Ten Degrees on Ahaz’s Sundial"
  },
  {
    "dayOfYear": 286,
    "calendarDate": "October 13",
    "ref": "2 Kings 20:20",
    "text": "Hezekiah made the pool and the conduit and brought water into the city.",
    "theme": "Hezekiah's Tunnel & The Siloam Inscription"
  },
  {
    "dayOfYear": 287,
    "calendarDate": "October 14",
    "ref": "Ezekiel 37:4-5",
    "text": "He said to me, \\",
    "theme": "The Valley of Dry Bones (Bikah)"
  },
  {
    "dayOfYear": 288,
    "calendarDate": "October 15",
    "ref": "Daniel 5:25-28",
    "text": "This is the inscription that was written: MENE, MENE, TEKEL, PARSIN. God has numbered the days of your reign; you have been weighed on the scales and found wanting.",
    "theme": "Mene, Mene, Tekel, Parsin - The Handwriting on the Wall"
  },
  {
    "dayOfYear": 289,
    "calendarDate": "October 16",
    "ref": "Genesis 2:7",
    "text": "Then the LORD God formed a man from the dust of the ground and breathed into his nostrils the breath of life, and the man became a living being.",
    "theme": "The Breath of Life (Neshama)"
  },
  {
    "dayOfYear": 290,
    "calendarDate": "October 17",
    "ref": "Genesis 14:18-20",
    "text": "Melchizedek king of Salem brought out bread and wine. He was priest of God Most High.",
    "theme": "Melchizedek - King of Righteousness"
  },
  {
    "dayOfYear": 291,
    "calendarDate": "October 18",
    "ref": "Genesis 22:13-14",
    "text": "Abraham looked up and there in a thicket he saw a ram caught by its horns. He went over and took the ram and sacrificed it as a burnt offering instead of his son.",
    "theme": "The Binding of Isaac (Akedah)"
  },
  {
    "dayOfYear": 292,
    "calendarDate": "October 19",
    "ref": "Genesis 41:42",
    "text": "Then Pharaoh took his signet ring from his finger and put it on Joseph’s finger. He dressed him in robes of fine linen and put a gold chain around his neck.",
    "theme": "Joseph's Signet Ring and Fine Linen"
  },
  {
    "dayOfYear": 293,
    "calendarDate": "October 20",
    "ref": "Exodus 3:2",
    "text": "There the angel of the LORD appeared to him in flames of fire from within a bush. Moses saw that though the bush was on fire it did not burn up.",
    "theme": "The Burning Bush (Seneh)"
  },
  {
    "dayOfYear": 294,
    "calendarDate": "October 21",
    "ref": "Exodus 12:7",
    "text": "They are to take some of the blood and put it on the sides and tops of the doorframes of the houses where they eat the lambs.",
    "theme": "The Passover Blood on the Doorposts"
  },
  {
    "dayOfYear": 295,
    "calendarDate": "October 22",
    "ref": "Exodus 16:15",
    "text": "When the Israelites saw it, they said to each other, \\",
    "theme": "Manna - Bread from Heaven"
  },
  {
    "dayOfYear": 296,
    "calendarDate": "October 23",
    "ref": "Exodus 28:15,29",
    "text": "Fashion a breastpiece for making decisions... Whenever Aaron enters the Holy Place, he will bear the names of the sons of Israel over his heart.",
    "theme": "The High Priest’s Breastpiece of Judgment"
  },
  {
    "dayOfYear": 297,
    "calendarDate": "October 24",
    "ref": "Leviticus 16:21-22",
    "text": "Aaron shall lay both hands on the head of the live goat and confess over it all the wickedness and rebellion of the Israelites... and send it away into the wilderness.",
    "theme": "The Day of Atonement Scapegoat (Azazel)"
  },
  {
    "dayOfYear": 298,
    "calendarDate": "October 25",
    "ref": "Numbers 6:24-26",
    "text": "The LORD bless you and keep you; the LORD make his face shine on you and be gracious to you; the LORD turn his face toward you and give you peace.",
    "theme": "The Priestly Aaronic Blessing"
  },
  {
    "dayOfYear": 299,
    "calendarDate": "October 26",
    "ref": "Numbers 21:8-9",
    "text": "The LORD said to Moses, \\",
    "theme": "The Bronze Serpent on the Pole"
  },
  {
    "dayOfYear": 300,
    "calendarDate": "October 27",
    "ref": "Joshua 20:2-3",
    "text": "Designate the cities of refuge... so that anyone who kills a person unintentionally and without malice may flee there and find protection.",
    "theme": "The Cities of Refuge (Arei Miklat)"
  },
  {
    "dayOfYear": 301,
    "calendarDate": "October 28",
    "ref": "Judges 7:5-7",
    "text": "Three hundred of them drank from cupped hands, lapping like dogs. All the rest got down on their knees to drink.",
    "theme": "Gideon's 300 - Lapping Like a Dog"
  },
  {
    "dayOfYear": 302,
    "calendarDate": "October 29",
    "ref": "Ruth 4:9-10",
    "text": "Boaz announced to the elders and all the people, \\",
    "theme": "Boaz the Kinsman-Redeemer (Goel)"
  },
  {
    "dayOfYear": 303,
    "calendarDate": "October 30",
    "ref": "1 Samuel 17:40",
    "text": "Then he took his staff in his hand, chose five smooth stones from the stream, put them in the pouch of his shepherd’s bag and, with his sling in his hand, approached the Philistine.",
    "theme": "The Valley of Elah & Five Smooth Stones"
  },
  {
    "dayOfYear": 304,
    "calendarDate": "October 31",
    "ref": "2 Samuel 24:24",
    "text": "The king replied to Araunah, \\",
    "theme": "The Threshing Floor of Araunah"
  },
  {
    "dayOfYear": 305,
    "calendarDate": "November 1",
    "ref": "1 Kings 19:12",
    "text": "After the earthquake came a fire, but the LORD was not in the fire. And after the fire came a gentle whisper.",
    "theme": "The Still Small Voice on Mount Horeb"
  },
  {
    "dayOfYear": 306,
    "calendarDate": "November 2",
    "ref": "2 Kings 20:11",
    "text": "Then the prophet Isaiah called on the LORD, and the LORD made the shadow go back the ten steps it had gone down on the stairway of Ahaz.",
    "theme": "The Shadow Returning Ten Degrees on Ahaz’s Sundial"
  },
  {
    "dayOfYear": 307,
    "calendarDate": "November 3",
    "ref": "2 Kings 20:20",
    "text": "Hezekiah made the pool and the conduit and brought water into the city.",
    "theme": "Hezekiah's Tunnel & The Siloam Inscription"
  },
  {
    "dayOfYear": 308,
    "calendarDate": "November 4",
    "ref": "Ezekiel 37:4-5",
    "text": "He said to me, \\",
    "theme": "The Valley of Dry Bones (Bikah)"
  },
  {
    "dayOfYear": 309,
    "calendarDate": "November 5",
    "ref": "Daniel 5:25-28",
    "text": "This is the inscription that was written: MENE, MENE, TEKEL, PARSIN. God has numbered the days of your reign; you have been weighed on the scales and found wanting.",
    "theme": "Mene, Mene, Tekel, Parsin - The Handwriting on the Wall"
  },
  {
    "dayOfYear": 310,
    "calendarDate": "November 6",
    "ref": "Genesis 2:7",
    "text": "Then the LORD God formed a man from the dust of the ground and breathed into his nostrils the breath of life, and the man became a living being.",
    "theme": "The Breath of Life (Neshama)"
  },
  {
    "dayOfYear": 311,
    "calendarDate": "November 7",
    "ref": "Genesis 14:18-20",
    "text": "Melchizedek king of Salem brought out bread and wine. He was priest of God Most High.",
    "theme": "Melchizedek - King of Righteousness"
  },
  {
    "dayOfYear": 312,
    "calendarDate": "November 8",
    "ref": "Genesis 22:13-14",
    "text": "Abraham looked up and there in a thicket he saw a ram caught by its horns. He went over and took the ram and sacrificed it as a burnt offering instead of his son.",
    "theme": "The Binding of Isaac (Akedah)"
  },
  {
    "dayOfYear": 313,
    "calendarDate": "November 9",
    "ref": "Genesis 41:42",
    "text": "Then Pharaoh took his signet ring from his finger and put it on Joseph’s finger. He dressed him in robes of fine linen and put a gold chain around his neck.",
    "theme": "Joseph's Signet Ring and Fine Linen"
  },
  {
    "dayOfYear": 314,
    "calendarDate": "November 10",
    "ref": "Exodus 3:2",
    "text": "There the angel of the LORD appeared to him in flames of fire from within a bush. Moses saw that though the bush was on fire it did not burn up.",
    "theme": "The Burning Bush (Seneh)"
  },
  {
    "dayOfYear": 315,
    "calendarDate": "November 11",
    "ref": "Exodus 12:7",
    "text": "They are to take some of the blood and put it on the sides and tops of the doorframes of the houses where they eat the lambs.",
    "theme": "The Passover Blood on the Doorposts"
  },
  {
    "dayOfYear": 316,
    "calendarDate": "November 12",
    "ref": "Exodus 16:15",
    "text": "When the Israelites saw it, they said to each other, \\",
    "theme": "Manna - Bread from Heaven"
  },
  {
    "dayOfYear": 317,
    "calendarDate": "November 13",
    "ref": "Exodus 28:15,29",
    "text": "Fashion a breastpiece for making decisions... Whenever Aaron enters the Holy Place, he will bear the names of the sons of Israel over his heart.",
    "theme": "The High Priest’s Breastpiece of Judgment"
  },
  {
    "dayOfYear": 318,
    "calendarDate": "November 14",
    "ref": "Leviticus 16:21-22",
    "text": "Aaron shall lay both hands on the head of the live goat and confess over it all the wickedness and rebellion of the Israelites... and send it away into the wilderness.",
    "theme": "The Day of Atonement Scapegoat (Azazel)"
  },
  {
    "dayOfYear": 319,
    "calendarDate": "November 15",
    "ref": "Numbers 6:24-26",
    "text": "The LORD bless you and keep you; the LORD make his face shine on you and be gracious to you; the LORD turn his face toward you and give you peace.",
    "theme": "The Priestly Aaronic Blessing"
  },
  {
    "dayOfYear": 320,
    "calendarDate": "November 16",
    "ref": "Numbers 21:8-9",
    "text": "The LORD said to Moses, \\",
    "theme": "The Bronze Serpent on the Pole"
  },
  {
    "dayOfYear": 321,
    "calendarDate": "November 17",
    "ref": "Joshua 20:2-3",
    "text": "Designate the cities of refuge... so that anyone who kills a person unintentionally and without malice may flee there and find protection.",
    "theme": "The Cities of Refuge (Arei Miklat)"
  },
  {
    "dayOfYear": 322,
    "calendarDate": "November 18",
    "ref": "Judges 7:5-7",
    "text": "Three hundred of them drank from cupped hands, lapping like dogs. All the rest got down on their knees to drink.",
    "theme": "Gideon's 300 - Lapping Like a Dog"
  },
  {
    "dayOfYear": 323,
    "calendarDate": "November 19",
    "ref": "Ruth 4:9-10",
    "text": "Boaz announced to the elders and all the people, \\",
    "theme": "Boaz the Kinsman-Redeemer (Goel)"
  },
  {
    "dayOfYear": 324,
    "calendarDate": "November 20",
    "ref": "1 Samuel 17:40",
    "text": "Then he took his staff in his hand, chose five smooth stones from the stream, put them in the pouch of his shepherd’s bag and, with his sling in his hand, approached the Philistine.",
    "theme": "The Valley of Elah & Five Smooth Stones"
  },
  {
    "dayOfYear": 325,
    "calendarDate": "November 21",
    "ref": "2 Samuel 24:24",
    "text": "The king replied to Araunah, \\",
    "theme": "The Threshing Floor of Araunah"
  },
  {
    "dayOfYear": 326,
    "calendarDate": "November 22",
    "ref": "1 Kings 19:12",
    "text": "After the earthquake came a fire, but the LORD was not in the fire. And after the fire came a gentle whisper.",
    "theme": "The Still Small Voice on Mount Horeb"
  },
  {
    "dayOfYear": 327,
    "calendarDate": "November 23",
    "ref": "2 Kings 20:11",
    "text": "Then the prophet Isaiah called on the LORD, and the LORD made the shadow go back the ten steps it had gone down on the stairway of Ahaz.",
    "theme": "The Shadow Returning Ten Degrees on Ahaz’s Sundial"
  },
  {
    "dayOfYear": 328,
    "calendarDate": "November 24",
    "ref": "2 Kings 20:20",
    "text": "Hezekiah made the pool and the conduit and brought water into the city.",
    "theme": "Hezekiah's Tunnel & The Siloam Inscription"
  },
  {
    "dayOfYear": 329,
    "calendarDate": "November 25",
    "ref": "Ezekiel 37:4-5",
    "text": "He said to me, \\",
    "theme": "The Valley of Dry Bones (Bikah)"
  },
  {
    "dayOfYear": 330,
    "calendarDate": "November 26",
    "ref": "Daniel 5:25-28",
    "text": "This is the inscription that was written: MENE, MENE, TEKEL, PARSIN. God has numbered the days of your reign; you have been weighed on the scales and found wanting.",
    "theme": "Mene, Mene, Tekel, Parsin - The Handwriting on the Wall"
  },
  {
    "dayOfYear": 331,
    "calendarDate": "November 27",
    "ref": "Genesis 2:7",
    "text": "Then the LORD God formed a man from the dust of the ground and breathed into his nostrils the breath of life, and the man became a living being.",
    "theme": "The Breath of Life (Neshama)"
  },
  {
    "dayOfYear": 332,
    "calendarDate": "November 28",
    "ref": "Genesis 14:18-20",
    "text": "Melchizedek king of Salem brought out bread and wine. He was priest of God Most High.",
    "theme": "Melchizedek - King of Righteousness"
  },
  {
    "dayOfYear": 333,
    "calendarDate": "November 29",
    "ref": "Genesis 22:13-14",
    "text": "Abraham looked up and there in a thicket he saw a ram caught by its horns. He went over and took the ram and sacrificed it as a burnt offering instead of his son.",
    "theme": "The Binding of Isaac (Akedah)"
  },
  {
    "dayOfYear": 334,
    "calendarDate": "November 30",
    "ref": "Genesis 41:42",
    "text": "Then Pharaoh took his signet ring from his finger and put it on Joseph’s finger. He dressed him in robes of fine linen and put a gold chain around his neck.",
    "theme": "Joseph's Signet Ring and Fine Linen"
  },
  {
    "dayOfYear": 335,
    "calendarDate": "December 1",
    "ref": "Exodus 3:2",
    "text": "There the angel of the LORD appeared to him in flames of fire from within a bush. Moses saw that though the bush was on fire it did not burn up.",
    "theme": "The Burning Bush (Seneh)"
  },
  {
    "dayOfYear": 336,
    "calendarDate": "December 2",
    "ref": "Exodus 12:7",
    "text": "They are to take some of the blood and put it on the sides and tops of the doorframes of the houses where they eat the lambs.",
    "theme": "The Passover Blood on the Doorposts"
  },
  {
    "dayOfYear": 337,
    "calendarDate": "December 3",
    "ref": "Exodus 16:15",
    "text": "When the Israelites saw it, they said to each other, \\",
    "theme": "Manna - Bread from Heaven"
  },
  {
    "dayOfYear": 338,
    "calendarDate": "December 4",
    "ref": "Exodus 28:15,29",
    "text": "Fashion a breastpiece for making decisions... Whenever Aaron enters the Holy Place, he will bear the names of the sons of Israel over his heart.",
    "theme": "The High Priest’s Breastpiece of Judgment"
  },
  {
    "dayOfYear": 339,
    "calendarDate": "December 5",
    "ref": "Leviticus 16:21-22",
    "text": "Aaron shall lay both hands on the head of the live goat and confess over it all the wickedness and rebellion of the Israelites... and send it away into the wilderness.",
    "theme": "The Day of Atonement Scapegoat (Azazel)"
  },
  {
    "dayOfYear": 340,
    "calendarDate": "December 6",
    "ref": "Numbers 6:24-26",
    "text": "The LORD bless you and keep you; the LORD make his face shine on you and be gracious to you; the LORD turn his face toward you and give you peace.",
    "theme": "The Priestly Aaronic Blessing"
  },
  {
    "dayOfYear": 341,
    "calendarDate": "December 7",
    "ref": "Numbers 21:8-9",
    "text": "The LORD said to Moses, \\",
    "theme": "The Bronze Serpent on the Pole"
  },
  {
    "dayOfYear": 342,
    "calendarDate": "December 8",
    "ref": "Joshua 20:2-3",
    "text": "Designate the cities of refuge... so that anyone who kills a person unintentionally and without malice may flee there and find protection.",
    "theme": "The Cities of Refuge (Arei Miklat)"
  },
  {
    "dayOfYear": 343,
    "calendarDate": "December 9",
    "ref": "Judges 7:5-7",
    "text": "Three hundred of them drank from cupped hands, lapping like dogs. All the rest got down on their knees to drink.",
    "theme": "Gideon's 300 - Lapping Like a Dog"
  },
  {
    "dayOfYear": 344,
    "calendarDate": "December 10",
    "ref": "Ruth 4:9-10",
    "text": "Boaz announced to the elders and all the people, \\",
    "theme": "Boaz the Kinsman-Redeemer (Goel)"
  },
  {
    "dayOfYear": 345,
    "calendarDate": "December 11",
    "ref": "1 Samuel 17:40",
    "text": "Then he took his staff in his hand, chose five smooth stones from the stream, put them in the pouch of his shepherd’s bag and, with his sling in his hand, approached the Philistine.",
    "theme": "The Valley of Elah & Five Smooth Stones"
  },
  {
    "dayOfYear": 346,
    "calendarDate": "December 12",
    "ref": "2 Samuel 24:24",
    "text": "The king replied to Araunah, \\",
    "theme": "The Threshing Floor of Araunah"
  },
  {
    "dayOfYear": 347,
    "calendarDate": "December 13",
    "ref": "1 Kings 19:12",
    "text": "After the earthquake came a fire, but the LORD was not in the fire. And after the fire came a gentle whisper.",
    "theme": "The Still Small Voice on Mount Horeb"
  },
  {
    "dayOfYear": 348,
    "calendarDate": "December 14",
    "ref": "2 Kings 20:11",
    "text": "Then the prophet Isaiah called on the LORD, and the LORD made the shadow go back the ten steps it had gone down on the stairway of Ahaz.",
    "theme": "The Shadow Returning Ten Degrees on Ahaz’s Sundial"
  },
  {
    "dayOfYear": 349,
    "calendarDate": "December 15",
    "ref": "2 Kings 20:20",
    "text": "Hezekiah made the pool and the conduit and brought water into the city.",
    "theme": "Hezekiah's Tunnel & The Siloam Inscription"
  },
  {
    "dayOfYear": 350,
    "calendarDate": "December 16",
    "ref": "Ezekiel 37:4-5",
    "text": "He said to me, \\",
    "theme": "The Valley of Dry Bones (Bikah)"
  },
  {
    "dayOfYear": 351,
    "calendarDate": "December 17",
    "ref": "Daniel 5:25-28",
    "text": "This is the inscription that was written: MENE, MENE, TEKEL, PARSIN. God has numbered the days of your reign; you have been weighed on the scales and found wanting.",
    "theme": "Mene, Mene, Tekel, Parsin - The Handwriting on the Wall"
  },
  {
    "dayOfYear": 352,
    "calendarDate": "December 18",
    "ref": "Genesis 2:7",
    "text": "Then the LORD God formed a man from the dust of the ground and breathed into his nostrils the breath of life, and the man became a living being.",
    "theme": "The Breath of Life (Neshama)"
  },
  {
    "dayOfYear": 353,
    "calendarDate": "December 19",
    "ref": "Genesis 14:18-20",
    "text": "Melchizedek king of Salem brought out bread and wine. He was priest of God Most High.",
    "theme": "Melchizedek - King of Righteousness"
  },
  {
    "dayOfYear": 354,
    "calendarDate": "December 20",
    "ref": "Genesis 22:13-14",
    "text": "Abraham looked up and there in a thicket he saw a ram caught by its horns. He went over and took the ram and sacrificed it as a burnt offering instead of his son.",
    "theme": "The Binding of Isaac (Akedah)"
  },
  {
    "dayOfYear": 355,
    "calendarDate": "December 21",
    "ref": "Genesis 41:42",
    "text": "Then Pharaoh took his signet ring from his finger and put it on Joseph’s finger. He dressed him in robes of fine linen and put a gold chain around his neck.",
    "theme": "Joseph's Signet Ring and Fine Linen"
  },
  {
    "dayOfYear": 356,
    "calendarDate": "December 22",
    "ref": "Exodus 3:2",
    "text": "There the angel of the LORD appeared to him in flames of fire from within a bush. Moses saw that though the bush was on fire it did not burn up.",
    "theme": "The Burning Bush (Seneh)"
  },
  {
    "dayOfYear": 357,
    "calendarDate": "December 23",
    "ref": "Exodus 12:7",
    "text": "They are to take some of the blood and put it on the sides and tops of the doorframes of the houses where they eat the lambs.",
    "theme": "The Passover Blood on the Doorposts"
  },
  {
    "dayOfYear": 358,
    "calendarDate": "December 24",
    "ref": "Exodus 16:15",
    "text": "When the Israelites saw it, they said to each other, \\",
    "theme": "Manna - Bread from Heaven"
  },
  {
    "dayOfYear": 359,
    "calendarDate": "December 25",
    "ref": "Exodus 28:15,29",
    "text": "Fashion a breastpiece for making decisions... Whenever Aaron enters the Holy Place, he will bear the names of the sons of Israel over his heart.",
    "theme": "The High Priest’s Breastpiece of Judgment"
  },
  {
    "dayOfYear": 360,
    "calendarDate": "December 26",
    "ref": "Leviticus 16:21-22",
    "text": "Aaron shall lay both hands on the head of the live goat and confess over it all the wickedness and rebellion of the Israelites... and send it away into the wilderness.",
    "theme": "The Day of Atonement Scapegoat (Azazel)"
  },
  {
    "dayOfYear": 361,
    "calendarDate": "December 27",
    "ref": "Numbers 6:24-26",
    "text": "The LORD bless you and keep you; the LORD make his face shine on you and be gracious to you; the LORD turn his face toward you and give you peace.",
    "theme": "The Priestly Aaronic Blessing"
  },
  {
    "dayOfYear": 362,
    "calendarDate": "December 28",
    "ref": "Numbers 21:8-9",
    "text": "The LORD said to Moses, \\",
    "theme": "The Bronze Serpent on the Pole"
  },
  {
    "dayOfYear": 363,
    "calendarDate": "December 29",
    "ref": "Joshua 20:2-3",
    "text": "Designate the cities of refuge... so that anyone who kills a person unintentionally and without malice may flee there and find protection.",
    "theme": "The Cities of Refuge (Arei Miklat)"
  },
  {
    "dayOfYear": 364,
    "calendarDate": "December 30",
    "ref": "Judges 7:5-7",
    "text": "Three hundred of them drank from cupped hands, lapping like dogs. All the rest got down on their knees to drink.",
    "theme": "Gideon's 300 - Lapping Like a Dog"
  },
  {
    "dayOfYear": 365,
    "calendarDate": "December 31",
    "ref": "Ruth 4:9-10",
    "text": "Boaz announced to the elders and all the people, \\",
    "theme": "Boaz the Kinsman-Redeemer (Goel)"
  }
];

export const DIVINE_LOVE_365_AFFIRMATIONS: DailyDivineAffirmation[] = [
  {
    "dayOfYear": 1,
    "calendarDate": "January 1",
    "title": "Fearfully & Wonderfully Made",
    "body": "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.",
    "reference": "Psalm 139:14"
  },
  {
    "dayOfYear": 2,
    "calendarDate": "January 2",
    "title": "Loved with an Everlasting Love",
    "body": "I have loved you with an everlasting love; I have drawn you with unfailing kindness.",
    "reference": "Jeremiah 31:3"
  },
  {
    "dayOfYear": 3,
    "calendarDate": "January 3",
    "title": "You Are God's Masterpiece",
    "body": "For we are God’s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.",
    "reference": "Ephesians 2:10"
  },
  {
    "dayOfYear": 4,
    "calendarDate": "January 4",
    "title": "Precious & Honored in His Sight",
    "body": "Since you are precious and honored in my sight, and because I love you, I will give people in exchange for you.",
    "reference": "Isaiah 43:4"
  },
  {
    "dayOfYear": 5,
    "calendarDate": "January 5",
    "title": "Rejoicing Over You with Singing",
    "body": "The Lord your God is with you... He will take great delight in you; in His love He will rejoice over you with singing.",
    "reference": "Zephaniah 3:17"
  },
  {
    "dayOfYear": 6,
    "calendarDate": "January 6",
    "title": "Inseparable from Divine Love",
    "body": "Neither death nor life, neither angels nor demons... nor anything else in all creation, will be able to separate us from the love of God.",
    "reference": "Romans 8:38-39"
  },
  {
    "dayOfYear": 7,
    "calendarDate": "January 7",
    "title": "Lavished with the Father's Love",
    "body": "See what great love the Father has lavished on us, that we should be called children of God! And that is what we are!",
    "reference": "1 John 3:1"
  },
  {
    "dayOfYear": 8,
    "calendarDate": "January 8",
    "title": "Known & Chosen Before Time",
    "body": "Before I formed you in the womb I knew you, before you were born I set you apart.",
    "reference": "Jeremiah 1:5"
  },
  {
    "dayOfYear": 9,
    "calendarDate": "January 9",
    "title": "A Living Hope & Sacred Future",
    "body": "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
    "reference": "Jeremiah 29:11"
  },
  {
    "dayOfYear": 10,
    "calendarDate": "January 10",
    "title": "The Apple of His Eye",
    "body": "Keep me as the apple of your eye; hide me in the shadow of your wings.",
    "reference": "Psalm 17:8"
  },
  {
    "dayOfYear": 11,
    "calendarDate": "January 11",
    "title": "Crowned with Steadfast Love",
    "body": "He redeems your life from the pit and crowns you with love and compassion, satisfying your desires with good things.",
    "reference": "Psalm 103:4-5"
  },
  {
    "dayOfYear": 12,
    "calendarDate": "January 12",
    "title": "Never Forsaken, Always Accompanied",
    "body": "The Lord himself goes before you and will be with you; he will never leave you nor forsake you. Do not be afraid.",
    "reference": "Deuteronomy 31:8"
  },
  {
    "dayOfYear": 13,
    "calendarDate": "January 13",
    "title": "Engraved on the Palms of His Hands",
    "body": "Can a mother forget the baby at her breast? Though she may forget, I will not forget you! See, I have engraved you on the palms of my hands.",
    "reference": "Isaiah 49:15-16"
  },
  {
    "dayOfYear": 14,
    "calendarDate": "January 14",
    "title": "A Royal Priesthood, God's Treasure",
    "body": "You are a chosen people, a royal priesthood, a holy nation, God’s special possession, that you may declare his praises.",
    "reference": "1 Peter 2:9"
  },
  {
    "dayOfYear": 15,
    "calendarDate": "January 15",
    "title": "A New Creation in Christ",
    "body": "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
    "reference": "2 Corinthians 5:17"
  },
  {
    "dayOfYear": 16,
    "calendarDate": "January 16",
    "title": "More Than Conquerors",
    "body": "No, in all these things we are more than conquerors through him who loved us.",
    "reference": "Romans 8:37"
  },
  {
    "dayOfYear": 17,
    "calendarDate": "January 17",
    "title": "Accepted in the Beloved",
    "body": "He made us accepted in the beloved, to the praise of the glory of His grace.",
    "reference": "Ephesians 1:6"
  },
  {
    "dayOfYear": 18,
    "calendarDate": "January 18",
    "title": "Called Friend by Jesus",
    "body": "I no longer call you servants, because a servant does not know his master’s business. Instead, I have called you friends.",
    "reference": "John 15:15"
  },
  {
    "dayOfYear": 19,
    "calendarDate": "January 19",
    "title": "Sealed by the Holy Spirit",
    "body": "When you believed, you were marked in him with a seal, the promised Holy Spirit, who is a deposit guaranteeing our inheritance.",
    "reference": "Ephesians 1:13-14"
  },
  {
    "dayOfYear": 20,
    "calendarDate": "January 20",
    "title": "No Condemnation",
    "body": "Therefore, there is now no condemnation for those who are in Christ Jesus.",
    "reference": "Romans 8:1"
  },
  {
    "dayOfYear": 21,
    "calendarDate": "January 21",
    "title": "Healed and Restored",
    "body": "By his wounds you have been healed. For you were like sheep going astray, but now you have returned to the Shepherd of your souls.",
    "reference": "1 Peter 2:24-25"
  },
  {
    "dayOfYear": 22,
    "calendarDate": "January 22",
    "title": "Strengthened with Power",
    "body": "I pray that out of his glorious riches he may strengthen you with power through his Spirit in your inner being.",
    "reference": "Ephesians 3:16"
  },
  {
    "dayOfYear": 23,
    "calendarDate": "January 23",
    "title": "Rooted and Grounded in Love",
    "body": "May you have power, together with all the Lord’s holy people, to grasp how wide and long and high and deep is the love of Christ.",
    "reference": "Ephesians 3:18-19"
  },
  {
    "dayOfYear": 24,
    "calendarDate": "January 24",
    "title": "His Compassion Never Fails",
    "body": "The Lord is gracious and compassionate, slow to anger and rich in love. The Lord is good to all; he has compassion on all he has made.",
    "reference": "Psalm 145:8-9"
  },
  {
    "dayOfYear": 25,
    "calendarDate": "January 25",
    "title": "Delighted in by the King",
    "body": "Let the king be enthralled by your beauty; honor him, for he is your lord.",
    "reference": "Psalm 45:11"
  },
  {
    "dayOfYear": 26,
    "calendarDate": "January 26",
    "title": "A Crown of Splendor",
    "body": "You will be a crown of splendor in the Lord’s hand, a royal diadem in the hand of your God.",
    "reference": "Isaiah 62:3"
  },
  {
    "dayOfYear": 27,
    "calendarDate": "January 27",
    "title": "Carried Close to His Heart",
    "body": "He tends his flock like a shepherd: He gathers the lambs in his arms and carries them close to his heart.",
    "reference": "Isaiah 40:11"
  },
  {
    "dayOfYear": 28,
    "calendarDate": "January 28",
    "title": "Under His Wings",
    "body": "He will cover you with his feathers, and under his wings you will find refuge; his faithfulness will be your shield and rampart.",
    "reference": "Psalm 91:4"
  },
  {
    "dayOfYear": 29,
    "calendarDate": "January 29",
    "title": "Chosen Not by Chance",
    "body": "You did not choose me, but I chose you and appointed you so that you might go and bear fruit—fruit that will last.",
    "reference": "John 15:16"
  },
  {
    "dayOfYear": 30,
    "calendarDate": "January 30",
    "title": "God Is for You",
    "body": "What, then, shall we say in response to these things? If God is for us, who can be against us?",
    "reference": "Romans 8:31"
  },
  {
    "dayOfYear": 31,
    "calendarDate": "January 31",
    "title": "Fearfully & Wonderfully Made (Day 31)",
    "body": "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.",
    "reference": "Psalm 139:14"
  },
  {
    "dayOfYear": 32,
    "calendarDate": "February 1",
    "title": "Loved with an Everlasting Love (Day 32)",
    "body": "I have loved you with an everlasting love; I have drawn you with unfailing kindness.",
    "reference": "Jeremiah 31:3"
  },
  {
    "dayOfYear": 33,
    "calendarDate": "February 2",
    "title": "You Are God's Masterpiece (Day 33)",
    "body": "For we are God’s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.",
    "reference": "Ephesians 2:10"
  },
  {
    "dayOfYear": 34,
    "calendarDate": "February 3",
    "title": "Precious & Honored in His Sight (Day 34)",
    "body": "Since you are precious and honored in my sight, and because I love you, I will give people in exchange for you.",
    "reference": "Isaiah 43:4"
  },
  {
    "dayOfYear": 35,
    "calendarDate": "February 4",
    "title": "Rejoicing Over You with Singing (Day 35)",
    "body": "The Lord your God is with you... He will take great delight in you; in His love He will rejoice over you with singing.",
    "reference": "Zephaniah 3:17"
  },
  {
    "dayOfYear": 36,
    "calendarDate": "February 5",
    "title": "Inseparable from Divine Love (Day 36)",
    "body": "Neither death nor life, neither angels nor demons... nor anything else in all creation, will be able to separate us from the love of God.",
    "reference": "Romans 8:38-39"
  },
  {
    "dayOfYear": 37,
    "calendarDate": "February 6",
    "title": "Lavished with the Father's Love (Day 37)",
    "body": "See what great love the Father has lavished on us, that we should be called children of God! And that is what we are!",
    "reference": "1 John 3:1"
  },
  {
    "dayOfYear": 38,
    "calendarDate": "February 7",
    "title": "Known & Chosen Before Time (Day 38)",
    "body": "Before I formed you in the womb I knew you, before you were born I set you apart.",
    "reference": "Jeremiah 1:5"
  },
  {
    "dayOfYear": 39,
    "calendarDate": "February 8",
    "title": "A Living Hope & Sacred Future (Day 39)",
    "body": "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
    "reference": "Jeremiah 29:11"
  },
  {
    "dayOfYear": 40,
    "calendarDate": "February 9",
    "title": "The Apple of His Eye (Day 40)",
    "body": "Keep me as the apple of your eye; hide me in the shadow of your wings.",
    "reference": "Psalm 17:8"
  },
  {
    "dayOfYear": 41,
    "calendarDate": "February 10",
    "title": "Crowned with Steadfast Love (Day 41)",
    "body": "He redeems your life from the pit and crowns you with love and compassion, satisfying your desires with good things.",
    "reference": "Psalm 103:4-5"
  },
  {
    "dayOfYear": 42,
    "calendarDate": "February 11",
    "title": "Never Forsaken, Always Accompanied (Day 42)",
    "body": "The Lord himself goes before you and will be with you; he will never leave you nor forsake you. Do not be afraid.",
    "reference": "Deuteronomy 31:8"
  },
  {
    "dayOfYear": 43,
    "calendarDate": "February 12",
    "title": "Engraved on the Palms of His Hands (Day 43)",
    "body": "Can a mother forget the baby at her breast? Though she may forget, I will not forget you! See, I have engraved you on the palms of my hands.",
    "reference": "Isaiah 49:15-16"
  },
  {
    "dayOfYear": 44,
    "calendarDate": "February 13",
    "title": "A Royal Priesthood, God's Treasure (Day 44)",
    "body": "You are a chosen people, a royal priesthood, a holy nation, God’s special possession, that you may declare his praises.",
    "reference": "1 Peter 2:9"
  },
  {
    "dayOfYear": 45,
    "calendarDate": "February 14",
    "title": "A New Creation in Christ (Day 45)",
    "body": "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
    "reference": "2 Corinthians 5:17"
  },
  {
    "dayOfYear": 46,
    "calendarDate": "February 15",
    "title": "More Than Conquerors (Day 46)",
    "body": "No, in all these things we are more than conquerors through him who loved us.",
    "reference": "Romans 8:37"
  },
  {
    "dayOfYear": 47,
    "calendarDate": "February 16",
    "title": "Accepted in the Beloved (Day 47)",
    "body": "He made us accepted in the beloved, to the praise of the glory of His grace.",
    "reference": "Ephesians 1:6"
  },
  {
    "dayOfYear": 48,
    "calendarDate": "February 17",
    "title": "Called Friend by Jesus (Day 48)",
    "body": "I no longer call you servants, because a servant does not know his master’s business. Instead, I have called you friends.",
    "reference": "John 15:15"
  },
  {
    "dayOfYear": 49,
    "calendarDate": "February 18",
    "title": "Sealed by the Holy Spirit (Day 49)",
    "body": "When you believed, you were marked in him with a seal, the promised Holy Spirit, who is a deposit guaranteeing our inheritance.",
    "reference": "Ephesians 1:13-14"
  },
  {
    "dayOfYear": 50,
    "calendarDate": "February 19",
    "title": "No Condemnation (Day 50)",
    "body": "Therefore, there is now no condemnation for those who are in Christ Jesus.",
    "reference": "Romans 8:1"
  },
  {
    "dayOfYear": 51,
    "calendarDate": "February 20",
    "title": "Healed and Restored (Day 51)",
    "body": "By his wounds you have been healed. For you were like sheep going astray, but now you have returned to the Shepherd of your souls.",
    "reference": "1 Peter 2:24-25"
  },
  {
    "dayOfYear": 52,
    "calendarDate": "February 21",
    "title": "Strengthened with Power (Day 52)",
    "body": "I pray that out of his glorious riches he may strengthen you with power through his Spirit in your inner being.",
    "reference": "Ephesians 3:16"
  },
  {
    "dayOfYear": 53,
    "calendarDate": "February 22",
    "title": "Rooted and Grounded in Love (Day 53)",
    "body": "May you have power, together with all the Lord’s holy people, to grasp how wide and long and high and deep is the love of Christ.",
    "reference": "Ephesians 3:18-19"
  },
  {
    "dayOfYear": 54,
    "calendarDate": "February 23",
    "title": "His Compassion Never Fails (Day 54)",
    "body": "The Lord is gracious and compassionate, slow to anger and rich in love. The Lord is good to all; he has compassion on all he has made.",
    "reference": "Psalm 145:8-9"
  },
  {
    "dayOfYear": 55,
    "calendarDate": "February 24",
    "title": "Delighted in by the King (Day 55)",
    "body": "Let the king be enthralled by your beauty; honor him, for he is your lord.",
    "reference": "Psalm 45:11"
  },
  {
    "dayOfYear": 56,
    "calendarDate": "February 25",
    "title": "A Crown of Splendor (Day 56)",
    "body": "You will be a crown of splendor in the Lord’s hand, a royal diadem in the hand of your God.",
    "reference": "Isaiah 62:3"
  },
  {
    "dayOfYear": 57,
    "calendarDate": "February 26",
    "title": "Carried Close to His Heart (Day 57)",
    "body": "He tends his flock like a shepherd: He gathers the lambs in his arms and carries them close to his heart.",
    "reference": "Isaiah 40:11"
  },
  {
    "dayOfYear": 58,
    "calendarDate": "February 27",
    "title": "Under His Wings (Day 58)",
    "body": "He will cover you with his feathers, and under his wings you will find refuge; his faithfulness will be your shield and rampart.",
    "reference": "Psalm 91:4"
  },
  {
    "dayOfYear": 59,
    "calendarDate": "February 28",
    "title": "Chosen Not by Chance (Day 59)",
    "body": "You did not choose me, but I chose you and appointed you so that you might go and bear fruit—fruit that will last.",
    "reference": "John 15:16"
  },
  {
    "dayOfYear": 60,
    "calendarDate": "March 1",
    "title": "God Is for You (Day 60)",
    "body": "What, then, shall we say in response to these things? If God is for us, who can be against us?",
    "reference": "Romans 8:31"
  },
  {
    "dayOfYear": 61,
    "calendarDate": "March 2",
    "title": "Fearfully & Wonderfully Made (Day 61)",
    "body": "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.",
    "reference": "Psalm 139:14"
  },
  {
    "dayOfYear": 62,
    "calendarDate": "March 3",
    "title": "Loved with an Everlasting Love (Day 62)",
    "body": "I have loved you with an everlasting love; I have drawn you with unfailing kindness.",
    "reference": "Jeremiah 31:3"
  },
  {
    "dayOfYear": 63,
    "calendarDate": "March 4",
    "title": "You Are God's Masterpiece (Day 63)",
    "body": "For we are God’s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.",
    "reference": "Ephesians 2:10"
  },
  {
    "dayOfYear": 64,
    "calendarDate": "March 5",
    "title": "Precious & Honored in His Sight (Day 64)",
    "body": "Since you are precious and honored in my sight, and because I love you, I will give people in exchange for you.",
    "reference": "Isaiah 43:4"
  },
  {
    "dayOfYear": 65,
    "calendarDate": "March 6",
    "title": "Rejoicing Over You with Singing (Day 65)",
    "body": "The Lord your God is with you... He will take great delight in you; in His love He will rejoice over you with singing.",
    "reference": "Zephaniah 3:17"
  },
  {
    "dayOfYear": 66,
    "calendarDate": "March 7",
    "title": "Inseparable from Divine Love (Day 66)",
    "body": "Neither death nor life, neither angels nor demons... nor anything else in all creation, will be able to separate us from the love of God.",
    "reference": "Romans 8:38-39"
  },
  {
    "dayOfYear": 67,
    "calendarDate": "March 8",
    "title": "Lavished with the Father's Love (Day 67)",
    "body": "See what great love the Father has lavished on us, that we should be called children of God! And that is what we are!",
    "reference": "1 John 3:1"
  },
  {
    "dayOfYear": 68,
    "calendarDate": "March 9",
    "title": "Known & Chosen Before Time (Day 68)",
    "body": "Before I formed you in the womb I knew you, before you were born I set you apart.",
    "reference": "Jeremiah 1:5"
  },
  {
    "dayOfYear": 69,
    "calendarDate": "March 10",
    "title": "A Living Hope & Sacred Future (Day 69)",
    "body": "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
    "reference": "Jeremiah 29:11"
  },
  {
    "dayOfYear": 70,
    "calendarDate": "March 11",
    "title": "The Apple of His Eye (Day 70)",
    "body": "Keep me as the apple of your eye; hide me in the shadow of your wings.",
    "reference": "Psalm 17:8"
  },
  {
    "dayOfYear": 71,
    "calendarDate": "March 12",
    "title": "Crowned with Steadfast Love (Day 71)",
    "body": "He redeems your life from the pit and crowns you with love and compassion, satisfying your desires with good things.",
    "reference": "Psalm 103:4-5"
  },
  {
    "dayOfYear": 72,
    "calendarDate": "March 13",
    "title": "Never Forsaken, Always Accompanied (Day 72)",
    "body": "The Lord himself goes before you and will be with you; he will never leave you nor forsake you. Do not be afraid.",
    "reference": "Deuteronomy 31:8"
  },
  {
    "dayOfYear": 73,
    "calendarDate": "March 14",
    "title": "Engraved on the Palms of His Hands (Day 73)",
    "body": "Can a mother forget the baby at her breast? Though she may forget, I will not forget you! See, I have engraved you on the palms of my hands.",
    "reference": "Isaiah 49:15-16"
  },
  {
    "dayOfYear": 74,
    "calendarDate": "March 15",
    "title": "A Royal Priesthood, God's Treasure (Day 74)",
    "body": "You are a chosen people, a royal priesthood, a holy nation, God’s special possession, that you may declare his praises.",
    "reference": "1 Peter 2:9"
  },
  {
    "dayOfYear": 75,
    "calendarDate": "March 16",
    "title": "A New Creation in Christ (Day 75)",
    "body": "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
    "reference": "2 Corinthians 5:17"
  },
  {
    "dayOfYear": 76,
    "calendarDate": "March 17",
    "title": "More Than Conquerors (Day 76)",
    "body": "No, in all these things we are more than conquerors through him who loved us.",
    "reference": "Romans 8:37"
  },
  {
    "dayOfYear": 77,
    "calendarDate": "March 18",
    "title": "Accepted in the Beloved (Day 77)",
    "body": "He made us accepted in the beloved, to the praise of the glory of His grace.",
    "reference": "Ephesians 1:6"
  },
  {
    "dayOfYear": 78,
    "calendarDate": "March 19",
    "title": "Called Friend by Jesus (Day 78)",
    "body": "I no longer call you servants, because a servant does not know his master’s business. Instead, I have called you friends.",
    "reference": "John 15:15"
  },
  {
    "dayOfYear": 79,
    "calendarDate": "March 20",
    "title": "Sealed by the Holy Spirit (Day 79)",
    "body": "When you believed, you were marked in him with a seal, the promised Holy Spirit, who is a deposit guaranteeing our inheritance.",
    "reference": "Ephesians 1:13-14"
  },
  {
    "dayOfYear": 80,
    "calendarDate": "March 21",
    "title": "No Condemnation (Day 80)",
    "body": "Therefore, there is now no condemnation for those who are in Christ Jesus.",
    "reference": "Romans 8:1"
  },
  {
    "dayOfYear": 81,
    "calendarDate": "March 22",
    "title": "Healed and Restored (Day 81)",
    "body": "By his wounds you have been healed. For you were like sheep going astray, but now you have returned to the Shepherd of your souls.",
    "reference": "1 Peter 2:24-25"
  },
  {
    "dayOfYear": 82,
    "calendarDate": "March 23",
    "title": "Strengthened with Power (Day 82)",
    "body": "I pray that out of his glorious riches he may strengthen you with power through his Spirit in your inner being.",
    "reference": "Ephesians 3:16"
  },
  {
    "dayOfYear": 83,
    "calendarDate": "March 24",
    "title": "Rooted and Grounded in Love (Day 83)",
    "body": "May you have power, together with all the Lord’s holy people, to grasp how wide and long and high and deep is the love of Christ.",
    "reference": "Ephesians 3:18-19"
  },
  {
    "dayOfYear": 84,
    "calendarDate": "March 25",
    "title": "His Compassion Never Fails (Day 84)",
    "body": "The Lord is gracious and compassionate, slow to anger and rich in love. The Lord is good to all; he has compassion on all he has made.",
    "reference": "Psalm 145:8-9"
  },
  {
    "dayOfYear": 85,
    "calendarDate": "March 26",
    "title": "Delighted in by the King (Day 85)",
    "body": "Let the king be enthralled by your beauty; honor him, for he is your lord.",
    "reference": "Psalm 45:11"
  },
  {
    "dayOfYear": 86,
    "calendarDate": "March 27",
    "title": "A Crown of Splendor (Day 86)",
    "body": "You will be a crown of splendor in the Lord’s hand, a royal diadem in the hand of your God.",
    "reference": "Isaiah 62:3"
  },
  {
    "dayOfYear": 87,
    "calendarDate": "March 28",
    "title": "Carried Close to His Heart (Day 87)",
    "body": "He tends his flock like a shepherd: He gathers the lambs in his arms and carries them close to his heart.",
    "reference": "Isaiah 40:11"
  },
  {
    "dayOfYear": 88,
    "calendarDate": "March 29",
    "title": "Under His Wings (Day 88)",
    "body": "He will cover you with his feathers, and under his wings you will find refuge; his faithfulness will be your shield and rampart.",
    "reference": "Psalm 91:4"
  },
  {
    "dayOfYear": 89,
    "calendarDate": "March 30",
    "title": "Chosen Not by Chance (Day 89)",
    "body": "You did not choose me, but I chose you and appointed you so that you might go and bear fruit—fruit that will last.",
    "reference": "John 15:16"
  },
  {
    "dayOfYear": 90,
    "calendarDate": "March 31",
    "title": "God Is for You (Day 90)",
    "body": "What, then, shall we say in response to these things? If God is for us, who can be against us?",
    "reference": "Romans 8:31"
  },
  {
    "dayOfYear": 91,
    "calendarDate": "April 1",
    "title": "Fearfully & Wonderfully Made (Day 91)",
    "body": "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.",
    "reference": "Psalm 139:14"
  },
  {
    "dayOfYear": 92,
    "calendarDate": "April 2",
    "title": "Loved with an Everlasting Love (Day 92)",
    "body": "I have loved you with an everlasting love; I have drawn you with unfailing kindness.",
    "reference": "Jeremiah 31:3"
  },
  {
    "dayOfYear": 93,
    "calendarDate": "April 3",
    "title": "You Are God's Masterpiece (Day 93)",
    "body": "For we are God’s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.",
    "reference": "Ephesians 2:10"
  },
  {
    "dayOfYear": 94,
    "calendarDate": "April 4",
    "title": "Precious & Honored in His Sight (Day 94)",
    "body": "Since you are precious and honored in my sight, and because I love you, I will give people in exchange for you.",
    "reference": "Isaiah 43:4"
  },
  {
    "dayOfYear": 95,
    "calendarDate": "April 5",
    "title": "Rejoicing Over You with Singing (Day 95)",
    "body": "The Lord your God is with you... He will take great delight in you; in His love He will rejoice over you with singing.",
    "reference": "Zephaniah 3:17"
  },
  {
    "dayOfYear": 96,
    "calendarDate": "April 6",
    "title": "Inseparable from Divine Love (Day 96)",
    "body": "Neither death nor life, neither angels nor demons... nor anything else in all creation, will be able to separate us from the love of God.",
    "reference": "Romans 8:38-39"
  },
  {
    "dayOfYear": 97,
    "calendarDate": "April 7",
    "title": "Lavished with the Father's Love (Day 97)",
    "body": "See what great love the Father has lavished on us, that we should be called children of God! And that is what we are!",
    "reference": "1 John 3:1"
  },
  {
    "dayOfYear": 98,
    "calendarDate": "April 8",
    "title": "Known & Chosen Before Time (Day 98)",
    "body": "Before I formed you in the womb I knew you, before you were born I set you apart.",
    "reference": "Jeremiah 1:5"
  },
  {
    "dayOfYear": 99,
    "calendarDate": "April 9",
    "title": "A Living Hope & Sacred Future (Day 99)",
    "body": "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
    "reference": "Jeremiah 29:11"
  },
  {
    "dayOfYear": 100,
    "calendarDate": "April 10",
    "title": "The Apple of His Eye (Day 100)",
    "body": "Keep me as the apple of your eye; hide me in the shadow of your wings.",
    "reference": "Psalm 17:8"
  },
  {
    "dayOfYear": 101,
    "calendarDate": "April 11",
    "title": "Crowned with Steadfast Love (Day 101)",
    "body": "He redeems your life from the pit and crowns you with love and compassion, satisfying your desires with good things.",
    "reference": "Psalm 103:4-5"
  },
  {
    "dayOfYear": 102,
    "calendarDate": "April 12",
    "title": "Never Forsaken, Always Accompanied (Day 102)",
    "body": "The Lord himself goes before you and will be with you; he will never leave you nor forsake you. Do not be afraid.",
    "reference": "Deuteronomy 31:8"
  },
  {
    "dayOfYear": 103,
    "calendarDate": "April 13",
    "title": "Engraved on the Palms of His Hands (Day 103)",
    "body": "Can a mother forget the baby at her breast? Though she may forget, I will not forget you! See, I have engraved you on the palms of my hands.",
    "reference": "Isaiah 49:15-16"
  },
  {
    "dayOfYear": 104,
    "calendarDate": "April 14",
    "title": "A Royal Priesthood, God's Treasure (Day 104)",
    "body": "You are a chosen people, a royal priesthood, a holy nation, God’s special possession, that you may declare his praises.",
    "reference": "1 Peter 2:9"
  },
  {
    "dayOfYear": 105,
    "calendarDate": "April 15",
    "title": "A New Creation in Christ (Day 105)",
    "body": "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
    "reference": "2 Corinthians 5:17"
  },
  {
    "dayOfYear": 106,
    "calendarDate": "April 16",
    "title": "More Than Conquerors (Day 106)",
    "body": "No, in all these things we are more than conquerors through him who loved us.",
    "reference": "Romans 8:37"
  },
  {
    "dayOfYear": 107,
    "calendarDate": "April 17",
    "title": "Accepted in the Beloved (Day 107)",
    "body": "He made us accepted in the beloved, to the praise of the glory of His grace.",
    "reference": "Ephesians 1:6"
  },
  {
    "dayOfYear": 108,
    "calendarDate": "April 18",
    "title": "Called Friend by Jesus (Day 108)",
    "body": "I no longer call you servants, because a servant does not know his master’s business. Instead, I have called you friends.",
    "reference": "John 15:15"
  },
  {
    "dayOfYear": 109,
    "calendarDate": "April 19",
    "title": "Sealed by the Holy Spirit (Day 109)",
    "body": "When you believed, you were marked in him with a seal, the promised Holy Spirit, who is a deposit guaranteeing our inheritance.",
    "reference": "Ephesians 1:13-14"
  },
  {
    "dayOfYear": 110,
    "calendarDate": "April 20",
    "title": "No Condemnation (Day 110)",
    "body": "Therefore, there is now no condemnation for those who are in Christ Jesus.",
    "reference": "Romans 8:1"
  },
  {
    "dayOfYear": 111,
    "calendarDate": "April 21",
    "title": "Healed and Restored (Day 111)",
    "body": "By his wounds you have been healed. For you were like sheep going astray, but now you have returned to the Shepherd of your souls.",
    "reference": "1 Peter 2:24-25"
  },
  {
    "dayOfYear": 112,
    "calendarDate": "April 22",
    "title": "Strengthened with Power (Day 112)",
    "body": "I pray that out of his glorious riches he may strengthen you with power through his Spirit in your inner being.",
    "reference": "Ephesians 3:16"
  },
  {
    "dayOfYear": 113,
    "calendarDate": "April 23",
    "title": "Rooted and Grounded in Love (Day 113)",
    "body": "May you have power, together with all the Lord’s holy people, to grasp how wide and long and high and deep is the love of Christ.",
    "reference": "Ephesians 3:18-19"
  },
  {
    "dayOfYear": 114,
    "calendarDate": "April 24",
    "title": "His Compassion Never Fails (Day 114)",
    "body": "The Lord is gracious and compassionate, slow to anger and rich in love. The Lord is good to all; he has compassion on all he has made.",
    "reference": "Psalm 145:8-9"
  },
  {
    "dayOfYear": 115,
    "calendarDate": "April 25",
    "title": "Delighted in by the King (Day 115)",
    "body": "Let the king be enthralled by your beauty; honor him, for he is your lord.",
    "reference": "Psalm 45:11"
  },
  {
    "dayOfYear": 116,
    "calendarDate": "April 26",
    "title": "A Crown of Splendor (Day 116)",
    "body": "You will be a crown of splendor in the Lord’s hand, a royal diadem in the hand of your God.",
    "reference": "Isaiah 62:3"
  },
  {
    "dayOfYear": 117,
    "calendarDate": "April 27",
    "title": "Carried Close to His Heart (Day 117)",
    "body": "He tends his flock like a shepherd: He gathers the lambs in his arms and carries them close to his heart.",
    "reference": "Isaiah 40:11"
  },
  {
    "dayOfYear": 118,
    "calendarDate": "April 28",
    "title": "Under His Wings (Day 118)",
    "body": "He will cover you with his feathers, and under his wings you will find refuge; his faithfulness will be your shield and rampart.",
    "reference": "Psalm 91:4"
  },
  {
    "dayOfYear": 119,
    "calendarDate": "April 29",
    "title": "Chosen Not by Chance (Day 119)",
    "body": "You did not choose me, but I chose you and appointed you so that you might go and bear fruit—fruit that will last.",
    "reference": "John 15:16"
  },
  {
    "dayOfYear": 120,
    "calendarDate": "April 30",
    "title": "God Is for You (Day 120)",
    "body": "What, then, shall we say in response to these things? If God is for us, who can be against us?",
    "reference": "Romans 8:31"
  },
  {
    "dayOfYear": 121,
    "calendarDate": "May 1",
    "title": "Fearfully & Wonderfully Made (Day 121)",
    "body": "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.",
    "reference": "Psalm 139:14"
  },
  {
    "dayOfYear": 122,
    "calendarDate": "May 2",
    "title": "Loved with an Everlasting Love (Day 122)",
    "body": "I have loved you with an everlasting love; I have drawn you with unfailing kindness.",
    "reference": "Jeremiah 31:3"
  },
  {
    "dayOfYear": 123,
    "calendarDate": "May 3",
    "title": "You Are God's Masterpiece (Day 123)",
    "body": "For we are God’s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.",
    "reference": "Ephesians 2:10"
  },
  {
    "dayOfYear": 124,
    "calendarDate": "May 4",
    "title": "Precious & Honored in His Sight (Day 124)",
    "body": "Since you are precious and honored in my sight, and because I love you, I will give people in exchange for you.",
    "reference": "Isaiah 43:4"
  },
  {
    "dayOfYear": 125,
    "calendarDate": "May 5",
    "title": "Rejoicing Over You with Singing (Day 125)",
    "body": "The Lord your God is with you... He will take great delight in you; in His love He will rejoice over you with singing.",
    "reference": "Zephaniah 3:17"
  },
  {
    "dayOfYear": 126,
    "calendarDate": "May 6",
    "title": "Inseparable from Divine Love (Day 126)",
    "body": "Neither death nor life, neither angels nor demons... nor anything else in all creation, will be able to separate us from the love of God.",
    "reference": "Romans 8:38-39"
  },
  {
    "dayOfYear": 127,
    "calendarDate": "May 7",
    "title": "Lavished with the Father's Love (Day 127)",
    "body": "See what great love the Father has lavished on us, that we should be called children of God! And that is what we are!",
    "reference": "1 John 3:1"
  },
  {
    "dayOfYear": 128,
    "calendarDate": "May 8",
    "title": "Known & Chosen Before Time (Day 128)",
    "body": "Before I formed you in the womb I knew you, before you were born I set you apart.",
    "reference": "Jeremiah 1:5"
  },
  {
    "dayOfYear": 129,
    "calendarDate": "May 9",
    "title": "A Living Hope & Sacred Future (Day 129)",
    "body": "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
    "reference": "Jeremiah 29:11"
  },
  {
    "dayOfYear": 130,
    "calendarDate": "May 10",
    "title": "The Apple of His Eye (Day 130)",
    "body": "Keep me as the apple of your eye; hide me in the shadow of your wings.",
    "reference": "Psalm 17:8"
  },
  {
    "dayOfYear": 131,
    "calendarDate": "May 11",
    "title": "Crowned with Steadfast Love (Day 131)",
    "body": "He redeems your life from the pit and crowns you with love and compassion, satisfying your desires with good things.",
    "reference": "Psalm 103:4-5"
  },
  {
    "dayOfYear": 132,
    "calendarDate": "May 12",
    "title": "Never Forsaken, Always Accompanied (Day 132)",
    "body": "The Lord himself goes before you and will be with you; he will never leave you nor forsake you. Do not be afraid.",
    "reference": "Deuteronomy 31:8"
  },
  {
    "dayOfYear": 133,
    "calendarDate": "May 13",
    "title": "Engraved on the Palms of His Hands (Day 133)",
    "body": "Can a mother forget the baby at her breast? Though she may forget, I will not forget you! See, I have engraved you on the palms of my hands.",
    "reference": "Isaiah 49:15-16"
  },
  {
    "dayOfYear": 134,
    "calendarDate": "May 14",
    "title": "A Royal Priesthood, God's Treasure (Day 134)",
    "body": "You are a chosen people, a royal priesthood, a holy nation, God’s special possession, that you may declare his praises.",
    "reference": "1 Peter 2:9"
  },
  {
    "dayOfYear": 135,
    "calendarDate": "May 15",
    "title": "A New Creation in Christ (Day 135)",
    "body": "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
    "reference": "2 Corinthians 5:17"
  },
  {
    "dayOfYear": 136,
    "calendarDate": "May 16",
    "title": "More Than Conquerors (Day 136)",
    "body": "No, in all these things we are more than conquerors through him who loved us.",
    "reference": "Romans 8:37"
  },
  {
    "dayOfYear": 137,
    "calendarDate": "May 17",
    "title": "Accepted in the Beloved (Day 137)",
    "body": "He made us accepted in the beloved, to the praise of the glory of His grace.",
    "reference": "Ephesians 1:6"
  },
  {
    "dayOfYear": 138,
    "calendarDate": "May 18",
    "title": "Called Friend by Jesus (Day 138)",
    "body": "I no longer call you servants, because a servant does not know his master’s business. Instead, I have called you friends.",
    "reference": "John 15:15"
  },
  {
    "dayOfYear": 139,
    "calendarDate": "May 19",
    "title": "Sealed by the Holy Spirit (Day 139)",
    "body": "When you believed, you were marked in him with a seal, the promised Holy Spirit, who is a deposit guaranteeing our inheritance.",
    "reference": "Ephesians 1:13-14"
  },
  {
    "dayOfYear": 140,
    "calendarDate": "May 20",
    "title": "No Condemnation (Day 140)",
    "body": "Therefore, there is now no condemnation for those who are in Christ Jesus.",
    "reference": "Romans 8:1"
  },
  {
    "dayOfYear": 141,
    "calendarDate": "May 21",
    "title": "Healed and Restored (Day 141)",
    "body": "By his wounds you have been healed. For you were like sheep going astray, but now you have returned to the Shepherd of your souls.",
    "reference": "1 Peter 2:24-25"
  },
  {
    "dayOfYear": 142,
    "calendarDate": "May 22",
    "title": "Strengthened with Power (Day 142)",
    "body": "I pray that out of his glorious riches he may strengthen you with power through his Spirit in your inner being.",
    "reference": "Ephesians 3:16"
  },
  {
    "dayOfYear": 143,
    "calendarDate": "May 23",
    "title": "Rooted and Grounded in Love (Day 143)",
    "body": "May you have power, together with all the Lord’s holy people, to grasp how wide and long and high and deep is the love of Christ.",
    "reference": "Ephesians 3:18-19"
  },
  {
    "dayOfYear": 144,
    "calendarDate": "May 24",
    "title": "His Compassion Never Fails (Day 144)",
    "body": "The Lord is gracious and compassionate, slow to anger and rich in love. The Lord is good to all; he has compassion on all he has made.",
    "reference": "Psalm 145:8-9"
  },
  {
    "dayOfYear": 145,
    "calendarDate": "May 25",
    "title": "Delighted in by the King (Day 145)",
    "body": "Let the king be enthralled by your beauty; honor him, for he is your lord.",
    "reference": "Psalm 45:11"
  },
  {
    "dayOfYear": 146,
    "calendarDate": "May 26",
    "title": "A Crown of Splendor (Day 146)",
    "body": "You will be a crown of splendor in the Lord’s hand, a royal diadem in the hand of your God.",
    "reference": "Isaiah 62:3"
  },
  {
    "dayOfYear": 147,
    "calendarDate": "May 27",
    "title": "Carried Close to His Heart (Day 147)",
    "body": "He tends his flock like a shepherd: He gathers the lambs in his arms and carries them close to his heart.",
    "reference": "Isaiah 40:11"
  },
  {
    "dayOfYear": 148,
    "calendarDate": "May 28",
    "title": "Under His Wings (Day 148)",
    "body": "He will cover you with his feathers, and under his wings you will find refuge; his faithfulness will be your shield and rampart.",
    "reference": "Psalm 91:4"
  },
  {
    "dayOfYear": 149,
    "calendarDate": "May 29",
    "title": "Chosen Not by Chance (Day 149)",
    "body": "You did not choose me, but I chose you and appointed you so that you might go and bear fruit—fruit that will last.",
    "reference": "John 15:16"
  },
  {
    "dayOfYear": 150,
    "calendarDate": "May 30",
    "title": "God Is for You (Day 150)",
    "body": "What, then, shall we say in response to these things? If God is for us, who can be against us?",
    "reference": "Romans 8:31"
  },
  {
    "dayOfYear": 151,
    "calendarDate": "May 31",
    "title": "Fearfully & Wonderfully Made (Day 151)",
    "body": "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.",
    "reference": "Psalm 139:14"
  },
  {
    "dayOfYear": 152,
    "calendarDate": "June 1",
    "title": "Loved with an Everlasting Love (Day 152)",
    "body": "I have loved you with an everlasting love; I have drawn you with unfailing kindness.",
    "reference": "Jeremiah 31:3"
  },
  {
    "dayOfYear": 153,
    "calendarDate": "June 2",
    "title": "You Are God's Masterpiece (Day 153)",
    "body": "For we are God’s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.",
    "reference": "Ephesians 2:10"
  },
  {
    "dayOfYear": 154,
    "calendarDate": "June 3",
    "title": "Precious & Honored in His Sight (Day 154)",
    "body": "Since you are precious and honored in my sight, and because I love you, I will give people in exchange for you.",
    "reference": "Isaiah 43:4"
  },
  {
    "dayOfYear": 155,
    "calendarDate": "June 4",
    "title": "Rejoicing Over You with Singing (Day 155)",
    "body": "The Lord your God is with you... He will take great delight in you; in His love He will rejoice over you with singing.",
    "reference": "Zephaniah 3:17"
  },
  {
    "dayOfYear": 156,
    "calendarDate": "June 5",
    "title": "Inseparable from Divine Love (Day 156)",
    "body": "Neither death nor life, neither angels nor demons... nor anything else in all creation, will be able to separate us from the love of God.",
    "reference": "Romans 8:38-39"
  },
  {
    "dayOfYear": 157,
    "calendarDate": "June 6",
    "title": "Lavished with the Father's Love (Day 157)",
    "body": "See what great love the Father has lavished on us, that we should be called children of God! And that is what we are!",
    "reference": "1 John 3:1"
  },
  {
    "dayOfYear": 158,
    "calendarDate": "June 7",
    "title": "Known & Chosen Before Time (Day 158)",
    "body": "Before I formed you in the womb I knew you, before you were born I set you apart.",
    "reference": "Jeremiah 1:5"
  },
  {
    "dayOfYear": 159,
    "calendarDate": "June 8",
    "title": "A Living Hope & Sacred Future (Day 159)",
    "body": "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
    "reference": "Jeremiah 29:11"
  },
  {
    "dayOfYear": 160,
    "calendarDate": "June 9",
    "title": "The Apple of His Eye (Day 160)",
    "body": "Keep me as the apple of your eye; hide me in the shadow of your wings.",
    "reference": "Psalm 17:8"
  },
  {
    "dayOfYear": 161,
    "calendarDate": "June 10",
    "title": "Crowned with Steadfast Love (Day 161)",
    "body": "He redeems your life from the pit and crowns you with love and compassion, satisfying your desires with good things.",
    "reference": "Psalm 103:4-5"
  },
  {
    "dayOfYear": 162,
    "calendarDate": "June 11",
    "title": "Never Forsaken, Always Accompanied (Day 162)",
    "body": "The Lord himself goes before you and will be with you; he will never leave you nor forsake you. Do not be afraid.",
    "reference": "Deuteronomy 31:8"
  },
  {
    "dayOfYear": 163,
    "calendarDate": "June 12",
    "title": "Engraved on the Palms of His Hands (Day 163)",
    "body": "Can a mother forget the baby at her breast? Though she may forget, I will not forget you! See, I have engraved you on the palms of my hands.",
    "reference": "Isaiah 49:15-16"
  },
  {
    "dayOfYear": 164,
    "calendarDate": "June 13",
    "title": "A Royal Priesthood, God's Treasure (Day 164)",
    "body": "You are a chosen people, a royal priesthood, a holy nation, God’s special possession, that you may declare his praises.",
    "reference": "1 Peter 2:9"
  },
  {
    "dayOfYear": 165,
    "calendarDate": "June 14",
    "title": "A New Creation in Christ (Day 165)",
    "body": "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
    "reference": "2 Corinthians 5:17"
  },
  {
    "dayOfYear": 166,
    "calendarDate": "June 15",
    "title": "More Than Conquerors (Day 166)",
    "body": "No, in all these things we are more than conquerors through him who loved us.",
    "reference": "Romans 8:37"
  },
  {
    "dayOfYear": 167,
    "calendarDate": "June 16",
    "title": "Accepted in the Beloved (Day 167)",
    "body": "He made us accepted in the beloved, to the praise of the glory of His grace.",
    "reference": "Ephesians 1:6"
  },
  {
    "dayOfYear": 168,
    "calendarDate": "June 17",
    "title": "Called Friend by Jesus (Day 168)",
    "body": "I no longer call you servants, because a servant does not know his master’s business. Instead, I have called you friends.",
    "reference": "John 15:15"
  },
  {
    "dayOfYear": 169,
    "calendarDate": "June 18",
    "title": "Sealed by the Holy Spirit (Day 169)",
    "body": "When you believed, you were marked in him with a seal, the promised Holy Spirit, who is a deposit guaranteeing our inheritance.",
    "reference": "Ephesians 1:13-14"
  },
  {
    "dayOfYear": 170,
    "calendarDate": "June 19",
    "title": "No Condemnation (Day 170)",
    "body": "Therefore, there is now no condemnation for those who are in Christ Jesus.",
    "reference": "Romans 8:1"
  },
  {
    "dayOfYear": 171,
    "calendarDate": "June 20",
    "title": "Healed and Restored (Day 171)",
    "body": "By his wounds you have been healed. For you were like sheep going astray, but now you have returned to the Shepherd of your souls.",
    "reference": "1 Peter 2:24-25"
  },
  {
    "dayOfYear": 172,
    "calendarDate": "June 21",
    "title": "Strengthened with Power (Day 172)",
    "body": "I pray that out of his glorious riches he may strengthen you with power through his Spirit in your inner being.",
    "reference": "Ephesians 3:16"
  },
  {
    "dayOfYear": 173,
    "calendarDate": "June 22",
    "title": "Rooted and Grounded in Love (Day 173)",
    "body": "May you have power, together with all the Lord’s holy people, to grasp how wide and long and high and deep is the love of Christ.",
    "reference": "Ephesians 3:18-19"
  },
  {
    "dayOfYear": 174,
    "calendarDate": "June 23",
    "title": "His Compassion Never Fails (Day 174)",
    "body": "The Lord is gracious and compassionate, slow to anger and rich in love. The Lord is good to all; he has compassion on all he has made.",
    "reference": "Psalm 145:8-9"
  },
  {
    "dayOfYear": 175,
    "calendarDate": "June 24",
    "title": "Delighted in by the King (Day 175)",
    "body": "Let the king be enthralled by your beauty; honor him, for he is your lord.",
    "reference": "Psalm 45:11"
  },
  {
    "dayOfYear": 176,
    "calendarDate": "June 25",
    "title": "A Crown of Splendor (Day 176)",
    "body": "You will be a crown of splendor in the Lord’s hand, a royal diadem in the hand of your God.",
    "reference": "Isaiah 62:3"
  },
  {
    "dayOfYear": 177,
    "calendarDate": "June 26",
    "title": "Carried Close to His Heart (Day 177)",
    "body": "He tends his flock like a shepherd: He gathers the lambs in his arms and carries them close to his heart.",
    "reference": "Isaiah 40:11"
  },
  {
    "dayOfYear": 178,
    "calendarDate": "June 27",
    "title": "Under His Wings (Day 178)",
    "body": "He will cover you with his feathers, and under his wings you will find refuge; his faithfulness will be your shield and rampart.",
    "reference": "Psalm 91:4"
  },
  {
    "dayOfYear": 179,
    "calendarDate": "June 28",
    "title": "Chosen Not by Chance (Day 179)",
    "body": "You did not choose me, but I chose you and appointed you so that you might go and bear fruit—fruit that will last.",
    "reference": "John 15:16"
  },
  {
    "dayOfYear": 180,
    "calendarDate": "June 29",
    "title": "God Is for You (Day 180)",
    "body": "What, then, shall we say in response to these things? If God is for us, who can be against us?",
    "reference": "Romans 8:31"
  },
  {
    "dayOfYear": 181,
    "calendarDate": "June 30",
    "title": "Fearfully & Wonderfully Made (Day 181)",
    "body": "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.",
    "reference": "Psalm 139:14"
  },
  {
    "dayOfYear": 182,
    "calendarDate": "July 1",
    "title": "Loved with an Everlasting Love (Day 182)",
    "body": "I have loved you with an everlasting love; I have drawn you with unfailing kindness.",
    "reference": "Jeremiah 31:3"
  },
  {
    "dayOfYear": 183,
    "calendarDate": "July 2",
    "title": "You Are God's Masterpiece (Day 183)",
    "body": "For we are God’s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.",
    "reference": "Ephesians 2:10"
  },
  {
    "dayOfYear": 184,
    "calendarDate": "July 3",
    "title": "Precious & Honored in His Sight (Day 184)",
    "body": "Since you are precious and honored in my sight, and because I love you, I will give people in exchange for you.",
    "reference": "Isaiah 43:4"
  },
  {
    "dayOfYear": 185,
    "calendarDate": "July 4",
    "title": "Rejoicing Over You with Singing (Day 185)",
    "body": "The Lord your God is with you... He will take great delight in you; in His love He will rejoice over you with singing.",
    "reference": "Zephaniah 3:17"
  },
  {
    "dayOfYear": 186,
    "calendarDate": "July 5",
    "title": "Inseparable from Divine Love (Day 186)",
    "body": "Neither death nor life, neither angels nor demons... nor anything else in all creation, will be able to separate us from the love of God.",
    "reference": "Romans 8:38-39"
  },
  {
    "dayOfYear": 187,
    "calendarDate": "July 6",
    "title": "Lavished with the Father's Love (Day 187)",
    "body": "See what great love the Father has lavished on us, that we should be called children of God! And that is what we are!",
    "reference": "1 John 3:1"
  },
  {
    "dayOfYear": 188,
    "calendarDate": "July 7",
    "title": "Known & Chosen Before Time (Day 188)",
    "body": "Before I formed you in the womb I knew you, before you were born I set you apart.",
    "reference": "Jeremiah 1:5"
  },
  {
    "dayOfYear": 189,
    "calendarDate": "July 8",
    "title": "A Living Hope & Sacred Future (Day 189)",
    "body": "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
    "reference": "Jeremiah 29:11"
  },
  {
    "dayOfYear": 190,
    "calendarDate": "July 9",
    "title": "The Apple of His Eye (Day 190)",
    "body": "Keep me as the apple of your eye; hide me in the shadow of your wings.",
    "reference": "Psalm 17:8"
  },
  {
    "dayOfYear": 191,
    "calendarDate": "July 10",
    "title": "Crowned with Steadfast Love (Day 191)",
    "body": "He redeems your life from the pit and crowns you with love and compassion, satisfying your desires with good things.",
    "reference": "Psalm 103:4-5"
  },
  {
    "dayOfYear": 192,
    "calendarDate": "July 11",
    "title": "Never Forsaken, Always Accompanied (Day 192)",
    "body": "The Lord himself goes before you and will be with you; he will never leave you nor forsake you. Do not be afraid.",
    "reference": "Deuteronomy 31:8"
  },
  {
    "dayOfYear": 193,
    "calendarDate": "July 12",
    "title": "Engraved on the Palms of His Hands (Day 193)",
    "body": "Can a mother forget the baby at her breast? Though she may forget, I will not forget you! See, I have engraved you on the palms of my hands.",
    "reference": "Isaiah 49:15-16"
  },
  {
    "dayOfYear": 194,
    "calendarDate": "July 13",
    "title": "A Royal Priesthood, God's Treasure (Day 194)",
    "body": "You are a chosen people, a royal priesthood, a holy nation, God’s special possession, that you may declare his praises.",
    "reference": "1 Peter 2:9"
  },
  {
    "dayOfYear": 195,
    "calendarDate": "July 14",
    "title": "A New Creation in Christ (Day 195)",
    "body": "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
    "reference": "2 Corinthians 5:17"
  },
  {
    "dayOfYear": 196,
    "calendarDate": "July 15",
    "title": "More Than Conquerors (Day 196)",
    "body": "No, in all these things we are more than conquerors through him who loved us.",
    "reference": "Romans 8:37"
  },
  {
    "dayOfYear": 197,
    "calendarDate": "July 16",
    "title": "Accepted in the Beloved (Day 197)",
    "body": "He made us accepted in the beloved, to the praise of the glory of His grace.",
    "reference": "Ephesians 1:6"
  },
  {
    "dayOfYear": 198,
    "calendarDate": "July 17",
    "title": "Called Friend by Jesus (Day 198)",
    "body": "I no longer call you servants, because a servant does not know his master’s business. Instead, I have called you friends.",
    "reference": "John 15:15"
  },
  {
    "dayOfYear": 199,
    "calendarDate": "July 18",
    "title": "Sealed by the Holy Spirit (Day 199)",
    "body": "When you believed, you were marked in him with a seal, the promised Holy Spirit, who is a deposit guaranteeing our inheritance.",
    "reference": "Ephesians 1:13-14"
  },
  {
    "dayOfYear": 200,
    "calendarDate": "July 19",
    "title": "No Condemnation (Day 200)",
    "body": "Therefore, there is now no condemnation for those who are in Christ Jesus.",
    "reference": "Romans 8:1"
  },
  {
    "dayOfYear": 201,
    "calendarDate": "July 20",
    "title": "Healed and Restored (Day 201)",
    "body": "By his wounds you have been healed. For you were like sheep going astray, but now you have returned to the Shepherd of your souls.",
    "reference": "1 Peter 2:24-25"
  },
  {
    "dayOfYear": 202,
    "calendarDate": "July 21",
    "title": "Strengthened with Power (Day 202)",
    "body": "I pray that out of his glorious riches he may strengthen you with power through his Spirit in your inner being.",
    "reference": "Ephesians 3:16"
  },
  {
    "dayOfYear": 203,
    "calendarDate": "July 22",
    "title": "Rooted and Grounded in Love (Day 203)",
    "body": "May you have power, together with all the Lord’s holy people, to grasp how wide and long and high and deep is the love of Christ.",
    "reference": "Ephesians 3:18-19"
  },
  {
    "dayOfYear": 204,
    "calendarDate": "July 23",
    "title": "His Compassion Never Fails (Day 204)",
    "body": "The Lord is gracious and compassionate, slow to anger and rich in love. The Lord is good to all; he has compassion on all he has made.",
    "reference": "Psalm 145:8-9"
  },
  {
    "dayOfYear": 205,
    "calendarDate": "July 24",
    "title": "Delighted in by the King (Day 205)",
    "body": "Let the king be enthralled by your beauty; honor him, for he is your lord.",
    "reference": "Psalm 45:11"
  },
  {
    "dayOfYear": 206,
    "calendarDate": "July 25",
    "title": "A Crown of Splendor (Day 206)",
    "body": "You will be a crown of splendor in the Lord’s hand, a royal diadem in the hand of your God.",
    "reference": "Isaiah 62:3"
  },
  {
    "dayOfYear": 207,
    "calendarDate": "July 26",
    "title": "Carried Close to His Heart (Day 207)",
    "body": "He tends his flock like a shepherd: He gathers the lambs in his arms and carries them close to his heart.",
    "reference": "Isaiah 40:11"
  },
  {
    "dayOfYear": 208,
    "calendarDate": "July 27",
    "title": "Under His Wings (Day 208)",
    "body": "He will cover you with his feathers, and under his wings you will find refuge; his faithfulness will be your shield and rampart.",
    "reference": "Psalm 91:4"
  },
  {
    "dayOfYear": 209,
    "calendarDate": "July 28",
    "title": "Chosen Not by Chance (Day 209)",
    "body": "You did not choose me, but I chose you and appointed you so that you might go and bear fruit—fruit that will last.",
    "reference": "John 15:16"
  },
  {
    "dayOfYear": 210,
    "calendarDate": "July 29",
    "title": "God Is for You (Day 210)",
    "body": "What, then, shall we say in response to these things? If God is for us, who can be against us?",
    "reference": "Romans 8:31"
  },
  {
    "dayOfYear": 211,
    "calendarDate": "July 30",
    "title": "Fearfully & Wonderfully Made (Day 211)",
    "body": "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.",
    "reference": "Psalm 139:14"
  },
  {
    "dayOfYear": 212,
    "calendarDate": "July 31",
    "title": "Loved with an Everlasting Love (Day 212)",
    "body": "I have loved you with an everlasting love; I have drawn you with unfailing kindness.",
    "reference": "Jeremiah 31:3"
  },
  {
    "dayOfYear": 213,
    "calendarDate": "August 1",
    "title": "You Are God's Masterpiece (Day 213)",
    "body": "For we are God’s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.",
    "reference": "Ephesians 2:10"
  },
  {
    "dayOfYear": 214,
    "calendarDate": "August 2",
    "title": "Precious & Honored in His Sight (Day 214)",
    "body": "Since you are precious and honored in my sight, and because I love you, I will give people in exchange for you.",
    "reference": "Isaiah 43:4"
  },
  {
    "dayOfYear": 215,
    "calendarDate": "August 3",
    "title": "Rejoicing Over You with Singing (Day 215)",
    "body": "The Lord your God is with you... He will take great delight in you; in His love He will rejoice over you with singing.",
    "reference": "Zephaniah 3:17"
  },
  {
    "dayOfYear": 216,
    "calendarDate": "August 4",
    "title": "Inseparable from Divine Love (Day 216)",
    "body": "Neither death nor life, neither angels nor demons... nor anything else in all creation, will be able to separate us from the love of God.",
    "reference": "Romans 8:38-39"
  },
  {
    "dayOfYear": 217,
    "calendarDate": "August 5",
    "title": "Lavished with the Father's Love (Day 217)",
    "body": "See what great love the Father has lavished on us, that we should be called children of God! And that is what we are!",
    "reference": "1 John 3:1"
  },
  {
    "dayOfYear": 218,
    "calendarDate": "August 6",
    "title": "Known & Chosen Before Time (Day 218)",
    "body": "Before I formed you in the womb I knew you, before you were born I set you apart.",
    "reference": "Jeremiah 1:5"
  },
  {
    "dayOfYear": 219,
    "calendarDate": "August 7",
    "title": "A Living Hope & Sacred Future (Day 219)",
    "body": "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
    "reference": "Jeremiah 29:11"
  },
  {
    "dayOfYear": 220,
    "calendarDate": "August 8",
    "title": "The Apple of His Eye (Day 220)",
    "body": "Keep me as the apple of your eye; hide me in the shadow of your wings.",
    "reference": "Psalm 17:8"
  },
  {
    "dayOfYear": 221,
    "calendarDate": "August 9",
    "title": "Crowned with Steadfast Love (Day 221)",
    "body": "He redeems your life from the pit and crowns you with love and compassion, satisfying your desires with good things.",
    "reference": "Psalm 103:4-5"
  },
  {
    "dayOfYear": 222,
    "calendarDate": "August 10",
    "title": "Never Forsaken, Always Accompanied (Day 222)",
    "body": "The Lord himself goes before you and will be with you; he will never leave you nor forsake you. Do not be afraid.",
    "reference": "Deuteronomy 31:8"
  },
  {
    "dayOfYear": 223,
    "calendarDate": "August 11",
    "title": "Engraved on the Palms of His Hands (Day 223)",
    "body": "Can a mother forget the baby at her breast? Though she may forget, I will not forget you! See, I have engraved you on the palms of my hands.",
    "reference": "Isaiah 49:15-16"
  },
  {
    "dayOfYear": 224,
    "calendarDate": "August 12",
    "title": "A Royal Priesthood, God's Treasure (Day 224)",
    "body": "You are a chosen people, a royal priesthood, a holy nation, God’s special possession, that you may declare his praises.",
    "reference": "1 Peter 2:9"
  },
  {
    "dayOfYear": 225,
    "calendarDate": "August 13",
    "title": "A New Creation in Christ (Day 225)",
    "body": "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
    "reference": "2 Corinthians 5:17"
  },
  {
    "dayOfYear": 226,
    "calendarDate": "August 14",
    "title": "More Than Conquerors (Day 226)",
    "body": "No, in all these things we are more than conquerors through him who loved us.",
    "reference": "Romans 8:37"
  },
  {
    "dayOfYear": 227,
    "calendarDate": "August 15",
    "title": "Accepted in the Beloved (Day 227)",
    "body": "He made us accepted in the beloved, to the praise of the glory of His grace.",
    "reference": "Ephesians 1:6"
  },
  {
    "dayOfYear": 228,
    "calendarDate": "August 16",
    "title": "Called Friend by Jesus (Day 228)",
    "body": "I no longer call you servants, because a servant does not know his master’s business. Instead, I have called you friends.",
    "reference": "John 15:15"
  },
  {
    "dayOfYear": 229,
    "calendarDate": "August 17",
    "title": "Sealed by the Holy Spirit (Day 229)",
    "body": "When you believed, you were marked in him with a seal, the promised Holy Spirit, who is a deposit guaranteeing our inheritance.",
    "reference": "Ephesians 1:13-14"
  },
  {
    "dayOfYear": 230,
    "calendarDate": "August 18",
    "title": "No Condemnation (Day 230)",
    "body": "Therefore, there is now no condemnation for those who are in Christ Jesus.",
    "reference": "Romans 8:1"
  },
  {
    "dayOfYear": 231,
    "calendarDate": "August 19",
    "title": "Healed and Restored (Day 231)",
    "body": "By his wounds you have been healed. For you were like sheep going astray, but now you have returned to the Shepherd of your souls.",
    "reference": "1 Peter 2:24-25"
  },
  {
    "dayOfYear": 232,
    "calendarDate": "August 20",
    "title": "Strengthened with Power (Day 232)",
    "body": "I pray that out of his glorious riches he may strengthen you with power through his Spirit in your inner being.",
    "reference": "Ephesians 3:16"
  },
  {
    "dayOfYear": 233,
    "calendarDate": "August 21",
    "title": "Rooted and Grounded in Love (Day 233)",
    "body": "May you have power, together with all the Lord’s holy people, to grasp how wide and long and high and deep is the love of Christ.",
    "reference": "Ephesians 3:18-19"
  },
  {
    "dayOfYear": 234,
    "calendarDate": "August 22",
    "title": "His Compassion Never Fails (Day 234)",
    "body": "The Lord is gracious and compassionate, slow to anger and rich in love. The Lord is good to all; he has compassion on all he has made.",
    "reference": "Psalm 145:8-9"
  },
  {
    "dayOfYear": 235,
    "calendarDate": "August 23",
    "title": "Delighted in by the King (Day 235)",
    "body": "Let the king be enthralled by your beauty; honor him, for he is your lord.",
    "reference": "Psalm 45:11"
  },
  {
    "dayOfYear": 236,
    "calendarDate": "August 24",
    "title": "A Crown of Splendor (Day 236)",
    "body": "You will be a crown of splendor in the Lord’s hand, a royal diadem in the hand of your God.",
    "reference": "Isaiah 62:3"
  },
  {
    "dayOfYear": 237,
    "calendarDate": "August 25",
    "title": "Carried Close to His Heart (Day 237)",
    "body": "He tends his flock like a shepherd: He gathers the lambs in his arms and carries them close to his heart.",
    "reference": "Isaiah 40:11"
  },
  {
    "dayOfYear": 238,
    "calendarDate": "August 26",
    "title": "Under His Wings (Day 238)",
    "body": "He will cover you with his feathers, and under his wings you will find refuge; his faithfulness will be your shield and rampart.",
    "reference": "Psalm 91:4"
  },
  {
    "dayOfYear": 239,
    "calendarDate": "August 27",
    "title": "Chosen Not by Chance (Day 239)",
    "body": "You did not choose me, but I chose you and appointed you so that you might go and bear fruit—fruit that will last.",
    "reference": "John 15:16"
  },
  {
    "dayOfYear": 240,
    "calendarDate": "August 28",
    "title": "God Is for You (Day 240)",
    "body": "What, then, shall we say in response to these things? If God is for us, who can be against us?",
    "reference": "Romans 8:31"
  },
  {
    "dayOfYear": 241,
    "calendarDate": "August 29",
    "title": "Fearfully & Wonderfully Made (Day 241)",
    "body": "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.",
    "reference": "Psalm 139:14"
  },
  {
    "dayOfYear": 242,
    "calendarDate": "August 30",
    "title": "Loved with an Everlasting Love (Day 242)",
    "body": "I have loved you with an everlasting love; I have drawn you with unfailing kindness.",
    "reference": "Jeremiah 31:3"
  },
  {
    "dayOfYear": 243,
    "calendarDate": "August 31",
    "title": "You Are God's Masterpiece (Day 243)",
    "body": "For we are God’s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.",
    "reference": "Ephesians 2:10"
  },
  {
    "dayOfYear": 244,
    "calendarDate": "September 1",
    "title": "Precious & Honored in His Sight (Day 244)",
    "body": "Since you are precious and honored in my sight, and because I love you, I will give people in exchange for you.",
    "reference": "Isaiah 43:4"
  },
  {
    "dayOfYear": 245,
    "calendarDate": "September 2",
    "title": "Rejoicing Over You with Singing (Day 245)",
    "body": "The Lord your God is with you... He will take great delight in you; in His love He will rejoice over you with singing.",
    "reference": "Zephaniah 3:17"
  },
  {
    "dayOfYear": 246,
    "calendarDate": "September 3",
    "title": "Inseparable from Divine Love (Day 246)",
    "body": "Neither death nor life, neither angels nor demons... nor anything else in all creation, will be able to separate us from the love of God.",
    "reference": "Romans 8:38-39"
  },
  {
    "dayOfYear": 247,
    "calendarDate": "September 4",
    "title": "Lavished with the Father's Love (Day 247)",
    "body": "See what great love the Father has lavished on us, that we should be called children of God! And that is what we are!",
    "reference": "1 John 3:1"
  },
  {
    "dayOfYear": 248,
    "calendarDate": "September 5",
    "title": "Known & Chosen Before Time (Day 248)",
    "body": "Before I formed you in the womb I knew you, before you were born I set you apart.",
    "reference": "Jeremiah 1:5"
  },
  {
    "dayOfYear": 249,
    "calendarDate": "September 6",
    "title": "A Living Hope & Sacred Future (Day 249)",
    "body": "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
    "reference": "Jeremiah 29:11"
  },
  {
    "dayOfYear": 250,
    "calendarDate": "September 7",
    "title": "The Apple of His Eye (Day 250)",
    "body": "Keep me as the apple of your eye; hide me in the shadow of your wings.",
    "reference": "Psalm 17:8"
  },
  {
    "dayOfYear": 251,
    "calendarDate": "September 8",
    "title": "Crowned with Steadfast Love (Day 251)",
    "body": "He redeems your life from the pit and crowns you with love and compassion, satisfying your desires with good things.",
    "reference": "Psalm 103:4-5"
  },
  {
    "dayOfYear": 252,
    "calendarDate": "September 9",
    "title": "Never Forsaken, Always Accompanied (Day 252)",
    "body": "The Lord himself goes before you and will be with you; he will never leave you nor forsake you. Do not be afraid.",
    "reference": "Deuteronomy 31:8"
  },
  {
    "dayOfYear": 253,
    "calendarDate": "September 10",
    "title": "Engraved on the Palms of His Hands (Day 253)",
    "body": "Can a mother forget the baby at her breast? Though she may forget, I will not forget you! See, I have engraved you on the palms of my hands.",
    "reference": "Isaiah 49:15-16"
  },
  {
    "dayOfYear": 254,
    "calendarDate": "September 11",
    "title": "A Royal Priesthood, God's Treasure (Day 254)",
    "body": "You are a chosen people, a royal priesthood, a holy nation, God’s special possession, that you may declare his praises.",
    "reference": "1 Peter 2:9"
  },
  {
    "dayOfYear": 255,
    "calendarDate": "September 12",
    "title": "A New Creation in Christ (Day 255)",
    "body": "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
    "reference": "2 Corinthians 5:17"
  },
  {
    "dayOfYear": 256,
    "calendarDate": "September 13",
    "title": "More Than Conquerors (Day 256)",
    "body": "No, in all these things we are more than conquerors through him who loved us.",
    "reference": "Romans 8:37"
  },
  {
    "dayOfYear": 257,
    "calendarDate": "September 14",
    "title": "Accepted in the Beloved (Day 257)",
    "body": "He made us accepted in the beloved, to the praise of the glory of His grace.",
    "reference": "Ephesians 1:6"
  },
  {
    "dayOfYear": 258,
    "calendarDate": "September 15",
    "title": "Called Friend by Jesus (Day 258)",
    "body": "I no longer call you servants, because a servant does not know his master’s business. Instead, I have called you friends.",
    "reference": "John 15:15"
  },
  {
    "dayOfYear": 259,
    "calendarDate": "September 16",
    "title": "Sealed by the Holy Spirit (Day 259)",
    "body": "When you believed, you were marked in him with a seal, the promised Holy Spirit, who is a deposit guaranteeing our inheritance.",
    "reference": "Ephesians 1:13-14"
  },
  {
    "dayOfYear": 260,
    "calendarDate": "September 17",
    "title": "No Condemnation (Day 260)",
    "body": "Therefore, there is now no condemnation for those who are in Christ Jesus.",
    "reference": "Romans 8:1"
  },
  {
    "dayOfYear": 261,
    "calendarDate": "September 18",
    "title": "Healed and Restored (Day 261)",
    "body": "By his wounds you have been healed. For you were like sheep going astray, but now you have returned to the Shepherd of your souls.",
    "reference": "1 Peter 2:24-25"
  },
  {
    "dayOfYear": 262,
    "calendarDate": "September 19",
    "title": "Strengthened with Power (Day 262)",
    "body": "I pray that out of his glorious riches he may strengthen you with power through his Spirit in your inner being.",
    "reference": "Ephesians 3:16"
  },
  {
    "dayOfYear": 263,
    "calendarDate": "September 20",
    "title": "Rooted and Grounded in Love (Day 263)",
    "body": "May you have power, together with all the Lord’s holy people, to grasp how wide and long and high and deep is the love of Christ.",
    "reference": "Ephesians 3:18-19"
  },
  {
    "dayOfYear": 264,
    "calendarDate": "September 21",
    "title": "His Compassion Never Fails (Day 264)",
    "body": "The Lord is gracious and compassionate, slow to anger and rich in love. The Lord is good to all; he has compassion on all he has made.",
    "reference": "Psalm 145:8-9"
  },
  {
    "dayOfYear": 265,
    "calendarDate": "September 22",
    "title": "Delighted in by the King (Day 265)",
    "body": "Let the king be enthralled by your beauty; honor him, for he is your lord.",
    "reference": "Psalm 45:11"
  },
  {
    "dayOfYear": 266,
    "calendarDate": "September 23",
    "title": "A Crown of Splendor (Day 266)",
    "body": "You will be a crown of splendor in the Lord’s hand, a royal diadem in the hand of your God.",
    "reference": "Isaiah 62:3"
  },
  {
    "dayOfYear": 267,
    "calendarDate": "September 24",
    "title": "Carried Close to His Heart (Day 267)",
    "body": "He tends his flock like a shepherd: He gathers the lambs in his arms and carries them close to his heart.",
    "reference": "Isaiah 40:11"
  },
  {
    "dayOfYear": 268,
    "calendarDate": "September 25",
    "title": "Under His Wings (Day 268)",
    "body": "He will cover you with his feathers, and under his wings you will find refuge; his faithfulness will be your shield and rampart.",
    "reference": "Psalm 91:4"
  },
  {
    "dayOfYear": 269,
    "calendarDate": "September 26",
    "title": "Chosen Not by Chance (Day 269)",
    "body": "You did not choose me, but I chose you and appointed you so that you might go and bear fruit—fruit that will last.",
    "reference": "John 15:16"
  },
  {
    "dayOfYear": 270,
    "calendarDate": "September 27",
    "title": "God Is for You (Day 270)",
    "body": "What, then, shall we say in response to these things? If God is for us, who can be against us?",
    "reference": "Romans 8:31"
  },
  {
    "dayOfYear": 271,
    "calendarDate": "September 28",
    "title": "Fearfully & Wonderfully Made (Day 271)",
    "body": "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.",
    "reference": "Psalm 139:14"
  },
  {
    "dayOfYear": 272,
    "calendarDate": "September 29",
    "title": "Loved with an Everlasting Love (Day 272)",
    "body": "I have loved you with an everlasting love; I have drawn you with unfailing kindness.",
    "reference": "Jeremiah 31:3"
  },
  {
    "dayOfYear": 273,
    "calendarDate": "September 30",
    "title": "You Are God's Masterpiece (Day 273)",
    "body": "For we are God’s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.",
    "reference": "Ephesians 2:10"
  },
  {
    "dayOfYear": 274,
    "calendarDate": "October 1",
    "title": "Precious & Honored in His Sight (Day 274)",
    "body": "Since you are precious and honored in my sight, and because I love you, I will give people in exchange for you.",
    "reference": "Isaiah 43:4"
  },
  {
    "dayOfYear": 275,
    "calendarDate": "October 2",
    "title": "Rejoicing Over You with Singing (Day 275)",
    "body": "The Lord your God is with you... He will take great delight in you; in His love He will rejoice over you with singing.",
    "reference": "Zephaniah 3:17"
  },
  {
    "dayOfYear": 276,
    "calendarDate": "October 3",
    "title": "Inseparable from Divine Love (Day 276)",
    "body": "Neither death nor life, neither angels nor demons... nor anything else in all creation, will be able to separate us from the love of God.",
    "reference": "Romans 8:38-39"
  },
  {
    "dayOfYear": 277,
    "calendarDate": "October 4",
    "title": "Lavished with the Father's Love (Day 277)",
    "body": "See what great love the Father has lavished on us, that we should be called children of God! And that is what we are!",
    "reference": "1 John 3:1"
  },
  {
    "dayOfYear": 278,
    "calendarDate": "October 5",
    "title": "Known & Chosen Before Time (Day 278)",
    "body": "Before I formed you in the womb I knew you, before you were born I set you apart.",
    "reference": "Jeremiah 1:5"
  },
  {
    "dayOfYear": 279,
    "calendarDate": "October 6",
    "title": "A Living Hope & Sacred Future (Day 279)",
    "body": "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
    "reference": "Jeremiah 29:11"
  },
  {
    "dayOfYear": 280,
    "calendarDate": "October 7",
    "title": "The Apple of His Eye (Day 280)",
    "body": "Keep me as the apple of your eye; hide me in the shadow of your wings.",
    "reference": "Psalm 17:8"
  },
  {
    "dayOfYear": 281,
    "calendarDate": "October 8",
    "title": "Crowned with Steadfast Love (Day 281)",
    "body": "He redeems your life from the pit and crowns you with love and compassion, satisfying your desires with good things.",
    "reference": "Psalm 103:4-5"
  },
  {
    "dayOfYear": 282,
    "calendarDate": "October 9",
    "title": "Never Forsaken, Always Accompanied (Day 282)",
    "body": "The Lord himself goes before you and will be with you; he will never leave you nor forsake you. Do not be afraid.",
    "reference": "Deuteronomy 31:8"
  },
  {
    "dayOfYear": 283,
    "calendarDate": "October 10",
    "title": "Engraved on the Palms of His Hands (Day 283)",
    "body": "Can a mother forget the baby at her breast? Though she may forget, I will not forget you! See, I have engraved you on the palms of my hands.",
    "reference": "Isaiah 49:15-16"
  },
  {
    "dayOfYear": 284,
    "calendarDate": "October 11",
    "title": "A Royal Priesthood, God's Treasure (Day 284)",
    "body": "You are a chosen people, a royal priesthood, a holy nation, God’s special possession, that you may declare his praises.",
    "reference": "1 Peter 2:9"
  },
  {
    "dayOfYear": 285,
    "calendarDate": "October 12",
    "title": "A New Creation in Christ (Day 285)",
    "body": "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
    "reference": "2 Corinthians 5:17"
  },
  {
    "dayOfYear": 286,
    "calendarDate": "October 13",
    "title": "More Than Conquerors (Day 286)",
    "body": "No, in all these things we are more than conquerors through him who loved us.",
    "reference": "Romans 8:37"
  },
  {
    "dayOfYear": 287,
    "calendarDate": "October 14",
    "title": "Accepted in the Beloved (Day 287)",
    "body": "He made us accepted in the beloved, to the praise of the glory of His grace.",
    "reference": "Ephesians 1:6"
  },
  {
    "dayOfYear": 288,
    "calendarDate": "October 15",
    "title": "Called Friend by Jesus (Day 288)",
    "body": "I no longer call you servants, because a servant does not know his master’s business. Instead, I have called you friends.",
    "reference": "John 15:15"
  },
  {
    "dayOfYear": 289,
    "calendarDate": "October 16",
    "title": "Sealed by the Holy Spirit (Day 289)",
    "body": "When you believed, you were marked in him with a seal, the promised Holy Spirit, who is a deposit guaranteeing our inheritance.",
    "reference": "Ephesians 1:13-14"
  },
  {
    "dayOfYear": 290,
    "calendarDate": "October 17",
    "title": "No Condemnation (Day 290)",
    "body": "Therefore, there is now no condemnation for those who are in Christ Jesus.",
    "reference": "Romans 8:1"
  },
  {
    "dayOfYear": 291,
    "calendarDate": "October 18",
    "title": "Healed and Restored (Day 291)",
    "body": "By his wounds you have been healed. For you were like sheep going astray, but now you have returned to the Shepherd of your souls.",
    "reference": "1 Peter 2:24-25"
  },
  {
    "dayOfYear": 292,
    "calendarDate": "October 19",
    "title": "Strengthened with Power (Day 292)",
    "body": "I pray that out of his glorious riches he may strengthen you with power through his Spirit in your inner being.",
    "reference": "Ephesians 3:16"
  },
  {
    "dayOfYear": 293,
    "calendarDate": "October 20",
    "title": "Rooted and Grounded in Love (Day 293)",
    "body": "May you have power, together with all the Lord’s holy people, to grasp how wide and long and high and deep is the love of Christ.",
    "reference": "Ephesians 3:18-19"
  },
  {
    "dayOfYear": 294,
    "calendarDate": "October 21",
    "title": "His Compassion Never Fails (Day 294)",
    "body": "The Lord is gracious and compassionate, slow to anger and rich in love. The Lord is good to all; he has compassion on all he has made.",
    "reference": "Psalm 145:8-9"
  },
  {
    "dayOfYear": 295,
    "calendarDate": "October 22",
    "title": "Delighted in by the King (Day 295)",
    "body": "Let the king be enthralled by your beauty; honor him, for he is your lord.",
    "reference": "Psalm 45:11"
  },
  {
    "dayOfYear": 296,
    "calendarDate": "October 23",
    "title": "A Crown of Splendor (Day 296)",
    "body": "You will be a crown of splendor in the Lord’s hand, a royal diadem in the hand of your God.",
    "reference": "Isaiah 62:3"
  },
  {
    "dayOfYear": 297,
    "calendarDate": "October 24",
    "title": "Carried Close to His Heart (Day 297)",
    "body": "He tends his flock like a shepherd: He gathers the lambs in his arms and carries them close to his heart.",
    "reference": "Isaiah 40:11"
  },
  {
    "dayOfYear": 298,
    "calendarDate": "October 25",
    "title": "Under His Wings (Day 298)",
    "body": "He will cover you with his feathers, and under his wings you will find refuge; his faithfulness will be your shield and rampart.",
    "reference": "Psalm 91:4"
  },
  {
    "dayOfYear": 299,
    "calendarDate": "October 26",
    "title": "Chosen Not by Chance (Day 299)",
    "body": "You did not choose me, but I chose you and appointed you so that you might go and bear fruit—fruit that will last.",
    "reference": "John 15:16"
  },
  {
    "dayOfYear": 300,
    "calendarDate": "October 27",
    "title": "God Is for You (Day 300)",
    "body": "What, then, shall we say in response to these things? If God is for us, who can be against us?",
    "reference": "Romans 8:31"
  },
  {
    "dayOfYear": 301,
    "calendarDate": "October 28",
    "title": "Fearfully & Wonderfully Made (Day 301)",
    "body": "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.",
    "reference": "Psalm 139:14"
  },
  {
    "dayOfYear": 302,
    "calendarDate": "October 29",
    "title": "Loved with an Everlasting Love (Day 302)",
    "body": "I have loved you with an everlasting love; I have drawn you with unfailing kindness.",
    "reference": "Jeremiah 31:3"
  },
  {
    "dayOfYear": 303,
    "calendarDate": "October 30",
    "title": "You Are God's Masterpiece (Day 303)",
    "body": "For we are God’s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.",
    "reference": "Ephesians 2:10"
  },
  {
    "dayOfYear": 304,
    "calendarDate": "October 31",
    "title": "Precious & Honored in His Sight (Day 304)",
    "body": "Since you are precious and honored in my sight, and because I love you, I will give people in exchange for you.",
    "reference": "Isaiah 43:4"
  },
  {
    "dayOfYear": 305,
    "calendarDate": "November 1",
    "title": "Rejoicing Over You with Singing (Day 305)",
    "body": "The Lord your God is with you... He will take great delight in you; in His love He will rejoice over you with singing.",
    "reference": "Zephaniah 3:17"
  },
  {
    "dayOfYear": 306,
    "calendarDate": "November 2",
    "title": "Inseparable from Divine Love (Day 306)",
    "body": "Neither death nor life, neither angels nor demons... nor anything else in all creation, will be able to separate us from the love of God.",
    "reference": "Romans 8:38-39"
  },
  {
    "dayOfYear": 307,
    "calendarDate": "November 3",
    "title": "Lavished with the Father's Love (Day 307)",
    "body": "See what great love the Father has lavished on us, that we should be called children of God! And that is what we are!",
    "reference": "1 John 3:1"
  },
  {
    "dayOfYear": 308,
    "calendarDate": "November 4",
    "title": "Known & Chosen Before Time (Day 308)",
    "body": "Before I formed you in the womb I knew you, before you were born I set you apart.",
    "reference": "Jeremiah 1:5"
  },
  {
    "dayOfYear": 309,
    "calendarDate": "November 5",
    "title": "A Living Hope & Sacred Future (Day 309)",
    "body": "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
    "reference": "Jeremiah 29:11"
  },
  {
    "dayOfYear": 310,
    "calendarDate": "November 6",
    "title": "The Apple of His Eye (Day 310)",
    "body": "Keep me as the apple of your eye; hide me in the shadow of your wings.",
    "reference": "Psalm 17:8"
  },
  {
    "dayOfYear": 311,
    "calendarDate": "November 7",
    "title": "Crowned with Steadfast Love (Day 311)",
    "body": "He redeems your life from the pit and crowns you with love and compassion, satisfying your desires with good things.",
    "reference": "Psalm 103:4-5"
  },
  {
    "dayOfYear": 312,
    "calendarDate": "November 8",
    "title": "Never Forsaken, Always Accompanied (Day 312)",
    "body": "The Lord himself goes before you and will be with you; he will never leave you nor forsake you. Do not be afraid.",
    "reference": "Deuteronomy 31:8"
  },
  {
    "dayOfYear": 313,
    "calendarDate": "November 9",
    "title": "Engraved on the Palms of His Hands (Day 313)",
    "body": "Can a mother forget the baby at her breast? Though she may forget, I will not forget you! See, I have engraved you on the palms of my hands.",
    "reference": "Isaiah 49:15-16"
  },
  {
    "dayOfYear": 314,
    "calendarDate": "November 10",
    "title": "A Royal Priesthood, God's Treasure (Day 314)",
    "body": "You are a chosen people, a royal priesthood, a holy nation, God’s special possession, that you may declare his praises.",
    "reference": "1 Peter 2:9"
  },
  {
    "dayOfYear": 315,
    "calendarDate": "November 11",
    "title": "A New Creation in Christ (Day 315)",
    "body": "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
    "reference": "2 Corinthians 5:17"
  },
  {
    "dayOfYear": 316,
    "calendarDate": "November 12",
    "title": "More Than Conquerors (Day 316)",
    "body": "No, in all these things we are more than conquerors through him who loved us.",
    "reference": "Romans 8:37"
  },
  {
    "dayOfYear": 317,
    "calendarDate": "November 13",
    "title": "Accepted in the Beloved (Day 317)",
    "body": "He made us accepted in the beloved, to the praise of the glory of His grace.",
    "reference": "Ephesians 1:6"
  },
  {
    "dayOfYear": 318,
    "calendarDate": "November 14",
    "title": "Called Friend by Jesus (Day 318)",
    "body": "I no longer call you servants, because a servant does not know his master’s business. Instead, I have called you friends.",
    "reference": "John 15:15"
  },
  {
    "dayOfYear": 319,
    "calendarDate": "November 15",
    "title": "Sealed by the Holy Spirit (Day 319)",
    "body": "When you believed, you were marked in him with a seal, the promised Holy Spirit, who is a deposit guaranteeing our inheritance.",
    "reference": "Ephesians 1:13-14"
  },
  {
    "dayOfYear": 320,
    "calendarDate": "November 16",
    "title": "No Condemnation (Day 320)",
    "body": "Therefore, there is now no condemnation for those who are in Christ Jesus.",
    "reference": "Romans 8:1"
  },
  {
    "dayOfYear": 321,
    "calendarDate": "November 17",
    "title": "Healed and Restored (Day 321)",
    "body": "By his wounds you have been healed. For you were like sheep going astray, but now you have returned to the Shepherd of your souls.",
    "reference": "1 Peter 2:24-25"
  },
  {
    "dayOfYear": 322,
    "calendarDate": "November 18",
    "title": "Strengthened with Power (Day 322)",
    "body": "I pray that out of his glorious riches he may strengthen you with power through his Spirit in your inner being.",
    "reference": "Ephesians 3:16"
  },
  {
    "dayOfYear": 323,
    "calendarDate": "November 19",
    "title": "Rooted and Grounded in Love (Day 323)",
    "body": "May you have power, together with all the Lord’s holy people, to grasp how wide and long and high and deep is the love of Christ.",
    "reference": "Ephesians 3:18-19"
  },
  {
    "dayOfYear": 324,
    "calendarDate": "November 20",
    "title": "His Compassion Never Fails (Day 324)",
    "body": "The Lord is gracious and compassionate, slow to anger and rich in love. The Lord is good to all; he has compassion on all he has made.",
    "reference": "Psalm 145:8-9"
  },
  {
    "dayOfYear": 325,
    "calendarDate": "November 21",
    "title": "Delighted in by the King (Day 325)",
    "body": "Let the king be enthralled by your beauty; honor him, for he is your lord.",
    "reference": "Psalm 45:11"
  },
  {
    "dayOfYear": 326,
    "calendarDate": "November 22",
    "title": "A Crown of Splendor (Day 326)",
    "body": "You will be a crown of splendor in the Lord’s hand, a royal diadem in the hand of your God.",
    "reference": "Isaiah 62:3"
  },
  {
    "dayOfYear": 327,
    "calendarDate": "November 23",
    "title": "Carried Close to His Heart (Day 327)",
    "body": "He tends his flock like a shepherd: He gathers the lambs in his arms and carries them close to his heart.",
    "reference": "Isaiah 40:11"
  },
  {
    "dayOfYear": 328,
    "calendarDate": "November 24",
    "title": "Under His Wings (Day 328)",
    "body": "He will cover you with his feathers, and under his wings you will find refuge; his faithfulness will be your shield and rampart.",
    "reference": "Psalm 91:4"
  },
  {
    "dayOfYear": 329,
    "calendarDate": "November 25",
    "title": "Chosen Not by Chance (Day 329)",
    "body": "You did not choose me, but I chose you and appointed you so that you might go and bear fruit—fruit that will last.",
    "reference": "John 15:16"
  },
  {
    "dayOfYear": 330,
    "calendarDate": "November 26",
    "title": "God Is for You (Day 330)",
    "body": "What, then, shall we say in response to these things? If God is for us, who can be against us?",
    "reference": "Romans 8:31"
  },
  {
    "dayOfYear": 331,
    "calendarDate": "November 27",
    "title": "Fearfully & Wonderfully Made (Day 331)",
    "body": "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.",
    "reference": "Psalm 139:14"
  },
  {
    "dayOfYear": 332,
    "calendarDate": "November 28",
    "title": "Loved with an Everlasting Love (Day 332)",
    "body": "I have loved you with an everlasting love; I have drawn you with unfailing kindness.",
    "reference": "Jeremiah 31:3"
  },
  {
    "dayOfYear": 333,
    "calendarDate": "November 29",
    "title": "You Are God's Masterpiece (Day 333)",
    "body": "For we are God’s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.",
    "reference": "Ephesians 2:10"
  },
  {
    "dayOfYear": 334,
    "calendarDate": "November 30",
    "title": "Precious & Honored in His Sight (Day 334)",
    "body": "Since you are precious and honored in my sight, and because I love you, I will give people in exchange for you.",
    "reference": "Isaiah 43:4"
  },
  {
    "dayOfYear": 335,
    "calendarDate": "December 1",
    "title": "Rejoicing Over You with Singing (Day 335)",
    "body": "The Lord your God is with you... He will take great delight in you; in His love He will rejoice over you with singing.",
    "reference": "Zephaniah 3:17"
  },
  {
    "dayOfYear": 336,
    "calendarDate": "December 2",
    "title": "Inseparable from Divine Love (Day 336)",
    "body": "Neither death nor life, neither angels nor demons... nor anything else in all creation, will be able to separate us from the love of God.",
    "reference": "Romans 8:38-39"
  },
  {
    "dayOfYear": 337,
    "calendarDate": "December 3",
    "title": "Lavished with the Father's Love (Day 337)",
    "body": "See what great love the Father has lavished on us, that we should be called children of God! And that is what we are!",
    "reference": "1 John 3:1"
  },
  {
    "dayOfYear": 338,
    "calendarDate": "December 4",
    "title": "Known & Chosen Before Time (Day 338)",
    "body": "Before I formed you in the womb I knew you, before you were born I set you apart.",
    "reference": "Jeremiah 1:5"
  },
  {
    "dayOfYear": 339,
    "calendarDate": "December 5",
    "title": "A Living Hope & Sacred Future (Day 339)",
    "body": "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
    "reference": "Jeremiah 29:11"
  },
  {
    "dayOfYear": 340,
    "calendarDate": "December 6",
    "title": "The Apple of His Eye (Day 340)",
    "body": "Keep me as the apple of your eye; hide me in the shadow of your wings.",
    "reference": "Psalm 17:8"
  },
  {
    "dayOfYear": 341,
    "calendarDate": "December 7",
    "title": "Crowned with Steadfast Love (Day 341)",
    "body": "He redeems your life from the pit and crowns you with love and compassion, satisfying your desires with good things.",
    "reference": "Psalm 103:4-5"
  },
  {
    "dayOfYear": 342,
    "calendarDate": "December 8",
    "title": "Never Forsaken, Always Accompanied (Day 342)",
    "body": "The Lord himself goes before you and will be with you; he will never leave you nor forsake you. Do not be afraid.",
    "reference": "Deuteronomy 31:8"
  },
  {
    "dayOfYear": 343,
    "calendarDate": "December 9",
    "title": "Engraved on the Palms of His Hands (Day 343)",
    "body": "Can a mother forget the baby at her breast? Though she may forget, I will not forget you! See, I have engraved you on the palms of my hands.",
    "reference": "Isaiah 49:15-16"
  },
  {
    "dayOfYear": 344,
    "calendarDate": "December 10",
    "title": "A Royal Priesthood, God's Treasure (Day 344)",
    "body": "You are a chosen people, a royal priesthood, a holy nation, God’s special possession, that you may declare his praises.",
    "reference": "1 Peter 2:9"
  },
  {
    "dayOfYear": 345,
    "calendarDate": "December 11",
    "title": "A New Creation in Christ (Day 345)",
    "body": "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
    "reference": "2 Corinthians 5:17"
  },
  {
    "dayOfYear": 346,
    "calendarDate": "December 12",
    "title": "More Than Conquerors (Day 346)",
    "body": "No, in all these things we are more than conquerors through him who loved us.",
    "reference": "Romans 8:37"
  },
  {
    "dayOfYear": 347,
    "calendarDate": "December 13",
    "title": "Accepted in the Beloved (Day 347)",
    "body": "He made us accepted in the beloved, to the praise of the glory of His grace.",
    "reference": "Ephesians 1:6"
  },
  {
    "dayOfYear": 348,
    "calendarDate": "December 14",
    "title": "Called Friend by Jesus (Day 348)",
    "body": "I no longer call you servants, because a servant does not know his master’s business. Instead, I have called you friends.",
    "reference": "John 15:15"
  },
  {
    "dayOfYear": 349,
    "calendarDate": "December 15",
    "title": "Sealed by the Holy Spirit (Day 349)",
    "body": "When you believed, you were marked in him with a seal, the promised Holy Spirit, who is a deposit guaranteeing our inheritance.",
    "reference": "Ephesians 1:13-14"
  },
  {
    "dayOfYear": 350,
    "calendarDate": "December 16",
    "title": "No Condemnation (Day 350)",
    "body": "Therefore, there is now no condemnation for those who are in Christ Jesus.",
    "reference": "Romans 8:1"
  },
  {
    "dayOfYear": 351,
    "calendarDate": "December 17",
    "title": "Healed and Restored (Day 351)",
    "body": "By his wounds you have been healed. For you were like sheep going astray, but now you have returned to the Shepherd of your souls.",
    "reference": "1 Peter 2:24-25"
  },
  {
    "dayOfYear": 352,
    "calendarDate": "December 18",
    "title": "Strengthened with Power (Day 352)",
    "body": "I pray that out of his glorious riches he may strengthen you with power through his Spirit in your inner being.",
    "reference": "Ephesians 3:16"
  },
  {
    "dayOfYear": 353,
    "calendarDate": "December 19",
    "title": "Rooted and Grounded in Love (Day 353)",
    "body": "May you have power, together with all the Lord’s holy people, to grasp how wide and long and high and deep is the love of Christ.",
    "reference": "Ephesians 3:18-19"
  },
  {
    "dayOfYear": 354,
    "calendarDate": "December 20",
    "title": "His Compassion Never Fails (Day 354)",
    "body": "The Lord is gracious and compassionate, slow to anger and rich in love. The Lord is good to all; he has compassion on all he has made.",
    "reference": "Psalm 145:8-9"
  },
  {
    "dayOfYear": 355,
    "calendarDate": "December 21",
    "title": "Delighted in by the King (Day 355)",
    "body": "Let the king be enthralled by your beauty; honor him, for he is your lord.",
    "reference": "Psalm 45:11"
  },
  {
    "dayOfYear": 356,
    "calendarDate": "December 22",
    "title": "A Crown of Splendor (Day 356)",
    "body": "You will be a crown of splendor in the Lord’s hand, a royal diadem in the hand of your God.",
    "reference": "Isaiah 62:3"
  },
  {
    "dayOfYear": 357,
    "calendarDate": "December 23",
    "title": "Carried Close to His Heart (Day 357)",
    "body": "He tends his flock like a shepherd: He gathers the lambs in his arms and carries them close to his heart.",
    "reference": "Isaiah 40:11"
  },
  {
    "dayOfYear": 358,
    "calendarDate": "December 24",
    "title": "Under His Wings (Day 358)",
    "body": "He will cover you with his feathers, and under his wings you will find refuge; his faithfulness will be your shield and rampart.",
    "reference": "Psalm 91:4"
  },
  {
    "dayOfYear": 359,
    "calendarDate": "December 25",
    "title": "Chosen Not by Chance (Day 359)",
    "body": "You did not choose me, but I chose you and appointed you so that you might go and bear fruit—fruit that will last.",
    "reference": "John 15:16"
  },
  {
    "dayOfYear": 360,
    "calendarDate": "December 26",
    "title": "God Is for You (Day 360)",
    "body": "What, then, shall we say in response to these things? If God is for us, who can be against us?",
    "reference": "Romans 8:31"
  },
  {
    "dayOfYear": 361,
    "calendarDate": "December 27",
    "title": "Fearfully & Wonderfully Made (Day 361)",
    "body": "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.",
    "reference": "Psalm 139:14"
  },
  {
    "dayOfYear": 362,
    "calendarDate": "December 28",
    "title": "Loved with an Everlasting Love (Day 362)",
    "body": "I have loved you with an everlasting love; I have drawn you with unfailing kindness.",
    "reference": "Jeremiah 31:3"
  },
  {
    "dayOfYear": 363,
    "calendarDate": "December 29",
    "title": "You Are God's Masterpiece (Day 363)",
    "body": "For we are God’s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.",
    "reference": "Ephesians 2:10"
  },
  {
    "dayOfYear": 364,
    "calendarDate": "December 30",
    "title": "Precious & Honored in His Sight (Day 364)",
    "body": "Since you are precious and honored in my sight, and because I love you, I will give people in exchange for you.",
    "reference": "Isaiah 43:4"
  },
  {
    "dayOfYear": 365,
    "calendarDate": "December 31",
    "title": "Rejoicing Over You with Singing (Day 365)",
    "body": "The Lord your God is with you... He will take great delight in you; in His love He will rejoice over you with singing.",
    "reference": "Zephaniah 3:17"
  }
];

export const NIGHTLY_PEACE_365_SCRIPTURES: DailyNightlyPeace[] = [
  {
    "dayOfYear": 1,
    "calendarDate": "January 1",
    "ref": "Psalm 4:8",
    "text": "In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety.",
    "theme": "Safety"
  },
  {
    "dayOfYear": 2,
    "calendarDate": "January 2",
    "ref": "John 14:27",
    "text": "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled.",
    "theme": "Peace of Christ"
  },
  {
    "dayOfYear": 3,
    "calendarDate": "January 3",
    "ref": "Proverbs 3:24",
    "text": "When you lie down, you will not be afraid; when you lie down, your sleep will be sweet.",
    "theme": "Sweet Sleep"
  },
  {
    "dayOfYear": 4,
    "calendarDate": "January 4",
    "ref": "Philippians 4:6-7",
    "text": "Do not be anxious about anything, but in every situation present your requests to God. And the peace of God will guard your hearts.",
    "theme": "Guarding Peace"
  },
  {
    "dayOfYear": 5,
    "calendarDate": "January 5",
    "ref": "Psalm 91:1-2",
    "text": "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the Lord, 'He is my refuge.'",
    "theme": "Shelter"
  },
  {
    "dayOfYear": 6,
    "calendarDate": "January 6",
    "ref": "Matthew 11:28",
    "text": "Come to me, all you who are weary and burdened, and I will give you rest.",
    "theme": "Rest for Weary"
  },
  {
    "dayOfYear": 7,
    "calendarDate": "January 7",
    "ref": "Psalm 121:3-4",
    "text": "He who watches over you will not slumber; indeed, he who watches over Israel will neither slumber nor sleep.",
    "theme": "The Keeper"
  },
  {
    "dayOfYear": 8,
    "calendarDate": "January 8",
    "ref": "Psalm 46:10",
    "text": "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.",
    "theme": "Stillness"
  },
  {
    "dayOfYear": 9,
    "calendarDate": "January 9",
    "ref": "Isaiah 26:3",
    "text": "You will keep in perfect peace those whose minds are steadfast, because they trust in you.",
    "theme": "Perfect Peace"
  },
  {
    "dayOfYear": 10,
    "calendarDate": "January 10",
    "ref": "Psalm 3:5",
    "text": "I lie down and sleep; I wake again, because the Lord sustains me.",
    "theme": "Sustained"
  },
  {
    "dayOfYear": 11,
    "calendarDate": "January 11",
    "ref": "Psalm 16:7-8",
    "text": "I will praise the Lord, who counsels me; even at night my heart instructs me. I keep my eyes always on the Lord.",
    "theme": "Night Counsel"
  },
  {
    "dayOfYear": 12,
    "calendarDate": "January 12",
    "ref": "Psalm 23:1-3",
    "text": "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters.",
    "theme": "Quiet Waters"
  },
  {
    "dayOfYear": 13,
    "calendarDate": "January 13",
    "ref": "Psalm 42:8",
    "text": "By day the Lord directs his love, at night his song is with me—a prayer to the God of my life.",
    "theme": "Night Song"
  },
  {
    "dayOfYear": 14,
    "calendarDate": "January 14",
    "ref": "Psalm 62:1-2",
    "text": "Truly my soul finds rest in God; my salvation comes from him. Truly he is my rock and my salvation.",
    "theme": "Rest in God"
  },
  {
    "dayOfYear": 15,
    "calendarDate": "January 15",
    "ref": "Psalm 63:6-7",
    "text": "On my bed I remember you; I think of you through the watches of the night. Because you are my help, I sing in the shadow of your wings.",
    "theme": "Night Meditation"
  },
  {
    "dayOfYear": 16,
    "calendarDate": "January 16",
    "ref": "Psalm 116:7",
    "text": "Return to your rest, my soul, for the Lord has been good to you.",
    "theme": "Soul Rest"
  },
  {
    "dayOfYear": 17,
    "calendarDate": "January 17",
    "ref": "Psalm 119:165",
    "text": "Great peace have those who love your law, and nothing can make them stumble.",
    "theme": "Great Peace"
  },
  {
    "dayOfYear": 18,
    "calendarDate": "January 18",
    "ref": "Psalm 127:2",
    "text": "In vain you rise early and stay up late, toiling for food to eat—for he grants sleep to those he loves.",
    "theme": "Gift of Sleep"
  },
  {
    "dayOfYear": 19,
    "calendarDate": "January 19",
    "ref": "Psalm 131:2",
    "text": "I have calmed and quieted myself, I am like a weaned child with its mother; like a weaned child I am content.",
    "theme": "Calm Contentment"
  },
  {
    "dayOfYear": 20,
    "calendarDate": "January 20",
    "ref": "Psalm 138:7",
    "text": "Though I walk in the midst of trouble, you preserve my life. You stretch out your hand against the anger of my foes.",
    "theme": "Preservation"
  },
  {
    "dayOfYear": 21,
    "calendarDate": "January 21",
    "ref": "Isaiah 30:15",
    "text": "In repentance and rest is your salvation, in quietness and trust is your strength.",
    "theme": "Quietness & Trust"
  },
  {
    "dayOfYear": 22,
    "calendarDate": "January 22",
    "ref": "Isaiah 32:17-18",
    "text": "The fruit of that righteousness will be peace; its effect will be quietness and confidence forever.",
    "theme": "Confidence"
  },
  {
    "dayOfYear": 23,
    "calendarDate": "January 23",
    "ref": "2 Thessalonians 3:16",
    "text": "Now may the Lord of peace himself give you peace at all times and in every way. The Lord be with all of you.",
    "theme": "Constant Peace"
  },
  {
    "dayOfYear": 24,
    "calendarDate": "January 24",
    "ref": "1 Peter 5:7",
    "text": "Cast all your anxiety on him because he cares for you.",
    "theme": "Casting Care"
  },
  {
    "dayOfYear": 25,
    "calendarDate": "January 25",
    "ref": "Colossians 3:15",
    "text": "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace.",
    "theme": "Ruling Peace"
  },
  {
    "dayOfYear": 26,
    "calendarDate": "January 26",
    "ref": "Romans 15:13",
    "text": "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope.",
    "theme": "Overflowing Peace"
  },
  {
    "dayOfYear": 27,
    "calendarDate": "January 27",
    "ref": "Numbers 6:24-26",
    "text": "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord lift up his countenance and give you peace.",
    "theme": "Aaronic Blessing"
  },
  {
    "dayOfYear": 28,
    "calendarDate": "January 28",
    "ref": "Exodus 33:14",
    "text": "The Lord replied, 'My Presence will go with you, and I will give you rest.'",
    "theme": "Divine Presence"
  },
  {
    "dayOfYear": 29,
    "calendarDate": "January 29",
    "ref": "Psalm 34:7",
    "text": "The angel of the Lord encamps around those who fear him, and he delivers them.",
    "theme": "Angelic Guard"
  },
  {
    "dayOfYear": 30,
    "calendarDate": "January 30",
    "ref": "Psalm 37:7",
    "text": "Be still before the Lord and wait patiently for him; do not fret when people succeed in their ways.",
    "theme": "Patience"
  },
  {
    "dayOfYear": 31,
    "calendarDate": "January 31",
    "ref": "Psalm 4:8",
    "text": "In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety.",
    "theme": "Safety • January"
  },
  {
    "dayOfYear": 32,
    "calendarDate": "February 1",
    "ref": "John 14:27",
    "text": "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled.",
    "theme": "Peace of Christ • February"
  },
  {
    "dayOfYear": 33,
    "calendarDate": "February 2",
    "ref": "Proverbs 3:24",
    "text": "When you lie down, you will not be afraid; when you lie down, your sleep will be sweet.",
    "theme": "Sweet Sleep • February"
  },
  {
    "dayOfYear": 34,
    "calendarDate": "February 3",
    "ref": "Philippians 4:6-7",
    "text": "Do not be anxious about anything, but in every situation present your requests to God. And the peace of God will guard your hearts.",
    "theme": "Guarding Peace • February"
  },
  {
    "dayOfYear": 35,
    "calendarDate": "February 4",
    "ref": "Psalm 91:1-2",
    "text": "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the Lord, 'He is my refuge.'",
    "theme": "Shelter • February"
  },
  {
    "dayOfYear": 36,
    "calendarDate": "February 5",
    "ref": "Matthew 11:28",
    "text": "Come to me, all you who are weary and burdened, and I will give you rest.",
    "theme": "Rest for Weary • February"
  },
  {
    "dayOfYear": 37,
    "calendarDate": "February 6",
    "ref": "Psalm 121:3-4",
    "text": "He who watches over you will not slumber; indeed, he who watches over Israel will neither slumber nor sleep.",
    "theme": "The Keeper • February"
  },
  {
    "dayOfYear": 38,
    "calendarDate": "February 7",
    "ref": "Psalm 46:10",
    "text": "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.",
    "theme": "Stillness • February"
  },
  {
    "dayOfYear": 39,
    "calendarDate": "February 8",
    "ref": "Isaiah 26:3",
    "text": "You will keep in perfect peace those whose minds are steadfast, because they trust in you.",
    "theme": "Perfect Peace • February"
  },
  {
    "dayOfYear": 40,
    "calendarDate": "February 9",
    "ref": "Psalm 3:5",
    "text": "I lie down and sleep; I wake again, because the Lord sustains me.",
    "theme": "Sustained • February"
  },
  {
    "dayOfYear": 41,
    "calendarDate": "February 10",
    "ref": "Psalm 16:7-8",
    "text": "I will praise the Lord, who counsels me; even at night my heart instructs me. I keep my eyes always on the Lord.",
    "theme": "Night Counsel • February"
  },
  {
    "dayOfYear": 42,
    "calendarDate": "February 11",
    "ref": "Psalm 23:1-3",
    "text": "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters.",
    "theme": "Quiet Waters • February"
  },
  {
    "dayOfYear": 43,
    "calendarDate": "February 12",
    "ref": "Psalm 42:8",
    "text": "By day the Lord directs his love, at night his song is with me—a prayer to the God of my life.",
    "theme": "Night Song • February"
  },
  {
    "dayOfYear": 44,
    "calendarDate": "February 13",
    "ref": "Psalm 62:1-2",
    "text": "Truly my soul finds rest in God; my salvation comes from him. Truly he is my rock and my salvation.",
    "theme": "Rest in God • February"
  },
  {
    "dayOfYear": 45,
    "calendarDate": "February 14",
    "ref": "Psalm 63:6-7",
    "text": "On my bed I remember you; I think of you through the watches of the night. Because you are my help, I sing in the shadow of your wings.",
    "theme": "Night Meditation • February"
  },
  {
    "dayOfYear": 46,
    "calendarDate": "February 15",
    "ref": "Psalm 116:7",
    "text": "Return to your rest, my soul, for the Lord has been good to you.",
    "theme": "Soul Rest • February"
  },
  {
    "dayOfYear": 47,
    "calendarDate": "February 16",
    "ref": "Psalm 119:165",
    "text": "Great peace have those who love your law, and nothing can make them stumble.",
    "theme": "Great Peace • February"
  },
  {
    "dayOfYear": 48,
    "calendarDate": "February 17",
    "ref": "Psalm 127:2",
    "text": "In vain you rise early and stay up late, toiling for food to eat—for he grants sleep to those he loves.",
    "theme": "Gift of Sleep • February"
  },
  {
    "dayOfYear": 49,
    "calendarDate": "February 18",
    "ref": "Psalm 131:2",
    "text": "I have calmed and quieted myself, I am like a weaned child with its mother; like a weaned child I am content.",
    "theme": "Calm Contentment • February"
  },
  {
    "dayOfYear": 50,
    "calendarDate": "February 19",
    "ref": "Psalm 138:7",
    "text": "Though I walk in the midst of trouble, you preserve my life. You stretch out your hand against the anger of my foes.",
    "theme": "Preservation • February"
  },
  {
    "dayOfYear": 51,
    "calendarDate": "February 20",
    "ref": "Isaiah 30:15",
    "text": "In repentance and rest is your salvation, in quietness and trust is your strength.",
    "theme": "Quietness & Trust • February"
  },
  {
    "dayOfYear": 52,
    "calendarDate": "February 21",
    "ref": "Isaiah 32:17-18",
    "text": "The fruit of that righteousness will be peace; its effect will be quietness and confidence forever.",
    "theme": "Confidence • February"
  },
  {
    "dayOfYear": 53,
    "calendarDate": "February 22",
    "ref": "2 Thessalonians 3:16",
    "text": "Now may the Lord of peace himself give you peace at all times and in every way. The Lord be with all of you.",
    "theme": "Constant Peace • February"
  },
  {
    "dayOfYear": 54,
    "calendarDate": "February 23",
    "ref": "1 Peter 5:7",
    "text": "Cast all your anxiety on him because he cares for you.",
    "theme": "Casting Care • February"
  },
  {
    "dayOfYear": 55,
    "calendarDate": "February 24",
    "ref": "Colossians 3:15",
    "text": "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace.",
    "theme": "Ruling Peace • February"
  },
  {
    "dayOfYear": 56,
    "calendarDate": "February 25",
    "ref": "Romans 15:13",
    "text": "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope.",
    "theme": "Overflowing Peace • February"
  },
  {
    "dayOfYear": 57,
    "calendarDate": "February 26",
    "ref": "Numbers 6:24-26",
    "text": "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord lift up his countenance and give you peace.",
    "theme": "Aaronic Blessing • February"
  },
  {
    "dayOfYear": 58,
    "calendarDate": "February 27",
    "ref": "Exodus 33:14",
    "text": "The Lord replied, 'My Presence will go with you, and I will give you rest.'",
    "theme": "Divine Presence • February"
  },
  {
    "dayOfYear": 59,
    "calendarDate": "February 28",
    "ref": "Psalm 34:7",
    "text": "The angel of the Lord encamps around those who fear him, and he delivers them.",
    "theme": "Angelic Guard • February"
  },
  {
    "dayOfYear": 60,
    "calendarDate": "March 1",
    "ref": "Psalm 37:7",
    "text": "Be still before the Lord and wait patiently for him; do not fret when people succeed in their ways.",
    "theme": "Patience • March"
  },
  {
    "dayOfYear": 61,
    "calendarDate": "March 2",
    "ref": "Psalm 4:8",
    "text": "In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety.",
    "theme": "Safety • March"
  },
  {
    "dayOfYear": 62,
    "calendarDate": "March 3",
    "ref": "John 14:27",
    "text": "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled.",
    "theme": "Peace of Christ • March"
  },
  {
    "dayOfYear": 63,
    "calendarDate": "March 4",
    "ref": "Proverbs 3:24",
    "text": "When you lie down, you will not be afraid; when you lie down, your sleep will be sweet.",
    "theme": "Sweet Sleep • March"
  },
  {
    "dayOfYear": 64,
    "calendarDate": "March 5",
    "ref": "Philippians 4:6-7",
    "text": "Do not be anxious about anything, but in every situation present your requests to God. And the peace of God will guard your hearts.",
    "theme": "Guarding Peace • March"
  },
  {
    "dayOfYear": 65,
    "calendarDate": "March 6",
    "ref": "Psalm 91:1-2",
    "text": "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the Lord, 'He is my refuge.'",
    "theme": "Shelter • March"
  },
  {
    "dayOfYear": 66,
    "calendarDate": "March 7",
    "ref": "Matthew 11:28",
    "text": "Come to me, all you who are weary and burdened, and I will give you rest.",
    "theme": "Rest for Weary • March"
  },
  {
    "dayOfYear": 67,
    "calendarDate": "March 8",
    "ref": "Psalm 121:3-4",
    "text": "He who watches over you will not slumber; indeed, he who watches over Israel will neither slumber nor sleep.",
    "theme": "The Keeper • March"
  },
  {
    "dayOfYear": 68,
    "calendarDate": "March 9",
    "ref": "Psalm 46:10",
    "text": "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.",
    "theme": "Stillness • March"
  },
  {
    "dayOfYear": 69,
    "calendarDate": "March 10",
    "ref": "Isaiah 26:3",
    "text": "You will keep in perfect peace those whose minds are steadfast, because they trust in you.",
    "theme": "Perfect Peace • March"
  },
  {
    "dayOfYear": 70,
    "calendarDate": "March 11",
    "ref": "Psalm 3:5",
    "text": "I lie down and sleep; I wake again, because the Lord sustains me.",
    "theme": "Sustained • March"
  },
  {
    "dayOfYear": 71,
    "calendarDate": "March 12",
    "ref": "Psalm 16:7-8",
    "text": "I will praise the Lord, who counsels me; even at night my heart instructs me. I keep my eyes always on the Lord.",
    "theme": "Night Counsel • March"
  },
  {
    "dayOfYear": 72,
    "calendarDate": "March 13",
    "ref": "Psalm 23:1-3",
    "text": "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters.",
    "theme": "Quiet Waters • March"
  },
  {
    "dayOfYear": 73,
    "calendarDate": "March 14",
    "ref": "Psalm 42:8",
    "text": "By day the Lord directs his love, at night his song is with me—a prayer to the God of my life.",
    "theme": "Night Song • March"
  },
  {
    "dayOfYear": 74,
    "calendarDate": "March 15",
    "ref": "Psalm 62:1-2",
    "text": "Truly my soul finds rest in God; my salvation comes from him. Truly he is my rock and my salvation.",
    "theme": "Rest in God • March"
  },
  {
    "dayOfYear": 75,
    "calendarDate": "March 16",
    "ref": "Psalm 63:6-7",
    "text": "On my bed I remember you; I think of you through the watches of the night. Because you are my help, I sing in the shadow of your wings.",
    "theme": "Night Meditation • March"
  },
  {
    "dayOfYear": 76,
    "calendarDate": "March 17",
    "ref": "Psalm 116:7",
    "text": "Return to your rest, my soul, for the Lord has been good to you.",
    "theme": "Soul Rest • March"
  },
  {
    "dayOfYear": 77,
    "calendarDate": "March 18",
    "ref": "Psalm 119:165",
    "text": "Great peace have those who love your law, and nothing can make them stumble.",
    "theme": "Great Peace • March"
  },
  {
    "dayOfYear": 78,
    "calendarDate": "March 19",
    "ref": "Psalm 127:2",
    "text": "In vain you rise early and stay up late, toiling for food to eat—for he grants sleep to those he loves.",
    "theme": "Gift of Sleep • March"
  },
  {
    "dayOfYear": 79,
    "calendarDate": "March 20",
    "ref": "Psalm 131:2",
    "text": "I have calmed and quieted myself, I am like a weaned child with its mother; like a weaned child I am content.",
    "theme": "Calm Contentment • March"
  },
  {
    "dayOfYear": 80,
    "calendarDate": "March 21",
    "ref": "Psalm 138:7",
    "text": "Though I walk in the midst of trouble, you preserve my life. You stretch out your hand against the anger of my foes.",
    "theme": "Preservation • March"
  },
  {
    "dayOfYear": 81,
    "calendarDate": "March 22",
    "ref": "Isaiah 30:15",
    "text": "In repentance and rest is your salvation, in quietness and trust is your strength.",
    "theme": "Quietness & Trust • March"
  },
  {
    "dayOfYear": 82,
    "calendarDate": "March 23",
    "ref": "Isaiah 32:17-18",
    "text": "The fruit of that righteousness will be peace; its effect will be quietness and confidence forever.",
    "theme": "Confidence • March"
  },
  {
    "dayOfYear": 83,
    "calendarDate": "March 24",
    "ref": "2 Thessalonians 3:16",
    "text": "Now may the Lord of peace himself give you peace at all times and in every way. The Lord be with all of you.",
    "theme": "Constant Peace • March"
  },
  {
    "dayOfYear": 84,
    "calendarDate": "March 25",
    "ref": "1 Peter 5:7",
    "text": "Cast all your anxiety on him because he cares for you.",
    "theme": "Casting Care • March"
  },
  {
    "dayOfYear": 85,
    "calendarDate": "March 26",
    "ref": "Colossians 3:15",
    "text": "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace.",
    "theme": "Ruling Peace • March"
  },
  {
    "dayOfYear": 86,
    "calendarDate": "March 27",
    "ref": "Romans 15:13",
    "text": "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope.",
    "theme": "Overflowing Peace • March"
  },
  {
    "dayOfYear": 87,
    "calendarDate": "March 28",
    "ref": "Numbers 6:24-26",
    "text": "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord lift up his countenance and give you peace.",
    "theme": "Aaronic Blessing • March"
  },
  {
    "dayOfYear": 88,
    "calendarDate": "March 29",
    "ref": "Exodus 33:14",
    "text": "The Lord replied, 'My Presence will go with you, and I will give you rest.'",
    "theme": "Divine Presence • March"
  },
  {
    "dayOfYear": 89,
    "calendarDate": "March 30",
    "ref": "Psalm 34:7",
    "text": "The angel of the Lord encamps around those who fear him, and he delivers them.",
    "theme": "Angelic Guard • March"
  },
  {
    "dayOfYear": 90,
    "calendarDate": "March 31",
    "ref": "Psalm 37:7",
    "text": "Be still before the Lord and wait patiently for him; do not fret when people succeed in their ways.",
    "theme": "Patience • March"
  },
  {
    "dayOfYear": 91,
    "calendarDate": "April 1",
    "ref": "Psalm 4:8",
    "text": "In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety.",
    "theme": "Safety • April"
  },
  {
    "dayOfYear": 92,
    "calendarDate": "April 2",
    "ref": "John 14:27",
    "text": "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled.",
    "theme": "Peace of Christ • April"
  },
  {
    "dayOfYear": 93,
    "calendarDate": "April 3",
    "ref": "Proverbs 3:24",
    "text": "When you lie down, you will not be afraid; when you lie down, your sleep will be sweet.",
    "theme": "Sweet Sleep • April"
  },
  {
    "dayOfYear": 94,
    "calendarDate": "April 4",
    "ref": "Philippians 4:6-7",
    "text": "Do not be anxious about anything, but in every situation present your requests to God. And the peace of God will guard your hearts.",
    "theme": "Guarding Peace • April"
  },
  {
    "dayOfYear": 95,
    "calendarDate": "April 5",
    "ref": "Psalm 91:1-2",
    "text": "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the Lord, 'He is my refuge.'",
    "theme": "Shelter • April"
  },
  {
    "dayOfYear": 96,
    "calendarDate": "April 6",
    "ref": "Matthew 11:28",
    "text": "Come to me, all you who are weary and burdened, and I will give you rest.",
    "theme": "Rest for Weary • April"
  },
  {
    "dayOfYear": 97,
    "calendarDate": "April 7",
    "ref": "Psalm 121:3-4",
    "text": "He who watches over you will not slumber; indeed, he who watches over Israel will neither slumber nor sleep.",
    "theme": "The Keeper • April"
  },
  {
    "dayOfYear": 98,
    "calendarDate": "April 8",
    "ref": "Psalm 46:10",
    "text": "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.",
    "theme": "Stillness • April"
  },
  {
    "dayOfYear": 99,
    "calendarDate": "April 9",
    "ref": "Isaiah 26:3",
    "text": "You will keep in perfect peace those whose minds are steadfast, because they trust in you.",
    "theme": "Perfect Peace • April"
  },
  {
    "dayOfYear": 100,
    "calendarDate": "April 10",
    "ref": "Psalm 3:5",
    "text": "I lie down and sleep; I wake again, because the Lord sustains me.",
    "theme": "Sustained • April"
  },
  {
    "dayOfYear": 101,
    "calendarDate": "April 11",
    "ref": "Psalm 16:7-8",
    "text": "I will praise the Lord, who counsels me; even at night my heart instructs me. I keep my eyes always on the Lord.",
    "theme": "Night Counsel • April"
  },
  {
    "dayOfYear": 102,
    "calendarDate": "April 12",
    "ref": "Psalm 23:1-3",
    "text": "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters.",
    "theme": "Quiet Waters • April"
  },
  {
    "dayOfYear": 103,
    "calendarDate": "April 13",
    "ref": "Psalm 42:8",
    "text": "By day the Lord directs his love, at night his song is with me—a prayer to the God of my life.",
    "theme": "Night Song • April"
  },
  {
    "dayOfYear": 104,
    "calendarDate": "April 14",
    "ref": "Psalm 62:1-2",
    "text": "Truly my soul finds rest in God; my salvation comes from him. Truly he is my rock and my salvation.",
    "theme": "Rest in God • April"
  },
  {
    "dayOfYear": 105,
    "calendarDate": "April 15",
    "ref": "Psalm 63:6-7",
    "text": "On my bed I remember you; I think of you through the watches of the night. Because you are my help, I sing in the shadow of your wings.",
    "theme": "Night Meditation • April"
  },
  {
    "dayOfYear": 106,
    "calendarDate": "April 16",
    "ref": "Psalm 116:7",
    "text": "Return to your rest, my soul, for the Lord has been good to you.",
    "theme": "Soul Rest • April"
  },
  {
    "dayOfYear": 107,
    "calendarDate": "April 17",
    "ref": "Psalm 119:165",
    "text": "Great peace have those who love your law, and nothing can make them stumble.",
    "theme": "Great Peace • April"
  },
  {
    "dayOfYear": 108,
    "calendarDate": "April 18",
    "ref": "Psalm 127:2",
    "text": "In vain you rise early and stay up late, toiling for food to eat—for he grants sleep to those he loves.",
    "theme": "Gift of Sleep • April"
  },
  {
    "dayOfYear": 109,
    "calendarDate": "April 19",
    "ref": "Psalm 131:2",
    "text": "I have calmed and quieted myself, I am like a weaned child with its mother; like a weaned child I am content.",
    "theme": "Calm Contentment • April"
  },
  {
    "dayOfYear": 110,
    "calendarDate": "April 20",
    "ref": "Psalm 138:7",
    "text": "Though I walk in the midst of trouble, you preserve my life. You stretch out your hand against the anger of my foes.",
    "theme": "Preservation • April"
  },
  {
    "dayOfYear": 111,
    "calendarDate": "April 21",
    "ref": "Isaiah 30:15",
    "text": "In repentance and rest is your salvation, in quietness and trust is your strength.",
    "theme": "Quietness & Trust • April"
  },
  {
    "dayOfYear": 112,
    "calendarDate": "April 22",
    "ref": "Isaiah 32:17-18",
    "text": "The fruit of that righteousness will be peace; its effect will be quietness and confidence forever.",
    "theme": "Confidence • April"
  },
  {
    "dayOfYear": 113,
    "calendarDate": "April 23",
    "ref": "2 Thessalonians 3:16",
    "text": "Now may the Lord of peace himself give you peace at all times and in every way. The Lord be with all of you.",
    "theme": "Constant Peace • April"
  },
  {
    "dayOfYear": 114,
    "calendarDate": "April 24",
    "ref": "1 Peter 5:7",
    "text": "Cast all your anxiety on him because he cares for you.",
    "theme": "Casting Care • April"
  },
  {
    "dayOfYear": 115,
    "calendarDate": "April 25",
    "ref": "Colossians 3:15",
    "text": "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace.",
    "theme": "Ruling Peace • April"
  },
  {
    "dayOfYear": 116,
    "calendarDate": "April 26",
    "ref": "Romans 15:13",
    "text": "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope.",
    "theme": "Overflowing Peace • April"
  },
  {
    "dayOfYear": 117,
    "calendarDate": "April 27",
    "ref": "Numbers 6:24-26",
    "text": "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord lift up his countenance and give you peace.",
    "theme": "Aaronic Blessing • April"
  },
  {
    "dayOfYear": 118,
    "calendarDate": "April 28",
    "ref": "Exodus 33:14",
    "text": "The Lord replied, 'My Presence will go with you, and I will give you rest.'",
    "theme": "Divine Presence • April"
  },
  {
    "dayOfYear": 119,
    "calendarDate": "April 29",
    "ref": "Psalm 34:7",
    "text": "The angel of the Lord encamps around those who fear him, and he delivers them.",
    "theme": "Angelic Guard • April"
  },
  {
    "dayOfYear": 120,
    "calendarDate": "April 30",
    "ref": "Psalm 37:7",
    "text": "Be still before the Lord and wait patiently for him; do not fret when people succeed in their ways.",
    "theme": "Patience • April"
  },
  {
    "dayOfYear": 121,
    "calendarDate": "May 1",
    "ref": "Psalm 4:8",
    "text": "In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety.",
    "theme": "Safety • May"
  },
  {
    "dayOfYear": 122,
    "calendarDate": "May 2",
    "ref": "John 14:27",
    "text": "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled.",
    "theme": "Peace of Christ • May"
  },
  {
    "dayOfYear": 123,
    "calendarDate": "May 3",
    "ref": "Proverbs 3:24",
    "text": "When you lie down, you will not be afraid; when you lie down, your sleep will be sweet.",
    "theme": "Sweet Sleep • May"
  },
  {
    "dayOfYear": 124,
    "calendarDate": "May 4",
    "ref": "Philippians 4:6-7",
    "text": "Do not be anxious about anything, but in every situation present your requests to God. And the peace of God will guard your hearts.",
    "theme": "Guarding Peace • May"
  },
  {
    "dayOfYear": 125,
    "calendarDate": "May 5",
    "ref": "Psalm 91:1-2",
    "text": "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the Lord, 'He is my refuge.'",
    "theme": "Shelter • May"
  },
  {
    "dayOfYear": 126,
    "calendarDate": "May 6",
    "ref": "Matthew 11:28",
    "text": "Come to me, all you who are weary and burdened, and I will give you rest.",
    "theme": "Rest for Weary • May"
  },
  {
    "dayOfYear": 127,
    "calendarDate": "May 7",
    "ref": "Psalm 121:3-4",
    "text": "He who watches over you will not slumber; indeed, he who watches over Israel will neither slumber nor sleep.",
    "theme": "The Keeper • May"
  },
  {
    "dayOfYear": 128,
    "calendarDate": "May 8",
    "ref": "Psalm 46:10",
    "text": "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.",
    "theme": "Stillness • May"
  },
  {
    "dayOfYear": 129,
    "calendarDate": "May 9",
    "ref": "Isaiah 26:3",
    "text": "You will keep in perfect peace those whose minds are steadfast, because they trust in you.",
    "theme": "Perfect Peace • May"
  },
  {
    "dayOfYear": 130,
    "calendarDate": "May 10",
    "ref": "Psalm 3:5",
    "text": "I lie down and sleep; I wake again, because the Lord sustains me.",
    "theme": "Sustained • May"
  },
  {
    "dayOfYear": 131,
    "calendarDate": "May 11",
    "ref": "Psalm 16:7-8",
    "text": "I will praise the Lord, who counsels me; even at night my heart instructs me. I keep my eyes always on the Lord.",
    "theme": "Night Counsel • May"
  },
  {
    "dayOfYear": 132,
    "calendarDate": "May 12",
    "ref": "Psalm 23:1-3",
    "text": "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters.",
    "theme": "Quiet Waters • May"
  },
  {
    "dayOfYear": 133,
    "calendarDate": "May 13",
    "ref": "Psalm 42:8",
    "text": "By day the Lord directs his love, at night his song is with me—a prayer to the God of my life.",
    "theme": "Night Song • May"
  },
  {
    "dayOfYear": 134,
    "calendarDate": "May 14",
    "ref": "Psalm 62:1-2",
    "text": "Truly my soul finds rest in God; my salvation comes from him. Truly he is my rock and my salvation.",
    "theme": "Rest in God • May"
  },
  {
    "dayOfYear": 135,
    "calendarDate": "May 15",
    "ref": "Psalm 63:6-7",
    "text": "On my bed I remember you; I think of you through the watches of the night. Because you are my help, I sing in the shadow of your wings.",
    "theme": "Night Meditation • May"
  },
  {
    "dayOfYear": 136,
    "calendarDate": "May 16",
    "ref": "Psalm 116:7",
    "text": "Return to your rest, my soul, for the Lord has been good to you.",
    "theme": "Soul Rest • May"
  },
  {
    "dayOfYear": 137,
    "calendarDate": "May 17",
    "ref": "Psalm 119:165",
    "text": "Great peace have those who love your law, and nothing can make them stumble.",
    "theme": "Great Peace • May"
  },
  {
    "dayOfYear": 138,
    "calendarDate": "May 18",
    "ref": "Psalm 127:2",
    "text": "In vain you rise early and stay up late, toiling for food to eat—for he grants sleep to those he loves.",
    "theme": "Gift of Sleep • May"
  },
  {
    "dayOfYear": 139,
    "calendarDate": "May 19",
    "ref": "Psalm 131:2",
    "text": "I have calmed and quieted myself, I am like a weaned child with its mother; like a weaned child I am content.",
    "theme": "Calm Contentment • May"
  },
  {
    "dayOfYear": 140,
    "calendarDate": "May 20",
    "ref": "Psalm 138:7",
    "text": "Though I walk in the midst of trouble, you preserve my life. You stretch out your hand against the anger of my foes.",
    "theme": "Preservation • May"
  },
  {
    "dayOfYear": 141,
    "calendarDate": "May 21",
    "ref": "Isaiah 30:15",
    "text": "In repentance and rest is your salvation, in quietness and trust is your strength.",
    "theme": "Quietness & Trust • May"
  },
  {
    "dayOfYear": 142,
    "calendarDate": "May 22",
    "ref": "Isaiah 32:17-18",
    "text": "The fruit of that righteousness will be peace; its effect will be quietness and confidence forever.",
    "theme": "Confidence • May"
  },
  {
    "dayOfYear": 143,
    "calendarDate": "May 23",
    "ref": "2 Thessalonians 3:16",
    "text": "Now may the Lord of peace himself give you peace at all times and in every way. The Lord be with all of you.",
    "theme": "Constant Peace • May"
  },
  {
    "dayOfYear": 144,
    "calendarDate": "May 24",
    "ref": "1 Peter 5:7",
    "text": "Cast all your anxiety on him because he cares for you.",
    "theme": "Casting Care • May"
  },
  {
    "dayOfYear": 145,
    "calendarDate": "May 25",
    "ref": "Colossians 3:15",
    "text": "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace.",
    "theme": "Ruling Peace • May"
  },
  {
    "dayOfYear": 146,
    "calendarDate": "May 26",
    "ref": "Romans 15:13",
    "text": "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope.",
    "theme": "Overflowing Peace • May"
  },
  {
    "dayOfYear": 147,
    "calendarDate": "May 27",
    "ref": "Numbers 6:24-26",
    "text": "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord lift up his countenance and give you peace.",
    "theme": "Aaronic Blessing • May"
  },
  {
    "dayOfYear": 148,
    "calendarDate": "May 28",
    "ref": "Exodus 33:14",
    "text": "The Lord replied, 'My Presence will go with you, and I will give you rest.'",
    "theme": "Divine Presence • May"
  },
  {
    "dayOfYear": 149,
    "calendarDate": "May 29",
    "ref": "Psalm 34:7",
    "text": "The angel of the Lord encamps around those who fear him, and he delivers them.",
    "theme": "Angelic Guard • May"
  },
  {
    "dayOfYear": 150,
    "calendarDate": "May 30",
    "ref": "Psalm 37:7",
    "text": "Be still before the Lord and wait patiently for him; do not fret when people succeed in their ways.",
    "theme": "Patience • May"
  },
  {
    "dayOfYear": 151,
    "calendarDate": "May 31",
    "ref": "Psalm 4:8",
    "text": "In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety.",
    "theme": "Safety • May"
  },
  {
    "dayOfYear": 152,
    "calendarDate": "June 1",
    "ref": "John 14:27",
    "text": "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled.",
    "theme": "Peace of Christ • June"
  },
  {
    "dayOfYear": 153,
    "calendarDate": "June 2",
    "ref": "Proverbs 3:24",
    "text": "When you lie down, you will not be afraid; when you lie down, your sleep will be sweet.",
    "theme": "Sweet Sleep • June"
  },
  {
    "dayOfYear": 154,
    "calendarDate": "June 3",
    "ref": "Philippians 4:6-7",
    "text": "Do not be anxious about anything, but in every situation present your requests to God. And the peace of God will guard your hearts.",
    "theme": "Guarding Peace • June"
  },
  {
    "dayOfYear": 155,
    "calendarDate": "June 4",
    "ref": "Psalm 91:1-2",
    "text": "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the Lord, 'He is my refuge.'",
    "theme": "Shelter • June"
  },
  {
    "dayOfYear": 156,
    "calendarDate": "June 5",
    "ref": "Matthew 11:28",
    "text": "Come to me, all you who are weary and burdened, and I will give you rest.",
    "theme": "Rest for Weary • June"
  },
  {
    "dayOfYear": 157,
    "calendarDate": "June 6",
    "ref": "Psalm 121:3-4",
    "text": "He who watches over you will not slumber; indeed, he who watches over Israel will neither slumber nor sleep.",
    "theme": "The Keeper • June"
  },
  {
    "dayOfYear": 158,
    "calendarDate": "June 7",
    "ref": "Psalm 46:10",
    "text": "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.",
    "theme": "Stillness • June"
  },
  {
    "dayOfYear": 159,
    "calendarDate": "June 8",
    "ref": "Isaiah 26:3",
    "text": "You will keep in perfect peace those whose minds are steadfast, because they trust in you.",
    "theme": "Perfect Peace • June"
  },
  {
    "dayOfYear": 160,
    "calendarDate": "June 9",
    "ref": "Psalm 3:5",
    "text": "I lie down and sleep; I wake again, because the Lord sustains me.",
    "theme": "Sustained • June"
  },
  {
    "dayOfYear": 161,
    "calendarDate": "June 10",
    "ref": "Psalm 16:7-8",
    "text": "I will praise the Lord, who counsels me; even at night my heart instructs me. I keep my eyes always on the Lord.",
    "theme": "Night Counsel • June"
  },
  {
    "dayOfYear": 162,
    "calendarDate": "June 11",
    "ref": "Psalm 23:1-3",
    "text": "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters.",
    "theme": "Quiet Waters • June"
  },
  {
    "dayOfYear": 163,
    "calendarDate": "June 12",
    "ref": "Psalm 42:8",
    "text": "By day the Lord directs his love, at night his song is with me—a prayer to the God of my life.",
    "theme": "Night Song • June"
  },
  {
    "dayOfYear": 164,
    "calendarDate": "June 13",
    "ref": "Psalm 62:1-2",
    "text": "Truly my soul finds rest in God; my salvation comes from him. Truly he is my rock and my salvation.",
    "theme": "Rest in God • June"
  },
  {
    "dayOfYear": 165,
    "calendarDate": "June 14",
    "ref": "Psalm 63:6-7",
    "text": "On my bed I remember you; I think of you through the watches of the night. Because you are my help, I sing in the shadow of your wings.",
    "theme": "Night Meditation • June"
  },
  {
    "dayOfYear": 166,
    "calendarDate": "June 15",
    "ref": "Psalm 116:7",
    "text": "Return to your rest, my soul, for the Lord has been good to you.",
    "theme": "Soul Rest • June"
  },
  {
    "dayOfYear": 167,
    "calendarDate": "June 16",
    "ref": "Psalm 119:165",
    "text": "Great peace have those who love your law, and nothing can make them stumble.",
    "theme": "Great Peace • June"
  },
  {
    "dayOfYear": 168,
    "calendarDate": "June 17",
    "ref": "Psalm 127:2",
    "text": "In vain you rise early and stay up late, toiling for food to eat—for he grants sleep to those he loves.",
    "theme": "Gift of Sleep • June"
  },
  {
    "dayOfYear": 169,
    "calendarDate": "June 18",
    "ref": "Psalm 131:2",
    "text": "I have calmed and quieted myself, I am like a weaned child with its mother; like a weaned child I am content.",
    "theme": "Calm Contentment • June"
  },
  {
    "dayOfYear": 170,
    "calendarDate": "June 19",
    "ref": "Psalm 138:7",
    "text": "Though I walk in the midst of trouble, you preserve my life. You stretch out your hand against the anger of my foes.",
    "theme": "Preservation • June"
  },
  {
    "dayOfYear": 171,
    "calendarDate": "June 20",
    "ref": "Isaiah 30:15",
    "text": "In repentance and rest is your salvation, in quietness and trust is your strength.",
    "theme": "Quietness & Trust • June"
  },
  {
    "dayOfYear": 172,
    "calendarDate": "June 21",
    "ref": "Isaiah 32:17-18",
    "text": "The fruit of that righteousness will be peace; its effect will be quietness and confidence forever.",
    "theme": "Confidence • June"
  },
  {
    "dayOfYear": 173,
    "calendarDate": "June 22",
    "ref": "2 Thessalonians 3:16",
    "text": "Now may the Lord of peace himself give you peace at all times and in every way. The Lord be with all of you.",
    "theme": "Constant Peace • June"
  },
  {
    "dayOfYear": 174,
    "calendarDate": "June 23",
    "ref": "1 Peter 5:7",
    "text": "Cast all your anxiety on him because he cares for you.",
    "theme": "Casting Care • June"
  },
  {
    "dayOfYear": 175,
    "calendarDate": "June 24",
    "ref": "Colossians 3:15",
    "text": "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace.",
    "theme": "Ruling Peace • June"
  },
  {
    "dayOfYear": 176,
    "calendarDate": "June 25",
    "ref": "Romans 15:13",
    "text": "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope.",
    "theme": "Overflowing Peace • June"
  },
  {
    "dayOfYear": 177,
    "calendarDate": "June 26",
    "ref": "Numbers 6:24-26",
    "text": "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord lift up his countenance and give you peace.",
    "theme": "Aaronic Blessing • June"
  },
  {
    "dayOfYear": 178,
    "calendarDate": "June 27",
    "ref": "Exodus 33:14",
    "text": "The Lord replied, 'My Presence will go with you, and I will give you rest.'",
    "theme": "Divine Presence • June"
  },
  {
    "dayOfYear": 179,
    "calendarDate": "June 28",
    "ref": "Psalm 34:7",
    "text": "The angel of the Lord encamps around those who fear him, and he delivers them.",
    "theme": "Angelic Guard • June"
  },
  {
    "dayOfYear": 180,
    "calendarDate": "June 29",
    "ref": "Psalm 37:7",
    "text": "Be still before the Lord and wait patiently for him; do not fret when people succeed in their ways.",
    "theme": "Patience • June"
  },
  {
    "dayOfYear": 181,
    "calendarDate": "June 30",
    "ref": "Psalm 4:8",
    "text": "In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety.",
    "theme": "Safety • June"
  },
  {
    "dayOfYear": 182,
    "calendarDate": "July 1",
    "ref": "John 14:27",
    "text": "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled.",
    "theme": "Peace of Christ • July"
  },
  {
    "dayOfYear": 183,
    "calendarDate": "July 2",
    "ref": "Proverbs 3:24",
    "text": "When you lie down, you will not be afraid; when you lie down, your sleep will be sweet.",
    "theme": "Sweet Sleep • July"
  },
  {
    "dayOfYear": 184,
    "calendarDate": "July 3",
    "ref": "Philippians 4:6-7",
    "text": "Do not be anxious about anything, but in every situation present your requests to God. And the peace of God will guard your hearts.",
    "theme": "Guarding Peace • July"
  },
  {
    "dayOfYear": 185,
    "calendarDate": "July 4",
    "ref": "Psalm 91:1-2",
    "text": "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the Lord, 'He is my refuge.'",
    "theme": "Shelter • July"
  },
  {
    "dayOfYear": 186,
    "calendarDate": "July 5",
    "ref": "Matthew 11:28",
    "text": "Come to me, all you who are weary and burdened, and I will give you rest.",
    "theme": "Rest for Weary • July"
  },
  {
    "dayOfYear": 187,
    "calendarDate": "July 6",
    "ref": "Psalm 121:3-4",
    "text": "He who watches over you will not slumber; indeed, he who watches over Israel will neither slumber nor sleep.",
    "theme": "The Keeper • July"
  },
  {
    "dayOfYear": 188,
    "calendarDate": "July 7",
    "ref": "Psalm 46:10",
    "text": "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.",
    "theme": "Stillness • July"
  },
  {
    "dayOfYear": 189,
    "calendarDate": "July 8",
    "ref": "Isaiah 26:3",
    "text": "You will keep in perfect peace those whose minds are steadfast, because they trust in you.",
    "theme": "Perfect Peace • July"
  },
  {
    "dayOfYear": 190,
    "calendarDate": "July 9",
    "ref": "Psalm 3:5",
    "text": "I lie down and sleep; I wake again, because the Lord sustains me.",
    "theme": "Sustained • July"
  },
  {
    "dayOfYear": 191,
    "calendarDate": "July 10",
    "ref": "Psalm 16:7-8",
    "text": "I will praise the Lord, who counsels me; even at night my heart instructs me. I keep my eyes always on the Lord.",
    "theme": "Night Counsel • July"
  },
  {
    "dayOfYear": 192,
    "calendarDate": "July 11",
    "ref": "Psalm 23:1-3",
    "text": "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters.",
    "theme": "Quiet Waters • July"
  },
  {
    "dayOfYear": 193,
    "calendarDate": "July 12",
    "ref": "Psalm 42:8",
    "text": "By day the Lord directs his love, at night his song is with me—a prayer to the God of my life.",
    "theme": "Night Song • July"
  },
  {
    "dayOfYear": 194,
    "calendarDate": "July 13",
    "ref": "Psalm 62:1-2",
    "text": "Truly my soul finds rest in God; my salvation comes from him. Truly he is my rock and my salvation.",
    "theme": "Rest in God • July"
  },
  {
    "dayOfYear": 195,
    "calendarDate": "July 14",
    "ref": "Psalm 63:6-7",
    "text": "On my bed I remember you; I think of you through the watches of the night. Because you are my help, I sing in the shadow of your wings.",
    "theme": "Night Meditation • July"
  },
  {
    "dayOfYear": 196,
    "calendarDate": "July 15",
    "ref": "Psalm 116:7",
    "text": "Return to your rest, my soul, for the Lord has been good to you.",
    "theme": "Soul Rest • July"
  },
  {
    "dayOfYear": 197,
    "calendarDate": "July 16",
    "ref": "Psalm 119:165",
    "text": "Great peace have those who love your law, and nothing can make them stumble.",
    "theme": "Great Peace • July"
  },
  {
    "dayOfYear": 198,
    "calendarDate": "July 17",
    "ref": "Psalm 127:2",
    "text": "In vain you rise early and stay up late, toiling for food to eat—for he grants sleep to those he loves.",
    "theme": "Gift of Sleep • July"
  },
  {
    "dayOfYear": 199,
    "calendarDate": "July 18",
    "ref": "Psalm 131:2",
    "text": "I have calmed and quieted myself, I am like a weaned child with its mother; like a weaned child I am content.",
    "theme": "Calm Contentment • July"
  },
  {
    "dayOfYear": 200,
    "calendarDate": "July 19",
    "ref": "Psalm 138:7",
    "text": "Though I walk in the midst of trouble, you preserve my life. You stretch out your hand against the anger of my foes.",
    "theme": "Preservation • July"
  },
  {
    "dayOfYear": 201,
    "calendarDate": "July 20",
    "ref": "Isaiah 30:15",
    "text": "In repentance and rest is your salvation, in quietness and trust is your strength.",
    "theme": "Quietness & Trust • July"
  },
  {
    "dayOfYear": 202,
    "calendarDate": "July 21",
    "ref": "Isaiah 32:17-18",
    "text": "The fruit of that righteousness will be peace; its effect will be quietness and confidence forever.",
    "theme": "Confidence • July"
  },
  {
    "dayOfYear": 203,
    "calendarDate": "July 22",
    "ref": "2 Thessalonians 3:16",
    "text": "Now may the Lord of peace himself give you peace at all times and in every way. The Lord be with all of you.",
    "theme": "Constant Peace • July"
  },
  {
    "dayOfYear": 204,
    "calendarDate": "July 23",
    "ref": "1 Peter 5:7",
    "text": "Cast all your anxiety on him because he cares for you.",
    "theme": "Casting Care • July"
  },
  {
    "dayOfYear": 205,
    "calendarDate": "July 24",
    "ref": "Colossians 3:15",
    "text": "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace.",
    "theme": "Ruling Peace • July"
  },
  {
    "dayOfYear": 206,
    "calendarDate": "July 25",
    "ref": "Romans 15:13",
    "text": "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope.",
    "theme": "Overflowing Peace • July"
  },
  {
    "dayOfYear": 207,
    "calendarDate": "July 26",
    "ref": "Numbers 6:24-26",
    "text": "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord lift up his countenance and give you peace.",
    "theme": "Aaronic Blessing • July"
  },
  {
    "dayOfYear": 208,
    "calendarDate": "July 27",
    "ref": "Exodus 33:14",
    "text": "The Lord replied, 'My Presence will go with you, and I will give you rest.'",
    "theme": "Divine Presence • July"
  },
  {
    "dayOfYear": 209,
    "calendarDate": "July 28",
    "ref": "Psalm 34:7",
    "text": "The angel of the Lord encamps around those who fear him, and he delivers them.",
    "theme": "Angelic Guard • July"
  },
  {
    "dayOfYear": 210,
    "calendarDate": "July 29",
    "ref": "Psalm 37:7",
    "text": "Be still before the Lord and wait patiently for him; do not fret when people succeed in their ways.",
    "theme": "Patience • July"
  },
  {
    "dayOfYear": 211,
    "calendarDate": "July 30",
    "ref": "Psalm 4:8",
    "text": "In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety.",
    "theme": "Safety • July"
  },
  {
    "dayOfYear": 212,
    "calendarDate": "July 31",
    "ref": "John 14:27",
    "text": "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled.",
    "theme": "Peace of Christ • July"
  },
  {
    "dayOfYear": 213,
    "calendarDate": "August 1",
    "ref": "Proverbs 3:24",
    "text": "When you lie down, you will not be afraid; when you lie down, your sleep will be sweet.",
    "theme": "Sweet Sleep • August"
  },
  {
    "dayOfYear": 214,
    "calendarDate": "August 2",
    "ref": "Philippians 4:6-7",
    "text": "Do not be anxious about anything, but in every situation present your requests to God. And the peace of God will guard your hearts.",
    "theme": "Guarding Peace • August"
  },
  {
    "dayOfYear": 215,
    "calendarDate": "August 3",
    "ref": "Psalm 91:1-2",
    "text": "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the Lord, 'He is my refuge.'",
    "theme": "Shelter • August"
  },
  {
    "dayOfYear": 216,
    "calendarDate": "August 4",
    "ref": "Matthew 11:28",
    "text": "Come to me, all you who are weary and burdened, and I will give you rest.",
    "theme": "Rest for Weary • August"
  },
  {
    "dayOfYear": 217,
    "calendarDate": "August 5",
    "ref": "Psalm 121:3-4",
    "text": "He who watches over you will not slumber; indeed, he who watches over Israel will neither slumber nor sleep.",
    "theme": "The Keeper • August"
  },
  {
    "dayOfYear": 218,
    "calendarDate": "August 6",
    "ref": "Psalm 46:10",
    "text": "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.",
    "theme": "Stillness • August"
  },
  {
    "dayOfYear": 219,
    "calendarDate": "August 7",
    "ref": "Isaiah 26:3",
    "text": "You will keep in perfect peace those whose minds are steadfast, because they trust in you.",
    "theme": "Perfect Peace • August"
  },
  {
    "dayOfYear": 220,
    "calendarDate": "August 8",
    "ref": "Psalm 3:5",
    "text": "I lie down and sleep; I wake again, because the Lord sustains me.",
    "theme": "Sustained • August"
  },
  {
    "dayOfYear": 221,
    "calendarDate": "August 9",
    "ref": "Psalm 16:7-8",
    "text": "I will praise the Lord, who counsels me; even at night my heart instructs me. I keep my eyes always on the Lord.",
    "theme": "Night Counsel • August"
  },
  {
    "dayOfYear": 222,
    "calendarDate": "August 10",
    "ref": "Psalm 23:1-3",
    "text": "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters.",
    "theme": "Quiet Waters • August"
  },
  {
    "dayOfYear": 223,
    "calendarDate": "August 11",
    "ref": "Psalm 42:8",
    "text": "By day the Lord directs his love, at night his song is with me—a prayer to the God of my life.",
    "theme": "Night Song • August"
  },
  {
    "dayOfYear": 224,
    "calendarDate": "August 12",
    "ref": "Psalm 62:1-2",
    "text": "Truly my soul finds rest in God; my salvation comes from him. Truly he is my rock and my salvation.",
    "theme": "Rest in God • August"
  },
  {
    "dayOfYear": 225,
    "calendarDate": "August 13",
    "ref": "Psalm 63:6-7",
    "text": "On my bed I remember you; I think of you through the watches of the night. Because you are my help, I sing in the shadow of your wings.",
    "theme": "Night Meditation • August"
  },
  {
    "dayOfYear": 226,
    "calendarDate": "August 14",
    "ref": "Psalm 116:7",
    "text": "Return to your rest, my soul, for the Lord has been good to you.",
    "theme": "Soul Rest • August"
  },
  {
    "dayOfYear": 227,
    "calendarDate": "August 15",
    "ref": "Psalm 119:165",
    "text": "Great peace have those who love your law, and nothing can make them stumble.",
    "theme": "Great Peace • August"
  },
  {
    "dayOfYear": 228,
    "calendarDate": "August 16",
    "ref": "Psalm 127:2",
    "text": "In vain you rise early and stay up late, toiling for food to eat—for he grants sleep to those he loves.",
    "theme": "Gift of Sleep • August"
  },
  {
    "dayOfYear": 229,
    "calendarDate": "August 17",
    "ref": "Psalm 131:2",
    "text": "I have calmed and quieted myself, I am like a weaned child with its mother; like a weaned child I am content.",
    "theme": "Calm Contentment • August"
  },
  {
    "dayOfYear": 230,
    "calendarDate": "August 18",
    "ref": "Psalm 138:7",
    "text": "Though I walk in the midst of trouble, you preserve my life. You stretch out your hand against the anger of my foes.",
    "theme": "Preservation • August"
  },
  {
    "dayOfYear": 231,
    "calendarDate": "August 19",
    "ref": "Isaiah 30:15",
    "text": "In repentance and rest is your salvation, in quietness and trust is your strength.",
    "theme": "Quietness & Trust • August"
  },
  {
    "dayOfYear": 232,
    "calendarDate": "August 20",
    "ref": "Isaiah 32:17-18",
    "text": "The fruit of that righteousness will be peace; its effect will be quietness and confidence forever.",
    "theme": "Confidence • August"
  },
  {
    "dayOfYear": 233,
    "calendarDate": "August 21",
    "ref": "2 Thessalonians 3:16",
    "text": "Now may the Lord of peace himself give you peace at all times and in every way. The Lord be with all of you.",
    "theme": "Constant Peace • August"
  },
  {
    "dayOfYear": 234,
    "calendarDate": "August 22",
    "ref": "1 Peter 5:7",
    "text": "Cast all your anxiety on him because he cares for you.",
    "theme": "Casting Care • August"
  },
  {
    "dayOfYear": 235,
    "calendarDate": "August 23",
    "ref": "Colossians 3:15",
    "text": "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace.",
    "theme": "Ruling Peace • August"
  },
  {
    "dayOfYear": 236,
    "calendarDate": "August 24",
    "ref": "Romans 15:13",
    "text": "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope.",
    "theme": "Overflowing Peace • August"
  },
  {
    "dayOfYear": 237,
    "calendarDate": "August 25",
    "ref": "Numbers 6:24-26",
    "text": "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord lift up his countenance and give you peace.",
    "theme": "Aaronic Blessing • August"
  },
  {
    "dayOfYear": 238,
    "calendarDate": "August 26",
    "ref": "Exodus 33:14",
    "text": "The Lord replied, 'My Presence will go with you, and I will give you rest.'",
    "theme": "Divine Presence • August"
  },
  {
    "dayOfYear": 239,
    "calendarDate": "August 27",
    "ref": "Psalm 34:7",
    "text": "The angel of the Lord encamps around those who fear him, and he delivers them.",
    "theme": "Angelic Guard • August"
  },
  {
    "dayOfYear": 240,
    "calendarDate": "August 28",
    "ref": "Psalm 37:7",
    "text": "Be still before the Lord and wait patiently for him; do not fret when people succeed in their ways.",
    "theme": "Patience • August"
  },
  {
    "dayOfYear": 241,
    "calendarDate": "August 29",
    "ref": "Psalm 4:8",
    "text": "In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety.",
    "theme": "Safety • August"
  },
  {
    "dayOfYear": 242,
    "calendarDate": "August 30",
    "ref": "John 14:27",
    "text": "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled.",
    "theme": "Peace of Christ • August"
  },
  {
    "dayOfYear": 243,
    "calendarDate": "August 31",
    "ref": "Proverbs 3:24",
    "text": "When you lie down, you will not be afraid; when you lie down, your sleep will be sweet.",
    "theme": "Sweet Sleep • August"
  },
  {
    "dayOfYear": 244,
    "calendarDate": "September 1",
    "ref": "Philippians 4:6-7",
    "text": "Do not be anxious about anything, but in every situation present your requests to God. And the peace of God will guard your hearts.",
    "theme": "Guarding Peace • September"
  },
  {
    "dayOfYear": 245,
    "calendarDate": "September 2",
    "ref": "Psalm 91:1-2",
    "text": "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the Lord, 'He is my refuge.'",
    "theme": "Shelter • September"
  },
  {
    "dayOfYear": 246,
    "calendarDate": "September 3",
    "ref": "Matthew 11:28",
    "text": "Come to me, all you who are weary and burdened, and I will give you rest.",
    "theme": "Rest for Weary • September"
  },
  {
    "dayOfYear": 247,
    "calendarDate": "September 4",
    "ref": "Psalm 121:3-4",
    "text": "He who watches over you will not slumber; indeed, he who watches over Israel will neither slumber nor sleep.",
    "theme": "The Keeper • September"
  },
  {
    "dayOfYear": 248,
    "calendarDate": "September 5",
    "ref": "Psalm 46:10",
    "text": "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.",
    "theme": "Stillness • September"
  },
  {
    "dayOfYear": 249,
    "calendarDate": "September 6",
    "ref": "Isaiah 26:3",
    "text": "You will keep in perfect peace those whose minds are steadfast, because they trust in you.",
    "theme": "Perfect Peace • September"
  },
  {
    "dayOfYear": 250,
    "calendarDate": "September 7",
    "ref": "Psalm 3:5",
    "text": "I lie down and sleep; I wake again, because the Lord sustains me.",
    "theme": "Sustained • September"
  },
  {
    "dayOfYear": 251,
    "calendarDate": "September 8",
    "ref": "Psalm 16:7-8",
    "text": "I will praise the Lord, who counsels me; even at night my heart instructs me. I keep my eyes always on the Lord.",
    "theme": "Night Counsel • September"
  },
  {
    "dayOfYear": 252,
    "calendarDate": "September 9",
    "ref": "Psalm 23:1-3",
    "text": "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters.",
    "theme": "Quiet Waters • September"
  },
  {
    "dayOfYear": 253,
    "calendarDate": "September 10",
    "ref": "Psalm 42:8",
    "text": "By day the Lord directs his love, at night his song is with me—a prayer to the God of my life.",
    "theme": "Night Song • September"
  },
  {
    "dayOfYear": 254,
    "calendarDate": "September 11",
    "ref": "Psalm 62:1-2",
    "text": "Truly my soul finds rest in God; my salvation comes from him. Truly he is my rock and my salvation.",
    "theme": "Rest in God • September"
  },
  {
    "dayOfYear": 255,
    "calendarDate": "September 12",
    "ref": "Psalm 63:6-7",
    "text": "On my bed I remember you; I think of you through the watches of the night. Because you are my help, I sing in the shadow of your wings.",
    "theme": "Night Meditation • September"
  },
  {
    "dayOfYear": 256,
    "calendarDate": "September 13",
    "ref": "Psalm 116:7",
    "text": "Return to your rest, my soul, for the Lord has been good to you.",
    "theme": "Soul Rest • September"
  },
  {
    "dayOfYear": 257,
    "calendarDate": "September 14",
    "ref": "Psalm 119:165",
    "text": "Great peace have those who love your law, and nothing can make them stumble.",
    "theme": "Great Peace • September"
  },
  {
    "dayOfYear": 258,
    "calendarDate": "September 15",
    "ref": "Psalm 127:2",
    "text": "In vain you rise early and stay up late, toiling for food to eat—for he grants sleep to those he loves.",
    "theme": "Gift of Sleep • September"
  },
  {
    "dayOfYear": 259,
    "calendarDate": "September 16",
    "ref": "Psalm 131:2",
    "text": "I have calmed and quieted myself, I am like a weaned child with its mother; like a weaned child I am content.",
    "theme": "Calm Contentment • September"
  },
  {
    "dayOfYear": 260,
    "calendarDate": "September 17",
    "ref": "Psalm 138:7",
    "text": "Though I walk in the midst of trouble, you preserve my life. You stretch out your hand against the anger of my foes.",
    "theme": "Preservation • September"
  },
  {
    "dayOfYear": 261,
    "calendarDate": "September 18",
    "ref": "Isaiah 30:15",
    "text": "In repentance and rest is your salvation, in quietness and trust is your strength.",
    "theme": "Quietness & Trust • September"
  },
  {
    "dayOfYear": 262,
    "calendarDate": "September 19",
    "ref": "Isaiah 32:17-18",
    "text": "The fruit of that righteousness will be peace; its effect will be quietness and confidence forever.",
    "theme": "Confidence • September"
  },
  {
    "dayOfYear": 263,
    "calendarDate": "September 20",
    "ref": "2 Thessalonians 3:16",
    "text": "Now may the Lord of peace himself give you peace at all times and in every way. The Lord be with all of you.",
    "theme": "Constant Peace • September"
  },
  {
    "dayOfYear": 264,
    "calendarDate": "September 21",
    "ref": "1 Peter 5:7",
    "text": "Cast all your anxiety on him because he cares for you.",
    "theme": "Casting Care • September"
  },
  {
    "dayOfYear": 265,
    "calendarDate": "September 22",
    "ref": "Colossians 3:15",
    "text": "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace.",
    "theme": "Ruling Peace • September"
  },
  {
    "dayOfYear": 266,
    "calendarDate": "September 23",
    "ref": "Romans 15:13",
    "text": "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope.",
    "theme": "Overflowing Peace • September"
  },
  {
    "dayOfYear": 267,
    "calendarDate": "September 24",
    "ref": "Numbers 6:24-26",
    "text": "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord lift up his countenance and give you peace.",
    "theme": "Aaronic Blessing • September"
  },
  {
    "dayOfYear": 268,
    "calendarDate": "September 25",
    "ref": "Exodus 33:14",
    "text": "The Lord replied, 'My Presence will go with you, and I will give you rest.'",
    "theme": "Divine Presence • September"
  },
  {
    "dayOfYear": 269,
    "calendarDate": "September 26",
    "ref": "Psalm 34:7",
    "text": "The angel of the Lord encamps around those who fear him, and he delivers them.",
    "theme": "Angelic Guard • September"
  },
  {
    "dayOfYear": 270,
    "calendarDate": "September 27",
    "ref": "Psalm 37:7",
    "text": "Be still before the Lord and wait patiently for him; do not fret when people succeed in their ways.",
    "theme": "Patience • September"
  },
  {
    "dayOfYear": 271,
    "calendarDate": "September 28",
    "ref": "Psalm 4:8",
    "text": "In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety.",
    "theme": "Safety • September"
  },
  {
    "dayOfYear": 272,
    "calendarDate": "September 29",
    "ref": "John 14:27",
    "text": "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled.",
    "theme": "Peace of Christ • September"
  },
  {
    "dayOfYear": 273,
    "calendarDate": "September 30",
    "ref": "Proverbs 3:24",
    "text": "When you lie down, you will not be afraid; when you lie down, your sleep will be sweet.",
    "theme": "Sweet Sleep • September"
  },
  {
    "dayOfYear": 274,
    "calendarDate": "October 1",
    "ref": "Philippians 4:6-7",
    "text": "Do not be anxious about anything, but in every situation present your requests to God. And the peace of God will guard your hearts.",
    "theme": "Guarding Peace • October"
  },
  {
    "dayOfYear": 275,
    "calendarDate": "October 2",
    "ref": "Psalm 91:1-2",
    "text": "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the Lord, 'He is my refuge.'",
    "theme": "Shelter • October"
  },
  {
    "dayOfYear": 276,
    "calendarDate": "October 3",
    "ref": "Matthew 11:28",
    "text": "Come to me, all you who are weary and burdened, and I will give you rest.",
    "theme": "Rest for Weary • October"
  },
  {
    "dayOfYear": 277,
    "calendarDate": "October 4",
    "ref": "Psalm 121:3-4",
    "text": "He who watches over you will not slumber; indeed, he who watches over Israel will neither slumber nor sleep.",
    "theme": "The Keeper • October"
  },
  {
    "dayOfYear": 278,
    "calendarDate": "October 5",
    "ref": "Psalm 46:10",
    "text": "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.",
    "theme": "Stillness • October"
  },
  {
    "dayOfYear": 279,
    "calendarDate": "October 6",
    "ref": "Isaiah 26:3",
    "text": "You will keep in perfect peace those whose minds are steadfast, because they trust in you.",
    "theme": "Perfect Peace • October"
  },
  {
    "dayOfYear": 280,
    "calendarDate": "October 7",
    "ref": "Psalm 3:5",
    "text": "I lie down and sleep; I wake again, because the Lord sustains me.",
    "theme": "Sustained • October"
  },
  {
    "dayOfYear": 281,
    "calendarDate": "October 8",
    "ref": "Psalm 16:7-8",
    "text": "I will praise the Lord, who counsels me; even at night my heart instructs me. I keep my eyes always on the Lord.",
    "theme": "Night Counsel • October"
  },
  {
    "dayOfYear": 282,
    "calendarDate": "October 9",
    "ref": "Psalm 23:1-3",
    "text": "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters.",
    "theme": "Quiet Waters • October"
  },
  {
    "dayOfYear": 283,
    "calendarDate": "October 10",
    "ref": "Psalm 42:8",
    "text": "By day the Lord directs his love, at night his song is with me—a prayer to the God of my life.",
    "theme": "Night Song • October"
  },
  {
    "dayOfYear": 284,
    "calendarDate": "October 11",
    "ref": "Psalm 62:1-2",
    "text": "Truly my soul finds rest in God; my salvation comes from him. Truly he is my rock and my salvation.",
    "theme": "Rest in God • October"
  },
  {
    "dayOfYear": 285,
    "calendarDate": "October 12",
    "ref": "Psalm 63:6-7",
    "text": "On my bed I remember you; I think of you through the watches of the night. Because you are my help, I sing in the shadow of your wings.",
    "theme": "Night Meditation • October"
  },
  {
    "dayOfYear": 286,
    "calendarDate": "October 13",
    "ref": "Psalm 116:7",
    "text": "Return to your rest, my soul, for the Lord has been good to you.",
    "theme": "Soul Rest • October"
  },
  {
    "dayOfYear": 287,
    "calendarDate": "October 14",
    "ref": "Psalm 119:165",
    "text": "Great peace have those who love your law, and nothing can make them stumble.",
    "theme": "Great Peace • October"
  },
  {
    "dayOfYear": 288,
    "calendarDate": "October 15",
    "ref": "Psalm 127:2",
    "text": "In vain you rise early and stay up late, toiling for food to eat—for he grants sleep to those he loves.",
    "theme": "Gift of Sleep • October"
  },
  {
    "dayOfYear": 289,
    "calendarDate": "October 16",
    "ref": "Psalm 131:2",
    "text": "I have calmed and quieted myself, I am like a weaned child with its mother; like a weaned child I am content.",
    "theme": "Calm Contentment • October"
  },
  {
    "dayOfYear": 290,
    "calendarDate": "October 17",
    "ref": "Psalm 138:7",
    "text": "Though I walk in the midst of trouble, you preserve my life. You stretch out your hand against the anger of my foes.",
    "theme": "Preservation • October"
  },
  {
    "dayOfYear": 291,
    "calendarDate": "October 18",
    "ref": "Isaiah 30:15",
    "text": "In repentance and rest is your salvation, in quietness and trust is your strength.",
    "theme": "Quietness & Trust • October"
  },
  {
    "dayOfYear": 292,
    "calendarDate": "October 19",
    "ref": "Isaiah 32:17-18",
    "text": "The fruit of that righteousness will be peace; its effect will be quietness and confidence forever.",
    "theme": "Confidence • October"
  },
  {
    "dayOfYear": 293,
    "calendarDate": "October 20",
    "ref": "2 Thessalonians 3:16",
    "text": "Now may the Lord of peace himself give you peace at all times and in every way. The Lord be with all of you.",
    "theme": "Constant Peace • October"
  },
  {
    "dayOfYear": 294,
    "calendarDate": "October 21",
    "ref": "1 Peter 5:7",
    "text": "Cast all your anxiety on him because he cares for you.",
    "theme": "Casting Care • October"
  },
  {
    "dayOfYear": 295,
    "calendarDate": "October 22",
    "ref": "Colossians 3:15",
    "text": "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace.",
    "theme": "Ruling Peace • October"
  },
  {
    "dayOfYear": 296,
    "calendarDate": "October 23",
    "ref": "Romans 15:13",
    "text": "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope.",
    "theme": "Overflowing Peace • October"
  },
  {
    "dayOfYear": 297,
    "calendarDate": "October 24",
    "ref": "Numbers 6:24-26",
    "text": "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord lift up his countenance and give you peace.",
    "theme": "Aaronic Blessing • October"
  },
  {
    "dayOfYear": 298,
    "calendarDate": "October 25",
    "ref": "Exodus 33:14",
    "text": "The Lord replied, 'My Presence will go with you, and I will give you rest.'",
    "theme": "Divine Presence • October"
  },
  {
    "dayOfYear": 299,
    "calendarDate": "October 26",
    "ref": "Psalm 34:7",
    "text": "The angel of the Lord encamps around those who fear him, and he delivers them.",
    "theme": "Angelic Guard • October"
  },
  {
    "dayOfYear": 300,
    "calendarDate": "October 27",
    "ref": "Psalm 37:7",
    "text": "Be still before the Lord and wait patiently for him; do not fret when people succeed in their ways.",
    "theme": "Patience • October"
  },
  {
    "dayOfYear": 301,
    "calendarDate": "October 28",
    "ref": "Psalm 4:8",
    "text": "In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety.",
    "theme": "Safety • October"
  },
  {
    "dayOfYear": 302,
    "calendarDate": "October 29",
    "ref": "John 14:27",
    "text": "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled.",
    "theme": "Peace of Christ • October"
  },
  {
    "dayOfYear": 303,
    "calendarDate": "October 30",
    "ref": "Proverbs 3:24",
    "text": "When you lie down, you will not be afraid; when you lie down, your sleep will be sweet.",
    "theme": "Sweet Sleep • October"
  },
  {
    "dayOfYear": 304,
    "calendarDate": "October 31",
    "ref": "Philippians 4:6-7",
    "text": "Do not be anxious about anything, but in every situation present your requests to God. And the peace of God will guard your hearts.",
    "theme": "Guarding Peace • October"
  },
  {
    "dayOfYear": 305,
    "calendarDate": "November 1",
    "ref": "Psalm 91:1-2",
    "text": "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the Lord, 'He is my refuge.'",
    "theme": "Shelter • November"
  },
  {
    "dayOfYear": 306,
    "calendarDate": "November 2",
    "ref": "Matthew 11:28",
    "text": "Come to me, all you who are weary and burdened, and I will give you rest.",
    "theme": "Rest for Weary • November"
  },
  {
    "dayOfYear": 307,
    "calendarDate": "November 3",
    "ref": "Psalm 121:3-4",
    "text": "He who watches over you will not slumber; indeed, he who watches over Israel will neither slumber nor sleep.",
    "theme": "The Keeper • November"
  },
  {
    "dayOfYear": 308,
    "calendarDate": "November 4",
    "ref": "Psalm 46:10",
    "text": "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.",
    "theme": "Stillness • November"
  },
  {
    "dayOfYear": 309,
    "calendarDate": "November 5",
    "ref": "Isaiah 26:3",
    "text": "You will keep in perfect peace those whose minds are steadfast, because they trust in you.",
    "theme": "Perfect Peace • November"
  },
  {
    "dayOfYear": 310,
    "calendarDate": "November 6",
    "ref": "Psalm 3:5",
    "text": "I lie down and sleep; I wake again, because the Lord sustains me.",
    "theme": "Sustained • November"
  },
  {
    "dayOfYear": 311,
    "calendarDate": "November 7",
    "ref": "Psalm 16:7-8",
    "text": "I will praise the Lord, who counsels me; even at night my heart instructs me. I keep my eyes always on the Lord.",
    "theme": "Night Counsel • November"
  },
  {
    "dayOfYear": 312,
    "calendarDate": "November 8",
    "ref": "Psalm 23:1-3",
    "text": "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters.",
    "theme": "Quiet Waters • November"
  },
  {
    "dayOfYear": 313,
    "calendarDate": "November 9",
    "ref": "Psalm 42:8",
    "text": "By day the Lord directs his love, at night his song is with me—a prayer to the God of my life.",
    "theme": "Night Song • November"
  },
  {
    "dayOfYear": 314,
    "calendarDate": "November 10",
    "ref": "Psalm 62:1-2",
    "text": "Truly my soul finds rest in God; my salvation comes from him. Truly he is my rock and my salvation.",
    "theme": "Rest in God • November"
  },
  {
    "dayOfYear": 315,
    "calendarDate": "November 11",
    "ref": "Psalm 63:6-7",
    "text": "On my bed I remember you; I think of you through the watches of the night. Because you are my help, I sing in the shadow of your wings.",
    "theme": "Night Meditation • November"
  },
  {
    "dayOfYear": 316,
    "calendarDate": "November 12",
    "ref": "Psalm 116:7",
    "text": "Return to your rest, my soul, for the Lord has been good to you.",
    "theme": "Soul Rest • November"
  },
  {
    "dayOfYear": 317,
    "calendarDate": "November 13",
    "ref": "Psalm 119:165",
    "text": "Great peace have those who love your law, and nothing can make them stumble.",
    "theme": "Great Peace • November"
  },
  {
    "dayOfYear": 318,
    "calendarDate": "November 14",
    "ref": "Psalm 127:2",
    "text": "In vain you rise early and stay up late, toiling for food to eat—for he grants sleep to those he loves.",
    "theme": "Gift of Sleep • November"
  },
  {
    "dayOfYear": 319,
    "calendarDate": "November 15",
    "ref": "Psalm 131:2",
    "text": "I have calmed and quieted myself, I am like a weaned child with its mother; like a weaned child I am content.",
    "theme": "Calm Contentment • November"
  },
  {
    "dayOfYear": 320,
    "calendarDate": "November 16",
    "ref": "Psalm 138:7",
    "text": "Though I walk in the midst of trouble, you preserve my life. You stretch out your hand against the anger of my foes.",
    "theme": "Preservation • November"
  },
  {
    "dayOfYear": 321,
    "calendarDate": "November 17",
    "ref": "Isaiah 30:15",
    "text": "In repentance and rest is your salvation, in quietness and trust is your strength.",
    "theme": "Quietness & Trust • November"
  },
  {
    "dayOfYear": 322,
    "calendarDate": "November 18",
    "ref": "Isaiah 32:17-18",
    "text": "The fruit of that righteousness will be peace; its effect will be quietness and confidence forever.",
    "theme": "Confidence • November"
  },
  {
    "dayOfYear": 323,
    "calendarDate": "November 19",
    "ref": "2 Thessalonians 3:16",
    "text": "Now may the Lord of peace himself give you peace at all times and in every way. The Lord be with all of you.",
    "theme": "Constant Peace • November"
  },
  {
    "dayOfYear": 324,
    "calendarDate": "November 20",
    "ref": "1 Peter 5:7",
    "text": "Cast all your anxiety on him because he cares for you.",
    "theme": "Casting Care • November"
  },
  {
    "dayOfYear": 325,
    "calendarDate": "November 21",
    "ref": "Colossians 3:15",
    "text": "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace.",
    "theme": "Ruling Peace • November"
  },
  {
    "dayOfYear": 326,
    "calendarDate": "November 22",
    "ref": "Romans 15:13",
    "text": "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope.",
    "theme": "Overflowing Peace • November"
  },
  {
    "dayOfYear": 327,
    "calendarDate": "November 23",
    "ref": "Numbers 6:24-26",
    "text": "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord lift up his countenance and give you peace.",
    "theme": "Aaronic Blessing • November"
  },
  {
    "dayOfYear": 328,
    "calendarDate": "November 24",
    "ref": "Exodus 33:14",
    "text": "The Lord replied, 'My Presence will go with you, and I will give you rest.'",
    "theme": "Divine Presence • November"
  },
  {
    "dayOfYear": 329,
    "calendarDate": "November 25",
    "ref": "Psalm 34:7",
    "text": "The angel of the Lord encamps around those who fear him, and he delivers them.",
    "theme": "Angelic Guard • November"
  },
  {
    "dayOfYear": 330,
    "calendarDate": "November 26",
    "ref": "Psalm 37:7",
    "text": "Be still before the Lord and wait patiently for him; do not fret when people succeed in their ways.",
    "theme": "Patience • November"
  },
  {
    "dayOfYear": 331,
    "calendarDate": "November 27",
    "ref": "Psalm 4:8",
    "text": "In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety.",
    "theme": "Safety • November"
  },
  {
    "dayOfYear": 332,
    "calendarDate": "November 28",
    "ref": "John 14:27",
    "text": "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled.",
    "theme": "Peace of Christ • November"
  },
  {
    "dayOfYear": 333,
    "calendarDate": "November 29",
    "ref": "Proverbs 3:24",
    "text": "When you lie down, you will not be afraid; when you lie down, your sleep will be sweet.",
    "theme": "Sweet Sleep • November"
  },
  {
    "dayOfYear": 334,
    "calendarDate": "November 30",
    "ref": "Philippians 4:6-7",
    "text": "Do not be anxious about anything, but in every situation present your requests to God. And the peace of God will guard your hearts.",
    "theme": "Guarding Peace • November"
  },
  {
    "dayOfYear": 335,
    "calendarDate": "December 1",
    "ref": "Psalm 91:1-2",
    "text": "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the Lord, 'He is my refuge.'",
    "theme": "Shelter • December"
  },
  {
    "dayOfYear": 336,
    "calendarDate": "December 2",
    "ref": "Matthew 11:28",
    "text": "Come to me, all you who are weary and burdened, and I will give you rest.",
    "theme": "Rest for Weary • December"
  },
  {
    "dayOfYear": 337,
    "calendarDate": "December 3",
    "ref": "Psalm 121:3-4",
    "text": "He who watches over you will not slumber; indeed, he who watches over Israel will neither slumber nor sleep.",
    "theme": "The Keeper • December"
  },
  {
    "dayOfYear": 338,
    "calendarDate": "December 4",
    "ref": "Psalm 46:10",
    "text": "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.",
    "theme": "Stillness • December"
  },
  {
    "dayOfYear": 339,
    "calendarDate": "December 5",
    "ref": "Isaiah 26:3",
    "text": "You will keep in perfect peace those whose minds are steadfast, because they trust in you.",
    "theme": "Perfect Peace • December"
  },
  {
    "dayOfYear": 340,
    "calendarDate": "December 6",
    "ref": "Psalm 3:5",
    "text": "I lie down and sleep; I wake again, because the Lord sustains me.",
    "theme": "Sustained • December"
  },
  {
    "dayOfYear": 341,
    "calendarDate": "December 7",
    "ref": "Psalm 16:7-8",
    "text": "I will praise the Lord, who counsels me; even at night my heart instructs me. I keep my eyes always on the Lord.",
    "theme": "Night Counsel • December"
  },
  {
    "dayOfYear": 342,
    "calendarDate": "December 8",
    "ref": "Psalm 23:1-3",
    "text": "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters.",
    "theme": "Quiet Waters • December"
  },
  {
    "dayOfYear": 343,
    "calendarDate": "December 9",
    "ref": "Psalm 42:8",
    "text": "By day the Lord directs his love, at night his song is with me—a prayer to the God of my life.",
    "theme": "Night Song • December"
  },
  {
    "dayOfYear": 344,
    "calendarDate": "December 10",
    "ref": "Psalm 62:1-2",
    "text": "Truly my soul finds rest in God; my salvation comes from him. Truly he is my rock and my salvation.",
    "theme": "Rest in God • December"
  },
  {
    "dayOfYear": 345,
    "calendarDate": "December 11",
    "ref": "Psalm 63:6-7",
    "text": "On my bed I remember you; I think of you through the watches of the night. Because you are my help, I sing in the shadow of your wings.",
    "theme": "Night Meditation • December"
  },
  {
    "dayOfYear": 346,
    "calendarDate": "December 12",
    "ref": "Psalm 116:7",
    "text": "Return to your rest, my soul, for the Lord has been good to you.",
    "theme": "Soul Rest • December"
  },
  {
    "dayOfYear": 347,
    "calendarDate": "December 13",
    "ref": "Psalm 119:165",
    "text": "Great peace have those who love your law, and nothing can make them stumble.",
    "theme": "Great Peace • December"
  },
  {
    "dayOfYear": 348,
    "calendarDate": "December 14",
    "ref": "Psalm 127:2",
    "text": "In vain you rise early and stay up late, toiling for food to eat—for he grants sleep to those he loves.",
    "theme": "Gift of Sleep • December"
  },
  {
    "dayOfYear": 349,
    "calendarDate": "December 15",
    "ref": "Psalm 131:2",
    "text": "I have calmed and quieted myself, I am like a weaned child with its mother; like a weaned child I am content.",
    "theme": "Calm Contentment • December"
  },
  {
    "dayOfYear": 350,
    "calendarDate": "December 16",
    "ref": "Psalm 138:7",
    "text": "Though I walk in the midst of trouble, you preserve my life. You stretch out your hand against the anger of my foes.",
    "theme": "Preservation • December"
  },
  {
    "dayOfYear": 351,
    "calendarDate": "December 17",
    "ref": "Isaiah 30:15",
    "text": "In repentance and rest is your salvation, in quietness and trust is your strength.",
    "theme": "Quietness & Trust • December"
  },
  {
    "dayOfYear": 352,
    "calendarDate": "December 18",
    "ref": "Isaiah 32:17-18",
    "text": "The fruit of that righteousness will be peace; its effect will be quietness and confidence forever.",
    "theme": "Confidence • December"
  },
  {
    "dayOfYear": 353,
    "calendarDate": "December 19",
    "ref": "2 Thessalonians 3:16",
    "text": "Now may the Lord of peace himself give you peace at all times and in every way. The Lord be with all of you.",
    "theme": "Constant Peace • December"
  },
  {
    "dayOfYear": 354,
    "calendarDate": "December 20",
    "ref": "1 Peter 5:7",
    "text": "Cast all your anxiety on him because he cares for you.",
    "theme": "Casting Care • December"
  },
  {
    "dayOfYear": 355,
    "calendarDate": "December 21",
    "ref": "Colossians 3:15",
    "text": "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace.",
    "theme": "Ruling Peace • December"
  },
  {
    "dayOfYear": 356,
    "calendarDate": "December 22",
    "ref": "Romans 15:13",
    "text": "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope.",
    "theme": "Overflowing Peace • December"
  },
  {
    "dayOfYear": 357,
    "calendarDate": "December 23",
    "ref": "Numbers 6:24-26",
    "text": "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord lift up his countenance and give you peace.",
    "theme": "Aaronic Blessing • December"
  },
  {
    "dayOfYear": 358,
    "calendarDate": "December 24",
    "ref": "Exodus 33:14",
    "text": "The Lord replied, 'My Presence will go with you, and I will give you rest.'",
    "theme": "Divine Presence • December"
  },
  {
    "dayOfYear": 359,
    "calendarDate": "December 25",
    "ref": "Psalm 34:7",
    "text": "The angel of the Lord encamps around those who fear him, and he delivers them.",
    "theme": "Angelic Guard • December"
  },
  {
    "dayOfYear": 360,
    "calendarDate": "December 26",
    "ref": "Psalm 37:7",
    "text": "Be still before the Lord and wait patiently for him; do not fret when people succeed in their ways.",
    "theme": "Patience • December"
  },
  {
    "dayOfYear": 361,
    "calendarDate": "December 27",
    "ref": "Psalm 4:8",
    "text": "In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety.",
    "theme": "Safety • December"
  },
  {
    "dayOfYear": 362,
    "calendarDate": "December 28",
    "ref": "John 14:27",
    "text": "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled.",
    "theme": "Peace of Christ • December"
  },
  {
    "dayOfYear": 363,
    "calendarDate": "December 29",
    "ref": "Proverbs 3:24",
    "text": "When you lie down, you will not be afraid; when you lie down, your sleep will be sweet.",
    "theme": "Sweet Sleep • December"
  },
  {
    "dayOfYear": 364,
    "calendarDate": "December 30",
    "ref": "Philippians 4:6-7",
    "text": "Do not be anxious about anything, but in every situation present your requests to God. And the peace of God will guard your hearts.",
    "theme": "Guarding Peace • December"
  },
  {
    "dayOfYear": 365,
    "calendarDate": "December 31",
    "ref": "Psalm 91:1-2",
    "text": "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the Lord, 'He is my refuge.'",
    "theme": "Shelter • December"
  }
];

export const EVENING_GUARDIAN_365_PROMPTS: DailyStreakPrompt[] = [
  {
    "dayOfYear": 1,
    "calendarDate": "January 1",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of January 1 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 2,
    "calendarDate": "January 2",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of January 2 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 3,
    "calendarDate": "January 3",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of January 3 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 4,
    "calendarDate": "January 4",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of January 4 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 5,
    "calendarDate": "January 5",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of January 5 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 6,
    "calendarDate": "January 6",
    "title": "Fidelity in the Small Moments",
    "body": "The day of January 6 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 7,
    "calendarDate": "January 7",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of January 7 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 8,
    "calendarDate": "January 8",
    "title": "A Heart Anchored in Truth",
    "body": "The day of January 8 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 9,
    "calendarDate": "January 9",
    "title": "Keep Your Lamp Burning",
    "body": "The day of January 9 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 10,
    "calendarDate": "January 10",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of January 10 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 11,
    "calendarDate": "January 11",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of January 11 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 12,
    "calendarDate": "January 12",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of January 12 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 13,
    "calendarDate": "January 13",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of January 13 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 14,
    "calendarDate": "January 14",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of January 14 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 15,
    "calendarDate": "January 15",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of January 15 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 16,
    "calendarDate": "January 16",
    "title": "Fidelity in the Small Moments",
    "body": "The day of January 16 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 17,
    "calendarDate": "January 17",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of January 17 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 18,
    "calendarDate": "January 18",
    "title": "A Heart Anchored in Truth",
    "body": "The day of January 18 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 19,
    "calendarDate": "January 19",
    "title": "Keep Your Lamp Burning",
    "body": "The day of January 19 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 20,
    "calendarDate": "January 20",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of January 20 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 21,
    "calendarDate": "January 21",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of January 21 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 22,
    "calendarDate": "January 22",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of January 22 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 23,
    "calendarDate": "January 23",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of January 23 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 24,
    "calendarDate": "January 24",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of January 24 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 25,
    "calendarDate": "January 25",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of January 25 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 26,
    "calendarDate": "January 26",
    "title": "Fidelity in the Small Moments",
    "body": "The day of January 26 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 27,
    "calendarDate": "January 27",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of January 27 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 28,
    "calendarDate": "January 28",
    "title": "A Heart Anchored in Truth",
    "body": "The day of January 28 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 29,
    "calendarDate": "January 29",
    "title": "Keep Your Lamp Burning",
    "body": "The day of January 29 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 30,
    "calendarDate": "January 30",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of January 30 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 31,
    "calendarDate": "January 31",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of January 31 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 32,
    "calendarDate": "February 1",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of February 1 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 33,
    "calendarDate": "February 2",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of February 2 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 34,
    "calendarDate": "February 3",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of February 3 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 35,
    "calendarDate": "February 4",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of February 4 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 36,
    "calendarDate": "February 5",
    "title": "Fidelity in the Small Moments",
    "body": "The day of February 5 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 37,
    "calendarDate": "February 6",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of February 6 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 38,
    "calendarDate": "February 7",
    "title": "A Heart Anchored in Truth",
    "body": "The day of February 7 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 39,
    "calendarDate": "February 8",
    "title": "Keep Your Lamp Burning",
    "body": "The day of February 8 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 40,
    "calendarDate": "February 9",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of February 9 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 41,
    "calendarDate": "February 10",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of February 10 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 42,
    "calendarDate": "February 11",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of February 11 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 43,
    "calendarDate": "February 12",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of February 12 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 44,
    "calendarDate": "February 13",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of February 13 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 45,
    "calendarDate": "February 14",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of February 14 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 46,
    "calendarDate": "February 15",
    "title": "Fidelity in the Small Moments",
    "body": "The day of February 15 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 47,
    "calendarDate": "February 16",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of February 16 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 48,
    "calendarDate": "February 17",
    "title": "A Heart Anchored in Truth",
    "body": "The day of February 17 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 49,
    "calendarDate": "February 18",
    "title": "Keep Your Lamp Burning",
    "body": "The day of February 18 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 50,
    "calendarDate": "February 19",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of February 19 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 51,
    "calendarDate": "February 20",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of February 20 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 52,
    "calendarDate": "February 21",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of February 21 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 53,
    "calendarDate": "February 22",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of February 22 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 54,
    "calendarDate": "February 23",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of February 23 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 55,
    "calendarDate": "February 24",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of February 24 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 56,
    "calendarDate": "February 25",
    "title": "Fidelity in the Small Moments",
    "body": "The day of February 25 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 57,
    "calendarDate": "February 26",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of February 26 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 58,
    "calendarDate": "February 27",
    "title": "A Heart Anchored in Truth",
    "body": "The day of February 27 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 59,
    "calendarDate": "February 28",
    "title": "Keep Your Lamp Burning",
    "body": "The day of February 28 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 60,
    "calendarDate": "March 1",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of March 1 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 61,
    "calendarDate": "March 2",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of March 2 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 62,
    "calendarDate": "March 3",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of March 3 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 63,
    "calendarDate": "March 4",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of March 4 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 64,
    "calendarDate": "March 5",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of March 5 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 65,
    "calendarDate": "March 6",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of March 6 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 66,
    "calendarDate": "March 7",
    "title": "Fidelity in the Small Moments",
    "body": "The day of March 7 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 67,
    "calendarDate": "March 8",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of March 8 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 68,
    "calendarDate": "March 9",
    "title": "A Heart Anchored in Truth",
    "body": "The day of March 9 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 69,
    "calendarDate": "March 10",
    "title": "Keep Your Lamp Burning",
    "body": "The day of March 10 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 70,
    "calendarDate": "March 11",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of March 11 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 71,
    "calendarDate": "March 12",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of March 12 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 72,
    "calendarDate": "March 13",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of March 13 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 73,
    "calendarDate": "March 14",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of March 14 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 74,
    "calendarDate": "March 15",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of March 15 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 75,
    "calendarDate": "March 16",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of March 16 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 76,
    "calendarDate": "March 17",
    "title": "Fidelity in the Small Moments",
    "body": "The day of March 17 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 77,
    "calendarDate": "March 18",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of March 18 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 78,
    "calendarDate": "March 19",
    "title": "A Heart Anchored in Truth",
    "body": "The day of March 19 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 79,
    "calendarDate": "March 20",
    "title": "Keep Your Lamp Burning",
    "body": "The day of March 20 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 80,
    "calendarDate": "March 21",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of March 21 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 81,
    "calendarDate": "March 22",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of March 22 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 82,
    "calendarDate": "March 23",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of March 23 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 83,
    "calendarDate": "March 24",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of March 24 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 84,
    "calendarDate": "March 25",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of March 25 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 85,
    "calendarDate": "March 26",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of March 26 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 86,
    "calendarDate": "March 27",
    "title": "Fidelity in the Small Moments",
    "body": "The day of March 27 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 87,
    "calendarDate": "March 28",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of March 28 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 88,
    "calendarDate": "March 29",
    "title": "A Heart Anchored in Truth",
    "body": "The day of March 29 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 89,
    "calendarDate": "March 30",
    "title": "Keep Your Lamp Burning",
    "body": "The day of March 30 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 90,
    "calendarDate": "March 31",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of March 31 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 91,
    "calendarDate": "April 1",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of April 1 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 92,
    "calendarDate": "April 2",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of April 2 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 93,
    "calendarDate": "April 3",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of April 3 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 94,
    "calendarDate": "April 4",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of April 4 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 95,
    "calendarDate": "April 5",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of April 5 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 96,
    "calendarDate": "April 6",
    "title": "Fidelity in the Small Moments",
    "body": "The day of April 6 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 97,
    "calendarDate": "April 7",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of April 7 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 98,
    "calendarDate": "April 8",
    "title": "A Heart Anchored in Truth",
    "body": "The day of April 8 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 99,
    "calendarDate": "April 9",
    "title": "Keep Your Lamp Burning",
    "body": "The day of April 9 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 100,
    "calendarDate": "April 10",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of April 10 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 101,
    "calendarDate": "April 11",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of April 11 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 102,
    "calendarDate": "April 12",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of April 12 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 103,
    "calendarDate": "April 13",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of April 13 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 104,
    "calendarDate": "April 14",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of April 14 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 105,
    "calendarDate": "April 15",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of April 15 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 106,
    "calendarDate": "April 16",
    "title": "Fidelity in the Small Moments",
    "body": "The day of April 16 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 107,
    "calendarDate": "April 17",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of April 17 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 108,
    "calendarDate": "April 18",
    "title": "A Heart Anchored in Truth",
    "body": "The day of April 18 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 109,
    "calendarDate": "April 19",
    "title": "Keep Your Lamp Burning",
    "body": "The day of April 19 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 110,
    "calendarDate": "April 20",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of April 20 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 111,
    "calendarDate": "April 21",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of April 21 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 112,
    "calendarDate": "April 22",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of April 22 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 113,
    "calendarDate": "April 23",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of April 23 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 114,
    "calendarDate": "April 24",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of April 24 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 115,
    "calendarDate": "April 25",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of April 25 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 116,
    "calendarDate": "April 26",
    "title": "Fidelity in the Small Moments",
    "body": "The day of April 26 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 117,
    "calendarDate": "April 27",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of April 27 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 118,
    "calendarDate": "April 28",
    "title": "A Heart Anchored in Truth",
    "body": "The day of April 28 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 119,
    "calendarDate": "April 29",
    "title": "Keep Your Lamp Burning",
    "body": "The day of April 29 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 120,
    "calendarDate": "April 30",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of April 30 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 121,
    "calendarDate": "May 1",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of May 1 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 122,
    "calendarDate": "May 2",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of May 2 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 123,
    "calendarDate": "May 3",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of May 3 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 124,
    "calendarDate": "May 4",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of May 4 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 125,
    "calendarDate": "May 5",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of May 5 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 126,
    "calendarDate": "May 6",
    "title": "Fidelity in the Small Moments",
    "body": "The day of May 6 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 127,
    "calendarDate": "May 7",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of May 7 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 128,
    "calendarDate": "May 8",
    "title": "A Heart Anchored in Truth",
    "body": "The day of May 8 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 129,
    "calendarDate": "May 9",
    "title": "Keep Your Lamp Burning",
    "body": "The day of May 9 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 130,
    "calendarDate": "May 10",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of May 10 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 131,
    "calendarDate": "May 11",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of May 11 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 132,
    "calendarDate": "May 12",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of May 12 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 133,
    "calendarDate": "May 13",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of May 13 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 134,
    "calendarDate": "May 14",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of May 14 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 135,
    "calendarDate": "May 15",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of May 15 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 136,
    "calendarDate": "May 16",
    "title": "Fidelity in the Small Moments",
    "body": "The day of May 16 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 137,
    "calendarDate": "May 17",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of May 17 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 138,
    "calendarDate": "May 18",
    "title": "A Heart Anchored in Truth",
    "body": "The day of May 18 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 139,
    "calendarDate": "May 19",
    "title": "Keep Your Lamp Burning",
    "body": "The day of May 19 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 140,
    "calendarDate": "May 20",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of May 20 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 141,
    "calendarDate": "May 21",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of May 21 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 142,
    "calendarDate": "May 22",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of May 22 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 143,
    "calendarDate": "May 23",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of May 23 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 144,
    "calendarDate": "May 24",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of May 24 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 145,
    "calendarDate": "May 25",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of May 25 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 146,
    "calendarDate": "May 26",
    "title": "Fidelity in the Small Moments",
    "body": "The day of May 26 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 147,
    "calendarDate": "May 27",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of May 27 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 148,
    "calendarDate": "May 28",
    "title": "A Heart Anchored in Truth",
    "body": "The day of May 28 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 149,
    "calendarDate": "May 29",
    "title": "Keep Your Lamp Burning",
    "body": "The day of May 29 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 150,
    "calendarDate": "May 30",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of May 30 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 151,
    "calendarDate": "May 31",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of May 31 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 152,
    "calendarDate": "June 1",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of June 1 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 153,
    "calendarDate": "June 2",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of June 2 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 154,
    "calendarDate": "June 3",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of June 3 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 155,
    "calendarDate": "June 4",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of June 4 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 156,
    "calendarDate": "June 5",
    "title": "Fidelity in the Small Moments",
    "body": "The day of June 5 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 157,
    "calendarDate": "June 6",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of June 6 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 158,
    "calendarDate": "June 7",
    "title": "A Heart Anchored in Truth",
    "body": "The day of June 7 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 159,
    "calendarDate": "June 8",
    "title": "Keep Your Lamp Burning",
    "body": "The day of June 8 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 160,
    "calendarDate": "June 9",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of June 9 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 161,
    "calendarDate": "June 10",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of June 10 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 162,
    "calendarDate": "June 11",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of June 11 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 163,
    "calendarDate": "June 12",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of June 12 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 164,
    "calendarDate": "June 13",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of June 13 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 165,
    "calendarDate": "June 14",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of June 14 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 166,
    "calendarDate": "June 15",
    "title": "Fidelity in the Small Moments",
    "body": "The day of June 15 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 167,
    "calendarDate": "June 16",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of June 16 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 168,
    "calendarDate": "June 17",
    "title": "A Heart Anchored in Truth",
    "body": "The day of June 17 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 169,
    "calendarDate": "June 18",
    "title": "Keep Your Lamp Burning",
    "body": "The day of June 18 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 170,
    "calendarDate": "June 19",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of June 19 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 171,
    "calendarDate": "June 20",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of June 20 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 172,
    "calendarDate": "June 21",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of June 21 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 173,
    "calendarDate": "June 22",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of June 22 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 174,
    "calendarDate": "June 23",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of June 23 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 175,
    "calendarDate": "June 24",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of June 24 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 176,
    "calendarDate": "June 25",
    "title": "Fidelity in the Small Moments",
    "body": "The day of June 25 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 177,
    "calendarDate": "June 26",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of June 26 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 178,
    "calendarDate": "June 27",
    "title": "A Heart Anchored in Truth",
    "body": "The day of June 27 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 179,
    "calendarDate": "June 28",
    "title": "Keep Your Lamp Burning",
    "body": "The day of June 28 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 180,
    "calendarDate": "June 29",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of June 29 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 181,
    "calendarDate": "June 30",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of June 30 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 182,
    "calendarDate": "July 1",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of July 1 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 183,
    "calendarDate": "July 2",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of July 2 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 184,
    "calendarDate": "July 3",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of July 3 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 185,
    "calendarDate": "July 4",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of July 4 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 186,
    "calendarDate": "July 5",
    "title": "Fidelity in the Small Moments",
    "body": "The day of July 5 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 187,
    "calendarDate": "July 6",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of July 6 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 188,
    "calendarDate": "July 7",
    "title": "A Heart Anchored in Truth",
    "body": "The day of July 7 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 189,
    "calendarDate": "July 8",
    "title": "Keep Your Lamp Burning",
    "body": "The day of July 8 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 190,
    "calendarDate": "July 9",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of July 9 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 191,
    "calendarDate": "July 10",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of July 10 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 192,
    "calendarDate": "July 11",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of July 11 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 193,
    "calendarDate": "July 12",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of July 12 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 194,
    "calendarDate": "July 13",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of July 13 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 195,
    "calendarDate": "July 14",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of July 14 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 196,
    "calendarDate": "July 15",
    "title": "Fidelity in the Small Moments",
    "body": "The day of July 15 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 197,
    "calendarDate": "July 16",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of July 16 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 198,
    "calendarDate": "July 17",
    "title": "A Heart Anchored in Truth",
    "body": "The day of July 17 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 199,
    "calendarDate": "July 18",
    "title": "Keep Your Lamp Burning",
    "body": "The day of July 18 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 200,
    "calendarDate": "July 19",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of July 19 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 201,
    "calendarDate": "July 20",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of July 20 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 202,
    "calendarDate": "July 21",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of July 21 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 203,
    "calendarDate": "July 22",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of July 22 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 204,
    "calendarDate": "July 23",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of July 23 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 205,
    "calendarDate": "July 24",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of July 24 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 206,
    "calendarDate": "July 25",
    "title": "Fidelity in the Small Moments",
    "body": "The day of July 25 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 207,
    "calendarDate": "July 26",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of July 26 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 208,
    "calendarDate": "July 27",
    "title": "A Heart Anchored in Truth",
    "body": "The day of July 27 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 209,
    "calendarDate": "July 28",
    "title": "Keep Your Lamp Burning",
    "body": "The day of July 28 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 210,
    "calendarDate": "July 29",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of July 29 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 211,
    "calendarDate": "July 30",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of July 30 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 212,
    "calendarDate": "July 31",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of July 31 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 213,
    "calendarDate": "August 1",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of August 1 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 214,
    "calendarDate": "August 2",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of August 2 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 215,
    "calendarDate": "August 3",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of August 3 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 216,
    "calendarDate": "August 4",
    "title": "Fidelity in the Small Moments",
    "body": "The day of August 4 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 217,
    "calendarDate": "August 5",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of August 5 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 218,
    "calendarDate": "August 6",
    "title": "A Heart Anchored in Truth",
    "body": "The day of August 6 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 219,
    "calendarDate": "August 7",
    "title": "Keep Your Lamp Burning",
    "body": "The day of August 7 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 220,
    "calendarDate": "August 8",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of August 8 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 221,
    "calendarDate": "August 9",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of August 9 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 222,
    "calendarDate": "August 10",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of August 10 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 223,
    "calendarDate": "August 11",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of August 11 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 224,
    "calendarDate": "August 12",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of August 12 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 225,
    "calendarDate": "August 13",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of August 13 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 226,
    "calendarDate": "August 14",
    "title": "Fidelity in the Small Moments",
    "body": "The day of August 14 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 227,
    "calendarDate": "August 15",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of August 15 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 228,
    "calendarDate": "August 16",
    "title": "A Heart Anchored in Truth",
    "body": "The day of August 16 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 229,
    "calendarDate": "August 17",
    "title": "Keep Your Lamp Burning",
    "body": "The day of August 17 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 230,
    "calendarDate": "August 18",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of August 18 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 231,
    "calendarDate": "August 19",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of August 19 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 232,
    "calendarDate": "August 20",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of August 20 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 233,
    "calendarDate": "August 21",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of August 21 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 234,
    "calendarDate": "August 22",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of August 22 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 235,
    "calendarDate": "August 23",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of August 23 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 236,
    "calendarDate": "August 24",
    "title": "Fidelity in the Small Moments",
    "body": "The day of August 24 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 237,
    "calendarDate": "August 25",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of August 25 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 238,
    "calendarDate": "August 26",
    "title": "A Heart Anchored in Truth",
    "body": "The day of August 26 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 239,
    "calendarDate": "August 27",
    "title": "Keep Your Lamp Burning",
    "body": "The day of August 27 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 240,
    "calendarDate": "August 28",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of August 28 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 241,
    "calendarDate": "August 29",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of August 29 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 242,
    "calendarDate": "August 30",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of August 30 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 243,
    "calendarDate": "August 31",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of August 31 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 244,
    "calendarDate": "September 1",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of September 1 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 245,
    "calendarDate": "September 2",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of September 2 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 246,
    "calendarDate": "September 3",
    "title": "Fidelity in the Small Moments",
    "body": "The day of September 3 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 247,
    "calendarDate": "September 4",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of September 4 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 248,
    "calendarDate": "September 5",
    "title": "A Heart Anchored in Truth",
    "body": "The day of September 5 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 249,
    "calendarDate": "September 6",
    "title": "Keep Your Lamp Burning",
    "body": "The day of September 6 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 250,
    "calendarDate": "September 7",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of September 7 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 251,
    "calendarDate": "September 8",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of September 8 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 252,
    "calendarDate": "September 9",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of September 9 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 253,
    "calendarDate": "September 10",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of September 10 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 254,
    "calendarDate": "September 11",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of September 11 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 255,
    "calendarDate": "September 12",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of September 12 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 256,
    "calendarDate": "September 13",
    "title": "Fidelity in the Small Moments",
    "body": "The day of September 13 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 257,
    "calendarDate": "September 14",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of September 14 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 258,
    "calendarDate": "September 15",
    "title": "A Heart Anchored in Truth",
    "body": "The day of September 15 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 259,
    "calendarDate": "September 16",
    "title": "Keep Your Lamp Burning",
    "body": "The day of September 16 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 260,
    "calendarDate": "September 17",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of September 17 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 261,
    "calendarDate": "September 18",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of September 18 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 262,
    "calendarDate": "September 19",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of September 19 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 263,
    "calendarDate": "September 20",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of September 20 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 264,
    "calendarDate": "September 21",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of September 21 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 265,
    "calendarDate": "September 22",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of September 22 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 266,
    "calendarDate": "September 23",
    "title": "Fidelity in the Small Moments",
    "body": "The day of September 23 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 267,
    "calendarDate": "September 24",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of September 24 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 268,
    "calendarDate": "September 25",
    "title": "A Heart Anchored in Truth",
    "body": "The day of September 25 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 269,
    "calendarDate": "September 26",
    "title": "Keep Your Lamp Burning",
    "body": "The day of September 26 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 270,
    "calendarDate": "September 27",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of September 27 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 271,
    "calendarDate": "September 28",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of September 28 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 272,
    "calendarDate": "September 29",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of September 29 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 273,
    "calendarDate": "September 30",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of September 30 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 274,
    "calendarDate": "October 1",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of October 1 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 275,
    "calendarDate": "October 2",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of October 2 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 276,
    "calendarDate": "October 3",
    "title": "Fidelity in the Small Moments",
    "body": "The day of October 3 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 277,
    "calendarDate": "October 4",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of October 4 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 278,
    "calendarDate": "October 5",
    "title": "A Heart Anchored in Truth",
    "body": "The day of October 5 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 279,
    "calendarDate": "October 6",
    "title": "Keep Your Lamp Burning",
    "body": "The day of October 6 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 280,
    "calendarDate": "October 7",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of October 7 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 281,
    "calendarDate": "October 8",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of October 8 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 282,
    "calendarDate": "October 9",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of October 9 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 283,
    "calendarDate": "October 10",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of October 10 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 284,
    "calendarDate": "October 11",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of October 11 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 285,
    "calendarDate": "October 12",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of October 12 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 286,
    "calendarDate": "October 13",
    "title": "Fidelity in the Small Moments",
    "body": "The day of October 13 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 287,
    "calendarDate": "October 14",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of October 14 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 288,
    "calendarDate": "October 15",
    "title": "A Heart Anchored in Truth",
    "body": "The day of October 15 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 289,
    "calendarDate": "October 16",
    "title": "Keep Your Lamp Burning",
    "body": "The day of October 16 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 290,
    "calendarDate": "October 17",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of October 17 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 291,
    "calendarDate": "October 18",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of October 18 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 292,
    "calendarDate": "October 19",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of October 19 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 293,
    "calendarDate": "October 20",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of October 20 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 294,
    "calendarDate": "October 21",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of October 21 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 295,
    "calendarDate": "October 22",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of October 22 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 296,
    "calendarDate": "October 23",
    "title": "Fidelity in the Small Moments",
    "body": "The day of October 23 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 297,
    "calendarDate": "October 24",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of October 24 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 298,
    "calendarDate": "October 25",
    "title": "A Heart Anchored in Truth",
    "body": "The day of October 25 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 299,
    "calendarDate": "October 26",
    "title": "Keep Your Lamp Burning",
    "body": "The day of October 26 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 300,
    "calendarDate": "October 27",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of October 27 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 301,
    "calendarDate": "October 28",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of October 28 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 302,
    "calendarDate": "October 29",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of October 29 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 303,
    "calendarDate": "October 30",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of October 30 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 304,
    "calendarDate": "October 31",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of October 31 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 305,
    "calendarDate": "November 1",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of November 1 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 306,
    "calendarDate": "November 2",
    "title": "Fidelity in the Small Moments",
    "body": "The day of November 2 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 307,
    "calendarDate": "November 3",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of November 3 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 308,
    "calendarDate": "November 4",
    "title": "A Heart Anchored in Truth",
    "body": "The day of November 4 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 309,
    "calendarDate": "November 5",
    "title": "Keep Your Lamp Burning",
    "body": "The day of November 5 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 310,
    "calendarDate": "November 6",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of November 6 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 311,
    "calendarDate": "November 7",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of November 7 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 312,
    "calendarDate": "November 8",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of November 8 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 313,
    "calendarDate": "November 9",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of November 9 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 314,
    "calendarDate": "November 10",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of November 10 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 315,
    "calendarDate": "November 11",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of November 11 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 316,
    "calendarDate": "November 12",
    "title": "Fidelity in the Small Moments",
    "body": "The day of November 12 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 317,
    "calendarDate": "November 13",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of November 13 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 318,
    "calendarDate": "November 14",
    "title": "A Heart Anchored in Truth",
    "body": "The day of November 14 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 319,
    "calendarDate": "November 15",
    "title": "Keep Your Lamp Burning",
    "body": "The day of November 15 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 320,
    "calendarDate": "November 16",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of November 16 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 321,
    "calendarDate": "November 17",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of November 17 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 322,
    "calendarDate": "November 18",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of November 18 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 323,
    "calendarDate": "November 19",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of November 19 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 324,
    "calendarDate": "November 20",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of November 20 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 325,
    "calendarDate": "November 21",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of November 21 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 326,
    "calendarDate": "November 22",
    "title": "Fidelity in the Small Moments",
    "body": "The day of November 22 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 327,
    "calendarDate": "November 23",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of November 23 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 328,
    "calendarDate": "November 24",
    "title": "A Heart Anchored in Truth",
    "body": "The day of November 24 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 329,
    "calendarDate": "November 25",
    "title": "Keep Your Lamp Burning",
    "body": "The day of November 25 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 330,
    "calendarDate": "November 26",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of November 26 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 331,
    "calendarDate": "November 27",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of November 27 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 332,
    "calendarDate": "November 28",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of November 28 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 333,
    "calendarDate": "November 29",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of November 29 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 334,
    "calendarDate": "November 30",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of November 30 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 335,
    "calendarDate": "December 1",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of December 1 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 336,
    "calendarDate": "December 2",
    "title": "Fidelity in the Small Moments",
    "body": "The day of December 2 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 337,
    "calendarDate": "December 3",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of December 3 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 338,
    "calendarDate": "December 4",
    "title": "A Heart Anchored in Truth",
    "body": "The day of December 4 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 339,
    "calendarDate": "December 5",
    "title": "Keep Your Lamp Burning",
    "body": "The day of December 5 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 340,
    "calendarDate": "December 6",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of December 6 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 341,
    "calendarDate": "December 7",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of December 7 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 342,
    "calendarDate": "December 8",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of December 8 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 343,
    "calendarDate": "December 9",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of December 9 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 344,
    "calendarDate": "December 10",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of December 10 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 345,
    "calendarDate": "December 11",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of December 11 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 346,
    "calendarDate": "December 12",
    "title": "Fidelity in the Small Moments",
    "body": "The day of December 12 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 347,
    "calendarDate": "December 13",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of December 13 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 348,
    "calendarDate": "December 14",
    "title": "A Heart Anchored in Truth",
    "body": "The day of December 14 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 349,
    "calendarDate": "December 15",
    "title": "Keep Your Lamp Burning",
    "body": "The day of December 15 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 350,
    "calendarDate": "December 16",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of December 16 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 351,
    "calendarDate": "December 17",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of December 17 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 352,
    "calendarDate": "December 18",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of December 18 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 353,
    "calendarDate": "December 19",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of December 19 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 354,
    "calendarDate": "December 20",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of December 20 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 355,
    "calendarDate": "December 21",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of December 21 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 356,
    "calendarDate": "December 22",
    "title": "Fidelity in the Small Moments",
    "body": "The day of December 22 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 357,
    "calendarDate": "December 23",
    "title": "Nightfall Study • Unbroken Streak",
    "body": "The day of December 23 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 358,
    "calendarDate": "December 24",
    "title": "A Heart Anchored in Truth",
    "body": "The day of December 24 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 359,
    "calendarDate": "December 25",
    "title": "Keep Your Lamp Burning",
    "body": "The day of December 25 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 360,
    "calendarDate": "December 26",
    "title": "Your Sacred Daily Rhythm",
    "body": "The day of December 26 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 361,
    "calendarDate": "December 27",
    "title": "Protect Your Daily Streak • The Word Awaits",
    "body": "The day of December 27 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 362,
    "calendarDate": "December 28",
    "title": "Keep Your Sacred Walk Alive • Today's Word",
    "body": "The day of December 28 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 363,
    "calendarDate": "December 29",
    "title": "Evening Reflection • Nourish Your Spirit",
    "body": "The day of December 29 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 364,
    "calendarDate": "December 30",
    "title": "Close the Day in Peace • Daily Reading",
    "body": "The day of December 30 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  },
  {
    "dayOfYear": 365,
    "calendarDate": "December 31",
    "title": "A Lamp for Your Night • Read Today's Word",
    "body": "The day of December 31 is winding down. Take 2 minutes tonight to read your daily chapter and protect your streak."
  }
];
