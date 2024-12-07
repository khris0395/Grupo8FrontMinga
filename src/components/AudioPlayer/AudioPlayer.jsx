import React from 'react'
import Player from '@madzadev/audio-player'
import nightcore from "../../assets/music/nightcore.mp3"
import naruto from "../../assets/music/naruto.mp3"
import pokemon from "../../assets/music/pokemon.mp3"
import bleach from "../../assets/music/bleach.mp3"

const tracks = [
    {
        url: naruto,
        title: 'naruto',
        tags: ['chill']
    },
{
        url: nightcore,
        title: 'nightcore',
        tags: ['chill']
    },
    {
        url: pokemon,
        title: 'pokemon',
        tags: ['chill']
    },
    {
        url: bleach,
        title: 'bleach',
        tags: ['chill']
    }
]

const colors = {
    tagsBackground: "#3e32e4",
    tagsText: "#ffffff",
    tagsBackgroundHoverActive: "#6e65f1",
    tagsTextHoverActive: "#ffffff",
    searchBackground: "#18191f",
    searchText: "#ffffff",
    searchPlaceHolder: "#575a77",
    playerBackground: "#18191f",
    titleColor: "#ffffff",
    timeColor: "#ffffff",
    progressSlider: "#4338ca",
    progressUsed: "#ffffff",
    progressLeft: "#151616",
    bufferLoaded: "#1f212b",
    volumeSlider: "#4338ca",
    volumeUsed: "#ffffff",
    volumeLeft: "#151616",
    playlistBackground: "#18191f",
    playlistText: "#575a77",
    playlistBackgroundHoverActive: "#18191f",
    playlistTextHoverActive: "#ffffff",
}

export default function AudioPlayer() {
    return (
        <div className='mt-96 text-xs'><Player
            trackList={tracks}
            includeTags={false}
            includeSearch={false}
            showPlaylist={false}
            sortTracks={true}
            autoPlayNextTrack={true}
            customColorScheme={colors}
        />
        </div>
    )
}
