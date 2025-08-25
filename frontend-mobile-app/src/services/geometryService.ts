import axios from 'axios';
import { API_URL } from '../utils/config';
import { getLocalProblems } from '../utils/localdb';

export async function getRandomGeometryQuestion(callback: (q: any) => void) {
  try {
    const res = await axios.get(`${API_URL}/problems/geometry`);
    if (res.data && res.data.length > 0) {
      const idx = Math.floor(Math.random() * res.data.length);
      callback({ ...res.data[idx], source: 'online' });
      return;
    }
  } catch (e) {
    // fallback to local DB
    getLocalProblems((problems: any[]) => {
      const geometryProblems = problems.filter(p => p.topic === 'geometry');
      if (geometryProblems.length > 0) {
        const idx = Math.floor(Math.random() * geometryProblems.length);
        callback({ ...geometryProblems[idx], source: 'offline' });
      } else {
        callback(null);
      }
    });
  }
}
