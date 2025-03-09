import { cn } from "@nextui-org/react";


interface Props {
    strength: 0 | 1 | 2 | 3 ;
}


const ShowPassStrength = ({ strength }: Props) => {
    return (
        <div className="flex gap-2">
            {Array.from({ length: strength + 1 }).map((i, index) => (
                <div 
                key={index}
                className={cn("h-2 w-[72px] rounded-md", {
                    "bg-red-500": strength === 0,
                    "bg-orange-500": strength === 1,
                    "bg-yellow-500": strength === 2,
                    "bg-green-500 grow": strength === 3,
                })}>

                </div>
            ))}
        </div>
    )
}

export default ShowPassStrength