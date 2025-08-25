import axios from 'axios';
import { API_URL } from '../utils/config';
import { getLocalProblems } from '../utils/localdb';

export async function getRandomStatisticsQuestion(callback: (q: any) => void) {
  try {
    const res = await axios.get(`${API_URL}/problems/statistics`);
    if (res.data && res.data.length > 0) {
      const idx = Math.floor(Math.random() * res.data.length);
      callback({ ...res.data[idx], source: 'online' });
      return;
    }
  } catch (e) {
    // fallback to local DB
    getLocalProblems((problems: any[]) => {
      const statProblems = problems.filter(p => p.topic === 'statistics');
      if (statProblems.length > 0) {
        const idx = Math.floor(Math.random() * statProblems.length);
        callback({ ...statProblems[idx], source: 'offline' });
      } else {
        callback(null);
      }
    });
  }
}
