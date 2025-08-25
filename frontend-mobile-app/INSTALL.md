# Installation Instructions: Math Assistant Mobile (React Native)

## Prerequisites
- Node.js v18 or higher
- npm or yarn
- Git
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for Android emulator) or Xcode (for iOS, macOS only)
- Visual Studio Code (recommended)

## Steps

1. **Clone the repository**
   ```sh
   git clone <REPO_URL>
   cd frontend-mobile
   ```

2. **Install dependencies**
   ```sh
   npm install
   # o
   yarn install
   ```

3. **Start the development server**
   ```sh
   npx expo start
   # o
   npm run start
   ```

4. **Run on device or emulator**
   - Escanea el QR con la app Expo Go (Android/iOS)
   - O usa un emulador configurado en Android Studio/Xcode

5. **Configuración de API**
   - Edita los archivos en `src/services/` para apuntar al backend correcto (por ejemplo, `http://localhost:3000` o la IP de tu servidor)

## Notas
- Para desarrollo en Windows, asegúrate de tener las variables de entorno y PATH configuradas para Node y npm.
- Si usas dependencias nativas, sigue las instrucciones de instalación de cada paquete.
- Actualiza este archivo si agregas nuevas dependencias o pasos.

---
Para dudas o problemas, consulta el README o abre un issue en el repositorio.
