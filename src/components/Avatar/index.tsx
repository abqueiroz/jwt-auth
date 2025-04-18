import { cn } from "@/lib/cn";
import Image from 'next/image'

interface AvatarProps {
    imgUrl?: string
    name: string
}

export const Avatar = ({ name, imgUrl = '' }: AvatarProps) => {
    debugger
    const splitName = name.split(' ')
    const firstName = splitName.at(0)?.charAt(0)
    const lastName = splitName.at(-1)?.charAt(0)
    return (<>
        <div className="flex items-center justify-center">
            <div className={cn(
                "h-12 w-12 rounded-full",
                "flex items-center justify-center",
                "relative overflow-hidden" // Added for proper fallback positioning
            )}>
                {imgUrl ? <Image
                    width={12}
                    height={12}
                    src={imgUrl}
                    alt="User Avatar"
                    className="object-cover"
                    onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                /> :
                    <span className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-800 text-[20px] font-semibold">
                        {firstName}{lastName}
                    </span>}


            </div>
        </div>


    </>)
}