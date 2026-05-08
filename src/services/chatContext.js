import { useIssStore } from '../store/useIssStore';
import { useNewsStore } from '../store/useNewsStore';

export const buildDashboardContext = () => {
  // We use zustand's getState to read without subscribing
  const issState = useIssStore.getState();
  const newsState = useNewsStore.getState();

  const pos = issState.currentPosition;
  const speed = issState.currentSpeed?.toFixed(2) || 'Unknown';
  const location = issState.nearestLocation || 'Unknown';
  
  const astroCount = issState.astronauts.length;
  const astroNames = issState.astronauts.map(a => a.name).join(', ');

  const recentNews = newsState.articles.slice(0, 5).map(a => `- ${a.title} (${a.source?.name})`).join('\n');

  return `
DASHBOARD STATE:
---
ISS LOCATION:
Latitude: ${pos?.latitude || 'Unknown'}
Longitude: ${pos?.longitude || 'Unknown'}
Altitude: ~420 km (Standard orbit)
Current Speed: ${speed} km/h
Nearest Location on Earth: ${location}

ASTRONAUTS IN SPACE:
Total Count: ${astroCount}
Names: ${astroNames || 'None known currently'}

LATEST DASHBOARD NEWS:
${recentNews || 'No recent news loaded.'}
---
`;
};
