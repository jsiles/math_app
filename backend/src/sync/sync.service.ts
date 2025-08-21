import { Injectable } from '@nestjs/common';

@Injectable()
export class SyncService {
  private lastSync: Date | null = null;

  updateData(data: any) {
    // Aquí iría la lógica para actualizar/sincronizar la base de datos
    this.lastSync = new Date();
    return { success: true, updatedAt: this.lastSync };
  }

  getSyncStatus() {
    return {
      lastSync: this.lastSync,
      status: this.lastSync ? 'synchronized' : 'never synchronized',
    };
  }
}
