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
        <div className="flex">
            <img src={imageUrl}/>
            <p>{name}</p>
            <p>position</p>
        </div>
    )
}

export default MtdCard;
