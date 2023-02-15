import { Button } from "@/components/ui/button"
import { LucideLogOut } from "lucide-react"
import Image from "next/image"

const Sidebar = ({
  data,
}: {
  data:
    | {
        name?: string | null | undefined
        email?: string | null | undefined
        image?: string | null | undefined
      }
    | undefined
}) => {
  return (
    <div className="flex w-72 flex-col items-center justify-between bg-slate-900 py-10 px-3 xs:px-6">
      <button className="flex w-full items-center space-x-3 rounded-xl bg-transparent p-2 hover:bg-slate-800">
        <div className="aspect-square h-12 rounded-lg bg-slate-600"></div>
        <div className="-space-y-1">
          <div className="text-medium text-left text-white">
            No Playlist Selected
          </div>
          <div className="text-left text-sm text-slate-500">
            (Select or create)
          </div>
        </div>
      </button>
      <Button className="group relative m-0 flex h-16 w-full items-center justify-start space-x-3 rounded-xl bg-transparent p-2 text-left hover:bg-slate-800">
        {/* <div className="group-hover:opcity-100 absolute left-5 z-10 -translate-y-2 opacity-0 duration-200 group-hover:translate-y-0">
          <LucideLogOut className="h-7 w-7 text-white" />
        </div> */}
        <div className="relative z-0 aspect-square h-12 overflow-hidden rounded-lg bg-slate-600 bg-cover duration-200">
          <Image
            className="min-h-full min-w-full object-cover"
            src={data?.image ?? ""}
            alt=""
            fill
          />
        </div>
        <div className="-space-y-1">
          <div className="text-medium text-left text-white">{data?.name}</div>
          <div className="text-left text-sm text-slate-500">{data?.email}</div>
        </div>
      </Button>
    </div>
  )
}

export default Sidebar
