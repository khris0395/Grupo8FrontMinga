import React from 'react'
import Player from '@madzadev/audio-player'
import nightcore from "../../assets/music/nightcore.mp3"
import naruto from "../../assets/music/naruto.mp3"
import pokemon from "../../assets/music/pokemon.mp3"
import bleach from "../../assets/music/bleach.mp3"
import DragonBallZ from "../../assets/music/DragonBallZ.mp3"
import SamuraiX from "../../assets/music/SamuraiX.mp3"

const tracks = [
    {
        url: DragonBallZ,
        title: 'DragonBallZ',
        tags: ['chill']
    },
{
        url: SamuraiX,
        title: 'SamuraiX',
        tags: ['chill']
    },
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
    playerBackground: "#4338ca",
    titleColor: "#ffffff",
    timeColor: "#ffffff",
    progressSlider: "#b621f2",
    progressUsed: "#ffffff",
    progressLeft: "#ffffff",
    bufferLoaded: "#1f212b",
    volumeSlider: "#b621f2",
    volumeUsed: "#ffffff",
    volumeLeft: "#ffff",
    playlistBackground: "#18191f",
    playlistText: "#575a77",
    playlistBackgroundHoverActive: "#18191f",
    playlistTextHoverActive: "#ffffff",
}

export default function AudioPlayer() {
    return (
        <div><Player
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
