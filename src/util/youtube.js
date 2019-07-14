import { YouTubeStandaloneAndroid, YouTubeStandaloneIOS } from 'react-native-youtube';
import { config } from '../config/config';

export const youtubeAndroid = videos => {
    YouTubeStandaloneAndroid.playVideos({
        apiKey: config.GOOGLE_API_KEY,
        videoIds: videos,
        autoplay: true
    })
        .then(() => console.log('Standalone Player Exited'))
        .catch(errorMessage => console.error(errorMessage));
}

export const youtubeIOS = video => {
    YouTubeStandaloneIOS.playVideo(video)
        .then(() => console.log('Standalone Player Exited'))
        .catch(errorMessage => console.error(errorMessage))
}