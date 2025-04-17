import { cn } from "@/lib/cn";
import Image from 'next/image'

interface AvatarProps {
    imgUrl?: string
    name: string
}

export const Avatar = ({ name, imgUrl='' }: AvatarProps) => {
    return (<>

        <div className="flex items-center justify-center">
            <div className={cn(
                "h-20 w-20 rounded-full",
                "flex items-center justify-center",
                "relative overflow-hidden" // Added for proper fallback positioning
            )}>
                <Image
                    width={24}
                    height={24}
                    src={imgUrl}
                    alt="User Avatar"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                />
                {!imgUrl && (
                    <span className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-800 text-xl font-semibold">
                        {name.substring(0, 2).toUpperCase()}
                    </span>
                )}
               
            </div>
        </div>


    </>)
}