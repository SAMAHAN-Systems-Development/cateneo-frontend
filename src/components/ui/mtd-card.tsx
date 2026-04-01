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
        <div className="flex flex-col items-center justify-center font-gaegu justify-start" style={{ gap: 'clamp(12px, 3vw, 24px)', width: 'clamp(156.5px, 21.74vw, 313px)'}}>
            <div className="flex rounded-[38px] border border-cateneo-darkbrown items-center justify-center" style={{ borderWidth: 'clamp(1.5px, 0.208vw, 3px)', width: 'clamp(156.5px, 21.74vw, 313px)', height: 'clamp(156.5px, 21.74vw, 313px)' }}>
                <img className="w-full" src={imageUrl}/>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
                <p className="font-gaegu text-center w-full break-words" style={{ fontSize: 'clamp(16px, 2.4vw, 32px)'}}>{name}</p>
                <p className="font-gaegu text-center w-full break-words" style={{ fontSize: 'clamp(14px, 2vw, 28px)'}}>{position}</p>
            </div>
        </div>
    )
}

export default MtdCard;
