import { Button } from "@/components/ui/button"
import { useAccountStore, useStore } from "@/lib/state"
import { Command, Music } from "lucide-react"
import { Dispatch, useCallback, useEffect, useRef, useState } from "react"
import List from "./list"
import Avatar from "./avatar"
import LinkPopover from "./linkPopover"
import songType from "@/lib/songType"

const Editor = ({
  setEditorScroll,
  setOpen,
}: {
  setEditorScroll: (editorScroll: number) => void
  setOpen: Dispatch<React.SetStateAction<boolean>>
}) => {
  const accessToken = useAccountStore((state) => state.accessToken)
  const selected = useStore((state) => state.selected)
  const setSelected = useStore((state) => state.setSelected)
  const data = useAccountStore((state) => state.userData)

  const songs = useStore((state) => state.songs)
  const setSongs = useStore((state) => state.setSongs)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selected) {
      const getPlaylistSongs = async () => {
        const res = await fetch(
          `/api/spotify/getPlaylistSongs?accessToken=${accessToken}&id=${selected}`
        )
        return await res.json()
      }

      getPlaylistSongs().then((res) => {
        if (res?.songs?.items) {
          const songs: songType[] = res?.songs?.items.map((song: any) => {
            return {
              id: song?.track?.id,
              title: song?.track?.name,
              artist: song?.track?.artists[0].name,
              cover: song?.track?.album.images[0].url,
              songExt: song?.track?.external_urls.spotify,
              artistExt: song?.track?.artists[0].external_urls.spotify,
            }
          })
          setSongs(songs)
        }
      })
    }
  }, [selected, accessToken])
  // }, [selected, accessToken, songs])

  const onScroll = useCallback(() => {
    const scrollY = window.scrollY
    if (ref?.current) {
      setEditorScroll(ref.current.scrollTop)
    }
  }, [setEditorScroll])

  return (
    <div
      ref={ref}
      onScroll={onScroll}
      className="dashboard-scroll flex h-full min-w-[650px] flex-grow flex-col items-start justify-start overflow-y-auto p-12">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="text-3xl font-medium">Playlist Editor</div>
          <Button
            onClick={() => {
              setOpen(true)
            }}
            className="text-base">
            Add Song
            <div className="ml-2.5 flex items-center text-zinc-500">
              <Command className="h-3.5 w-3.5" />
              <span className="translate-y-[1px] text-sm">K</span>
            </div>
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="translate-y-1">
            <Avatar name="Ishaan" src={data?.image} clr="zinc" />
          </div>
          <LinkPopover />
        </div>
      </div>
      {/* <div className="my-4 w-[900px] text-xs">{selected}</div> */}
      {/* <div className="mt-8 min-h-[400px] w-[900px] overflow-auto whitespace-pre text-xs">
        {JSON.stringify(songs, null, "\t")}
      </div> */}

      <List songs={songs} setSongs={setSongs} />
    </div>
  )
}

export default Editor
