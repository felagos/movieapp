import { YouTubeStandaloneAndroid, YouTubeStandaloneIOS } from 'react-native-youtube';
import { config } from '../config/config';

export const youtubeAndroid = videos => {
    YouTubeStandaloneAndroid.playVideos({
        apiKey: config.GOOGLE_API_KEY,
        videoIds: videoIds,
        autoplay: true
    })
        .then(() => console.log('Standalone Player Exited'))
        .catch(errorMessage => console.error(errorMessage));
}

export const youtubeIOS = video => {
    YouTubeStandaloneIOS.playVideo(videoIds[0])
        .then(() => console.log('Standalone Player Exited'))
        .catch(errorMessage => console.error(errorMessage))
}