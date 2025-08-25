import axios from 'axios';
import { API_URL } from '../utils/config';
import { getLocalProblems } from '../utils/localdb';

export async function getRandomTrigonometryQuestion(callback: (q: any) => void) {
  try {
    const res = await axios.get(`${API_URL}/problems/trigonometry`);
    if (res.data && res.data.length > 0) {
      const idx = Math.floor(Math.random() * res.data.length);
      callback({ ...res.data[idx], source: 'online' });
      return;
    }
  } catch (e) {
    // fallback to local DB
    getLocalProblems((problems: any[]) => {
      const trigProblems = problems.filter(p => p.topic === 'trigonometry');
      if (trigProblems.length > 0) {
        const idx = Math.floor(Math.random() * trigProblems.length);
        callback({ ...trigProblems[idx], source: 'offline' });
      } else {
        callback(null);
      }
    });
  }
}
