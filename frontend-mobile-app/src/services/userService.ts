import axios from 'axios';
import { API_URL } from '../utils/config';
import { getLocalUser } from '../utils/localdb';

export async function getUser(identifier: string, callback: (u: any) => void) {
  try {
    const res = await axios.get(`${API_URL}/users/${identifier}`);
    if (res.data) {
      callback({ ...res.data, source: 'online' });
      return;
    }
  } catch (e) {
    // fallback to local DB
    getLocalUser(identifier, (user: any) => {
      if (user) {
        callback({ ...user, source: 'offline' });
      } else {
        callback(null);
      }
    });
  }
}
