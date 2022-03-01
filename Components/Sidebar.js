import { HomeIcon, LibraryIcon, PlusCircleIcon, RssIcon, SearchIcon } from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/solid";
import { signOut, useSession } from "next-auth/react";

import { playlistIdState } from '../atoms/playlistAtom';
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useSpotify from '../hooks/useSpotify';
const Sidebar = () => {
    const spotifyApi = useSpotify();
    const [playlists, setPlaylist] = useState([]);
    const { data: session, status } = useSession();
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylist(data.body.items);
            });
        }
    }, [session, spotifyApi]);
    console.log(playlists);
    //console.log(session);
    return (
        <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex">
            <div className="space-y-4">

                <button className="flex items-center space-x-2 hover:text-white ">
                    <HomeIcon className="h-5 w-5" />
                    <p>Home</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white ">
                    <SearchIcon className="h-5 w-5" />
                    <p>Search</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white ">
                    <LibraryIcon className="h-5 w-5" />
                    <p>Your Library</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900" />
                <button className="flex items-center space-x-2 hover:text-white ">
                    <PlusCircleIcon className="h-5 w-5" />
                    <p>Create playlist</p>
                </button>
                <button className="flex items-center space-x-2 text-blue-500 hover:text-white ">
                    <HeartIcon className="h-5 w-5" />
                    <p>Liked Songs</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white ">
                    <RssIcon className="h-5 w-5 text-green-300" />
                    <p>Your episodes</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900" />
                {playlists.map((playlist) => (
                    <p
                        key={playlist.id}
                        onClick={() => setPlaylistId(playlist.id)}
                        className="cursor-pointer hover:text-white"
                    >
                        {playlist.name}
                    </p>
                ))}


            </div>


        </div>
    );
}

export default Sidebar;