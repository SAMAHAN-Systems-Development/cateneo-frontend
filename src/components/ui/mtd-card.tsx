export type MtdProps = {
    imageUrl: string;
    name: string;
    position: string;
}

function MtdCard({
    imageUrl,
    name,
    position
}: MtdProps){
    return(
        <div className="flex flex-col items-center justify-center max-w-[313px] w-[313px] font-gaegu gap-[24px]">
            <div className="flex max-w-[313px] max-h-[313px] w-[313px] h-[313px] rounded-[38px] border-[3px] border-cateneo-darkbrown items-center justify-center">
                <img className="w-full"src={imageUrl}/>
            </div>
            <div className="flex flex-col items-center justify-center">
                <p className="text-[32px]">{name}</p>
                <p className="text-[28px]">{position}</p>
            </div>
        </div>
    )
}

export default MtdCard;
